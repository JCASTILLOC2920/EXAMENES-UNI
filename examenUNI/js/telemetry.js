/**
 * JC PATH LAB - MÓDULO SOBERANO DE TELEMETRÍA MILITAR CON CIRCUIT BREAKER Y COLA OFFLINE
 * Para Valeria Castillo - Admisión UNI
 * Agente Hermes (Colmena)
 */
(function(window) {
  'use strict';

  const STORAGE_KEY_QUEUE = 'valeria_telemetria_sync_queue';
  const STORAGE_KEY_HIST = 'valeria_uni_historial';
  const DEFAULT_WEBHOOK_URL = 'http://localhost:5678/webhook/uni-progreso-valeria';
  const TIMEOUT_MS = 3500;
  const FAILURE_THRESHOLD = 3;
  const COOLDOWN_MS = 60000; // 60 segundos

  // Estados del Circuit Breaker
  const State = {
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
    HALF_OPEN: 'HALF_OPEN'
  };

  class CircuitBreaker {
    constructor() {
      this.state = State.CLOSED;
      this.failureCount = 0;
      this.lastFailureTime = 0;
    }

    canAttempt() {
      if (this.state === State.CLOSED) return true;
      const now = Date.now();
      if (this.state === State.OPEN) {
        if (now - this.lastFailureTime >= COOLDOWN_MS) {
          console.warn('[CircuitBreaker] Cooldown cumplido (60s). Transicionando a HALF_OPEN...');
          this.state = State.HALF_OPEN;
          return true;
        }
        return false;
      }
      if (this.state === State.HALF_OPEN) {
        return true;
      }
      return true;
    }

    recordSuccess() {
      this.failureCount = 0;
      this.state = State.CLOSED;
    }

    recordFailure() {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= FAILURE_THRESHOLD) {
        this.state = State.OPEN;
        console.warn(`[CircuitBreaker] Umbral de ${FAILURE_THRESHOLD} fallos alcanzado. Circuito ABIERTO por 60s.`);
      }
    }
  }

  const breaker = new CircuitBreaker();

  class TelemetryClient {
    constructor(webhookUrl = DEFAULT_WEBHOOK_URL) {
      this.webhookUrl = webhookUrl;
      this._initListeners();
    }

    _initListeners() {
      if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
          console.log('[TelemetryClient] Conexión restaurada (online). Vaciando cola de sincronización...');
          this.flushQueue();
        });
      }
    }

    getQueue() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE) || '[]');
      } catch (e) {
        return [];
      }
    }

    _saveQueue(q) {
      try {
        localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(q));
      } catch (e) {
        console.warn('[TelemetryClient] Error guardando cola en localStorage:', e);
      }
    }

    enqueue(payload) {
      const q = this.getQueue();
      q.push({
        id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        payload: payload,
        timestamp: new Date().toISOString(),
        intentos: 0
      });
      this._saveQueue(q);
      console.log(`[TelemetryClient] Telemetría encolada offline. Pendientes: ${q.length}`);
    }

    normalizePayload(data) {
      const now = new Date();
      const payload = {
        estudiante: "Valeria Castillo",
        fecha: data.fecha || now.toISOString(),
        fechaFormato: data.fechaFormato || now.toLocaleString('es-PE'),
        modo: data.modo || 'GENERAL',
        simulacro: data.simulacro || 'Simulacro UNI',
        puntaje: parseFloat(Number(data.puntaje || 0).toFixed(3)),
        nota20: parseFloat(Number(data.nota20 || 0).toFixed(2)),
        nota: parseFloat(Number(data.nota20 || 0).toFixed(2)), // retrocompatibilidad con dashboard
        correctas: Number(data.correctas) || 0,
        incorrectas: Number(data.incorrectas) || 0,
        blancas: Number(data.blancas) || 0,
        total: Number(data.total) || 0,
        desglose: data.desglose || {}
      };
      return payload;
    }

    saveLocalHistory(payload) {
      try {
        const hist = JSON.parse(localStorage.getItem(STORAGE_KEY_HIST) || '[]');
        hist.push(payload);
        localStorage.setItem(STORAGE_KEY_HIST, JSON.stringify(hist));
      } catch (e) {
        console.warn('[TelemetryClient] Error guardando historial local:', e);
      }
    }

    async send(rawPayload) {
      const payload = this.normalizePayload(rawPayload);
      this.saveLocalHistory(payload);

      if (!breaker.canAttempt()) {
        console.warn('[TelemetryClient] Circuito ABIERTO. Saltando envío de red y encolando.');
        this.enqueue(payload);
        return { success: false, queued: true, circuit: 'OPEN' };
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timer);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = await res.json().catch(() => ({}));
        breaker.recordSuccess();
        console.log('[TelemetryClient] Telemetría enviada con éxito a Docker n8n:', data);

        // Si se envió con éxito, intentar vaciar la cola pendiente
        this.flushQueue();

        return { success: true, queued: false, data };
      } catch (err) {
        clearTimeout(timer);
        breaker.recordFailure();
        console.warn(`[TelemetryClient] Fallo de envío (${err.name === 'AbortError' ? 'Timeout 3.5s' : err.message}). Encolando para reintento.`);
        this.enqueue(payload);
        return { success: false, queued: true, error: err.message };
      }
    }

    async flushQueue() {
      const q = this.getQueue();
      if (!q.length) return;
      if (!breaker.canAttempt()) {
        console.warn('[TelemetryClient] No se puede vaciar cola: Circuito ABIERTO.');
        return;
      }

      console.log(`[TelemetryClient] Procesando ${q.length} elementos pendientes en cola...`);
      const remaining = [];

      for (let item of q) {
        if (!breaker.canAttempt()) {
          remaining.push(item);
          continue;
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
          item.intentos = (item.intentos || 0) + 1;
          const res = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.payload),
            signal: controller.signal
          });
          clearTimeout(timer);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          breaker.recordSuccess();
          console.log(`[TelemetryClient] Elemento reintentado y sincronizado exitosamente: ${item.id}`);
        } catch (err) {
          clearTimeout(timer);
          breaker.recordFailure();
          remaining.push(item);
          console.warn(`[TelemetryClient] Reintento fallido para ${item.id} (${err.message}). Se mantendrá en cola.`);
        }
      }

      this._saveQueue(remaining);
    }
  }

  // Instancia SSOT global
  window.ValeriaTelemetry = new TelemetryClient();

  // Intentar sincronizar cola al iniciar si hay red
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      if (navigator.onLine) {
        window.ValeriaTelemetry.flushQueue();
      }
    }, 2000);
  }
})(typeof window !== 'undefined' ? window : globalThis);
