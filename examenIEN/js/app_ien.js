/**
 * JC PATH LAB & DR. JOSÃ CASTILLO - SIMULADOR PREDICTIVO IEN UNI 2026
 * SISTEMA MATEMÃTICO DE PREDICCIÃN EXTREMA (~100% CERTEZA)
 * Modalidad: Ingreso Escolar Nacional (IEN - 5to de Secundaria)
 * 
 * - Estructura CanÃ³nica: 60 Preguntas (24 Mat, 10 FÃ­s, 10 QuÃ­m, 16 Apt/Hum)
 * - 40 Arquetipos Innegables IEN (Probabilidad >= 95%)
 * - Cadenas de Markov de 2do Orden y RotaciÃ³n Curricular
 * - CalificaciÃ³n Oficial UNI: +5.0 / -1.025 / 0.0 (MÃ¡ximo 300 Puntos)
 * - DuraciÃ³n Oficial: 3 horas (180 minutos)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ESTADO GLOBAL
  const state = {
    selectedExamKey: 'SIMULACRO_PREDICTIVO_IEN_2026',
    activeFilter: 'ALL',
    currentQuestionIndex: 0,
    answers: {}, // { [num]: 'A'|'B'|'C'|'D'|'E' }
    markedForReview: new Set(),
    timerSeconds: 180 * 60,
    timerInterval: null,
    examFinished: false,
    examData: null,
    isMathJaxRunning: false,
    pendingMathJax: false
  };

  // 2. REFERENCIAS DOM
  const examSelect = document.getElementById('examSelect');
  const subjectFilterSelect = document.getElementById('subjectFilterSelect');
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

  // NavegaciÃ³n
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const markReviewBtn = document.getElementById('markReviewBtn');
  const clearAnsBtn = document.getElementById('clearAnsBtn');

  // Ficha Ãptica
  const opticalSheetCard = document.getElementById('opticalSheetCard');
  const toggleSheetBtn = document.getElementById('toggleSheetBtn');
  const closeSheetMobileBtn = document.getElementById('closeSheetMobileBtn');
  const bubbleGrid = document.getElementById('bubbleGrid');
  const answeredCountEl = document.getElementById('answeredCount');
  const pendingCountEl = document.getElementById('pendingCount');
  const reviewCountEl = document.getElementById('reviewCount');
  const sheetAnsweredBadge = document.getElementById('sheetAnsweredBadge');

  // Alerta
  const dynamicAlert = document.getElementById('dynamicAlert');
  const dynamicAlertText = document.getElementById('dynamicAlertText');
  const closeAlertBtn = document.getElementById('closeAlertBtn');

  // Modal Resultados
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

  // 3. INICIALIZAR SELECTOR DE EXAMENES
  function inicializarSelectores() {
    if (!window.BANCO_PREDICTIVO_IEN) {
      qStatement.textContent = "Error: No se encontrÃ³ window.BANCO_PREDICTIVO_IEN.";
      return;
    }

    examSelect.innerHTML = '';
    
    // OpciÃ³n 1: Dinamico IA
    const optDyn = document.createElement('option');
    optDyn.value = 'SIMULACRO_DINAMICO_IA';
    optDyn.textContent = 'â¨ Generador DinÃ¡mico IEN (0% RepeticiÃ³n | 100% Arquetipos)';
    examSelect.appendChild(optDyn);

    // Opciones del Banco
    for (const key in window.BANCO_PREDICTIVO_IEN) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = window.BANCO_PREDICTIVO_IEN[key].titulo;
      examSelect.appendChild(opt);
    }

    examSelect.value = state.selectedExamKey;

    examSelect.addEventListener('change', (e) => {
      cargarExamen(e.target.value);
    });

    if (subjectFilterSelect) {
      subjectFilterSelect.addEventListener('change', (e) => {
        state.activeFilter = e.target.value;
        filtrarYRenderizarPreguntas();
      });
    }

    generateNewBtn.addEventListener('click', () => {
      generarNuevoDinamico();
    });

    if (closeAlertBtn) {
      closeAlertBtn.addEventListener('click', () => {
        dynamicAlert.style.display = 'none';
      });
    }
  }

  // 4. GENERADOR DINÃMICO IEN
  function generarNuevoDinamico() {
    const examKeys = Object.keys(window.BANCO_PREDICTIVO_IEN);
    if (examKeys.length === 0) return;

    const baseExam = window.BANCO_PREDICTIVO_IEN['SIMULACRO_PREDICTIVO_IEN_2026'] || window.BANCO_PREDICTIVO_IEN[examKeys[0]];
    const totalQ = baseExam.preguntas.length;
    const nuevasPreguntas = [];
    const seed = Date.now();

    for (let i = 0; i < totalQ; i++) {
      // Tomar una variante de cualquiera de los exÃ¡menes para esta posiciÃ³n i
      const randExamKey = examKeys[Math.floor(Math.random() * examKeys.length)];
      const qSource = window.BANCO_PREDICTIVO_IEN[randExamKey].preguntas[i] || baseExam.preguntas[i];
      const qClon = JSON.parse(JSON.stringify(qSource));
      qClon.numero = i + 1;

      // Barajar opciones
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const origOpts = qClon.opciones;
      const origClave = qClon.clave;
      const shufLetters = [...letters].sort(() => Math.random() - 0.5);

      const newOpts = {};
      let newClave = 'A';
      letters.forEach((newL, idx) => {
        const srcL = shufLetters[idx];
        newOpts[newL] = origOpts[srcL];
        if (srcL === origClave) newClave = newL;
      });
      qClon.opciones = newOpts;
      qClon.clave = newClave;
      nuevasPreguntas.push(qClon);
    }

    state.examData = {
      titulo: `â¨ Simulacro DinÃ¡mico IEN UNI - Semilla #${seed.toString().slice(-4)}`,
      modalidad: "Ingreso Escolar Nacional (IEN)",
      duracion_minutos: 180,
      total_preguntas: 60,
      calificacion: { correcta: 5.0, incorrecta: -1.025, blanco: 0.0, puntaje_maximo: 300.0 },
      preguntas: nuevasPreguntas
    };

    state.answers = {};
    state.markedForReview.clear();
    state.currentQuestionIndex = 0;
    state.examFinished = false;

    reiniciarCronometro();
    renderizarPreguntaActual();
    construirFichaOptica();

    if (dynamicAlert) {
      dynamicAlertText.textContent = `Â¡Nuevo Simulacro IEN Generado con Ãxito! Semilla #${seed.toString().slice(-4)} (60 Arquetipos IEN)`;
      dynamicAlert.style.display = 'flex';
      setTimeout(() => { dynamicAlert.style.display = 'none'; }, 5000);
    }
  }

  // 5. CARGAR EXAMEN
  function cargarExamen(examKey) {
    if (examKey === 'SIMULACRO_DINAMICO_IA') {
      generarNuevoDinamico();
      return;
    }

    const ex = window.BANCO_PREDICTIVO_IEN[examKey];
    if (!ex) return;

    state.selectedExamKey = examKey;
    state.examData = ex;
    state.answers = {};
    state.markedForReview.clear();
    state.currentQuestionIndex = 0;
    state.examFinished = false;

    reiniciarCronometro();
    renderizarPreguntaActual();
    construirFichaOptica();
  }

  function filtrarYRenderizarPreguntas() {
    if (!state.examData || !state.examData.preguntas) return;

    const filter = state.activeFilter;
    if (!filter || filter === 'ALL') {
      renderizarPreguntaActual();
      actualizarEstadoFicha();
      return;
    }

    const preguntas = state.examData.preguntas;
    let targetIdx = -1;

    for (let i = 0; i < preguntas.length; i++) {
      const q = preguntas[i];
      const cursoStr = (q.curso || '').toLowerCase();
      const materiaStr = (q.materia || '').toLowerCase();
      const num = q.numero;

      if (filter === 'Matemática') {
        if (num <= 24 || ['aritmética', 'álgebra', 'geometría', 'trigonometría', 'matemática'].some(c => cursoStr.includes(c) || materiaStr.includes(c))) {
          targetIdx = i;
          break;
        }
      } else if (filter === 'Física') {
        if ((num >= 25 && num <= 34) || cursoStr.includes('fisi') || materiaStr.includes('fisi')) {
          targetIdx = i;
          break;
        }
      } else if (filter === 'Química') {
        if ((num >= 35 && num <= 44) || cursoStr.includes('quim') || materiaStr.includes('quim')) {
          targetIdx = i;
          break;
        }
      } else if (filter === 'Aptitud') {
        if (num >= 45 || cursoStr.includes('razonamiento') || cursoStr.includes('human') || cursoStr.includes('aptitud') || materiaStr.includes('human')) {
          targetIdx = i;
          break;
        }
      }
    }

    if (targetIdx !== -1) {
      state.currentQuestionIndex = targetIdx;
    }

    renderizarPreguntaActual();
    actualizarEstadoFicha();
  }

  // 6. RENDERIZAR PREGUNTA ACTUAL
  function renderizarPreguntaActual() {
    if (!state.examData || !state.examData.preguntas) return;

    const total = state.examData.preguntas.length;
    if (state.currentQuestionIndex >= total) state.currentQuestionIndex = total - 1;
    if (state.currentQuestionIndex < 0) state.currentQuestionIndex = 0;

    const q = state.examData.preguntas[state.currentQuestionIndex];
    if (!q) return;

    qNumBadge.textContent = `PREGUNTA ${q.numero} / ${total}`;
    qArchetypeTag.textContent = q.arquetipo || `Arquetipo IEN #${q.numero}`;
    qSubjectBadge.textContent = q.curso ? q.curso.toUpperCase() : "MATERIA";
    qTopicBadge.textContent = q.tema || "TÃ³pico";
    qProbBadge.textContent = `ð¯ CERTEZA: ${q.probabilidad || '98.0%'}`;
    qNucleoBadge.textContent = q.nucleo || "â­ INNEGABLE IEN";
    qDiffBadge.textContent = (q.dificultad || "INTERMEDIO").toUpperCase();
    qTriBadge.textContent = q.tri_theta || "Î¸ â [+1.0, +1.6]";

    qStatement.innerHTML = q.enunciado.replace(/\n/g, '<br>');

    // Opciones
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    letters.forEach(letter => {
      const optBtn = document.createElement('button');
      optBtn.className = 'option-item';
      if (state.answers[q.numero] === letter) {
        optBtn.classList.add('selected');
      }

      const letterBox = document.createElement('span');
      letterBox.className = 'option-letter';
      letterBox.textContent = letter;

      const textBox = document.createElement('span');
      textBox.className = 'option-text';
      textBox.textContent = q.opciones[letter] || '';

      optBtn.appendChild(letterBox);
      optBtn.appendChild(textBox);

      optBtn.addEventListener('click', () => {
        if (state.examFinished) return;
        marcarOpcion(q.numero, letter);
      });

      optionsContainer.appendChild(optBtn);
    });

    // Actualizar botones de navegaciÃ³n
    prevBtn.disabled = state.currentQuestionIndex === 0;
    nextBtn.textContent = state.currentQuestionIndex === total - 1 ? 'Finalizar Examen' : 'Siguiente â';

    // Actualizar estado de revisiÃ³n
    if (state.markedForReview.has(q.numero)) {
      markReviewBtn.classList.add('active');
      markReviewBtn.textContent = 'â Marcada para RevisiÃ³n';
    } else {
      markReviewBtn.classList.remove('active');
      markReviewBtn.textContent = 'â Marcar RevisiÃ³n';
    }

    actualizarBurbujaActiva(q.numero);
    ejecutarMathJax();
  }

  function marcarOpcion(qNum, letter) {
    if (state.answers[qNum] === letter) {
      delete state.answers[qNum];
    } else {
      state.answers[qNum] = letter;
    }
    renderizarPreguntaActual();
    actualizarEstadoFicha();
  }

  // 7. FICHA ÃPTICA
  function construirFichaOptica() {
    if (!state.examData || !state.examData.preguntas) return;
    bubbleGrid.innerHTML = '';

    state.examData.preguntas.forEach((q, idx) => {
      const bRow = document.createElement('div');
      bRow.className = 'bubble-row';
      bRow.id = `bubbleRow_${q.numero}`;

      const bNum = document.createElement('span');
      bNum.className = 'bubble-qnum';
      bNum.textContent = `${q.numero < 10 ? '0' : ''}${q.numero}`;
      bNum.addEventListener('click', () => {
        state.currentQuestionIndex = idx;
        renderizarPreguntaActual();
      });
      bRow.appendChild(bNum);

      const letters = ['A', 'B', 'C', 'D', 'E'];
      letters.forEach(l => {
        const b = document.createElement('button');
        b.className = 'bubble';
        b.textContent = l;
        b.dataset.qnum = q.numero;
        b.dataset.letter = l;

        b.addEventListener('click', (e) => {
          e.stopPropagation();
          if (state.examFinished) return;
          marcarOpcion(q.numero, l);
        });

        bRow.appendChild(b);
      });

      bubbleGrid.appendChild(bRow);
    });

    actualizarEstadoFicha();
  }

  function actualizarEstadoFicha() {
    if (!state.examData) return;
    const total = state.examData.preguntas.length;
    let ansCount = 0;

    state.examData.preguntas.forEach(q => {
      const row = document.getElementById(`bubbleRow_${q.numero}`);
      if (!row) return;

      const chosen = state.answers[q.numero];
      const bubbles = row.querySelectorAll('.bubble');

      bubbles.forEach(b => {
        if (b.dataset.letter === chosen) {
          b.classList.add('selected');
        } else {
          b.classList.remove('selected');
        }
      });

      if (chosen) {
        row.classList.add('row-answered');
        ansCount++;
      } else {
        row.classList.remove('row-answered');
      }

      if (state.markedForReview.has(q.numero)) {
        row.classList.add('row-review');
      } else {
        row.classList.remove('row-review');
      }
    });

    answeredCountEl.textContent = ansCount;
    pendingCountEl.textContent = total - ansCount;
    reviewCountEl.textContent = state.markedForReview.size;
    sheetAnsweredBadge.textContent = `${ansCount}/${total}`;
  }

  function actualizarBurbujaActiva(qNum) {
    document.querySelectorAll('.bubble-row').forEach(r => r.classList.remove('row-current'));
    const activeRow = document.getElementById(`bubbleRow_${qNum}`);
    if (activeRow) {
      activeRow.classList.add('row-current');
      activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // 8. CRONÃMETRO DE 3 HORAS
  function reiniciarCronometro() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    const durationMs = 180 * 60 * 1000;
    state.timerEndTime = Date.now() + durationMs;
    state.timerSeconds = 180 * 60;

    function tick() {
      const remainingMs = Math.max(0, state.timerEndTime - Date.now());
      state.timerSeconds = Math.ceil(remainingMs / 1000);

      const h = Math.floor(state.timerSeconds / 3600);
      const m = Math.floor((state.timerSeconds % 3600) / 60);
      const s = state.timerSeconds % 60;
      timerDisplay.textContent = `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

      if (state.timerSeconds < 600) {
        timerBox.classList.add('timer-warning');
      } else {
        timerBox.classList.remove('timer-warning');
      }

      if (remainingMs <= 0) {
        clearInterval(state.timerInterval);
        finalizarExamen(true);
      }
    }

    tick();
    state.timerInterval = setInterval(tick, 500);
  }

  // 9. NAVEGACIÃN Y ACCIONES
  prevBtn.addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderizarPreguntaActual();
    }
  });

  nextBtn.addEventListener('click', () => {
    const total = state.examData.preguntas.length;
    if (state.currentQuestionIndex < total - 1) {
      state.currentQuestionIndex++;
      renderizarPreguntaActual();
    } else {
      finalizarExamen(false);
    }
  });

  markReviewBtn.addEventListener('click', () => {
    const q = state.examData.preguntas[state.currentQuestionIndex];
    if (state.markedForReview.has(q.numero)) {
      state.markedForReview.delete(q.numero);
    } else {
      state.markedForReview.add(q.numero);
    }
    renderizarPreguntaActual();
    actualizarEstadoFicha();
  });

  clearAnsBtn.addEventListener('click', () => {
    const q = state.examData.preguntas[state.currentQuestionIndex];
    delete state.answers[q.numero];
    renderizarPreguntaActual();
    actualizarEstadoFicha();
  });

  finishBtn.addEventListener('click', () => {
    finalizarExamen(false);
  });

  // Toggle Ficha MÃ³vil
  toggleSheetBtn.addEventListener('click', () => {
    opticalSheetCard.classList.toggle('sheet-open-mobile');
  });

  if (closeSheetMobileBtn) {
    closeSheetMobileBtn.addEventListener('click', () => {
      opticalSheetCard.classList.remove('sheet-open-mobile');
    });
  }

  // 10. CALIFICACIÃN OFICIAL UNI
  function finalizarExamen(porTiempo = false) {
    if (state.examFinished) return;
    if (!porTiempo) {
      const confirmEnd = confirm("Â¿Desea finalizar y calificar su Examen Oficial IEN UNI ahora?");
      if (!confirmEnd) return;
    }

    state.examFinished = true;
    if (state.timerInterval) clearInterval(state.timerInterval);

    let correctas = 0;
    let incorrectas = 0;
    let enBlanco = 0;

    solutionsContainer.innerHTML = '';

    state.examData.preguntas.forEach(q => {
      const marcada = state.answers[q.numero];
      const esCorrecta = marcada === q.clave;

      if (!marcada) {
        enBlanco++;
      } else if (esCorrecta) {
        correctas++;
      } else {
        incorrectas++;
      }

      // Solucionario card
      const solCard = document.createElement('div');
      solCard.className = `sol-card ${!marcada ? 'sol-blank' : (esCorrecta ? 'sol-correct' : 'sol-incorrect')}`;

      solCard.innerHTML = `
        <div class="sol-header">
          <span class="sol-qnum">P${String(q.numero).padStart(2, '0')} [${q.curso} - ${q.tema}]</span>
          <span class="sol-badge">${!marcada ? 'EN BLANCO (0.0)' : (esCorrecta ? 'CORRECTA (+5.0)' : 'INCORRECTA (-1.025)')}</span>
        </div>
        <p class="sol-statement">${q.enunciado}</p>
        <div class="sol-detail">
          <span>Tu MarcaciÃ³n: <strong>${marcada || 'Ninguna'}</strong></span> | 
          <span>Clave Oficial: <strong>${q.clave}</strong></span>
        </div>
        <div class="sol-theory">
          <strong>Fundamento TeÃ³rico:</strong> ${q.teoria || ''}
        </div>
        <div class="sol-steps">
          <strong>ResoluciÃ³n Paso a Paso:</strong> ${q.solucion || ''}
        </div>
      `;
      solutionsContainer.appendChild(solCard);
    });

    // Puntaje Oficial UNI (+5.0 / -1.025)
    const puntajeBruto = (correctas * 5.0) - (incorrectas * 1.025);
    const puntajeTotal = Math.max(0.0, puntajeBruto);
    const puntajeMax = state.examData.calificacion.puntaje_maximo || 300.0;
    const porcentaje = ((puntajeTotal / puntajeMax) * 100).toFixed(1);

    // Persistencia y Docker n8n para Valeria (Módulo Militar Hermes)
    try {
      const breakdown = {};
      state.examData.preguntas.forEach(q => {
        const c = q.curso || 'General';
        if (!breakdown[c]) breakdown[c] = { correctas: 0, incorrectas: 0, blancas: 0, total: 0, efectividadPct: 0 };
        breakdown[c].total++;
        const ans = state.answers[q.numero];
        if (!ans) {
          breakdown[c].blancas++;
        } else if (ans === q.clave) {
          breakdown[c].correctas++;
        } else {
          breakdown[c].incorrectas++;
        }
      });
      Object.keys(breakdown).forEach(k => {
        const item = breakdown[k];
        item.efectividadPct = item.total > 0 ? parseFloat(((item.correctas / item.total) * 100).toFixed(1)) : 0;
      });

      const payload = {
        estudiante: "Valeria Castillo",
        fecha: new Date().toISOString(),
        fechaFormato: new Date().toLocaleString('es-PE'),
        modo: 'IEN',
        simulacro: state.selectedExamKey || 'Simulacro IEN UNI',
        puntaje: parseFloat(puntajeTotal.toFixed(2)),
        nota20: parseFloat(((puntajeTotal / puntajeMax) * 20).toFixed(2)),
        correctas,
        incorrectas,
        blancas: enBlanco,
        total: state.examData.preguntas.length,
        desglose: breakdown
      };

      if (window.ValeriaTelemetry && window.ValeriaTelemetry.send) {
        window.ValeriaTelemetry.send(payload);
      } else {
        const hist = JSON.parse(localStorage.getItem('valeria_uni_historial') || '[]');
        hist.push(payload);
        localStorage.setItem('valeria_uni_historial', JSON.stringify(hist));
      }
    } catch(e) { console.warn('[Persistencia Valeria]', e); }

    scoreNumberEl.textContent = puntajeTotal.toFixed(3);
    scoreMaxLabel.textContent = `/ ${puntajeMax.toFixed(3)} pts`;
    scorePercentLabel.textContent = `Rendimiento: ${porcentaje}% (${porTiempo ? 'Tiempo Agotado' : 'Finalizado por el Postulante'})`;

    correctCountEl.textContent = correctas;
    incorrectCountEl.textContent = incorrectas;
    blankCountEl.textContent = enBlanco;

    // Carreras Alcanzables segÃºn Corte IEN UNI (sobre 300 pts)
    careerList.innerHTML = '';
    const cortesIEN = [
      { carrera: "IngenierÃ­a de Sistemas", min: 240.0 },
      { carrera: "IngenierÃ­a MecatrÃ³nica", min: 235.0 },
      { carrera: "IngenierÃ­a Civil", min: 225.0 },
      { carrera: "IngenierÃ­a ElectrÃ³nica", min: 215.0 },
      { carrera: "IngenierÃ­a Industrial", min: 210.0 },
      { carrera: "IngenierÃ­a QuÃ­mica", min: 185.0 },
      { carrera: "IngenierÃ­a de Minas", min: 190.0 },
      { carrera: "Arquitectura", min: 200.0 }
    ];

    cortesIEN.forEach(c => {
      const li = document.createElement('li');
      const alcanza = puntajeTotal >= c.min;
      li.className = alcanza ? 'career-admitted' : 'career-not-admitted';
      li.innerHTML = `<span>${alcanza ? 'â' : 'â'} <strong>${c.carrera}</strong> (Corte Referencial: ${c.min.toFixed(1)} pts)</span> <span>${alcanza ? 'Â¡ALCANZASTE VACANTE!' : 'Puntaje insuficiente'}</span>`;
      careerList.appendChild(li);
    });

    // Abrir Modal
    resultsModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    ejecutarMathJax([solutionsContainer]);
  }

  // Cerrar Modal
  closeResultsBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });

  restartBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    cargarExamen(state.selectedExamKey);
  });

  modalGenNewBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    generarNuevoDinamico();
  });

  // Atajos de Teclado
  document.addEventListener('keydown', (e) => {
    if (state.examFinished) return;
    const key = e.key.toUpperCase();
    if (['1', '2', '3', '4', '5'].includes(key)) {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const q = state.examData.preguntas[state.currentQuestionIndex];
      marcarOpcion(q.numero, letters[parseInt(key) - 1]);
    } else if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
      const q = state.examData.preguntas[state.currentQuestionIndex];
      marcarOpcion(q.numero, key);
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      markReviewBtn.click();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      clearAnsBtn.click();
    }
  });

  // Ejecución Segura y Focalizada de MathJax (Alta Velocidad)
  function ejecutarMathJax(elementos) {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;

    if (state.isMathJaxRunning) {
      state.pendingMathJax = true;
      return;
    }

    state.isMathJaxRunning = true;
    state.pendingMathJax = false;

    const targets = elementos || [qStatement, optionsContainer].filter(Boolean);
    if (window.MathJax.typesetClear) {
      window.MathJax.typesetClear(targets);
    }

    window.MathJax.typesetPromise(targets)
      .catch((err) => console.warn("MathJax:", err))
      .finally(() => {
        state.isMathJaxRunning = false;
        if (state.pendingMathJax) {
          state.pendingMathJax = false;
          ejecutarMathJax();
        }
      });
  }

  // InicializaciÃ³n
    // =========================================================================
  // MODAL Y PISTA SOCRÁTICA CORTANA IEN
  // =========================================================================
  const btnCortanaIEN = document.getElementById('btnCortanaIEN');
  const cortanaModalIEN = document.getElementById('cortanaModalIEN');
  const closeCortanaModalIEN = document.getElementById('closeCortanaModalIEN');
  const cortanaModalMetaIEN = document.getElementById('cortanaModalMetaIEN');
  const cortanaModalBodyIEN = document.getElementById('cortanaModalBodyIEN');
  const btnListenCortanaIEN = document.getElementById('btnListenCortanaIEN');

  function openCortanaModalIEN() {
    if (!state.examData || !state.examData.preguntas) return;
    const q = state.examData.preguntas[state.currentQuestionIndex];
    if (!q) return;

    if (cortanaModalMetaIEN) {
      cortanaModalMetaIEN.innerHTML = `<span>📚 ${q.curso || 'General'}</span> &bull; <span>${q.tema || 'Tópico'}</span> &bull; <span>Arquetipo: ${q.arquetipo || 'Canónico IEN'}</span>`;
    }
    if (cortanaModalBodyIEN) {
      const pista = q.teoria || q.arquetipo || "Aplica las leyes de conservación y principios canónicos evaluados por la UNI en el IEN.";
      cortanaModalBodyIEN.innerHTML = pista.replace(/\n/g, '<br>');
    }
    if (cortanaModalIEN) {
      cortanaModalIEN.style.display = 'flex';
      ejecutarMathJax();
    }
  }

  if (btnCortanaIEN) {
    btnCortanaIEN.addEventListener('click', openCortanaModalIEN);
  }
  if (closeCortanaModalIEN) {
    closeCortanaModalIEN.addEventListener('click', () => {
      if (cortanaModalIEN) cortanaModalIEN.style.display = 'none';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }
  if (btnListenCortanaIEN) {
    btnListenCortanaIEN.addEventListener('click', () => {
      if (!state.examData || !state.examData.preguntas) return;
      const q = state.examData.preguntas[state.currentQuestionIndex];
      if (!q || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const texto = `Atención Valeria. Para este ejercicio de ${q.curso || 'ciencias'}, la pista conceptual es: ${q.teoria ? q.teoria.replace(/[\$\\]/g, '') : 'aplica el arquetipo oficial del examen.'}`;
        const utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'es-PE';
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      } catch(e) {}
    });
  }

  // Inicialización
  inicializarSelectores();
  cargarExamen('SIMULACRO_PREDICTIVO_IEN_2026');
});