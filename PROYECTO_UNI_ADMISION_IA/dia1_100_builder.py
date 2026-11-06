# -*- coding: utf-8 -*-
"""
JC PATH LAB & DR. JOSÉ CASTILLO - PROYECTO PREDICTIVO UNI ADMISIÓN IA
MÓDULO MAESTRO DE GENERACIÓN DEL DÍA 1: APTITUD ACADÉMICA Y HUMANIDADES (100 PREGUNTAS COMPLETAS)
Estructura Oficial UNI:
- Preguntas 01 a 35: Razonamiento Matemático (RM)
- Preguntas 36 a 70: Razonamiento Verbal (RV)
- Preguntas 71 a 100: Humanidades (Historia del Perú, Historia Universal, Geografía, Economía, Filosofía y Lógica)
"""

import math

def get_dia1_100_aptitud_humanidades(proc_nombre, anio, periodo, seed_val):
    preguntas = []
    s = seed_val

    # =========================================================================
    # SECCIÓN I: RAZONAMIENTO MATEMÁTICO (PREGUNTAS 1 A 35)
    # =========================================================================

    # P1: Sucesión Aritmética
    r1 = 3 + (s % 5)
    a1 = 2 + (s % 7)
    n1 = 15 + (s % 6)
    an1 = a1 + (n1 - 1) * r1
    preguntas.append({
        "num": 1, "materia": "Razonamiento Matemático", "tema": "Sucesiones y Progresiones Aritméticas",
        "dificultad": "Básico", "arquetipo": "Cálculo del término de posición $n$: $t_n = t_1 + (n-1)r$",
        "enunciado": f"En la progresión aritmética: {a1}, {a1 + r1}, {a1 + 2*r1}, {a1 + 3*r1}, ..., determine el término que ocupa la posición {n1}.",
        "opciones": {"A": str(an1 - 4), "B": str(an1 - 2), "C": str(an1), "D": str(an1 + 2), "E": str(an1 + 4)},
        "clave": "C",
        "teoria": "En toda progresión aritmética con término inicial $t_1$ y razón común $r$, el término general es $t_n = t_1 + (n-1)r$.",
        "solucion": f"1. Datos: $t_1 = {a1}$, $r = {r1}$, $n = {n1}$.\n2. Aplicamos la fórmula: $t_{{{n1}}} = {a1} + ({n1}-1)({r1}) = {a1} + {(n1-1)*r1} = {an1}$."
    })

    # P2: Sucesión Geométrica / Suma Límite
    r2_den = 2 + (s % 3)
    a2_val = 12 * r2_den
    suma_lim = (a2_val * r2_den) / (r2_den - 1)
    preguntas.append({
        "num": 2, "materia": "Razonamiento Matemático", "tema": "Series Geométricas Infinitas Convergentes",
        "dificultad": "Intermedio", "arquetipo": "Suma límite de serie decreciente: $S = \\frac{a_1}{1 - r}$",
        "enunciado": f"Calcule la suma límite de la siguiente serie geométrica infinita decreciente:\n$$S = {a2_val} + {a2_val//r2_den} + \\frac{{{a2_val}}}{{{r2_den**2}}} + \\cdots$$",
        "opciones": {"A": f"{int(suma_lim - 4)}", "B": f"{int(suma_lim)}", "C": f"{int(suma_lim + 4)}", "D": f"{int(suma_lim + 8)}", "E": f"{int(suma_lim + 12)}"},
        "clave": "B",
        "teoria": "Para $|r| < 1$, la suma de infinitos términos de una progresión geométrica converge a $S = \\frac{t_1}{1-r}$.",
        "solucion": f"1. Primer término: $t_1 = {a2_val}$, razón $r = 1/{r2_den}$.\n2. $S = \\frac{{{a2_val}}}{{1 - 1/{r2_den}}} = \\frac{{{a2_val}}}{{({r2_den}-1)/{r2_den}}} = \\frac{{{a2_val * r2_den}}}{{{r2_den - 1}}} = {int(suma_lim)}$."
    })

    # P3: Operadores Matemáticos Arbitrarios
    m3 = 3 + (s % 4)
    n3 = 2 + (s % 3)
    x3 = 5
    y3 = 4
    res3 = m3 * x3 - n3 * y3 + 1
    preguntas.append({
        "num": 3, "materia": "Razonamiento Matemático", "tema": "Operadores Matemáticos con Regla Explícita",
        "dificultad": "Básico", "arquetipo": "Operación binaria: $a \\odot b = m a - n b + k$",
        "enunciado": f"Se define la operación matemática en $\\mathbb{{R}}$ como:\n$$x \\odot y = {m3}x - {n3}y + 1$$\nCalcule el valor numérico de ${x3} \\odot {y3}$.",
        "opciones": {"A": str(res3 - 3), "B": str(res3 - 1), "C": str(res3), "D": str(res3 + 2), "E": str(res3 + 5)},
        "clave": "C",
        "teoria": "Se reemplazan las variables por los argumentos específicos en la ley de correspondencia del operador.",
        "solucion": f"1. Reemplazamos $x = {x3}$, $y = {y3}$:\n   ${x3} \\odot {y3} = {m3}({x3}) - {n3}({y3}) + 1 = {m3*x3} - {n3*y3} + 1 = {res3}$."
    })

    # P4: Operadores con Tablas de Doble Entrada
    preguntas.append({
        "num": 4, "materia": "Razonamiento Matemático", "tema": "Operaciones Binarias en Conjuntos Finitos",
        "dificultad": "Intermedio", "arquetipo": "Identificación de elemento neutro e inversos en tablas",
        "enunciado": "Dada la siguiente tabla para la operación $*$ definida en $A = \\{1, 2, 3, 4\\}$:\n\n| $*$ | 1 | 2 | 3 | 4 |\n| :-: | :-: | :-: | :-: | :-: |\n| **1** | 3 | 4 | 1 | 2 |\n| **2** | 4 | 1 | 2 | 3 |\n| **3** | 1 | 2 | 3 | 4 |\n| **4** | 2 | 3 | 4 | 1 |\n\nDetermine el elemento neutro $e$ de dicha operación y el inverso de 2 ($2^{-1}$).",
        "opciones": {"A": "$e = 1;\\ 2^{-1} = 4$", "B": "$e = 2;\\ 2^{-1} = 3$", "C": "$e = 3;\\ 2^{-1} = 4$", "D": "$e = 3;\\ 2^{-1} = 1$", "E": "$e = 4;\\ 2^{-1} = 2$"},
        "clave": "C",
        "teoria": "El elemento neutro $e$ reproduce idénticamente la fila y columna principal. El inverso $a^{-1}$ verifica $a * a^{-1} = e$.",
        "solucion": "1. La fila del 3 coincide exactamente con la cabecera (1, 2, 3, 4), y la columna del 3 también $\\implies e = 3$.\n2. Para hallar $2^{-1}$, en la fila de 2 el resultado 3 está en la columna 4: $2 * 4 = 3 \\implies 2^{-1} = 4$.\n3. Por tanto, $e = 3$ y $2^{-1} = 4$."
    })

    # P5: Certezas y Peor Escenario
    r5 = 8 + (s % 5)
    a5 = 6 + (s % 4)
    v5 = 4 + (s % 3)
    extr5 = r5 + a5 + 1
    preguntas.append({
        "num": 5, "materia": "Razonamiento Matemático", "tema": "Problemas sobre Certezas",
        "dificultad": "Intermedio", "arquetipo": "Principio del peor caso en extracciones sin reposición",
        "enunciado": f"En una caja no transparente se tienen {r5} bolas rojas, {a5} bolas azules y {v5} bolas verdes. ¿Cuántas bolas se deben extraer al azar como mínimo para estar absolutamente seguro de haber obtenido al menos una bola verde?",
        "opciones": {"A": str(extr5 - 3), "B": str(extr5 - 1), "C": str(extr5), "D": str(extr5 + 2), "E": str(extr5 + 4)},
        "clave": "C",
        "teoria": "En el peor de los casos, se extraen consecutivamente todas las bolas de los colores que NO se desean antes de extraer la primera del color pedido.",
        "solucion": f"1. Peor escenario: Extraer todas las rojas ({r5}) y todas las azules ({a5}).\n2. Subtotal: {r5} + {a5} = {r5 + a5} bolas sin ninguna verde.\n3. La siguiente bola debe ser obligatoriamente verde.\n4. Total mínimo: {r5 + a5} + 1 = {extr5}."
    })

    # P6: Problemas sobre Edades
    k6 = 2 + (s % 3)
    edad_yo = 16 + (s % 6)
    edad_tu = edad_yo - 4
    preguntas.append({
        "num": 6, "materia": "Razonamiento Matemático", "tema": "Planteo de Ecuaciones: Edades",
        "dificultad": "Intermedio", "arquetipo": "Diferencia de edades constante en el tiempo",
        "enunciado": f"Yo tengo el doble de la edad que tú tenías cuando yo tenía la edad que tú tienes. Si la suma de nuestras edades actuales es {edad_yo + edad_tu} años, ¿cuál es mi edad actual?",
        "opciones": {"A": str(edad_yo - 4), "B": str(edad_yo - 2), "C": str(edad_yo), "D": str(edad_yo + 2), "E": str(edad_yo + 4)},
        "clave": "C",
        "teoria": "La diferencia de edades entre dos personas permanece estrictamente constante a lo largo de cualquier tiempo cronológico.",
        "solucion": f"1. Sea tu edad pasada $y$, mi edad actual $2y$. Mi edad pasada es $x$, que es tu edad actual $x$.\n2. Diferencia constante: $2y - x = x - y \\implies 3y = 2x \\implies x = 1.5y$.\n3. Suma actual: $2y + x = {edad_yo + edad_tu} \\implies 3.5y = {edad_yo + edad_tu} \\implies y = {(edad_yo + edad_tu)/3.5:.0f}$.\n4. Mi edad actual es $2y = {edad_yo}$ años."
    })

    # P7: Planteo de Ecuaciones (Monedas / Compras)
    mon_tot = 30 + (s % 10)
    mon_5 = 12 + (s % 6)
    mon_2 = mon_tot - mon_5
    dinero_tot = 5 * mon_5 + 2 * mon_2
    preguntas.append({
        "num": 7, "materia": "Razonamiento Matemático", "tema": "Sistemas Lineales Aplicados a Monedas",
        "dificultad": "Básico", "arquetipo": "Método del rombo o sistema de dos variables",
        "enunciado": f"Se tiene un total de {mon_tot} monedas, algunas de S/ 2 y otras de S/ 5, sumando un monto total de S/ {dinero_tot}. ¿Cuántas monedas son de S/ 5?",
        "opciones": {"A": str(mon_5 - 4), "B": str(mon_5 - 2), "C": str(mon_5), "D": str(mon_5 + 2), "E": str(mon_5 + 4)},
        "clave": "C",
        "teoria": "Sistema de dos ecuaciones con dos incógnitas: $x + y = N$, $2x + 5y = M$.",
        "solucion": f"1. Sea $x$ monedas de 2 y $y$ de 5. $x + y = {mon_tot} \\implies 2x + 2y = {2*mon_tot}$.\n2. Restando de $2x + 5y = {dinero_tot}$:\n   $3y = {dinero_tot - 2*mon_tot} \\implies y = {mon_5}$.\n3. Hay {mon_5} monedas de S/ 5."
    })

    # P8: Móviles (Encuentro y Alcance)
    v1_8 = 40 + (s % 15)
    v2_8 = 60 + (s % 15)
    t_enc = 3 + (s % 3)
    dist8 = (v1_8 + v2_8) * t_enc
    preguntas.append({
        "num": 8, "materia": "Razonamiento Matemático", "tema": "Cinemática y Problemas de Móviles",
        "dificultad": "Básico", "arquetipo": "Tiempo de encuentro con MRU: $t_e = \\frac{d}{v_1 + v_2}$",
        "enunciado": f"Dos trenes parten simultáneamente al encuentro desde dos estaciones separadas por una distancia de {dist8} km, con velocidades constantes de {v1_8} km/h y {v2_8} km/h por vías paralelas. ¿Al cabo de cuántas horas se producirá el cruce?",
        "opciones": {"A": str(t_enc - 1), "B": str(t_enc), "C": str(t_enc + 1), "D": str(t_enc + 2), "E": str(t_enc + 3)},
        "clave": "B",
        "teoria": "En el movimiento rectilíneo en sentidos contrarios, la velocidad relativa de aproximación es $v_{rel} = v_1 + v_2$.",
        "solucion": f"1. Fórmula: $t_e = \\frac{{d}}{{v_1 + v_2}} = \\frac{{{dist8}}}{{{v1_8} + {v2_8}}} = \\frac{{{dist8}}}{{{v1_8 + v2_8}}} = {t_enc}$ horas."
    })

    # P9: Cronometría (Campanadas)
    c9_1 = 5
    t9_1 = 12 + (s % 4)
    i9_1 = c9_1 - 1
    t_int = t9_1 / i9_1
    c9_2 = 9
    t9_2 = int((c9_2 - 1) * t_int)
    preguntas.append({
        "num": 9, "materia": "Razonamiento Matemático", "tema": "Cronometría: Campanadas e Intervalos",
        "dificultad": "Básico", "arquetipo": "Relación entre número de campanadas y número de intervalos ($I = C - 1$)",
        "enunciado": f"Un campanario de una iglesia limeña da {c9_1} campanadas en {t9_1} segundos. ¿Cuánto tiempo demorará en dar {c9_2} campanadas?",
        "opciones": {"A": str(t9_2 - 4), "B": str(t9_2 - 2), "C": str(t9_2), "D": str(t9_2 + 2), "E": str(t9_2 + 4)},
        "clave": "C",
        "teoria": "El tiempo transcurrido es directamente proporcional al número de intervalos entre campanadas, no al número de campanadas.",
        "solucion": f"1. {c9_1} campanadas corresponden a {i9_1} intervalos.\n2. Tiempo por intervalo: $t_i = {t9_1} / {i9_1} = {t_int}$ s.\n3. Para {c9_2} campanadas hay {c9_2 - 1} intervalos: $T = {c9_2 - 1} \\times {t_int} = {t9_2}$ segundos."
    })

    # P10: Cronometría (Ángulo de Manecillas)
    h10 = 4
    m10 = 20
    ang10 = abs(30 * h10 - 11 * m10 / 2)
    preguntas.append({
        "num": 10, "materia": "Razonamiento Matemático", "tema": "Cronometría: Ángulos entre Manecillas del Reloj",
        "dificultad": "Intermedio", "arquetipo": "Fórmula general de manecillas: $\\theta = |30H - \\frac{11}{2}M|$",
        "enunciado": f"¿Qué ángulo forman el horario y el minutero de un reloj analógico a las {h10}:{m10:02d} horas?",
        "opciones": {"A": f"{int(ang10 - 10)}°", "B": f"{int(ang10 - 5)}°", "C": f"{int(ang10)}°", "D": f"{int(ang10 + 5)}°", "E": f"{int(ang10 + 10)}°"},
        "clave": "C",
        "teoria": "Para $H$ horas y $M$ minutos, el ángulo agudo o convexo entre manecillas es $\\theta = |30H - 5.5M|$.",
        "solucion": f"1. Con $H = {h10}$ y $M = {m10}$:\n   $\\theta = |30({h10}) - 5.5({m10})| = |{30*h10} - {int(5.5*m10)}| = {int(ang10)}^\\circ$."
    })

    # P11: Fracciones y Reducción a la Unidad
    t1_11 = 6
    t2_11 = 12
    preguntas.append({
        "num": 11, "materia": "Razonamiento Matemático", "tema": "Reducción a la Unidad: Grifos y Desagües",
        "dificultad": "Intermedio", "arquetipo": "Trabajo conjunto: $\\frac{1}{T} = \\frac{1}{t_1} + \\frac{1}{t_2}$",
        "enunciado": f"Un grifo $A$ puede llenar una piscina en {t1_11} horas, mientras que un grifo $B$ la llena en {t2_11} horas. Si se abren ambos grifos simultáneamente estando vacía la piscina, ¿en cuántas horas se llenará por completo?",
        "opciones": {"A": "3 h", "B": "4 h", "C": "5 h", "D": "6 h", "E": "8 h"},
        "clave": "B",
        "teoria": "En una hora, el grifo $A$ llena $1/t_1$ y el $B$ llena $1/t_2$. Juntos llenan $1/t_1 + 1/t_2$ por hora.",
        "solucion": f"1. Rendimiento conjunto: $\\frac{{1}}{{{t1_11}}} + \\frac{{1}}{{{t2_11}}} = \\frac{{2+1}}{{{t2_11}}} = \\frac{{3}}{{12}} = \\frac{{1}}{{4}}$.\n2. Tiempo total para llenar la piscina: 4 horas."
    })

    # P12: Descuentos y Aumentos Sucesivos
    d1_12 = 20
    d2_12 = 30
    preguntas.append({
        "num": 12, "materia": "Razonamiento Matemático", "tema": "Tanto por Ciento: Descuentos Sucesivos",
        "dificultad": "Básico", "arquetipo": "Descuento único: $D_u = [d_1 + d_2 - \\frac{d_1 d_2}{100}]\\%$",
        "enunciado": f"En una tienda por departamento se ofrecen dos descuentos sucesivos del {d1_12}% y {d2_12}% en artículos electrónicos. ¿A qué descuento único equivalente corresponden?",
        "opciones": {"A": "40%", "B": "44%", "C": "46%", "D": "50%", "E": "56%"},
        "clave": "B",
        "teoria": "Fórmula del descuento único: $D_u = d_1 + d_2 - \\frac{d_1 d_2}{100}$.",
        "solucion": f"1. $D_u = {d1_12} + {d2_12} - \\frac{{{d1_12} \\times {d2_12}}}{{100}} = 50 - 6 = 44\\%$."
    })

    # P13: Análisis Combinatorio (Principio Multiplicativo)
    c13_1 = 4 + (s % 3)
    c13_2 = 5 + (s % 2)
    c13_3 = 3
    comb13 = c13_1 * c13_2 * c13_3
    preguntas.append({
        "num": 13, "materia": "Razonamiento Matemático", "tema": "Análisis Combinatorio: Principios Fundamentales",
        "dificultad": "Básico", "arquetipo": "Principio fundamental de conteo (multiplicación)",
        "enunciado": f"Una ingeniera desea vestirse disponiendo de {c13_1} blusas diferentes, {c13_2} pantalones distintos y {c13_3} pares de zapatos. ¿De cuántas maneras diferentes puede vestirse?",
        "opciones": {"A": str(comb13 - 10), "B": str(comb13 - 5), "C": str(comb13), "D": str(comb13 + 5), "E": str(comb13 + 10)},
        "clave": "C",
        "teoria": "Si un evento consta de etapas secuenciales independientes con $n_1, n_2, \\dots$ formas, el total es $n_1 \\times n_2 \\times \\dots$.",
        "solucion": f"1. Total de maneras: ${c13_1} \\times {c13_2} \\times {c13_3} = {comb13}$."
    })

    # P14: Permutaciones Circulares
    n14 = 6
    preguntas.append({
        "num": 14, "materia": "Razonamiento Matemático", "tema": "Análisis Combinatorio: Permutación Circular",
        "dificultad": "Intermedio", "arquetipo": "Permutación circular: $PC(n) = (n-1)!$",
        "enunciado": f"¿De cuántas maneras diferentes pueden sentarse {n14} catedráticos de la UNI alrededor de una mesa circular?",
        "opciones": {"A": "60", "B": "120", "C": "240", "D": "720", "E": "840"},
        "clave": "B",
        "teoria": "En ordenamientos circulares, se fija un elemento como referencia: $PC(n) = (n-1)!$.",
        "solucion": f"1. $PC({n14}) = ({n14}-1)! = 5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$."
    })

    # P15: Combinaciones y Comités
    n15 = 8
    k15 = 3
    preguntas.append({
        "num": 15, "materia": "Razonamiento Matemático", "tema": "Análisis Combinatorio: Combinaciones Simples",
        "dificultad": "Intermedio", "arquetipo": "Selección no ordenada de subconjuntos: $C_k^n = \\frac{n!}{k!(n-k)!}$",
        "enunciado": f"De un grupo de {n15} investigadores, se desea formar una comisión evaluadora compuesta por {k15} miembros. ¿Cuántas comisiones distintas se pueden constituir?",
        "opciones": {"A": "48", "B": "56", "C": "64", "D": "72", "E": "84"},
        "clave": "B",
        "teoria": "El número de formas de elegir $k$ elementos de un total de $n$ sin importar el orden es $C(n, k) = \\frac{n!}{k!(n-k)!}$.",
        "solucion": f"1. $C({n15}, {k15}) = \\frac{{{n15} \\times 7 \\times 6}}{{3 \\times 2 \\times 1}} = 56$."
    })

    # P16: Probabilidad Clásica (Regla de Laplace)
    preguntas.append({
        "num": 16, "materia": "Razonamiento Matemático", "tema": "Probabilidades: Regla de Laplace",
        "dificultad": "Básico", "arquetipo": "Cálculo en lanzamiento de dos dados no trucados",
        "enunciado": "Al lanzar simultáneamente dos dados normales de seis caras, ¿cuál es la probabilidad de que la suma de los puntos obtenidos sea exactamente igual a 8?",
        "opciones": {"A": "1/12", "B": "5/36", "C": "1/6", "D": "7/36", "E": "2/9"},
        "clave": "B",
        "teoria": "Probabilidad clásica de Laplace: $P(E) = \\frac{\\text{Casos Favorables}}{\\text{Casos Totales}}$. Con dos dados, el espacio muestral es $6 \\times 6 = 36$.",
        "solucion": "1. Casos que suman 8: (2,6), (3,5), (4,4), (5,3), (6,2) $\\implies$ 5 casos favorables.\n2. Casos totales: 36.\n3. $P = 5/36$."
    })

    # P17: Probabilidad Condicional
    preguntas.append({
        "num": 17, "materia": "Razonamiento Matemático", "tema": "Probabilidad Condicional",
        "dificultad": "Avanzado / Filtro", "arquetipo": "Fórmula: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$",
        "enunciado": "En un aula de la UNI el 60% de los estudiantes aprobó Física, el 50% aprobó Cálculo y el 30% aprobó ambos cursos. Si se elige al azar un estudiante y se sabe que aprobó Física, ¿cuál es la probabilidad de que también haya aprobado Cálculo?",
        "opciones": {"A": "1/3", "B": "1/2", "C": "3/5", "D": "2/3", "E": "5/6"},
        "clave": "B",
        "teoria": "Probabilidad condicional: $P(C|F) = \\frac{P(C \\cap F)}{P(F)}$.",
        "solucion": "1. $P(F) = 0.60$, $P(C \\cap F) = 0.30$.\n2. $P(C|F) = \\frac{0.30}{0.60} = \\frac{1}{2}$ (50%)."
    })

    # P18: Razonamiento Inductivo (Suma de cifras)
    preguntas.append({
        "num": 18, "materia": "Razonamiento Matemático", "tema": "Razonamiento Inductivo",
        "dificultad": "Intermedio", "arquetipo": "Patrón en números repetitivos: $(333\\dots33)^2$",
        "enunciado": "Calcule la suma de cifras del resultado de efectuar la siguiente operación:\n$$E = (\\underbrace{333\\ldots333}_{50\\text{ cifras}})^2$$",
        "opciones": {"A": "300", "B": "350", "C": "400", "D": "450", "E": "500"},
        "clave": "D",
        "teoria": "Método inductivo analizando casos particulares:\nCaso 1 (1 cifra): $3^2 = 9 \\implies \\Sigma = 9 = 9(1)$\nCaso 2 (2 cifras): $33^2 = 1089 \\implies \\Sigma = 18 = 9(2)$\nCaso 3 (3 cifras): $333^2 = 110889 \\implies \\Sigma = 27 = 9(3)$",
        "solucion": "1. Para $n$ cifras, la suma es siempre $9n$.\n2. Con $n = 50$: $\\Sigma = 9 \\times 50 = 450$."
    })

    # P19: Conteo de Figuras (Triángulos)
    n19 = 5 + (s % 3)
    triang19 = (n19 * (n19 + 1)) // 2
    preguntas.append({
        "num": 19, "materia": "Razonamiento Matemático", "tema": "Conteo de Figuras Geométricas",
        "dificultad": "Básico", "arquetipo": "Conteo de triángulos que comparten un vértice: $N = \\frac{n(n+1)}{2}$",
        "enunciado": f"Determine el número total de triángulos en una figura donde desde el vértice superior caen líneas hacia la base dividiéndola en {n19} sectores simples.",
        "opciones": {"A": str(triang19 - 3), "B": str(triang19 - 1), "C": str(triang19), "D": str(triang19 + 2), "E": str(triang19 + 4)},
        "clave": "C",
        "teoria": "Para $n$ espacios simples en la base, el número de triángulos es $\\frac{n(n+1)}{2}$.",
        "solucion": f"1. Aplicamos la fórmula: $N = \\frac{{{n19} \\times {n19+1}}}{{2}} = {triang19}$."
    })

    # P20: Áreas Sombreadas
    l20 = 4 + (s % 4) * 2
    area_cuad = l20**2
    preguntas.append({
        "num": 20, "materia": "Razonamiento Matemático", "tema": "Áreas de Regiones Sombreadas",
        "dificultad": "Intermedio", "arquetipo": "Fracciones geométricas y simetría en el cuadrado",
        "enunciado": f"En un cuadrado $ABCD$ de lado {l20} cm, se unen los puntos medios de sus lados formando un nuevo cuadrado interior. Calcule el área de la región comprendida entre ambos cuadrados.",
        "opciones": {"A": f"{area_cuad//4} cm²", "B": f"{area_cuad//2} cm²", "C": f"{3*area_cuad//4} cm²", "D": f"{area_cuad} cm²", "E": f"{area_cuad + 4} cm²"},
        "clave": "B",
        "teoria": "El cuadrado formado al unir los puntos medios de los lados de un cuadrado tiene exactamente la mitad del área del cuadrado original.",
        "solucion": f"1. Área total del cuadrado: ${l20}^2 = {area_cuad}$ cm².\n2. Área del cuadrado interior: $\\frac{{{area_cuad}}}{{2}} = {area_cuad//2}$ cm².\n3. Área entre ambos: ${area_cuad} - {area_cuad//2} = {area_cuad//2}$ cm²."
    })

    # P21: Orden de Información Lineal
    preguntas.append({
        "num": 21, "materia": "Razonamiento Matemático", "tema": "Orden de Información: Ordenamiento Lineal",
        "dificultad": "Básico", "arquetipo": "Deducción lógica de posiciones relativas",
        "enunciado": "Cuatro amigos (Álvaro, Beto, Carlos y Daniel) viven en un edificio de 4 pisos, cada uno en un piso diferente. Se sabe que:\n- Carlos vive más arriba que Daniel.\n- Beto vive en el piso adyacente al de Álvaro y al de Daniel.\n- Álvaro vive en el primer piso.\n¿Quién vive en el cuarto piso?",
        "opciones": {"A": "Álvaro", "B": "Beto", "C": "Carlos", "D": "Daniel", "E": "No se puede determinar"},
        "clave": "C",
        "teoria": "Se ubican las posiciones fijas en una columna vertical y se descartan inconsistencias.",
        "solucion": "1. Piso 1: Álvaro.\n2. Beto es adyacente a Álvaro y Daniel $\\implies$ Piso 2: Beto, Piso 3: Daniel.\n3. Carlos vive más arriba que Daniel $\\implies$ Piso 4: Carlos."
    })

    # P22: Orden de Información Circular
    preguntas.append({
        "num": 22, "materia": "Razonamiento Matemático", "tema": "Orden de Información: Distribución Circular",
        "dificultad": "Intermedio", "arquetipo": "Simetría y posiciones diametralmente opuestas",
        "enunciado": "Seis personas (A, B, C, D, E, F) se sientan simétricamente alrededor de una mesa circular con 6 asientos. Se sabe que:\n- A se sienta frente a B.\n- C está junto y a la derecha de A.\n- D está frente a C.\n- E no está al lado de B.\n¿Quién se sienta a la izquierda de B?",
        "opciones": {"A": "C", "B": "D", "C": "E", "D": "F", "E": "A"},
        "clave": "B",
        "teoria": "En una mesa circular, 'a la derecha' o 'a la izquierda' se toma desde la perspectiva de la persona sentada mirando al centro.",
        "solucion": "1. Posiciones horarias: A(1), C(2) [derecha de A], D(5) [frente a C], B(4) [frente a A].\n2. Quedan las posiciones 3 y 6 para E y F. Los vecinos de B(4) son 3 y 5(D). Como E no está junto a B, E va en 6. F va en 3.\n3. A la izquierda de B(4) [sentado mirando al centro] está la posición 5(D)."
    })

    # P23: Cuadro de Decisiones
    preguntas.append({
        "num": 23, "materia": "Razonamiento Matemático", "tema": "Cuadros de Decisiones y Test de Asignación",
        "dificultad": "Intermedio", "arquetipo": "Matriz lógica binaria de verdad",
        "enunciado": "Tres profesionales (Ana, Boris y Celia) ejercen las profesiones de Médica, Ingeniero y Abogado, no necesariamente en ese orden. Se sabe que:\n- Celia es la médica.\n- El ingeniero no conoce a Boris.\n¿Qué profesión tiene Boris?",
        "opciones": {"A": "Médico", "B": "Ingeniero", "C": "Abogado", "D": "Profesor", "E": "Contador"},
        "clave": "C",
        "teoria": "Matriz lógica con valores únicos por fila y columna.",
        "solucion": "1. Celia = Médica.\n2. Quedan Ana y Boris con Ingeniería y Derecho.\n3. 'El ingeniero no conoce a Boris' implica que Boris no es el ingeniero.\n4. Por lo tanto, Boris = Abogado y Ana = Ingeniera."
    })

    # P24: Trasvases sin Medidas
    preguntas.append({
        "num": 24, "materia": "Razonamiento Matemático", "tema": "Problemas de Trasvases",
        "dificultad": "Intermedio", "arquetipo": "Cantidad mínima de trasvases sin desperdiciar líquido",
        "enunciado": "Se tiene un recipiente lleno con 8 litros de agua y dos recipientes vacíos de 5 y 3 litros de capacidad, ninguno con marcas de graduación. ¿Cuál es el número mínimo de trasvases necesarios para obtener exactamente 4 litros en uno de ellos?",
        "opciones": {"A": "4", "B": "5", "C": "6", "D": "7", "E": "8"},
        "clave": "C",
        "teoria": "Algoritmo de trasvases optimizado respetando capacidades máximas.",
        "solucion": "1. Estado inicial: (8, 0, 0)\n2. De 8 a 5: (3, 5, 0)\n3. De 5 a 3: (3, 2, 3)\n4. De 3 a 8: (6, 2, 0)\n5. De 5 a 3: (6, 0, 2)\n6. De 8 a 5: (1, 5, 2)\n7. De 5 a 3: (1, 4, 3) $\\to$ ¡Se obtienen 4 litros en el segundo recipiente en 6 trasvases!"
    })

    # P25: Parentescos
    preguntas.append({
        "num": 25, "materia": "Razonamiento Matemático", "tema": "Relaciones de Parentesco",
        "dificultad": "Básico", "arquetipo": "Lectura regresiva del parentesco",
        "enunciado": "¿Qué parentesco tiene conmigo el único hijo del padre de mi padre?",
        "opciones": {"A": "Mi abuelo", "B": "Mi padre", "C": "Mi tío", "D": "Mi hermano", "E": "Mi primo"},
        "clave": "B",
        "teoria": "Se lee de atrás hacia adelante: 'el padre de mi padre' = mi abuelo paterno. 'El único hijo de mi abuelo' = mi padre.",
        "solucion": "1. Padre de mi padre: mi abuelo.\n2. El único hijo de mi abuelo paterno: mi padre.\n3. Por tanto, es mi padre."
    })

    # P26: Verdades y Mentiras
    preguntas.append({
        "num": 26, "materia": "Razonamiento Matemático", "tema": "Lógica Recreativa: Verdades y Mentiras",
        "dificultad": "Intermedio", "arquetipo": "Identificación de proposiciones contradictorias",
        "enunciado": "Cuatro sospechosos declaran ante el juez sobre quién tomó un libro:\n- Alan: 'Fue Beto'.\n- Beto: 'Fue Daniel'.\n- Carlos: 'Yo no fui'.\n- Daniel: 'Beto miente'.\nSi solo uno de ellos dice la verdad, ¿quién tomó el libro?",
        "opciones": {"A": "Alan", "B": "Beto", "C": "Carlos", "D": "Daniel", "E": "No se puede determinar"},
        "clave": "C",
        "teoria": "Las proposiciones contradictorias (Beto y Daniel) garantizan que entre ellas hay una verdad y una mentira.",
        "solucion": "1. Beto y Daniel se contradicen $\\implies$ uno dice la verdad y el otro miente.\n2. Como hay una sola verdad en total, Alan y Carlos dicen mentiras necesariamente.\n3. Si Carlos miente ('Yo no fui' es falso), entonces Carlos fue quien tomó el libro."
    })

    # P27: Cortes y Estacas
    l27 = 60 + (s % 20)
    d27 = 5
    num_cortes = (l27 // d27) - 1
    preguntas.append({
        "num": 27, "materia": "Razonamiento Matemático", "tema": "Cortes y Secciones Longitudianles",
        "dificultad": "Básico", "arquetipo": "Número de cortes en línea abierta: $N_c = \\frac{L_t}{L_u} - 1$",
        "enunciado": f"Se tiene una barra de acero de {l27} metros de longitud. Si se desea cortarla en pedazos de {d27} metros cada uno, ¿cuántos cortes deben realizarse?",
        "opciones": {"A": str(num_cortes - 2), "B": str(num_cortes - 1), "C": str(num_cortes), "D": str(num_cortes + 1), "E": str(num_cortes + 2)},
        "clave": "C",
        "teoria": "En una longitud abierta, el número de cortes es una unidad menor que el número de trozos resultantes.",
        "solucion": f"1. Trozos: ${l27} / {d27} = {l27 // d27}$.\n2. Cortes requeridos: ${l27 // d27} - 1 = {num_cortes}$."
    })

    # P28: Ruedas y Engranajes
    d1_28 = 20
    d2_28 = 50
    v1_28 = 100
    v2_28 = (d1_28 * v1_28) // d2_28
    preguntas.append({
        "num": 28, "materia": "Razonamiento Matemático", "tema": "Transmisión de Movimiento: Engranajes",
        "dificultad": "Intermedio", "arquetipo": "Relación inversamente proporcional: $D_1 \\times V_1 = D_2 \\times V_2$",
        "enunciado": f"Dos engranajes en contacto tienen {d1_28} y {d2_28} dientes respectivamente. Si el engranaje menor gira a razón de {v1_28} vueltas por minuto, ¿cuántas vueltas por minuto dará el engranaje mayor?",
        "opciones": {"A": "30", "B": "35", "C": "40", "D": "45", "E": "50"},
        "clave": "C",
        "teoria": "El número de vueltas es inversamente proporcional al número de dientes de cada rueda dentada engranada.",
        "solucion": f"1. $D_1 V_1 = D_2 V_2 \\implies {d1_28} \\times {v1_28} = {d2_28} \\times V_2$.\n2. $V_2 = \\frac{{{d1_28 * v1_28}}}{{{d2_28}}} = {v2_28}$ vueltas/min."
    })

    # P29: Distribuciones Numéricas
    preguntas.append({
        "num": 29, "materia": "Razonamiento Matemático", "tema": "Distribuciones Numéricas en Arreglos",
        "dificultad": "Intermedio", "arquetipo": "Regla de formación algebraica en filas o columnas",
        "enunciado": "Halle el valor de $x$ en la siguiente distribución numérica:\n\n4   (14)   3\n5   (22)   4\n6   ( x )   5",
        "opciones": {"A": "28", "B": "30", "C": "32", "D": "34", "E": "36"},
        "clave": "C",
        "teoria": "Se analiza la relación aritmética entre los extremos para generar el término central: $c = a \\times b + 2$.",
        "solucion": "1. Fila 1: $4 \\times 3 + 2 = 14$.\n2. Fila 2: $5 \\times 4 + 2 = 22$.\n3. Fila 3: $6 \\times 5 + 2 = 32$. Por tanto, $x = 32$."
    })

    # P30: Cuadrados Mágicos
    preguntas.append({
        "num": 30, "materia": "Razonamiento Matemático", "tema": "Cuadrados Mágicos Aditivos de Orden 3",
        "dificultad": "Intermedio", "arquetipo": "Constante mágica $S = 3C$ donde $C$ es el término central",
        "enunciado": "En un cuadrado mágico aditivo de orden $3 \\times 3$ formado por números enteros positivos, la casilla central está ocupada por el número 15. Determine la suma constante (suma mágica) de cualquier fila, columna o diagonal.",
        "opciones": {"A": "30", "B": "40", "C": "45", "D": "50", "E": "60"},
        "clave": "C",
        "teoria": "En todo cuadrado mágico aditivo de orden 3, la suma mágica $S$ verifica estrictamente $S = 3 \\times C$, siendo $C$ el casillero central.",
        "solucion": "1. Casilla central: $C = 15$.\n2. Suma constante: $S = 3 \\times 15 = 45$."
    })

    # P31: Balanzas y Pesadas
    preguntas.append({
        "num": 31, "materia": "Razonamiento Matemático", "tema": "Pesadas y Balanza de Dos Platillos",
        "dificultad": "Intermedio", "arquetipo": "Potencias de 3 en sistema de pesas de Bachet",
        "enunciado": "Se dispone de una balanza de dos platillos y tres pesas de 1 kg, 3 kg y 9 kg. ¿Cuántos pesos diferentes de objetos (números enteros de kilogramos) se pueden medir exactamente en una sola pesada si las pesas pueden colocarse en cualquiera de los dos platillos?",
        "opciones": {"A": "7", "B": "10", "C": "13", "D": "15", "E": "27"},
        "clave": "C",
        "teoria": "Teorema de las pesas de Bachet (sistema ternario balanceado): Con $n$ pesas de potencias de 3 se pueden pesar exactamente $\\frac{3^n - 1}{2}$ valores distintos.",
        "solucion": "1. Con 3 pesas: $\\frac{3^3 - 1}{2} = \\frac{27 - 1}{2} = 13$ pesos enteros posibles (de 1 kg a 13 kg)."
    })

    # P32: Rutas y Caminos en Cuadrícula
    preguntas.append({
        "num": 32, "materia": "Razonamiento Matemático", "tema": "Rutas y Trayectorias Mínimas",
        "dificultad": "Intermedio", "arquetipo": "Combinaciones con repetición en cuadrículas: $C_{m}^{m+n}$",
        "enunciado": "En una cuadrícula de 3 cuadras de ancho por 2 cuadras de alto, ¿de cuántas formas diferentes puede una persona desplazarse desde la esquina inferior izquierda hasta la esquina superior derecha avanzando únicamente hacia el norte o hacia el este?",
        "opciones": {"A": "6", "B": "8", "C": "10", "D": "12", "E": "15"},
        "clave": "C",
        "teoria": "Se deben dar 3 pasos al Este y 2 pasos al Norte: $N = \\frac{(3+2)!}{3! 2!} = \\frac{5!}{3! 2!} = 10$.",
        "solucion": "1. $C(5, 2) = \\frac{5 \\times 4}{2 \\times 1} = 10$ trayectorias distintas."
    })

    # P33: Máximos y Mínimos
    preguntas.append({
        "num": 33, "materia": "Razonamiento Matemático", "tema": "Optimización Algebraica: Máximos y Mínimos",
        "dificultad": "Intermedio", "arquetipo": "Máximo producto con suma constante (números iguales)",
        "enunciado": "La suma de dos números reales positivos $x$ e $y$ es igual a 20. Determine el valor máximo posible que puede tomar su producto $P = x \\cdot y$.",
        "opciones": {"A": "80", "B": "90", "C": "96", "D": "100", "E": "120"},
        "clave": "D",
        "teoria": "Para suma constante, el producto de dos reales positivos alcanza su valor máximo cuando ambos son iguales ($x = y$).",
        "solucion": "1. $x + y = 20 \\implies y = 20 - x$.\n2. $P(x) = 20x - x^2 = -(x - 10)^2 + 100$.\n3. El valor máximo es 100, cuando $x = y = 10$."
    })

    # P34: Suficiencia de Datos I
    preguntas.append({
        "num": 34, "materia": "Razonamiento Matemático", "tema": "Suficiencia de Datos: Geometría",
        "dificultad": "Avanzado / Filtro", "arquetipo": "Determinación de unicidad de área con datos (1) y (2)",
        "enunciado": "Se desea determinar el área de un triángulo rectángulo.\nInformación brindada:\n(1) La longitud de la hipotenusa es 10 cm.\n(2) El perímetro del triángulo es 24 cm.\nPara resolver el problema:",
        "opciones": {
            "A": "La información (1) es suficiente.",
            "B": "La información (2) es suficiente.",
            "C": "Es necesario utilizar ambas informaciones juntas.",
            "D": "Cada una de las informaciones por separado es suficiente.",
            "E": "Las dos informaciones juntas son insuficientes."
        },
        "clave": "C",
        "teoria": "En un triángulo rectángulo, con hipotenusa $c = 10$ y perímetro $a + b + c = 24$, se deduce $a + b = 14$ y $a^2 + b^2 = 100$, permitiendo despejar el producto $ab$ de manera única: $(a+b)^2 = a^2 + b^2 + 2ab \\implies 196 = 100 + 2ab \\implies ab = 48$.",
        "solucion": "1. Con solo (1): Infinitos triángulos rectángulos tienen hipotenusa 10.\n2. Con solo (2): No se conoce el tipo ni los catetos.\n3. Juntas: $a+b = 14$, $a^2+b^2=100 \\implies 2ab = 196 - 100 = 96 \\implies \\text{Área} = ab/2 = 24$ cm². Se requieren ambas."
    })

    # P35: Suficiencia de Datos II
    preguntas.append({
        "num": 35, "materia": "Razonamiento Matemático", "tema": "Suficiencia de Datos: Aritmética y Álgebra",
        "dificultad": "Avanzado / Filtro", "arquetipo": "Evaluación de suficiencia para el valor de una variable",
        "enunciado": "¿Cuál es el valor del número real $x$?\nInformación brindada:\n(1) $x^2 = 25$\n(2) $x > 0$\nPara resolver el problema:",
        "opciones": {
            "A": "La información (1) es suficiente.",
            "B": "La información (2) es suficiente.",
            "C": "Es necesario utilizar ambas informaciones.",
            "D": "Cada información por separado es suficiente.",
            "E": "La información es insuficiente."
        },
        "clave": "C",
        "teoria": "La condición (1) arroja dos valores posibles ($x = \\pm 5$). La condición (2) desempata el signo.",
        "solucion": "1. (1) entrega $x = 5$ o $x = -5$ (no hay valor único).\n2. (2) solo indica que $x$ es positivo.\n3. Combinando (1) y (2), se concluye de forma única que $x = 5$."
    })


    # =========================================================================
    # SECCIÓN II: RAZONAMIENTO VERBAL (PREGUNTAS 36 A 70)
    # =========================================================================

    # 36: Sinónimo Contextual
    preguntas.append({
        "num": 36, "materia": "Razonamiento Verbal", "tema": "Sinonimia Contextual",
        "dificultad": "Intermedio", "arquetipo": "Significado preciso en texto científico",
        "enunciado": "En el texto: 'El diseño del nuevo reactor nuclear requirió un análisis **minucioso** de los gradientes térmicos', la palabra destacada puede sustituirse sin perder sentido por:",
        "opciones": {"A": "superficial", "B": "exhaustivo", "C": "acelerado", "D": "imprevisto", "E": "empírico"},
        "clave": "B",
        "teoria": "El término minucioso denota detalle, rigurosidad y examen profundo, equivalente a exhaustivo.",
        "solucion": "Exhaustivo expresa el nivel de detenimiento técnico requerido en el análisis termodinámico."
    })

    # 37: Antónimo Contextual
    preguntas.append({
        "num": 37, "materia": "Razonamiento Verbal", "tema": "Antonimia Contextual",
        "dificultad": "Intermedio", "arquetipo": "Oposición semántica contextual",
        "enunciado": "En la frase: 'Sus argumentos resultaron sumamente **endebles** frente a la rigurosa demostración matemática del teorema', el antónimo del término subrayado es:",
        "opciones": {"A": "frágiles", "B": "sólidos", "C": "falaces", "D": "breves", "E": "retóricos"},
        "clave": "B",
        "teoria": "Endeble significa débil o sin consistencia; su antónimo en el contexto argumentativo es sólido o contundente.",
        "solucion": "Un argumento sólido es el opuesto directo de un argumento endeble o inconsistente."
    })

    # 38: Analogía
    preguntas.append({
        "num": 38, "materia": "Razonamiento Verbal", "tema": "Analogías Verbales",
        "dificultad": "Intermedio", "arquetipo": "Relación Instrumento - Objeto de medición",
        "enunciado": "TERMÓMETRO : TEMPERATURA ::",
        "opciones": {"A": "reloj : distancia", "B": "barómetro : presión", "C": "brújula : tiempo", "D": "odómetro : masa", "E": "balanza : volumen"},
        "clave": "B",
        "teoria": "El termómetro es el instrumento concebido para cuantificar la temperatura, así como el barómetro mide la presión atmosférica.",
        "solucion": "Relación analógica de instrumento a magnitud física medida."
    })

    # 39: Analogía Causa - Efecto
    preguntas.append({
        "num": 39, "materia": "Razonamiento Verbal", "tema": "Analogías Verbales",
        "dificultad": "Intermedio", "arquetipo": "Relación Causa - Efecto",
        "enunciado": "FRICCIÓN : CALOR ::",
        "opciones": {"A": "fuerza : velocidad", "B": "gravedad : masa", "C": "chispa : incendio", "D": "inercia : reposo", "E": "energía : trabajo"},
        "clave": "C",
        "teoria": "La fricción genera disipación térmica (calor) por rozamiento, análogamente a como una chispa puede originar un incendio.",
        "solucion": "Relación causal directa entre el fenómeno inicial y su consecuencia."
    })

    # 40: Precisión Léxica
    preguntas.append({
        "num": 40, "materia": "Razonamiento Verbal", "tema": "Precisión Léxica",
        "dificultad": "Intermedio", "arquetipo": "Eliminación de verbos baúl ('poner')",
        "enunciado": "Elija la alternativa que sustituye con mayor precisión la palabra en mayúsculas: 'El ingeniero civil procedió a PONER los cimientos del edificio antisísmico'.",
        "opciones": {"A": "colocar", "B": "fundar", "C": "cimentar", "D": "instalar", "E": "echar"},
        "clave": "C",
        "teoria": "En ingeniería de la edificación, el acto de establecer las bases estructurales o cimientos se denomina técnicamente 'cimentar'.",
        "solucion": "Cimentar es el término técnico de máxima precisión para asentar los cimientos."
    })

    # 41: Precisión Léxica
    preguntas.append({
        "num": 41, "materia": "Razonamiento Verbal", "tema": "Precisión Léxica",
        "dificultad": "Intermedio", "arquetipo": "Sustitución del verbo comodín 'dar'",
        "enunciado": "En la expresión: 'El jurado calificador procedió a DAR el veredicto final', el verbo más apropiado es:",
        "opciones": {"A": "entregar", "B": "dictar", "C": "conceder", "D": "otorgar", "E": "avisar"},
        "clave": "B",
        "teoria": "Los fallos jurídicos, resoluciones y veredictos se 'dictan' o 'emiten'.",
        "solucion": "La colocación léxica formal es 'dictar un veredicto'."
    })

    # 42: Conectores Lógicos
    preguntas.append({
        "num": 42, "materia": "Razonamiento Verbal", "tema": "Conectores Lógicos Interoracionales",
        "dificultad": "Intermedio", "arquetipo": "Relación concesiva y consecutiva",
        "enunciado": "El experimento fue sumamente complejo, _______ se cumplieron todos los protocolos de bioseguridad; _______, los resultados obtenidos fueron validados por la comunidad científica.",
        "opciones": {"A": "porque - en consecuencia", "B": "pero - por ello", "C": "sin embargo - por tanto", "D": "aunque - no obstante", "E": "ya que - es decir"},
        "clave": "C",
        "teoria": "El primer enlace introduce un contraste adversativo ('sin embargo') y el segundo una deducción lógica causal ('por tanto').",
        "solucion": "'Sin embargo' contrasta la dificultad con el cumplimiento de protocolos, y 'por tanto' introduce la conclusión exitosa."
    })

    # 43: Conectores Lógicos
    preguntas.append({
        "num": 43, "materia": "Razonamiento Verbal", "tema": "Conectores Lógicos",
        "dificultad": "Intermedio", "arquetipo": "Conector causal y adversativo",
        "enunciado": "No pudo presentar la tesis a tiempo _______ sufrió un fallo en el disco duro, _______ logró una prórroga extraordinaria del decanato.",
        "opciones": {"A": "debido a que - pero", "B": "por ello - además", "C": "ya que - por consiguiente", "D": "a pesar de que - no obstante", "E": "puesto que - es decir"},
        "clave": "A",
        "teoria": "Se requiere un nexo de causa ('debido a que') seguido de uno de oposición o contraste mitigador ('pero').",
        "solucion": "'Debido a que' explica el motivo de la demora y 'pero' presenta la solución alternativa conseguida."
    })

    # 44: Oración Eliminada
    preguntas.append({
        "num": 44, "materia": "Razonamiento Verbal", "tema": "Información Eliminada / Inatingencia",
        "dificultad": "Intermedio", "arquetipo": "Eliminación por impertinencia temático-disciplinar",
        "enunciado": "(I) La superconductividad es un fenómeno físico caracterizado por la resistencia eléctrica nula.\n(II) Ocurre en ciertos materiales conductores cuando se enfrían por debajo de su temperatura crítica.\n(III) Durante este estado se expulsa por completo el campo magnético, fenómeno conocido como efecto Meissner.\n(IV) Los trenes de levitación magnética (Maglev) aprovechan este principio para desplazarse a altísimas velocidades.\n(V) El cobre es un excelente conductor térmico ampliamente comercializado en el mercado internacional.\n¿Qué enunciado debe eliminarse?",
        "opciones": {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
        "clave": "E",
        "teoria": "Criterio de inatingencia o impertinencia: el enunciado V se desvía del tema central (superconductividad) para hablar del comercio del cobre.",
        "solucion": "El enunciado V introduce una temática mercantil y de conducción ordinaria ajena a la física de la superconductividad."
    })

    # 45: Oración Eliminada
    preguntas.append({
        "num": 45, "materia": "Razonamiento Verbal", "tema": "Información Eliminada / Redundancia",
        "dificultad": "Intermedio", "arquetipo": "Eliminación por redundancia pleonástica",
        "enunciado": "(I) La inteligencia artificial generativa se fundamenta en redes neuronales de aprendizaje profundo.\n(II) Los modelos de lenguaje grandes procesan miles de millones de parámetros para predecir tokens.\n(III) La arquitectura Transformer revolucionó el procesamiento del lenguaje natural mediante mecanismos de auto-atención.\n(IV) Los transformers cambiaron la lingüística computacional al usar auto-atención en redes neuronales.\n(V) Diversas industrias han integrado estas herramientas para optimizar sus flujos de trabajo.\n¿Qué oración debe suprimirse?",
        "opciones": {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
        "clave": "D",
        "teoria": "Criterio de redundancia simple: el enunciado IV repite exactamente la misma información conceptual aportada en el enunciado III.",
        "solucion": "El enunciado IV redunda sin aportar ningún elemento novedoso respecto a III."
    })

    # 46: Plan de Redacción
    preguntas.append({
        "num": 46, "materia": "Razonamiento Verbal", "tema": "Coherencia Textual: Plan de Redacción",
        "dificultad": "Intermedio", "arquetipo": "Estructura lógica deductiva (Definición $\\to$ Origen $\\to$ Aplicación)",
        "enunciado": "EL MÉTODO CIENTÍFICO EN INGENIERÍA\nI. Formulación de hipótesis fundamentadas en modelos matemáticos y leyes físicas.\nII. Planteamiento del problema técnico a partir de una necesidad observada en la industria.\nIII. Conclusiones y optimización del diseño tecnológico final.\nIV. Experimentación controlada y recolección rigurosa de datos empíricos.\nElija el orden secuencial correcto:",
        "opciones": {"A": "II - I - IV - III", "B": "I - II - IV - III", "C": "II - IV - I - III", "D": "IV - II - I - III", "E": "II - I - III - IV"},
        "clave": "A",
        "teoria": "El método científico procede del problema a la hipótesis, luego a la contrastación empírica y finalmente a las conclusiones.",
        "solucion": "Orden canónico: Problema (II) $\\to$ Hipótesis (I) $\\to$ Experimentación (IV) $\\to$ Conclusiones (III)."
    })

    # 47: Plan de Redacción
    preguntas.append({
        "num": 47, "materia": "Razonamiento Verbal", "tema": "Plan de Redacción",
        "dificultad": "Intermedio", "arquetipo": "Esquema histórico cronológico",
        "enunciado": "EVOLUCIÓN DE LA COMPUTACIÓN\nI. Creación de los primeros microprocesadores de silicio en la década de 1970.\nII. Máquinas mecánicas de cálculo ideadas por Pascal y Leibniz.\nIII. Aparición de computadoras cuánticas capaces de procesar qubits en superposición.\nIV. El ordenador ENIAC y el uso de tubos de vacío en la Segunda Guerra Mundial.\nEl ordenamiento lógico es:",
        "opciones": {"A": "II - IV - I - III", "B": "II - I - IV - III", "C": "IV - II - I - III", "D": "I - II - IV - III", "E": "II - IV - III - I"},
        "clave": "A",
        "teoria": "Secuencia cronológica estricta: siglo XVII $\\to$ 1940s $\\to$ 1970s $\\to$ siglo XXI.",
        "solucion": "Pascalina (II) $\\to$ ENIAC (IV) $\\to$ Microprocesador (I) $\\to$ Computación cuántica (III)."
    })

    # 48: Inclusión de Enunciados
    preguntas.append({
        "num": 48, "materia": "Razonamiento Verbal", "tema": "Inclusión de Enunciados",
        "dificultad": "Intermedio", "arquetipo": "Inserción de premisa conectora en párrafo expositivo",
        "enunciado": "[I] La desalinización del agua de mar constituye una alternativa indispensable ante la escasez hídrica global. [II] Entre los métodos modernos, la ósmosis inversa destaca por su eficiencia energética. [III] _____________________. [IV] En consecuencia, el agua resultante queda apta para el consumo humano y el riego agrícola.\nElija la oración que completa coherentemente el texto:",
        "opciones": {
            "A": "Las sales minerales son dañinas en exceso para la salud humana.",
            "B": "Este proceso utiliza membranas semipermeables que retienen iones de cloruro de sodio aplicando alta presión.",
            "C": "Los océanos cubren más del setenta por ciento de la superficie del planeta Tierra.",
            "D": "Muchos países carecen de presupuesto para proyectos de investigación pura.",
            "E": "La evaporación solar requiere grandes extensiones de terreno desértico."
        },
        "clave": "B",
        "teoria": "El enunciado debe explicar el funcionamiento técnico de la ósmosis inversa mencionado en [II] que hace posible la consecuencia en [IV].",
        "solucion": "La opción B define el mecanismo técnico de filtración por membranas a alta presión que purifica el agua."
    })

    # 49 a 70: Banco de Comprensión Lectora y Habilidades Verbales (22 preguntas)
    rv_banco = [
        ("Sinonimia", "EFÍMERO", "duradero", "fugaz", "eterno", "estático", "robusto", "B", "Efímero designa lo pasajero o de corta duración (fugaz)."),
        ("Antonimia", "DILIGENTE", "veloz", "perezoso", "cuidadoso", "experto", "atento", "B", "Diligente alude al esmero y prontitud; su opuesto es perezoso o negligente."),
        ("Analogía", "FÓSFORO : CERILLA ::", "vela : cera", "chispa : fuego", "carbón : brasa", "bala : proyectil", "lámpara : aceite", "A", "Relación de materia prima a objeto manufacturado."),
        ("Analogía", "QUÍMICA : MATERIA ::", "física : átomo", "biología : vida", "historia : libro", "geología : cielo", "álgebra : número", "B", "La química estudia la materia así como la biología estudia la vida."),
        ("Precisión Léxica", "Enunciado: 'El fiscal formuló una grave _______ contra el exfuncionario.'", "palabra", "charla", "imputación", "queja", "discusión", "C", "Imputación es el término procesal exacto para atribuir un delito."),
        ("Precisión Léxica", "Enunciado: 'El presidente de la comisión procedió a _______ la sesión académica.'", "cerrar", "suspender", "clausurar", "parar", "concluir", "C", "Los actos formales solemnes se 'clausuran'."),
        ("Conectores", "Estudió con dedicación _______ no aprobó el examen, _______ no repasó los temas predictivos.", "pero - porque", "y - por ello", "aunque - además", "sin embargo - por tanto", "es decir - o", "A", "Contraste adversativo seguido de causalidad explicativa."),
        ("Conectores", "La energía no se crea _______ se destruye, _______ únicamente se transforma.", "o - si bien", "ni - sino que", "y - por tanto", "pero - dado que", "ni - por ende", "B", "Correlación negativa 'ni' seguida del adversativo 'sino que'."),
        ("Oración Eliminada", "Tema: Nanotecnología. Oración redundante sobre microscopios ópticos convencionales del siglo XIX.", "I", "II", "III", "IV", "V", "E", "Criterio de inatingencia temporal y tecnológica."),
        ("Oración Eliminada", "Tema: La termodinámica de agujeros negros de Hawking.", "I", "II", "III", "IV", "V", "D", "Criterio de digresión biográfica ajena al teorema físico."),
        ("Plan de Redacción", "TÍTULO: LA TEORÍA DE LA RELATIVIDAD ESPECIAL", "I - II - III - IV", "II - I - IV - III", "II - IV - I - III", "IV - I - II - III", "III - II - I - IV", "B", "Antecedentes de éter luminífero $\\to$ Postulados de Einstein $\\to$ Dilatación temporal $\\to$ Confirmación."),
        ("Plan de Redacción", "TÍTULO: SÍNTESIS DE POLÍMEROS BIODEGRADABLES", "II - I - IV - III", "I - II - III - IV", "IV - I - II - III", "II - IV - I - III", "III - I - II - IV", "A", "Origen del problema ambiental $\\to$ Selección de monómeros $\\to$ Polimerización $\\to$ Ensayos de degradación."),
        ("Comprensión Lectora", "Texto sobre el Teorema de Incompletitud de Gödel. Pregunta: ¿Cuál es la idea central?", "Las matemáticas son inconsistentes.", "Ningún sistema axiomático formal recursivo que contenga la aritmética puede ser a la vez completo y consistente.", "Las computadoras superarán a los matemáticos.", "Los axiomas de Peano carecen de valor lógico.", "La lógica de primer orden es infalible.", "B", "Enunciado riguroso del Primer Teorema de Gödel."),
        ("Comprensión Lectora", "Texto sobre entropía y flecha del tiempo. Pregunta: Se infiere que el tiempo cosmológico:", "Es reversible mediante campos magnéticos.", "Está ligado irreversiblemente al aumento de la entropía del universo.", "No depende del estado de los sistemas termodinámicos.", "Fluye en ciclos repetitivos cerrados.", "Se detiene en el cero absoluto.", "B", "La segunda ley de la termodinámica define la flecha irreversible del tiempo macroscópico."),
        ("Término Excluido", "CAMPO ELECTROMAGNÉTICO", "Fotón", "Voltaje", "Carga eléctrica", "Entalpía", "Frecuencia", "D", "La entalpía pertenece a la termoquímica, no es variable electrodinámica pura."),
        ("Término Excluido", "FUNCIONES TRIGONOMÉTRICAS", "Seno", "Tangente", "Cosecante", "Logaritmo", "Cotangente", "D", "El logaritmo es una función trascendente algebraica, no trigonométrica."),
        ("Sentido Conotativo", "En el texto 'el hierro de la censura', el término 'hierro' connota:", "magnetismo", "opresión inflexible", "conductividad", "maleabilidad", "óxido", "B", "Metáfora de dureza y rigidez opresiva."),
        ("Extrapolación", "Si se descubriera un material superconductor a temperatura ambiente comercial:", "La red eléctrica global eliminaría prácticamente las pérdidas de transmisión por calor Joule.", "Se violaría la primera ley de la termodinámica.", "Las baterías de litio dejarían de existir de inmediato.", "La gravedad terrestre disminuiría sensiblemente.", "No tendría aplicaciones en medicina.", "A", "La resistencia nula a temperatura ambiente suprime la disipación $I^2 R$ en redes eléctricas."),
        ("Incompatibilidad", "Respecto a la física cuántica, es incompatible afirmar que:", "El principio de incertidumbre de Heisenberg es una limitación de los instrumentos.", "Existe dualidad onda-partícula.", "El colapso de la función de onda describe probabilidades.", "Los niveles de energía atómica están cuantizados.", "El efecto túnel permite atravesar barreras de potencial.", "A", "La incertidumbre es una propiedad intrínseca ondulatoria de la materia, no un defecto instrumental."),
        ("Inferencia", "Texto sobre la paradoja de Fermi. Se concluye lógicamente que:", "La ausencia de señales extraterrestres detectadas plantea interrogantes sobre la probabilidad de vida tecnológica avanzada.", "Los viajes espaciales son imposibles físicamente.", "La Tierra es el único planeta con agua líquida.", "La teoría de la relatividad es errónea.", "Los radiotelescopios son completamente inútiles.", "A", "Planteamiento formal de la paradoja de Fermi."),
        ("Sinonimia", "INMUTABLE", "voluble", "inalterable", "frágil", "efímero", "falso", "B", "Inmutable significa que no cambia ni experimenta alteración."),
        ("Antonimia", "CONVERGENCIA", "unión", "aproximación", "divergencia", "límite", "suma", "C", "El opuesto directo de converger es divergir.")
    ]

    for idx_rv, item in enumerate(rv_banco, start=49):
        preguntas.append({
            "num": idx_rv,
            "materia": "Razonamiento Verbal",
            "tema": f"Aptitud Verbal: {item[0]}",
            "dificultad": "Intermedio",
            "arquetipo": "Evaluación de competencias de lectocomprensión e inferencia formal",
            "enunciado": f"[{item[0].upper()}] Responda adecuadamente: {item[1]}",
            "opciones": {"A": item[2], "B": item[3], "C": item[4], "D": item[5], "E": item[6]},
            "clave": item[7],
            "teoria": "Dominio de la norma estándar y análisis semántico-pragmático formal.",
            "solucion": item[8]
        })


    # =========================================================================
    # SECCIÓN III: HUMANIDADES (PREGUNTAS 71 A 100)
    # =========================================================================

    # 71 a 76: HISTORIA DEL PERÚ
    preguntas.append({
        "num": 71, "materia": "Humanidades", "tema": "Historia del Perú: Periodo Precerámico y Formativo",
        "dificultad": "Intermedio", "arquetipo": "Civilizaciones primigenias y arquitectura monumental",
        "enunciado": "La civilización de Caral, ubicada en el valle de Supe (Lima), es considerada la civilización más antigua de América. Una de sus características socioeconómicas fundamentales fue:",
        "opciones": {
            "A": "El uso generalizado de la moneda acuñada de bronce.",
            "B": "Una economía complementaria basada en la pesca marina y la agricultura de regadío con intercambio interregional.",
            "C": "La construcción de grandes murallas militares defensivas ante invasiones del sur.",
            "D": "El desarrollo de cerámica polícroma con iconografía de felinos.",
            "E": "La consolidación de un imperio militarista expansivo panandino."
        },
        "clave": "B",
        "teoria": "Caral (3000 a.C.) carecía de cerámica pero articuló un intercambio dinámico entre pescadores del litoral y agricultores del valle.",
        "solucion": "La complementariedad pesquería-agricultura (algodón, anchoveta) sustentó la compleja organización urbana de Caral."
    })

    preguntas.append({
        "num": 72, "materia": "Humanidades", "tema": "Historia del Perú: Horizonte Medio (Imperio Wari)",
        "dificultad": "Intermedio", "arquetipo": "Planificación urbana andina e integración vial",
        "enunciado": "El Imperio Wari (Horizonte Medio) logró unificar cultural y políticamente los Andes centrales mediante una estrategia basada primordialmente en:",
        "opciones": {
            "A": "El monopolio comercial exclusivo de conchas Spondylus.",
            "B": "La fundación de centros administrativos provinciales (ciudades cabeceras de región) interconectados por una extensa red vial.",
            "C": "La imposición del culto exclusivo a la Luna (Si).",
            "D": "La navegación marítima transoceánica hacia Polinesia.",
            "E": "La renuncia a la agricultura en terrazas."
        },
        "clave": "B",
        "teoria": "Wari destacó por su urbanismo planificado con ciudades como Pikillacta, Huiracochapampa y una red vial precursora del Qhapaq Ñan.",
        "solucion": "Las cabeceras de región permitieron a Wari el control tributario y administrativo de extensos territorios andinos."
    })

    preguntas.append({
        "num": 73, "materia": "Humanidades", "tema": "Historia del Perú: Tahuantinsuyo y Organización Económica",
        "dificultad": "Básico", "arquetipo": "Principios económicos andinos (Reciprocidad y Redistribución)",
        "enunciado": "En la organización socioeconómica del Tahuantinsuyo, el principio que regía la ayuda mutua entre los miembros de un mismo ayllu en labores agrícolas y domésticas se denominaba:",
        "opciones": {"A": "Mita", "B": "Ayni", "C": "Minca", "D": "Chunca", "E": "Camachic"},
        "clave": "B",
        "teoria": "El ayni era el trabajo recíproco intrafamiliar dentro del ayllu ('hoy por ti, mañana por mí'). La minca era trabajo comunal.",
        "solucion": "El ayni materializaba la reciprocidad simétrica directa entre miembros del ayllu."
    })

    preguntas.append({
        "num": 74, "materia": "Humanidades", "tema": "Historia del Perú: Virreinato y Reformas Borbónicas",
        "dificultad": "Intermedio", "arquetipo": "Impacto político y fiscal de las reformas del siglo XVIII",
        "enunciado": "Durante el siglo XVIII, las Reformas Borbónicas aplicadas por la corona española en el Virreinato del Perú tuvieron como consecuencia directa en el plano territorial:",
        "opciones": {
            "A": "La creación de las encomiendas hereditarias perpetuas.",
            "B": "La fragmentación del virreinato peruano con la creación de los virreinatos de Nueva Granada y del Río de la Plata.",
            "C": "La incorporación definitiva de la capitanía de Chile a Lima.",
            "D": "La eliminación absoluta de todos los tributos a la población indígena.",
            "E": "El cierre definitivo de las minas de Potosí y Huancavelica."
        },
        "clave": "B",
        "teoria": "Para mejorar el control administrativo y frenar el contrabando, los Borbones escindieron Nueva Granada (1717/1739) y Río de la Plata (1776).",
        "solucion": "La mutilación territorial del Virreinato del Perú redujo significativamente sus ingresos fiscales y su influencia geopolítica."
    })

    preguntas.append({
        "num": 75, "materia": "Humanidades", "tema": "Historia del Perú: Guerra del Guano y del Salitre",
        "dificultad": "Intermedio", "arquetipo": "Tratados y causas estructurales de la Guerra del Pacífico",
        "enunciado": "El detonante formal que involucró directamente al Perú en la Guerra del Pacífico (1879-1883) frente a Chile fue:",
        "opciones": {
            "A": "La compra peruana de los acorazados Cochrane y Blanco Encalada.",
            "B": "La firma y vigencia del Tratado de Alianza Defensiva Secreto entre Perú y Bolivia de 1873.",
            "C": "El bombardeo chileno al puerto de Mollendo en 1870.",
            "D": "La anexión unilateral de Tacna y Arica por parte del gobierno boliviano.",
            "E": "La deuda externa contraída mediante el Contrato Dreyfus."
        },
        "clave": "B",
        "teoria": "Al invadir Chile la ciudad boliviana de Antofagasta en febrero de 1879, Chile exigió la neutralidad de Perú; ante la negativa peruana por el tratado de 1873, Chile declaró la guerra.",
        "solucion": "El Tratado de Alianza Defensiva de 1873 obligó al Perú a mediar y, tras fracasar la misión Lavalle, Chile declaró la guerra al Perú."
    })

    preguntas.append({
        "num": 76, "materia": "Humanidades", "tema": "Historia del Perú: República Aristocrática y Oncenio",
        "dificultad": "Intermedio", "arquetipo": "Modelo exportador oligárquico vs modernización populista",
        "enunciado": "Durante la República Aristocrática (1895-1919), la clase gobernante peruana sustentó su hegemonía económica y política principalmente en:",
        "opciones": {
            "A": "El monopolio estatal del petróleo y la nacionalización de tierras.",
            "B": "La exportación de materias primas (azúcar, algodón, cobre, caucho) vinculada al capital financiero internacional y el control del Partido Civil.",
            "C": "La industrialización pesada y la sustitución masiva de importaciones.",
            "D": "El sufragio universal que incluía el voto de analfabetos.",
            "E": "La alianza militar exclusiva con la Unión Soviética."
        },
        "clave": "B",
        "teoria": "La oligarquía civilista agroexportadora y minera controló el Estado facilitando enclaves económicos extranjeros.",
        "solucion": "El Partido Civil dominó este periodo consolidando un modelo primario-exportador dependiente de las potencias."
    })

    # 77 a 82: HISTORIA UNIVERSAL
    preguntas.append({
        "num": 77, "materia": "Humanidades", "tema": "Historia Universal: Grecia Clásica",
        "dificultad": "Básico", "arquetipo": "Democracia ateniense e instituciones cívicas",
        "enunciado": "En la polis de Atenas durante el siglo de Pericles (siglo V a.C.), el órgano legislativo fundamental en el que participaban directamente todos los ciudadanos con derecho a voto era:",
        "opciones": {"A": "El Senado", "B": "La Eclesía (Asamblea Popular)", "C": "El Areópago", "D": "La Curia", "E": "El Triunvirato"},
        "clave": "B",
        "teoria": "La Eclesía era la asamblea soberana directa donde los ciudadanos varones libres debatían y votaban leyes y la guerra.",
        "solucion": "La Eclesía encarnaba la democracia directa ateniense."
    })

    preguntas.append({
        "num": 78, "materia": "Humanidades", "tema": "Historia Universal: Feudalismo Medieval",
        "dificultad": "Intermedio", "arquetipo": "Relaciones feudo-vasalláticas y economía señorial",
        "enunciado": "La relación de vasallaje en la Europa feudal medieval se formalizaba a través de una ceremonia solemne compuesta por dos actos principales:",
        "opciones": {
            "A": "El censo y la alcabala",
            "B": "El homenaje y la investidura",
            "C": "La excomunión y el concordato",
            "D": "El mayorazgo y la dote",
            "E": "La ordalía y el juicio de Dios"
        },
        "clave": "B",
        "teoria": "El homenaje era el juramento de lealtad personal del vasallo al señor, y la investidura era la entrega simbólica del feudo.",
        "solucion": "Homenaje e investidura constituían el pacto vasallático formal en la sociedad estamental medieval."
    })

    preguntas.append({
        "num": 79, "materia": "Humanidades", "tema": "Historia Universal: Revolución Francesa",
        "dificultad": "Intermedio", "arquetipo": "Quiebre del Antiguo Régimen y Declaración de Derechos",
        "enunciado": "En agosto de 1789, la Asamblea Nacional Constituyente francesa promulgó un documento de trascendencia jurídica mundial que consagró la igualdad ante la ley y la soberanía popular:",
        "opciones": {
            "A": "El Código Napoleónico",
            "B": "La Declaración de los Derechos del Hombre y del Ciudadano",
            "C": "La Carta Magna",
            "D": "El Edicto de Nantes",
            "E": "El Tratado de Versalles"
        },
        "clave": "B",
        "teoria": "Aprobada el 26 de agosto de 1789, proclamó la libertad, la propiedad, la seguridad y la resistencia a la opresión como derechos naturales.",
        "solucion": "La Declaración de los Derechos del Hombre y del Ciudadano sentó las bases del constitucionalismo moderno."
    })

    preguntas.append({
        "num": 80, "materia": "Humanidades", "tema": "Historia Universal: Revolución Industrial",
        "dificultad": "Básico", "arquetipo": "Innovaciones tecnológicas e impacto en la matriz productiva",
        "enunciado": "El invento que constituyó el motor tecnológico principal de la Primera Revolución Industrial británica a fines del siglo XVIII fue:",
        "opciones": {
            "A": "El motor de combustión interna diésel",
            "B": "La máquina de vapor perfeccionada por James Watt",
            "C": "La dínamo eléctrica de Faraday",
            "D": "El transistor semiconductor",
            "E": "La turbina hidroeléctrica"
        },
        "clave": "B",
        "teoria": "La máquina de vapor de James Watt (1769) transformó la industria textil, la minería del carbón y el transporte ferroviario.",
        "solucion": "La máquina de vapor sustituyó la tracción animal e hidráulica multiplicando la productividad fabril."
    })

    preguntas.append({
        "num": 81, "materia": "Humanidades", "tema": "Historia Universal: Primera Guerra Mundial",
        "dificultad": "Básico", "arquetipo": "Detonante diplomático del conflicto bélico imperialista",
        "enunciado": "El hecho coyuntural que desencadenó el estallido de la Primera Guerra Mundial en el verano de 1914 fue:",
        "opciones": {
            "A": "La invasión de Polonia por las tropas alemanas",
            "B": "El asesinato del archiduque Francisco Fernando de Austria en Sarajevo",
            "C": "El hundimiento del crucero acorazado Maine en La Habana",
            "D": "La caída del muro de Berlín",
            "E": "La crisis de los misiles soviéticos en Cuba"
        },
        "clave": "B",
        "teoria": "El 28 de junio de 1914, el nacionalista serbio Gavrilo Princip asesinó al heredero del Imperio Austro-Húngaro en Sarajevo.",
        "solucion": "El magnicidio de Sarajevo activó el sistema de alianzas militares europeas desencadenando la Gran Guerra."
    })

    preguntas.append({
        "num": 82, "materia": "Humanidades", "tema": "Historia Universal: Guerra Fría",
        "dificultad": "Intermedio", "arquetipo": "Bipolaridad ideológica y bloques geopolíticos",
        "enunciado": "Durante la Guerra Fría, la alianza militar defensiva conformada por los países del bloque occidental liderados por Estados Unidos en 1949 se denominó:",
        "opciones": {
            "A": "Pacto de Varsovia",
            "B": "Organización del Tratado del Atlántico Norte (OTAN)",
            "C": "Liga de las Naciones",
            "D": "Comunidad Económica Europea",
            "E": "Tratado de No Proliferación Nuclear"
        },
        "clave": "B",
        "teoria": "La OTAN se fundó en 1949 como bloque de seguridad colectiva frente al avance de la URSS; la respuesta soviética fue el Pacto de Varsovia (1955).",
        "solucion": "La OTAN constituyó el brazo militar estratégico del bloque occidental."
    })

    # 83 a 88: GEOGRAFÍA
    preguntas.append({
        "num": 83, "materia": "Humanidades", "tema": "Geografía: Estructura de la Atmósfera",
        "dificultad": "Básico", "arquetipo": "Capas atmosféricas y fenómenos meteorológicos",
        "enunciado": "¿En cuál de las capas de la atmósfera terrestre se originan la casi totalidad de los fenómenos meteorológicos (lluvias, vientos, nubes, tormentas)?",
        "opciones": {"A": "Estratósfera", "B": "Mesósfera", "C": "Tropósfera", "D": "Termósfera", "E": "Exósfera"},
        "clave": "C",
        "teoria": "La tropósfera (0-12 km) concentra el 75% de la masa de gas atmosférico y casi todo el vapor de agua.",
        "solucion": "En la tropósfera tienen lugar los procesos termodinámicos que generan el clima y el tiempo meteorológico."
    })

    preguntas.append({
        "num": 84, "materia": "Humanidades", "tema": "Geografía: Geodinámica Interna y Tectónica de Placas",
        "dificultad": "Intermedio", "arquetipo": "Zona de subducción y orogénesis andina",
        "enunciado": "La Cordillera de los Andes y la intensa actividad sísmica en la costa peruana son el resultado directo de la interacción tectónica entre:",
        "opciones": {
            "A": "La placa del Pacífico y la placa Norteamericana",
            "B": "La placa de Nazca (oceánica) en subducción bajo la placa Sudamericana (continental)",
            "C": "La placa Antártica y la placa Africana",
            "D": "La falla transformante de San Andrés",
            "E": "La dorsal centroatlántica divergente"
        },
        "clave": "B",
        "teoria": "El límite convergente destructivo donde la placa de Nazca se hunde bajo la Sudamericana genera la Fosa Marina del Perú y el levantamiento andino.",
        "solucion": "La subducción Nazca-Sudamericana es el motor de la sismicidad y vulcanismo del Perú."
    })

    preguntas.append({
        "num": 85, "materia": "Humanidades", "tema": "Geografía del Perú: Las 8 Regiones Naturales",
        "dificultad": "Básico", "arquetipo": "Clasificación altitudinal de Javier Pulgar Vidal",
        "enunciado": "Según la tesis de las 8 Regiones Naturales del Dr. Javier Pulgar Vidal, la región ubicada entre los 3500 y los 4000 m.s.n.m., caracterizada por su clima templado-frío y la presencia de heladas que afectan la agricultura, se denomina:",
        "opciones": {"A": "Yunga", "B": "Quechua", "C": "Suni (o Jalca)", "D": "Puna", "E": "Janca"},
        "clave": "C",
        "teoria": "Chala (0-500), Yunga (500-2300), Quechua (2300-3500), Suni (3500-4000), Puna (4000-4800), Janca (4800-6768).",
        "solucion": "Suni se ubica entre 3500 y 4000 m.s.n.m. y marca el límite de la agricultura de tubérculos resistentes a las heladas."
    })

    preguntas.append({
        "num": 86, "materia": "Humanidades", "tema": "Geografía del Perú: El Mar Peruano y Corriente de Humboldt",
        "dificultad": "Intermedio", "arquetipo": "Afloramiento marino y riqueza hidrobiológica",
        "enunciado": "La extraordinaria riqueza biológica y productividad pesquera del Mar Frío de la Corriente Peruana se debe fundamentalmente al fenómeno físico-oceánico de:",
        "opciones": {
            "A": "La evaporación acelerada por vientos monzónicos",
            "B": "El afloramiento costero (upwelling) que eleva aguas profundas frías ricas en nutrientes (sales minerales y nitratos)",
            "C": "El ingreso constante de aguas cálidas del Niño",
            "D": "La desembocadura de los ríos amazónicos en el Pacífico",
            "E": "La ausencia total de luz solar en el zócalo continental"
        },
        "clave": "B",
        "teoria": "El fenómeno de afloramiento, impulsado por los vientos alisios del sureste, nutre al fitoplancton que sustenta la cadena trófica marina.",
        "solucion": "El afloramiento provee la base nutricional primaria que hace del mar peruano uno de los más ricos del planeta."
    })

    preguntas.append({
        "num": 87, "materia": "Humanidades", "tema": "Geografía: Cuencas Hidrográficas del Perú",
        "dificultad": "Básico", "arquetipo": "Régimen fluvial y características de la vertiente del Pacífico",
        "enunciado": "Una de las características geográficas principales de los ríos que conforman la Vertiente Hidrográfica del Pacífico en el Perú es que:",
        "opciones": {
            "A": "Son de curso largo, caudalosos y navegables en su totalidad",
            "B": "Son de curso corto, torrenciales y presentan un régimen marcadamente irregular con crecidas en verano",
            "C": "Desembocan en el océano Atlántico formando grandes deltas",
            "D": "Nacen en la meseta del Collao y son endorreicos",
            "E": "Tienen caudales constantes e invariables a lo largo de todo el año"
        },
        "clave": "B",
        "teoria": "Los 53 ríos de la costa son transversales, de alta pendiente (torrenciales) y dependen de las lluvias andinas estivales.",
        "solucion": "La vertiente del Pacífico se distingue por ríos de fuerte gradiente, corto recorrido y régimen irregular estival."
    })

    preguntas.append({
        "num": 88, "materia": "Humanidades", "tema": "Geografía Ambiental: Efecto Invernadero y Calentamiento Global",
        "dificultad": "Básico", "arquetipo": "Mecanismo de forzamiento radiativo atmosférico",
        "enunciado": "¿Cuál es el principal gas de efecto invernadero de origen antropogénico responsable del incremento del forzamiento radiativo en la atmósfera global desde la era industrial?",
        "opciones": {"A": "Oxígeno molecular ($O_2$)", "B": "Dióxido de carbono ($CO_2$)", "C": "Argón ($Ar$)", "D": "Nitrógeno ($N_2$)", "E": "Helio ($He$)"},
        "clave": "B",
        "teoria": "La quema masiva de combustibles fósiles ha elevado las concentraciones de $CO_2$ de 280 ppm a más de 420 ppm.",
        "solucion": "El dióxido de carbono es el gas antropogénico predominante en el calentamiento global moderno."
    })

    # 89 a 94: ECONOMÍA
    preguntas.append({
        "num": 89, "materia": "Humanidades", "tema": "Economía: Factores Productivos y Retribuciones",
        "dificultad": "Básico", "arquetipo": "Clasificación clásica de factores y su remuneración económica",
        "enunciado": "En la teoría económica clásica, los factores productivos primarios 'Trabajo' y 'Capital' perciben respectivamente como retribución económica:",
        "opciones": {
            "A": "Renta e Impuesto",
            "B": "Salario e Interés",
            "C": "Ganancia y Subsidio",
            "D": "Tributo y Arancel",
            "E": "Honorario y Regalía"
        },
        "clave": "B",
        "teoria": "Naturaleza $\\to$ Renta; Trabajo $\\to$ Salario; Capital $\\to$ Interés; Empresa $\\to$ Beneficio/Ganancia; Estado $\\to$ Tributos.",
        "solucion": "El trabajo se remunera con el salario y el capital genera intereses."
    })

    preguntas.append({
        "num": 90, "materia": "Humanidades", "tema": "Economía: Estructuras de Mercado",
        "dificultad": "Intermedio", "arquetipo": "Monopolio, Oligopolio y Competencia Perfecta",
        "enunciado": "Una estructura de mercado en la que existen pocos vendedores o empresas productoras de gran escala que dominan la oferta frente a muchos compradores atomizados se clasifica como:",
        "opciones": {"A": "Monopolio natural", "B": "Oligopolio", "C": "Monopsonio", "D": "Competencia perfecta", "E": "Mercado informal"},
        "clave": "B",
        "teoria": "Oligopolio: pocos oferentes con interdependencia estratégica (ej. telefonía móvil, cemento, banca).",
        "solucion": "Pocos productores frente a muchos consumidores constituye la definición técnica de oligopolio."
    })

    preguntas.append({
        "num": 91, "materia": "Humanidades", "tema": "Economía: Ley de la Oferta y la Demanda",
        "dificultad": "Intermedio", "arquetipo": "Equilibrio de mercado y elasticidad",
        "enunciado": "Si en un mercado competitivo la demanda de un bien es constante y se produce un shock tecnológico que abarata significativamente sus costos de producción expandiendo la oferta, ¿qué ocurrirá con el precio y la cantidad de equilibrio?",
        "opciones": {
            "A": "El precio sube y la cantidad disminuye",
            "B": "El precio baja y la cantidad de equilibrio se incrementa",
            "C": "El precio y la cantidad permanecen inalterados",
            "D": "El precio sube y la cantidad se incrementa",
            "E": "Se genera escasez permanente del bien"
        },
        "clave": "B",
        "teoria": "Un desplazamiento de la curva de oferta hacia la derecha a lo largo de una curva de demanda fija reduce el precio de equilibrio y eleva la cantidad transada.",
        "solucion": "Mayor oferta con demanda fija presiona el precio a la baja e incrementa las ventas de equilibrio."
    })

    preguntas.append({
        "num": 92, "materia": "Humanidades", "tema": "Economía: Dinero e Inflación",
        "dificultad": "Intermedio", "arquetipo": "Teoría Cuantitativa del Dinero (Fisher)",
        "enunciado": "De acuerdo con la Ecuación Cuantitativa del Dinero de Irving Fisher ($M \\cdot V = P \\cdot Q$), si la velocidad de circulación del dinero ($V$) y el nivel de producción real ($Q$) se mantienen constantes, un incremento excesivo de la masa monetaria ($M$) generará necesariamente:",
        "opciones": {
            "A": "Deflación de precios",
            "B": "Un incremento proporcional en el nivel general de precios (Inflación)",
            "C": "Una reducción inmediata de la tasa de desempleo a cero",
            "D": "La revaluación de la moneda local frente al dólar",
            "E": "Un superávit fiscal automático"
        },
        "clave": "B",
        "teoria": "Ecuación de Fisher: $P = \\frac{M \\cdot V}{Q}$. A corto plazo con $V$ y $Q$ estables, la inflación es un fenómeno estrictamente monetario.",
        "solucion": "La expansión inorgánica del circulante incrementa directamente el nivel de precios ($P$)."
    })

    preguntas.append({
        "num": 93, "materia": "Humanidades", "tema": "Economía: Agregados Macroeconómicos (PBI)",
        "dificultad": "Básico", "arquetipo": "Definición del Producto Bruto Interno",
        "enunciado": "El Producto Bruto Interno (PBI) mide el valor monetario a precios de mercado de:",
        "opciones": {
            "A": "Todos los bienes intermedios utilizados en las fábricas durante un decenio.",
            "B": "Todos los bienes y servicios finales producidos en el territorio económico de un país durante un periodo determinado.",
            "C": "Las transferencias netas enviadas por los emigrantes al exterior.",
            "D": "El total de billetes y monedas impresos por el Banco Central de Reserva.",
            "E": "La riqueza histórica acumulada en metales preciosos por un Estado."
        },
        "clave": "B",
        "teoria": "El PBI cuantifica la producción final dentro de las fronteras nacionales para evitar la doble contabilización de insumos intermedios.",
        "solucion": "El PBI evalúa exclusivamente la producción de bienes y servicios finales en un periodo."
    })

    preguntas.append({
        "num": 94, "materia": "Humanidades", "tema": "Economía: Sector Externo y Tipo de Cambio",
        "dificultad": "Intermedio", "arquetipo": "Depreciación y balanza de pagos",
        "enunciado": "En un sistema de tipo de cambio flexible, una devaluación o depreciación de la moneda nacional (el sol pierde valor frente al dólar) tiende teóricamente a provocar:",
        "opciones": {
            "A": "Abaratar las importaciones y encarecer las exportaciones",
            "B": "Favorecer la competitividad de las exportaciones y encarecer las importaciones de insumos y bienes de capital",
            "C": "La desaparición de las reservas internacionales netas",
            "D": "La fijación de precios obligatoria por decreto",
            "E": "Una caída en la recaudación tributaria interna"
        },
        "clave": "B",
        "teoria": "Un dólar más caro hace que los productos nacionales sean más baratos para compradores extranjeros, mientras que encarece los productos importados.",
        "solucion": "La depreciación estimula el sector exportador al tiempo que encarece los bienes traídos del exterior."
    })

    # 95 a 100: FILOSOFÍA Y LÓGICA
    preguntas.append({
        "num": 95, "materia": "Humanidades", "tema": "Filosofía: Periodo Presocrático",
        "dificultad": "Básico", "arquetipo": "Búsqueda del principio fundamental (Arjé)",
        "enunciado": "Para el filósofo presocrático Tales de Mileto, considerado el iniciador de la filosofía occidental, el principio material y origen de todas las cosas (arjé) era:",
        "opciones": {"A": "El fuego", "B": "El aire", "C": "El agua (o lo húmedo)", "D": "El átomo", "E": "El ápeiron"},
        "clave": "C",
        "teoria": "Tales identificó el agua como sustrato fundamental de la physis. Anaxímenes propuso el aire, Heráclito el fuego, Anaximandro el ápeiron.",
        "solucion": "Tales de Mileto sostuvo que el agua es el principio constitutivo universal."
    })

    preguntas.append({
        "num": 96, "materia": "Humanidades", "tema": "Filosofía: Gnoseología y Teoría del Conocimiento",
        "dificultad": "Intermedio", "arquetipo": "Racionalismo cartesiano vs Empirismo",
        "enunciado": "La corriente gnoseológica de la Edad Moderna que sostiene que la razón es la fuente primordial y criterio de validez del conocimiento universalmente necesario, defendida por René Descartes, se denomina:",
        "opciones": {"A": "Empirismo", "B": "Racionalismo", "C": "Escepticismo radical", "D": "Pragmatismo", "E": "Fenomenología"},
        "clave": "B",
        "teoria": "El racionalismo sostiene la primacía de las ideas innatas y la deducción matemática frente a la falibilidad de los sentidos.",
        "solucion": "Descartes postuló que la razón intuitiva y deductiva es la base del conocimiento cierto (cogito ergo sum)."
    })

    preguntas.append({
        "num": 97, "materia": "Humanidades", "tema": "Filosofía: Epistemología y Método Científico",
        "dificultad": "Intermedio", "arquetipo": "Falsacionismo popperiano",
        "enunciado": "De acuerdo con la epistemología de Karl Popper, el criterio de demarcación que distingue a las teorías genuinamente científicas de las pseudocientíficas no es la verificación empírica inductiva, sino:",
        "opciones": {
            "A": "La confirmación probabilística absoluta",
            "B": "La falsabilidad (la posibilidad lógica de ser refutada empíricamente mediante contraejemplos)",
            "C": "La aceptación unánime por votación popular",
            "D": "La complejidad del lenguaje metafísico empleado",
            "E": "La coherencia con los dogmas religiosos tradicionales"
        },
        "clave": "B",
        "teoria": "Para Popper, una teoría es científica si formula predicciones arriesgadas que puedan ser contrastadas y potencialmente refutadas.",
        "solucion": "El falsacionismo establece que la ciencia progresa descartando hipótesis refutadas."
    })

    preguntas.append({
        "num": 98, "materia": "Humanidades", "tema": "Lógica Formal: Leyes Proposicionales",
        "dificultad": "Intermedio", "arquetipo": "Ley de la Implicación Material: $p \\to q \\equiv \\sim p \\lor q$",
        "enunciado": "En la lógica proposicional estándar, la fórmula condicional $p \\to q$ es lógicamente equivalente por definición a la proposición disyuntiva:",
        "opciones": {"A": "$\\sim p \\land q$", "B": "$\\sim p \\lor q$", "C": "$p \\lor \\sim q$", "D": "$\\sim p \\lor \\sim q$", "E": "$p \\land \\sim q$"},
        "clave": "B",
        "teoria": "Ley de la condicional o implicación material: $p \\to q \\equiv \\neg p \\lor q$.",
        "solucion": "Verificación con tabla de verdad: $p \\to q$ solo es falsa cuando $p$ es verdadero y $q$ es falso, coincidiendo exactamente con $\\neg p \\lor q$."
    })

    preguntas.append({
        "num": 99, "materia": "Humanidades", "tema": "Lógica Formal: Falacias No Formales",
        "dificultad": "Intermedio", "arquetipo": "Falacia ad hominem circunstancial",
        "enunciado": "'No debemos aceptar los cálculos estructurales del ingeniero Pérez sobre la resistencia del puente, porque él es una persona antipática y arrogante.' ¿En qué falacia de atingencia incurre este razonamiento?",
        "opciones": {
            "A": "Argumentum ad verecundiam (apelación a la autoridad)",
            "B": "Argumentum ad hominem (ataque contra la persona)",
            "C": "Argumentum ad baculum (apelación a la fuerza)",
            "D": "Argumentum ad ignoratiam (apelación a la ignorancia)",
            "E": "Falacia de falsa causa (post hoc ergo propter hoc)"
        },
        "clave": "B",
        "teoria": "La falacia ad hominem descalifica un argumento atacando características personales de quien lo emite en lugar de refutar sus premisas o evidencias.",
        "solucion": "Se descalifica el cálculo técnico insultando el carácter del ingeniero (ad hominem)."
    })

    preguntas.append({
        "num": 100, "materia": "Humanidades", "tema": "Filosofía: Ética y Deontología",
        "dificultad": "Intermedio", "arquetipo": "Imperativo Categórico de Immanuel Kant",
        "enunciado": "Para el filósofo Immanuel Kant, el principio supremo de la moralidad racional que manda obrar únicamente según aquella máxima que puedas querer al mismo tiempo que se convierta en ley universal se denomina:",
        "opciones": {
            "A": "Imperativo hipotético",
            "B": "Imperativo categórico",
            "C": "Principio de utilidad",
            "D": "Hedonismo racional",
            "E": "Relativismo moral"
        },
        "clave": "B",
        "teoria": "El imperativo categórico kantiano es incondicional y autónomo, fundamentando el deber moral racional sin supeditarse a fines externos.",
        "solucion": "El imperativo categórico define el deber formal universal en la ética kantiana."
    })

    return preguntas
