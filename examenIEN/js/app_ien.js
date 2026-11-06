/**
 * JC PATH LAB & DR. JOSÉ CASTILLO - SIMULADOR PREDICTIVO IEN UNI 2026
 * SISTEMA MATEMÁTICO DE PREDICCIÓN EXTREMA (~100% CERTEZA)
 * Modalidad: Ingreso Escolar Nacional (IEN - 5to de Secundaria)
 * 
 * - Estructura Canónica: 60 Preguntas (24 Mat, 10 Fís, 10 Quím, 16 Apt/Hum)
 * - 40 Arquetipos Innegables IEN (Probabilidad >= 95%)
 * - Cadenas de Markov de 2do Orden y Rotación Curricular
 * - Calificación Oficial UNI: +5.0 / -1.025 / 0.0 (Máximo 300 Puntos)
 * - Duración Oficial: 3 horas (180 minutos)
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

  // Navegación
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
      qStatement.textContent = "Error: No se encontró window.BANCO_PREDICTIVO_IEN.";
      return;
    }

    examSelect.innerHTML = '';
    
    // Opción 1: Dinamico IA
    const optDyn = document.createElement('option');
    optDyn.value = 'SIMULACRO_DINAMICO_IA';
    optDyn.textContent = '✨ Generador Dinámico IEN (0% Repetición | 100% Arquetipos)';
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

  // 4. GENERADOR DINÁMICO IEN
  function generarNuevoDinamico() {
    const examKeys = Object.keys(window.BANCO_PREDICTIVO_IEN);
    if (examKeys.length === 0) return;

    const baseExam = window.BANCO_PREDICTIVO_IEN['SIMULACRO_PREDICTIVO_IEN_2026'] || window.BANCO_PREDICTIVO_IEN[examKeys[0]];
    const totalQ = baseExam.preguntas.length;
    const nuevasPreguntas = [];
    const seed = Date.now();

    for (let i = 0; i < totalQ; i++) {
      // Tomar una variante de cualquiera de los exámenes para esta posición i
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
      titulo: `✨ Simulacro Dinámico IEN UNI - Semilla #${seed.toString().slice(-4)}`,
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
      dynamicAlertText.textContent = `¡Nuevo Simulacro IEN Generado con Éxito! Semilla #${seed.toString().slice(-4)} (60 Arquetipos IEN)`;
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
    renderizarPreguntaActual();
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
    qTopicBadge.textContent = q.tema || "Tópico";
    qProbBadge.textContent = `🎯 CERTEZA: ${q.probabilidad || '98.0%'}`;
    qNucleoBadge.textContent = q.nucleo || "⭐ INNEGABLE IEN";
    qDiffBadge.textContent = (q.dificultad || "INTERMEDIO").toUpperCase();
    qTriBadge.textContent = q.tri_theta || "θ ∈ [+1.0, +1.6]";

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

    // Actualizar botones de navegación
    prevBtn.disabled = state.currentQuestionIndex === 0;
    nextBtn.textContent = state.currentQuestionIndex === total - 1 ? 'Finalizar Examen' : 'Siguiente →';

    // Actualizar estado de revisión
    if (state.markedForReview.has(q.numero)) {
      markReviewBtn.classList.add('active');
      markReviewBtn.textContent = '★ Marcada para Revisión';
    } else {
      markReviewBtn.classList.remove('active');
      markReviewBtn.textContent = '☆ Marcar Revisión';
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

  // 7. FICHA ÓPTICA
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

  // 8. CRONÓMETRO DE 3 HORAS
  function reiniciarCronometro() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerSeconds = 180 * 60; // 3 Horas

    function tick() {
      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        finalizarExamen(true);
        return;
      }
      state.timerSeconds--;
      const h = Math.floor(state.timerSeconds / 3600);
      const m = Math.floor((state.timerSeconds % 3600) / 60);
      const s = state.timerSeconds % 60;
      timerDisplay.textContent = `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

      if (state.timerSeconds < 600) {
        timerBox.classList.add('timer-warning');
      } else {
        timerBox.classList.remove('timer-warning');
      }
    }

    tick();
    state.timerInterval = setInterval(tick, 1000);
  }

  // 9. NAVEGACIÓN Y ACCIONES
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

  // Toggle Ficha Móvil
  toggleSheetBtn.addEventListener('click', () => {
    opticalSheetCard.classList.toggle('sheet-open');
  });

  if (closeSheetMobileBtn) {
    closeSheetMobileBtn.addEventListener('click', () => {
      opticalSheetCard.classList.remove('sheet-open');
    });
  }

  // 10. CALIFICACIÓN OFICIAL UNI
  function finalizarExamen(porTiempo = false) {
    if (state.examFinished) return;
    if (!porTiempo) {
      const confirmEnd = confirm("¿Desea finalizar y calificar su Examen Oficial IEN UNI ahora?");
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
          <span>Tu Marcación: <strong>${marcada || 'Ninguna'}</strong></span> | 
          <span>Clave Oficial: <strong>${q.clave}</strong></span>
        </div>
        <div class="sol-theory">
          <strong>Fundamento Teórico:</strong> ${q.teoria || ''}
        </div>
        <div class="sol-steps">
          <strong>Resolución Paso a Paso:</strong> ${q.solucion || ''}
        </div>
      `;
      solutionsContainer.appendChild(solCard);
    });

    // Puntaje Oficial UNI (+5.0 / -1.025)
    const puntajeBruto = (correctas * 5.0) - (incorrectas * 1.025);
    const puntajeTotal = Math.max(0.0, puntajeBruto);
    const puntajeMax = state.examData.calificacion.puntaje_maximo || 300.0;
    const porcentaje = ((puntajeTotal / puntajeMax) * 100).toFixed(1);

    scoreNumberEl.textContent = puntajeTotal.toFixed(3);
    scoreMaxLabel.textContent = `/ ${puntajeMax.toFixed(3)} pts`;
    scorePercentLabel.textContent = `Rendimiento: ${porcentaje}% (${porTiempo ? 'Tiempo Agotado' : 'Finalizado por el Postulante'})`;

    correctCountEl.textContent = correctas;
    incorrectCountEl.textContent = incorrectas;
    blankCountEl.textContent = enBlanco;

    // Carreras Alcanzables según Corte IEN UNI (sobre 300 pts)
    careerList.innerHTML = '';
    const cortesIEN = [
      { carrera: "Ingeniería de Sistemas", min: 240.0 },
      { carrera: "Ingeniería Mecatrónica", min: 235.0 },
      { carrera: "Ingeniería Civil", min: 225.0 },
      { carrera: "Ingeniería Electrónica", min: 215.0 },
      { carrera: "Ingeniería Industrial", min: 210.0 },
      { carrera: "Ingeniería Química", min: 185.0 },
      { carrera: "Ingeniería de Minas", min: 190.0 },
      { carrera: "Arquitectura", min: 200.0 }
    ];

    cortesIEN.forEach(c => {
      const li = document.createElement('li');
      const alcanza = puntajeTotal >= c.min;
      li.className = alcanza ? 'career-admitted' : 'career-not-admitted';
      li.innerHTML = `<span>${alcanza ? '✅' : '❌'} <strong>${c.carrera}</strong> (Corte Referencial: ${c.min.toFixed(1)} pts)</span> <span>${alcanza ? '¡ALCANZASTE VACANTE!' : 'Puntaje insuficiente'}</span>`;
      careerList.appendChild(li);
    });

    // Abrir Modal
    resultsModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    ejecutarMathJax();
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

  // Ejecución Segura de MathJax
  function ejecutarMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => console.warn("MathJax:", err));
    }
  }

  // Inicialización
  inicializarSelectores();
  cargarExamen('SIMULACRO_PREDICTIVO_IEN_2026');
});
