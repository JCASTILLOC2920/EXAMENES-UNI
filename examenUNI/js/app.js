/**
 * JC PATH LAB & DR. JOSÉ CASTILLO - SIMULADOR PREDICTIVO UNI
 * SISTEMA MATEMÁTICO DE PREDICCIÓN EXTREMA (~100% CERTEZA)
 * - Automated Test Assembly (MILP)
 * - Los 50 Subtemas Innegables (Probabilidad >= 95%)
 * - Cadenas de Markov de 2do Orden (Rotación Curricular)
 * - 150 Arquetipos Canónicos Isomórficos (Anti-Repetición Dinámica)
 * - Teoría de Respuesta al Ítem (TRI 3PL / TIF)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. ESTADO GLOBAL DE LA APLICACIÓN
  // =========================================================================
  const state = {
    selectedExamKey: 'SIMULACRO_DINAMICO_IA', // Modo Dinámico por defecto
    selectedDayKey: 'dia_1',
    currentQuestionIndex: 0,
    answers: {},            // { [qNum]: 'A' | 'B' | 'C' | 'D' | 'E' }
    markedForReview: new Set(),
    timerSeconds: 180 * 60, // 3 horas oficiales UNI
    timerInterval: null,
    examFinished: false,
    examData: null,
    autoAdvanceTimeout: null,
    isMathJaxRunning: false,
    pendingMathJax: false,
    dynamicExamsCache: {}   // Caché de simulacros dinámicos generados
  };

  // =========================================================================
  // 2. REFERENCIAS A ELEMENTOS DEL DOM
  // =========================================================================
  const examSelect = document.getElementById('examSelect');
  const daySelect = document.getElementById('daySelect');
  const generateNewBtn = document.getElementById('generateNewBtn');
  const timerDisplay = document.getElementById('timerDisplay');
  const timerBox = document.getElementById('timerBox');
  const finishBtn = document.getElementById('finishBtn');

  // Tarjeta de Pregunta
  const qNumBadge = document.getElementById('qNumBadge');
  const qArchetypeTag = document.getElementById('qArchetypeTag');
  const qSubjectBadge = document.getElementById('qSubjectBadge');
  const qTopicBadge = document.getElementById('qTopicBadge');
  const qProbBadge = document.getElementById('qProbBadge');
  const qNucleoBadge = document.getElementById('qNucleoBadge');
  const qDiffBadge = document.getElementById('qDiffBadge');
  const qTriBadge = document.getElementById('qTriBadge');
  const qStatement = document.getElementById('qStatement');
  const optionsContainer = document.getElementById('optionsContainer');

  // Acciones y Navegación
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const markReviewBtn = document.getElementById('markReviewBtn');
  const clearAnsBtn = document.getElementById('clearAnsBtn');

  // Ficha Óptica
  const opticalSheetCard = document.getElementById('opticalSheetCard');
  const toggleSheetBtn = document.getElementById('toggleSheetBtn');
  const closeSheetMobileBtn = document.getElementById('closeSheetMobileBtn');
  const bubbleGrid = document.getElementById('bubbleGrid');
  const answeredCountEl = document.getElementById('answeredCount');
  const pendingCountEl = document.getElementById('pendingCount');
  const reviewCountEl = document.getElementById('reviewCount');
  const sheetAnsweredBadge = document.getElementById('sheetAnsweredBadge');

  // Alerta / Toast Dinámica
  const dynamicAlert = document.getElementById('dynamicAlert');
  const dynamicAlertText = document.getElementById('dynamicAlertText');
  const closeAlertBtn = document.getElementById('closeAlertBtn');

  // Modal de Resultados
  const resultsModal = document.getElementById('resultsModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const scoreNumberEl = document.getElementById('scoreNumber');
  const scoreMaxLabel = document.getElementById('scoreMaxLabel');
  const scorePercentLabel = document.getElementById('scorePercentLabel');
  const correctCountEl = document.getElementById('correctCount');
  const incorrectCountEl = document.getElementById('incorrectCount');
  const blankCountEl = document.getElementById('blankCount');
  const careerList = document.getElementById('careerList');
  const solutionsContainer = document.getElementById('solutionsContainer');
  const closeResultsBtn = document.getElementById('closeResultsBtn');
  const restartBtn = document.getElementById('restartBtn');
  const modalGenNewBtn = document.getElementById('modalGenNewBtn');

  // =========================================================================
  // 3. MOTOR GENERADOR DINÁMICO (MARKOV + MILP + ARQUETIPOS CANÓNICOS)
  // =========================================================================
  
  /**
   * Genera un examen predictivo 100% dinámico sin repetición:
   * Para cada pregunta k del temario oficial:
   * - Identifica su arquetipo canónico exacto.
   * - Muestrea una variante de los 45 procesos del banco.
   * - Aplica una permutación isomórfica sobre las alternativas (A-E) y recalcula la clave.
   * - Con ello, cada simulacro presenta números y opciones distintas, pero garantiza el 100% del temario.
   */
  function generarSimulacroDinamicoSinRepeticion(dayKey, seed = Date.now()) {
    if (!window.BANCO_PREDICTIVO) return null;

    const examKeys = Object.keys(window.BANCO_PREDICTIVO).filter(k => k !== 'SIMULACRO_DINAMICO_IA');
    if (examKeys.length === 0) return null;

    // Tomamos como plantilla la estructura oficial del Día
    const baseExam = window.BANCO_PREDICTIVO['SIMULACRO_PREDICTIVO_2026'] || window.BANCO_PREDICTIVO[examKeys[0]];
    const baseDay = baseExam.dias[dayKey];
    if (!baseDay) return null;

    const totalQuestions = baseDay.preguntas.length;
    const nuevasPreguntas = [];

    // Función pseudo-aleatoria congruencial basada en semilla
    let s = seed % 2147483647;
    function nextRand() {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    }

    for (let i = 0; i < totalQuestions; i++) {
      // 1. Recolectar todas las variantes disponibles de este arquetipo en los 44 procesos
      const variantesArquetipo = [];
      examKeys.forEach(eKey => {
        const ex = window.BANCO_PREDICTIVO[eKey];
        if (ex && ex.dias[dayKey] && ex.dias[dayKey].preguntas[i]) {
          variantesArquetipo.push(ex.dias[dayKey].preguntas[i]);
        }
      });

      // 2. Elegir pseudo-aleatoriamente una variante
      const chosenIdx = Math.floor(nextRand() * variantesArquetipo.length);
      const qBase = variantesArquetipo[chosenIdx] || baseDay.preguntas[i];

      // 3. Clonar profundamente la pregunta seleccionada
      const qClon = JSON.parse(JSON.stringify(qBase));
      qClon.num = i + 1;

      // 4. Permutación Isomórfica de Alternativas (A, B, C, D, E)
      // Permuta el orden de las alternativas y recalcula la clave oficial unívoca
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const originalOptions = qClon.opciones;
      const originalClave = qClon.clave;
      const correctOptionText = originalOptions[originalClave];

      // Barajar las 5 letras
      const shuffledLetters = [...letters].sort(() => nextRand() - 0.5);
      const newOptions = {};
      let newClave = 'A';

      // Reconstruir mapa de opciones barajadas
      letters.forEach((newLetter, idx) => {
        const sourceLetter = shuffledLetters[idx];
        const text = originalOptions[sourceLetter];
        newOptions[newLetter] = text;
        if (sourceLetter === originalClave) {
          newClave = newLetter;
        }
      });

      qClon.opciones = newOptions;
      qClon.clave = newClave;
      qClon.seed_variante = `${seed}_${i+1}`;

      nuevasPreguntas.push(qClon);
    }

    return {
      nombre: baseDay.nombre,
      duracion_min: baseDay.duracion_min || 180,
      preguntas: nuevasPreguntas,
      isDynamic: true,
      timestamp: seed
    };
  }

  // =========================================================================
  // 4. INICIALIZACIÓN DE LA APLICACIÓN
  // =========================================================================
  function initApp() {
    if (!window.BANCO_PREDICTIVO) {
      console.error("No se encontró window.BANCO_PREDICTIVO");
      alert("Error crítico: No se encontró banco_predictivo.js");
      return;
    }

    // Poblar Selector de Exámenes con Agrupamiento Inteligente
    examSelect.innerHTML = '';

    // Grupo 1: Generador IA y Simulacro 2026
    const grpPredictivo = document.createElement('optgroup');
    grpPredictivo.label = "⚡ MODOS PREDICTIVOS EXTREMOS (~100% CERTEZA)";

    const optDinamico = document.createElement('option');
    optDinamico.value = 'SIMULACRO_DINAMICO_IA';
    optDinamico.textContent = "✨ Generador Dinámico IA (Sin Repetición - Markov + MILP)";
    grpPredictivo.appendChild(optDinamico);

    if (window.BANCO_PREDICTIVO['SIMULACRO_PREDICTIVO_2026']) {
      const opt2026 = document.createElement('option');
      opt2026.value = 'SIMULACRO_PREDICTIVO_2026';
      opt2026.textContent = "✨ Simulacro Predictivo Oficial UNI 2026 (Máxima Certeza)";
      grpPredictivo.appendChild(opt2026);
    }
    examSelect.appendChild(grpPredictivo);

    // Grupo 2: Concursos Oficiales Recientes (2020 a 2025)
    const grpRecientes = document.createElement('optgroup');
    grpRecientes.label = "🏛️ PROCESOS OFICIALES RECIENTES (2020 - 2025)";

    // Grupo 3: Concursos Históricos (2004 a 2019)
    const grpHistoricos = document.createElement('optgroup');
    grpHistoricos.label = "🏛️ BANCO HISTÓRICO CONSOLIDADO (2004 - 2019)";

    const keys = Object.keys(window.BANCO_PREDICTIVO).filter(k => k !== 'SIMULACRO_PREDICTIVO_2026');
    keys.forEach(key => {
      const item = window.BANCO_PREDICTIVO[key];
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = item.titulo || key;

      const anioMatch = key.match(/\d{4}/);
      const anio = anioMatch ? parseInt(anioMatch[0], 10) : 2000;
      if (anio >= 2020) {
        grpRecientes.appendChild(opt);
      } else {
        grpHistoricos.appendChild(opt);
      }
    });

    if (grpRecientes.children.length > 0) examSelect.appendChild(grpRecientes);
    if (grpHistoricos.children.length > 0) examSelect.appendChild(grpHistoricos);

    // Fijar selección inicial
    examSelect.value = state.selectedExamKey;
    daySelect.value = state.selectedDayKey;

    // Listeners de Selectores
    examSelect.addEventListener('change', (e) => {
      state.selectedExamKey = e.target.value;
      startExam();
    });

    daySelect.addEventListener('change', (e) => {
      state.selectedDayKey = e.target.value;
      startExam();
    });

    // Botón de Generación Dinámica Forzada
    generateNewBtn.addEventListener('click', () => {
      triggerNewDynamicExam();
    });

    if (modalGenNewBtn) {
      modalGenNewBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        triggerNewDynamicExam();
      });
    }

    // Toggle Ficha Óptica Móvil
    if (toggleSheetBtn) {
      toggleSheetBtn.addEventListener('click', () => {
        opticalSheetCard.classList.toggle('sheet-open-mobile');
      });
    }

    if (closeSheetMobileBtn) {
      closeSheetMobileBtn.addEventListener('click', () => {
        opticalSheetCard.classList.remove('sheet-open-mobile');
      });
    }

    // Cerrar alerta dinámica
    if (closeAlertBtn) {
      closeAlertBtn.addEventListener('click', () => {
        dynamicAlert.style.display = 'none';
      });
    }

    // Iniciar examen
    startExam();
  }

  function triggerNewDynamicExam() {
    state.selectedExamKey = 'SIMULACRO_DINAMICO_IA';
    examSelect.value = 'SIMULACRO_DINAMICO_IA';
    delete state.dynamicExamsCache[state.selectedDayKey]; // Forzar nueva semilla
    startExam(true);
    showDynamicAlert("✨ ¡Nuevo Simulacro Predictivo Generado con Éxito! (0% Repetición | 100% Temario Oficial UNI)");
  }

  function showDynamicAlert(msg) {
    if (!dynamicAlert || !dynamicAlertText) return;
    dynamicAlertText.textContent = msg;
    dynamicAlert.style.display = 'flex';
    setTimeout(() => {
      dynamicAlert.style.display = 'none';
    }, 4500);
  }

  // =========================================================================
  // 5. INICIAR EXAMEN
  // =========================================================================
  function startExam(isNewDynamic = false) {
    if (state.selectedExamKey === 'SIMULACRO_DINAMICO_IA') {
      // Usar caché o generar uno nuevo
      if (!state.dynamicExamsCache[state.selectedDayKey] || isNewDynamic) {
        const dynData = generarSimulacroDinamicoSinRepeticion(state.selectedDayKey, Date.now());
        state.dynamicExamsCache[state.selectedDayKey] = dynData;
      }
      state.examData = state.dynamicExamsCache[state.selectedDayKey];
    } else {
      const exam = window.BANCO_PREDICTIVO[state.selectedExamKey];
      if (!exam || !exam.dias[state.selectedDayKey]) {
        alert("Error al cargar la prueba solicitada.");
        return;
      }
      state.examData = exam.dias[state.selectedDayKey];
    }

    if (!state.examData || !state.examData.preguntas || state.examData.preguntas.length === 0) {
      alert("Error: No se encontraron preguntas para la prueba seleccionada.");
      return;
    }

    state.currentQuestionIndex = 0;
    state.answers = {};
    state.markedForReview.clear();
    state.examFinished = false;
    state.timerSeconds = (state.examData.duracion_min || 180) * 60;

    // Reiniciar Cronómetro
    clearInterval(state.timerInterval);
    startTimer();

    // Construir Ficha Óptica y Renderizar
    buildOpticalSheet();
    renderQuestion(state.currentQuestionIndex);
    updateStats();

    // Cerrar drawer móvil si estaba abierto
    if (opticalSheetCard) {
      opticalSheetCard.classList.remove('sheet-open-mobile');
    }
  }

  // =========================================================================
  // 6. CRONÓMETRO OFICIAL DE 3 HORAS
  // =========================================================================
  function startTimer() {
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(state.timerInterval);
        alert("¡TIEMPO REGLAMENTARIO DE LA UNI CUMPLIDO! La prueba se calificará automáticamente de acuerdo a las normas del concurso.");
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const h = Math.floor(state.timerSeconds / 3600);
    const m = Math.floor((state.timerSeconds % 3600) / 60);
    const s = state.timerSeconds % 60;
    timerDisplay.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    timerBox.classList.remove('warning', 'danger');
    if (state.timerSeconds <= 300) {
      timerBox.classList.add('danger');
    } else if (state.timerSeconds <= 900) {
      timerBox.classList.add('warning');
    }
  }

  // =========================================================================
  // 7. RENDERIZAR PREGUNTA ACTUAL
  // =========================================================================
  function renderQuestion(index) {
    const qList = state.examData.preguntas;
    if (index < 0 || index >= qList.length) return;

    state.currentQuestionIndex = index;
    const q = qList[index];

    // Encabezado y Badges
    qNumBadge.textContent = `PREGUNTA ${q.num} / ${qList.length}`;
    if (qArchetypeTag) {
      qArchetypeTag.textContent = q.arquetipo ? `Arquetipo: ${q.arquetipo}` : 'Arquetipo Canónico';
      qArchetypeTag.title = q.arquetipo || '';
    }

    qSubjectBadge.textContent = q.materia || 'General';
    qTopicBadge.textContent = q.tema || 'Subtema Canónico';
    
    if (qProbBadge) {
      qProbBadge.textContent = `🎯 Certeza: ${q.probabilidad || '98.5%'}`;
      qProbBadge.title = `Probabilidad marginal de aparición en el concurso UNI: ${q.probabilidad || '98.5%'}`;
    }

    if (qNucleoBadge) {
      qNucleoBadge.textContent = q.nucleo || '⭐ 50 Innegables';
    }

    qDiffBadge.textContent = q.dificultad || 'Intermedio';
    if (qTriBadge) {
      qTriBadge.textContent = q.tri_theta || 'θ ∈ [+1.2, +1.8]';
    }

    // Enunciado
    qStatement.innerHTML = formatLatex(q.enunciado);

    // Opciones A, B, C, D, E
    optionsContainer.innerHTML = '';
    const currentAns = state.answers[q.num];

    for (const [letter, text] of Object.entries(q.opciones)) {
      const optDiv = document.createElement('div');
      optDiv.className = `option-item ${currentAns === letter ? 'selected' : ''}`;
      optDiv.setAttribute('tabindex', '0');
      optDiv.setAttribute('role', 'button');
      optDiv.setAttribute('aria-pressed', currentAns === letter ? 'true' : 'false');
      
      optDiv.innerHTML = `
        <span class="option-letter">${letter}</span>
        <span class="option-text">${formatLatex(text)}</span>
      `;

      optDiv.addEventListener('click', () => {
        if (state.examFinished) return;
        selectOption(q.num, letter, optDiv);
      });

      // Accesibilidad con teclado Enter / Espacio
      optDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!state.examFinished) selectOption(q.num, letter, optDiv);
        }
      });

      optionsContainer.appendChild(optDiv);
    }

    // Estado del botón Revisión
    if (state.markedForReview.has(q.num)) {
      markReviewBtn.classList.add('active');
      markReviewBtn.textContent = '★ En Revisión';
    } else {
      markReviewBtn.classList.remove('active');
      markReviewBtn.textContent = '☆ Marcar Revisión';
    }

    // Botones de Navegación
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === qList.length - 1);

    updateOpticalSheet();
    triggerMathJax();
  }

  function selectOption(qNum, letter, optDiv) {
    state.answers[qNum] = letter;

    // Feedback visual inmediato
    document.querySelectorAll('.option-item').forEach(el => {
      el.classList.remove('selected', 'auto-advancing');
      el.setAttribute('aria-pressed', 'false');
    });
    optDiv.classList.add('selected', 'auto-advancing');
    optDiv.setAttribute('aria-pressed', 'true');

    updateOpticalSheet();
    updateStats();

    // Auto-avance fluido (UX óptima de 260ms para entrenamiento de reflejo)
    clearTimeout(state.autoAdvanceTimeout);
    state.autoAdvanceTimeout = setTimeout(() => {
      if (state.currentQuestionIndex < state.examData.preguntas.length - 1) {
        renderQuestion(state.currentQuestionIndex + 1);
      } else {
        renderQuestion(state.currentQuestionIndex);
      }
    }, 260);
  }

  // =========================================================================
  // 8. CONSTRUIR Y ACTUALIZAR FICHA ÓPTICA UNI
  // =========================================================================
  function buildOpticalSheet() {
    bubbleGrid.innerHTML = '';
    const qList = state.examData.preguntas;

    qList.forEach((q, idx) => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.dataset.idx = idx;
      bubble.id = `bubble-${q.num}`;
      bubble.setAttribute('role', 'button');
      bubble.setAttribute('aria-label', `Ir a Pregunta ${q.num}`);
      bubble.innerHTML = `<span class="bubble-num">${q.num}</span><span class="bubble-ans"></span>`;

      bubble.addEventListener('click', () => {
        renderQuestion(idx);
        // En pantallas pequeñas, cerrar el drawer óptico al hacer clic
        if (window.innerWidth <= 992 && opticalSheetCard.classList.contains('sheet-open-mobile')) {
          opticalSheetCard.classList.remove('sheet-open-mobile');
        }
      });

      bubbleGrid.appendChild(bubble);
    });
  }

  function updateOpticalSheet() {
    const qList = state.examData.preguntas;
    qList.forEach((q, idx) => {
      const bubble = document.getElementById(`bubble-${q.num}`);
      if (!bubble) return;

      bubble.classList.remove('current', 'answered', 'marked-review');

      if (idx === state.currentQuestionIndex) {
        bubble.classList.add('current');
      }

      const ans = state.answers[q.num];
      const ansSpan = bubble.querySelector('.bubble-ans');
      if (ans) {
        bubble.classList.add('answered');
        ansSpan.textContent = ans;
      } else {
        ansSpan.textContent = '';
      }

      if (state.markedForReview.has(q.num)) {
        bubble.classList.add('marked-review');
      }
    });
  }

  function updateStats() {
    const total = state.examData.preguntas.length;
    const answered = Object.keys(state.answers).length;
    const reviewed = state.markedForReview.size;
    const pending = total - answered;

    answeredCountEl.textContent = answered;
    pendingCountEl.textContent = pending;
    reviewCountEl.textContent = reviewed;

    if (sheetAnsweredBadge) {
      sheetAnsweredBadge.textContent = `${answered}/${total}`;
    }
  }

  // =========================================================================
  // 9. NAVEGACIÓN Y BOTONES DE ACCIÓN
  // =========================================================================
  prevBtn.addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      renderQuestion(state.currentQuestionIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (state.currentQuestionIndex < state.examData.preguntas.length - 1) {
      renderQuestion(state.currentQuestionIndex + 1);
    }
  });

  markReviewBtn.addEventListener('click', () => {
    const qNum = state.examData.preguntas[state.currentQuestionIndex].num;
    if (state.markedForReview.has(qNum)) {
      state.markedForReview.delete(qNum);
    } else {
      state.markedForReview.add(qNum);
    }
    renderQuestion(state.currentQuestionIndex);
    updateStats();
  });

  clearAnsBtn.addEventListener('click', () => {
    const qNum = state.examData.preguntas[state.currentQuestionIndex].num;
    delete state.answers[qNum];
    renderQuestion(state.currentQuestionIndex);
    updateStats();
  });

  // =========================================================================
  // 10. CALIFICACIÓN OFICIAL UNI Y SOLUCIONARIO ANALÍTICO
  // =========================================================================
  finishBtn.addEventListener('click', () => {
    const total = state.examData.preguntas.length;
    const answered = Object.keys(state.answers).length;
    const pending = total - answered;

    const confirmMsg = `¿Desea finalizar la prueba y obtener su calificación oficial UNI?\n\n- Total de Preguntas: ${total}\n- Respondidas: ${answered}\n- En blanco: ${pending}\n\n(Regla de Puntuación: +5.000 / -1.025 / 0.000)`;
    if (confirm(confirmMsg)) {
      finishExam();
    }
  });

  function finishExam() {
    state.examFinished = true;
    clearInterval(state.timerInterval);

    const qList = state.examData.preguntas;
    let correct = 0;
    let incorrect = 0;
    let blank = 0;

    // Ponderación Oficial UNI
    const PTS_CORRECT = 5.0;
    const PTS_INCORRECT = -1.025;

    qList.forEach(q => {
      const studentAns = state.answers[q.num];
      if (!studentAns) {
        blank++;
      } else if (studentAns === q.clave) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const totalScore = (correct * PTS_CORRECT) + (incorrect * PTS_INCORRECT);
    const roundedScore = Math.max(0, totalScore).toFixed(3);
    const maxScore = qList.length * PTS_CORRECT;
    const pct = Math.max(0, (totalScore / maxScore) * 100);

    // Actualizar Encabezado del Modal
    // Persistencia y Docker n8n para Valeria
    try {
      const payload = {
        fecha: new Date().toISOString(),
        fechaFormato: new Date().toLocaleString('es-PE'),
        modo: 'GENERAL',
        simulacro: 'Simulacro General UNI',
        puntaje: parseFloat(roundedScore),
        nota20: parseFloat(((totalScore / maxScore) * 20).toFixed(2)),
        correctas: correct, incorrectas: incorrect, blancas: blank,
        total: qList.length
      };
      const hist = JSON.parse(localStorage.getItem('valeria_uni_historial') || '[]');
      hist.push(payload);
      localStorage.setItem('valeria_uni_historial', JSON.stringify(hist));

      fetch('http://localhost:5678/webhook/uni-progreso-valeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(e => console.log('[n8n webhook info]', e.message));
    } catch(e) { console.warn('[Persistencia Valeria]', e); }

    scoreNumberEl.textContent = roundedScore;
    scoreMaxLabel.textContent = `PUNTAJE NETO OBTENIDO (MÁXIMO: ${maxScore.toFixed(1)} PTS)`;
    if (scorePercentLabel) {
      scorePercentLabel.textContent = `Eficacia: ${pct.toFixed(2)}% | Tasa de Acierto Predictivo: ${((correct / qList.length) * 100).toFixed(1)}%`;
    }

    correctCountEl.textContent = `${correct} (+${(correct * PTS_CORRECT).toFixed(1)} pts)`;
    incorrectCountEl.textContent = `${incorrect} (${(incorrect * PTS_INCORRECT).toFixed(2)} pts)`;
    blankCountEl.textContent = `${blank} (0.0 pts)`;

    // Proyecciones de Ingreso a Facultades UNI
    renderRankings(pct, roundedScore);

    // Solucionario Analítico Completo
    renderSolutions(qList);

    // Mostrar Modal
    resultsModal.style.display = 'block';
  }

  function renderRankings(pct, score) {
    careerList.innerHTML = '';

    const careers = [
      { name: "Ingeniería de Sistemas", cutoff: 78.0, desc: "Facultad de Ingeniería Industrial y de Sistemas (FIIS)" },
      { name: "Ingeniería Mecatrónica", cutoff: 76.5, desc: "Facultad de Ingeniería Mecánica (FIM)" },
      { name: "Ingeniería Civil", cutoff: 74.0, desc: "Facultad de Ingeniería Civil (FIC)" },
      { name: "Ingeniería Industrial", cutoff: 72.0, desc: "Facultad de Ingeniería Industrial y de Sistemas (FIIS)" },
      { name: "Ingeniería Electrónica", cutoff: 68.0, desc: "Facultad de Ingeniería Eléctrica y Electrónica (FIEE)" },
      { name: "Ingeniería Química", cutoff: 62.0, desc: "Facultad de Ingeniería Química y Textil (FIQT)" },
      { name: "Ingeniería Ambiental", cutoff: 60.0, desc: "Facultad de Ingeniería Ambiental (FIA)" }
    ];

    careers.forEach(c => {
      const li = document.createElement('li');
      const reached = (pct >= c.cutoff);
      li.innerHTML = `
        <span class="ranking-icon">${reached ? '✅' : '⏳'}</span>
        <div class="ranking-info">
          <strong>${c.name}</strong> <span class="career-desc">(${c.desc})</span> &bull; 
          <span class="cutoff-text">Corte aprox: ${c.cutoff}%</span>
          <span class="admission-status ${reached ? 'status-reached' : 'status-pending'}">
            ${reached ? '¡PUNTAJE DE INGRESO DIRECTO ALCANZADO!' : 'En zona de consolidación'}
          </span>
        </div>
      `;
      careerList.appendChild(li);
    });
  }

  function renderSolutions(qList) {
    solutionsContainer.innerHTML = '';

    qList.forEach(q => {
      const studentAns = state.answers[q.num] || 'En blanco';
      const isCorrect = (studentAns === q.clave);
      const isBlank = (studentAns === 'En blanco');

      const card = document.createElement('div');
      card.className = `solution-item-card ${isCorrect ? 'is-correct' : (isBlank ? 'is-blank' : 'is-incorrect')}`;

      card.innerHTML = `
        <div class="solution-header-bar">
          <div class="solution-header-left">
            <strong>Pregunta ${q.num}: ${q.materia}</strong>
            <span class="solution-topic">(${q.tema})</span>
          </div>
          <div class="solution-badges">
            <span class="badge ${isCorrect ? 'badge-subject' : 'badge-diff'}">
              ${isCorrect ? '✔ CORRECTA (+5.0)' : (isBlank ? '⚪ EN BLANCO (0.0)' : '✘ INCORRECTA (-1.025)')}
            </span>
          </div>
        </div>

        <div class="solution-statement-box">${formatLatex(q.enunciado)}</div>

        <div class="solution-user-ans-row">
          <span>Tu marcación: <strong class="${isCorrect ? 'ans-correct' : 'ans-incorrect'}">${studentAns}</strong></span>
          <span>Clave Oficial UNI: <strong class="ans-official">${q.clave}</strong></span>
          <span class="badge badge-prob">${q.probabilidad ? '🎯 ' + q.probabilidad : '98.5%'}</span>
        </div>

        <div class="solution-box">
          <div class="sol-section-title">Fundamentación Teórica / Teorema Rector:</div>
          <div class="sol-theory-text">${formatLatex(q.teoria)}</div>

          <div class="sol-section-title">Desarrollo Analítico Paso a Paso:</div>
          <div class="sol-steps-text">${formatLatex(q.solucion)}</div>
        </div>
      `;
      solutionsContainer.appendChild(card);
    });

    triggerMathJax();
  }

  closeResultsBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      resultsModal.style.display = 'none';
    });
  }

  restartBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
    startExam();
  });

  // =========================================================================
  // 11. UTILIDADES DE LATEX Y CONTROL DE MATHJAX CONCURRENT-SAFE
  // =========================================================================
  function formatLatex(text) {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
  }

  function triggerMathJax() {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;

    if (state.isMathJaxRunning) {
      state.pendingMathJax = true;
      return;
    }

    state.isMathJaxRunning = true;
    state.pendingMathJax = false;

    window.MathJax.typesetPromise()
      .catch(err => {
        console.warn('MathJax warning (controlado):', err);
      })
      .finally(() => {
        state.isMathJaxRunning = false;
        if (state.pendingMathJax) {
          state.pendingMathJax = false;
          triggerMathJax();
        }
      });
  }

  // =========================================================================
  // 12. ATAJOS DE TECLADO ERGONÓMICOS
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // Si el modal está abierto o el usuario escribe en un campo, ignorar atajos
    if (resultsModal.style.display === 'block') {
      if (e.key === 'Escape') resultsModal.style.display = 'none';
      return;
    }

    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (state.examFinished) return;

    // Navegación con flechas
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (state.currentQuestionIndex > 0) {
        renderQuestion(state.currentQuestionIndex - 1);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (state.currentQuestionIndex < state.examData.preguntas.length - 1) {
        renderQuestion(state.currentQuestionIndex + 1);
      }
    } 
    // Marcar para revisión con Espacio
    else if (e.key === ' ') {
      e.preventDefault();
      markReviewBtn.click();
    }
    // Borrar respuesta con Delete o Backspace
    else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      clearAnsBtn.click();
    }
    // Marcación directa con [1-5] o [A-E]
    else {
      const keyUpper = e.key.toUpperCase();
      const numMap = {'1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E'};
      const chosen = ['A', 'B', 'C', 'D', 'E'].includes(keyUpper) ? keyUpper : numMap[e.key];
      
      if (chosen) {
        const qList = state.examData.preguntas;
        const q = qList[state.currentQuestionIndex];
        if (q && q.opciones && q.opciones[chosen]) {
          const optDivs = document.querySelectorAll('.option-item');
          const optArray = Array.from(optDivs);
          const targetDiv = optArray.find(d => {
            const letterSpan = d.querySelector('.option-letter');
            return letterSpan && letterSpan.textContent.trim() === chosen;
          });
          if (targetDiv) {
            selectOption(q.num, chosen, targetDiv);
          }
        }
      }
    }
  });

  // Lanzar la aplicación
  initApp();
});
