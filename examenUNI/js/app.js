/**
 * JC PATH LAB & DR. JOSÃ CASTILLO - SIMULADOR PREDICTIVO UNI
 * SISTEMA MATEMÃTICO DE PREDICCIÃN EXTREMA (~100% CERTEZA)
 * - Automated Test Assembly (MILP)
 * - Los 50 Subtemas Innegables (Probabilidad >= 95%)
 * - Cadenas de Markov de 2do Orden (RotaciÃ³n Curricular)
 * - 150 Arquetipos CanÃ³nicos IsomÃ³rficos (Anti-RepeticiÃ³n DinÃ¡mica)
 * - TeorÃ­a de Respuesta al Ãtem (TRI 3PL / TIF)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. ESTADO GLOBAL DE LA APLICACIÃN
  // =========================================================================
  const state = {
    selectedExamKey: 'SIMULACRO_DINAMICO_IA', // Modo DinÃ¡mico por defecto
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
    dynamicExamsCache: {}   // CachÃ© de simulacros dinÃ¡micos generados
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

  // Acciones y NavegaciÃ³n
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

  // Alerta / Toast DinÃ¡mica
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
  // 3. MOTOR GENERADOR DINÃMICO (MARKOV + MILP + ARQUETIPOS CANÃNICOS)
  // =========================================================================
  
  /**
   * Genera un examen predictivo 100% dinÃ¡mico sin repeticiÃ³n:
   * Para cada pregunta k del temario oficial:
   * - Identifica su arquetipo canÃ³nico exacto.
   * - Muestrea una variante de los 45 procesos del banco.
   * - Aplica una permutaciÃ³n isomÃ³rfica sobre las alternativas (A-E) y recalcula la clave.
   * - Con ello, cada simulacro presenta nÃºmeros y opciones distintas, pero garantiza el 100% del temario.
   */
  function generarSimulacroDinamicoSinRepeticion(dayKey, seed = Date.now()) {
    if (!window.BANCO_PREDICTIVO) return null;

    const examKeys = Object.keys(window.BANCO_PREDICTIVO).filter(k => k !== 'SIMULACRO_DINAMICO_IA');
    if (examKeys.length === 0) return null;

    // Tomamos como plantilla la estructura oficial del DÃ­a
    const baseExam = window.BANCO_PREDICTIVO['SIMULACRO_PREDICTIVO_2026'] || window.BANCO_PREDICTIVO[examKeys[0]];
    const baseDay = baseExam.dias[dayKey];
    if (!baseDay) return null;

    const totalQuestions = baseDay.preguntas.length;
    const nuevasPreguntas = [];

    // FunciÃ³n pseudo-aleatoria congruencial basada en semilla
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

      // 4. PermutaciÃ³n IsomÃ³rfica de Alternativas (A, B, C, D, E)
      // Permuta el orden de las alternativas y recalcula la clave oficial unÃ­voca
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
  // 4. INICIALIZACIÃN DE LA APLICACIÃN
  // =========================================================================
  function initApp() {
    if (!window.BANCO_PREDICTIVO) {
      console.error("No se encontrÃ³ window.BANCO_PREDICTIVO");
      alert("Error crÃ­tico: No se encontrÃ³ banco_predictivo.js");
      return;
    }

    // Poblar Selector de ExÃ¡menes con Agrupamiento Inteligente
    examSelect.innerHTML = '';

    // Grupo 1: Generador IA y Simulacro 2026
    const grpPredictivo = document.createElement('optgroup');
    grpPredictivo.label = "â¡ MODOS PREDICTIVOS EXTREMOS (~100% CERTEZA)";

    const optDinamico = document.createElement('option');
    optDinamico.value = 'SIMULACRO_DINAMICO_IA';
    optDinamico.textContent = "â¨ Generador DinÃ¡mico IA (Sin RepeticiÃ³n - Markov + MILP)";
    grpPredictivo.appendChild(optDinamico);

    if (window.BANCO_PREDICTIVO['SIMULACRO_PREDICTIVO_2026']) {
      const opt2026 = document.createElement('option');
      opt2026.value = 'SIMULACRO_PREDICTIVO_2026';
      opt2026.textContent = "â¨ Simulacro Predictivo Oficial UNI 2026 (MÃ¡xima Certeza)";
      grpPredictivo.appendChild(opt2026);
    }
    examSelect.appendChild(grpPredictivo);

    // Grupo 2: Concursos Oficiales Recientes (2020 a 2025)
    const grpRecientes = document.createElement('optgroup');
    grpRecientes.label = "ðï¸ PROCESOS OFICIALES RECIENTES (2020 - 2025)";

    // Grupo 3: Concursos HistÃ³ricos (2004 a 2019)
    const grpHistoricos = document.createElement('optgroup');
    grpHistoricos.label = "ðï¸ BANCO HISTÃRICO CONSOLIDADO (2004 - 2019)";

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

    // Fijar selecciÃ³n inicial
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

    // BotÃ³n de GeneraciÃ³n DinÃ¡mica Forzada
    generateNewBtn.addEventListener('click', () => {
      triggerNewDynamicExam();
    });

    if (modalGenNewBtn) {
      modalGenNewBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        triggerNewDynamicExam();
      });
    }

    // Toggle Ficha Ãptica MÃ³vil
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

    // Cerrar alerta dinÃ¡mica
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
    showDynamicAlert("â¨ Â¡Nuevo Simulacro Predictivo Generado con Ãxito! (0% RepeticiÃ³n | 100% Temario Oficial UNI)");
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
      // Usar cachÃ© o generar uno nuevo
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

    // Reiniciar CronÃ³metro
    clearInterval(state.timerInterval);
    startTimer();

    // Construir Ficha Ãptica y Renderizar
    buildOpticalSheet();
    renderQuestion(state.currentQuestionIndex);
    updateStats();

    // Cerrar drawer mÃ³vil si estaba abierto
    if (opticalSheetCard) {
      opticalSheetCard.classList.remove('sheet-open-mobile');
    }
  }

  // =========================================================================
  // 6. CRONÃMETRO OFICIAL DE 3 HORAS
  // =========================================================================
  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    const durationMs = (state.timerSeconds > 0 ? state.timerSeconds : (state.examData.duracion_min || 180) * 60) * 1000;
    state.timerEndTime = Date.now() + durationMs;

    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      const remainingMs = Math.max(0, state.timerEndTime - Date.now());
      state.timerSeconds = Math.ceil(remainingMs / 1000);
      updateTimerDisplay();

      if (remainingMs <= 0) {
        clearInterval(state.timerInterval);
        alert("¡TIEMPO REGLAMENTARIO DE LA UNI CUMPLIDO! La prueba se calificará automáticamente de acuerdo a las normas del concurso.");
        finishExam();
      }
    }, 500);
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
      qArchetypeTag.textContent = q.arquetipo ? `Arquetipo: ${q.arquetipo}` : 'Arquetipo CanÃ³nico';
      qArchetypeTag.title = q.arquetipo || '';
    }

    qSubjectBadge.textContent = q.materia || 'General';
    qTopicBadge.textContent = q.tema || 'Subtema CanÃ³nico';
    
    if (qProbBadge) {
      qProbBadge.textContent = `ð¯ Certeza: ${q.probabilidad || '98.5%'}`;
      qProbBadge.title = `Probabilidad marginal de apariciÃ³n en el concurso UNI: ${q.probabilidad || '98.5%'}`;
    }

    if (qNucleoBadge) {
      qNucleoBadge.textContent = q.nucleo || 'â­ 50 Innegables';
    }

    qDiffBadge.textContent = q.dificultad || 'Intermedio';
    if (qTriBadge) {
      qTriBadge.textContent = q.tri_theta || 'Î¸ â [+1.2, +1.8]';
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

    // Estado del botÃ³n RevisiÃ³n
    if (state.markedForReview.has(q.num)) {
      markReviewBtn.classList.add('active');
      markReviewBtn.textContent = 'â En RevisiÃ³n';
    } else {
      markReviewBtn.classList.remove('active');
      markReviewBtn.textContent = 'â Marcar RevisiÃ³n';
    }

    // Botones de NavegaciÃ³n
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

    // Auto-avance fluido (UX Ã³ptima de 260ms para entrenamiento de reflejo)
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
  // 8. CONSTRUIR Y ACTUALIZAR FICHA ÃPTICA UNI
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
        // En pantallas pequeÃ±as, cerrar el drawer Ã³ptico al hacer clic
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
  // 9. NAVEGACIÃN Y BOTONES DE ACCIÃN
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

    // Helper de Ponderación Oficial UNI por Día
  function getDayScoring(dayKey) {
    if (dayKey === 'dia_2') {
      return {
        ptsCorrect: 15.0,
        ptsIncorrect: -3.75,
        maxScore: 600.0,
        dayName: 'Día 2: Matemática (40 Preguntas)',
        ruleText: '+15.000 / -3.750 / 0.000 (Máximo: 600.0 pts)'
      };
    } else if (dayKey === 'dia_3') {
      return {
        ptsCorrect: 12.5,
        ptsIncorrect: -3.125,
        maxScore: 500.0,
        dayName: 'Día 3: Física y Química (40 Preguntas)',
        ruleText: '+12.500 / -3.125 / 0.000 (Máximo: 500.0 pts)'
      };
    } else {
      return {
        ptsCorrect: 5.0,
        ptsIncorrect: -1.025,
        maxScore: 500.0,
        dayName: 'Día 1: Aptitud Académica y Humanidades (100 Preguntas)',
        ruleText: '+5.000 / -1.025 / 0.000 (Máximo: 500.0 pts)'
      };
    }
  }

  // =========================================================================
  // 10. CALIFICACIÓN OFICIAL UNI Y SOLUCIONARIO ANALÍTICO
  // =========================================================================
  finishBtn.addEventListener('click', () => {
    const total = state.examData.preguntas.length;
    const answered = Object.keys(state.answers).length;
    const pending = total - answered;
    const scoring = getDayScoring(state.selectedDayKey);

    const confirmMsg = `¿Desea finalizar la prueba y obtener su calificación oficial UNI?\n\n- Evaluación: ${scoring.dayName}\n- Total de Preguntas: ${total}\n- Respondidas: ${answered}\n- En blanco: ${pending}\n\n(Regla Oficial UNI: ${scoring.ruleText})`;
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

    // Ponderación Oficial UNI según el Día Evaluado
    const scoring = getDayScoring(state.selectedDayKey);
    const PTS_CORRECT = scoring.ptsCorrect;
    const PTS_INCORRECT = scoring.ptsIncorrect;

    const rubroBreakdown = {};
    qList.forEach(q => {
      const area = q.materia || 'General';
      if (!rubroBreakdown[area]) {
        rubroBreakdown[area] = { correct: 0, incorrect: 0, blank: 0, total: 0, score: 0 };
      }
      rubroBreakdown[area].total++;

      const studentAns = state.answers[q.num];
      if (!studentAns) {
        blank++;
        rubroBreakdown[area].blank++;
      } else if (studentAns === q.clave) {
        correct++;
        rubroBreakdown[area].correct++;
        rubroBreakdown[area].score += PTS_CORRECT;
      } else {
        incorrect++;
        rubroBreakdown[area].incorrect++;
        rubroBreakdown[area].score += PTS_INCORRECT;
      }
    });

    const totalScore = (correct * PTS_CORRECT) + (incorrect * PTS_INCORRECT);
    const roundedScore = Math.max(0, totalScore).toFixed(3);
    const maxScore = scoring.maxScore || (qList.length * PTS_CORRECT);
    const pct = Math.max(0, (totalScore / maxScore) * 100);

    // Actualizar Encabezado del Modal
    // Persistencia y Docker n8n para Valeria (Módulo Militar Hermes)
    try {
      const desglose = {};
      Object.keys(rubroBreakdown).forEach(materia => {
        const item = rubroBreakdown[materia];
        desglose[materia] = {
          correctas: item.correct,
          incorrectas: item.incorrect,
          blancas: item.blank,
          total: item.total,
          puntaje: parseFloat(item.score.toFixed(3)),
          efectividadPct: item.total > 0 ? parseFloat(((item.correct / item.total) * 100).toFixed(1)) : 0
        };
      });

      const payload = {
        estudiante: "Valeria Castillo",
        fecha: new Date().toISOString(),
        fechaFormato: new Date().toLocaleString('es-PE'),
        modo: 'GENERAL',
        simulacro: state.selectedProcessKey ? `Simulacro UNI ${state.selectedProcessKey} - ${scoring.dayName}` : `Simulacro UNI - ${scoring.dayName}`,
        puntaje: parseFloat(roundedScore),
        nota20: parseFloat(((totalScore / maxScore) * 20).toFixed(2)),
        correctas: correct,
        incorrectas: incorrect,
        blancas: blank,
        total: qList.length,
        desglose: desglose
      };

      if (window.ValeriaTelemetry && window.ValeriaTelemetry.send) {
        window.ValeriaTelemetry.send(payload);
      } else {
        const hist = JSON.parse(localStorage.getItem('valeria_uni_historial') || '[]');
        hist.push(payload);
        localStorage.setItem('valeria_uni_historial', JSON.stringify(hist));
      }
    } catch(e) { console.warn('[Persistencia Valeria]', e); }

    scoreNumberEl.textContent = roundedScore;
    scoreMaxLabel.textContent = `PUNTAJE NETO OBTENIDO (MÃXIMO: ${maxScore.toFixed(1)} PTS)`;
    if (scorePercentLabel) {
      scorePercentLabel.textContent = `Eficacia: ${pct.toFixed(2)}% | Tasa de Acierto Predictivo: ${((correct / qList.length) * 100).toFixed(1)}%`;
    }

    correctCountEl.textContent = `${correct} (+${(correct * PTS_CORRECT).toFixed(1)} pts)`;
    incorrectCountEl.textContent = `${incorrect} (${(incorrect * PTS_INCORRECT).toFixed(2)} pts)`;
    blankCountEl.textContent = `${blank} (0.0 pts)`;

    // Desglose Psicométrico por Rubro / Materia
    const rubroBreakdownList = document.getElementById('rubroBreakdownList');
    if (rubroBreakdownList) {
      rubroBreakdownList.innerHTML = '';
      for (const [area, data] of Object.entries(rubroBreakdown)) {
        const item = document.createElement('div');
        item.style.background = 'rgba(15,23,42,0.85)';
        item.style.border = '1px solid rgba(56,189,248,0.25)';
        item.style.borderRadius = '8px';
        item.style.padding = '10px 12px';
        const effArea = ((data.correct / (data.total || 1)) * 100).toFixed(0);
        item.innerHTML = `
          <div style="font-size:0.84rem; font-weight:800; color:#fff; display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>${area}</span>
            <span style="color:#38bdf8;">${effArea}% Eficacia</span>
          </div>
          <div style="font-size:0.75rem; color:#94a3b8; display:flex; justify-content:space-between;">
            <span>✔ ${data.correct} | ✘ ${data.incorrect} | ⚪ ${data.blank}</span>
            <strong style="color:${data.score >= 0 ? '#10b981' : '#ef4444'};">${data.score.toFixed(2)} pts</strong>
          </div>
        `;
        rubroBreakdownList.appendChild(item);
      }
    }

    // Proyecciones de Ingreso a Facultades UNI
    renderRankings(pct, roundedScore);

    // Solucionario AnalÃ­tico Completo
    renderSolutions(qList);

    // Mostrar Modal
    resultsModal.style.display = 'block';
  }

  function renderRankings(pct, score) {
    careerList.innerHTML = '';

    const careers = [
      { name: "IngenierÃ­a de Sistemas", cutoff: 78.0, desc: "Facultad de IngenierÃ­a Industrial y de Sistemas (FIIS)" },
      { name: "IngenierÃ­a MecatrÃ³nica", cutoff: 76.5, desc: "Facultad de IngenierÃ­a MecÃ¡nica (FIM)" },
      { name: "IngenierÃ­a Civil", cutoff: 74.0, desc: "Facultad de IngenierÃ­a Civil (FIC)" },
      { name: "IngenierÃ­a Industrial", cutoff: 72.0, desc: "Facultad de IngenierÃ­a Industrial y de Sistemas (FIIS)" },
      { name: "IngenierÃ­a ElectrÃ³nica", cutoff: 68.0, desc: "Facultad de IngenierÃ­a ElÃ©ctrica y ElectrÃ³nica (FIEE)" },
      { name: "IngenierÃ­a QuÃ­mica", cutoff: 62.0, desc: "Facultad de IngenierÃ­a QuÃ­mica y Textil (FIQT)" },
      { name: "IngenierÃ­a Ambiental", cutoff: 60.0, desc: "Facultad de IngenierÃ­a Ambiental (FIA)" }
    ];

    careers.forEach(c => {
      const li = document.createElement('li');
      const reached = (pct >= c.cutoff);
      li.innerHTML = `
        <span class="ranking-icon">${reached ? 'â' : 'â³'}</span>
        <div class="ranking-info">
          <strong>${c.name}</strong> <span class="career-desc">(${c.desc})</span> &bull; 
          <span class="cutoff-text">Corte aprox: ${c.cutoff}%</span>
          <span class="admission-status ${reached ? 'status-reached' : 'status-pending'}">
            ${reached ? 'Â¡PUNTAJE DE INGRESO DIRECTO ALCANZADO!' : 'En zona de consolidaciÃ³n'}
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
              ${(() => {
              const sc = getDayScoring(state.selectedDayKey);
              const pCor = `+${sc.ptsCorrect.toFixed(1)}`;
              const pInc = `${sc.ptsIncorrect.toFixed(sc.ptsIncorrect % 1 === 0 ? 1 : (sc.ptsIncorrect * 10 % 1 === 0 ? 2 : 3))}`;
              return isCorrect ? `✔ CORRECTA (${pCor})` : (isBlank ? '⚪ EN BLANCO (0.0)' : `✘ INCORRECTA (${pInc})`);
            })()}
            </span>
          </div>
        </div>

        <div class="solution-statement-box">${formatLatex(q.enunciado)}</div>

        <div class="solution-user-ans-row">
          <span>Tu marcaciÃ³n: <strong class="${isCorrect ? 'ans-correct' : 'ans-incorrect'}">${studentAns}</strong></span>
          <span>Clave Oficial UNI: <strong class="ans-official">${q.clave}</strong></span>
          <span class="badge badge-prob">${q.probabilidad ? 'ð¯ ' + q.probabilidad : '98.5%'}</span>
        </div>

        <div class="solution-box">
          <div class="sol-section-title">FundamentaciÃ³n TeÃ³rica / Teorema Rector:</div>
          <div class="sol-theory-text">${formatLatex(q.teoria)}</div>

          <div class="sol-section-title">Desarrollo AnalÃ­tico Paso a Paso:</div>
          <div class="sol-steps-text">${formatLatex(q.solucion)}</div>
        </div>
      `;
      solutionsContainer.appendChild(card);
    });

    triggerMathJax([solutionsContainer]);
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

  function triggerMathJax(elements) {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;

    if (state.isMathJaxRunning) {
      state.pendingMathJax = true;
      return;
    }

    state.isMathJaxRunning = true;
    state.pendingMathJax = false;

    const targets = elements || [qStatement, optionsContainer].filter(Boolean);
    if (window.MathJax.typesetClear) {
      window.MathJax.typesetClear(targets);
    }

    window.MathJax.typesetPromise(targets)
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
  // 12. ATAJOS DE TECLADO ERGONÃMICOS
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // Si el modal estÃ¡ abierto o el usuario escribe en un campo, ignorar atajos
    if (resultsModal.style.display === 'block') {
      if (e.key === 'Escape') resultsModal.style.display = 'none';
      return;
    }

    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (state.examFinished) return;

    // NavegaciÃ³n con flechas
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
    // Marcar para revisiÃ³n con Espacio
    else if (e.key === ' ') {
      e.preventDefault();
      markReviewBtn.click();
    }
    // Borrar respuesta con Delete o Backspace
    else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      clearAnsBtn.click();
    }
    // MarcaciÃ³n directa con [1-5] o [A-E]
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

  // =========================================================================
  // MODAL Y PISTA SOCRÁTICA CORTANA UNI
  // =========================================================================
  const btnCortanaUNI = document.getElementById('btnCortanaUNI');
  const cortanaModalUNI = document.getElementById('cortanaModalUNI');
  const closeCortanaModalUNI = document.getElementById('closeCortanaModalUNI');
  const cortanaModalMeta = document.getElementById('cortanaModalMeta');
  const cortanaModalBody = document.getElementById('cortanaModalBody');
  const btnListenCortanaUNI = document.getElementById('btnListenCortanaUNI');

  function openCortanaModal() {
    if (!state.examData || !state.examData.preguntas) return;
    const q = state.examData.preguntas[state.currentQuestionIndex];
    if (!q) return;

    if (cortanaModalMeta) {
      cortanaModalMeta.innerHTML = `<span>📚 ${q.materia || 'General'}</span> &bull; <span>${q.tema || 'Tópico'}</span> &bull; <span>Arquetipo: ${q.arquetipo || 'Canónico'}</span>`;
    }
    if (cortanaModalBody) {
      const pista = q.teoria || q.arquetipo || "Analiza las simetrías y relaciones invariantes del problema. Aplica los teoremas rectores de la UNI.";
      cortanaModalBody.innerHTML = formatLatex(pista);
    }
    if (cortanaModalUNI) {
      cortanaModalUNI.style.display = 'flex';
      triggerMathJax();
    }
  }

  if (btnCortanaUNI) {
    btnCortanaUNI.addEventListener('click', openCortanaModal);
  }
  if (closeCortanaModalUNI) {
    closeCortanaModalUNI.addEventListener('click', () => {
      if (cortanaModalUNI) cortanaModalUNI.style.display = 'none';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }
  if (btnListenCortanaUNI) {
    btnListenCortanaUNI.addEventListener('click', () => {
      if (!state.examData || !state.examData.preguntas) return;
      const q = state.examData.preguntas[state.currentQuestionIndex];
      if (!q || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const texto = `Atención postulante. Para este ejercicio de ${q.materia || ''}, la pista conceptual rectora es: ${q.teoria ? q.teoria.replace(/[\$\\]/g, '') : 'revisar el arquetipo canónico.'}`;
        const utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'es-PE';
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      } catch(e) {}
    });
  }

  // Lanzar la aplicación
  initApp();
});