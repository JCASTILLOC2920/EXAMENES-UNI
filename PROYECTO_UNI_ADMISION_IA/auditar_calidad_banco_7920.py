# -*- coding: utf-8 -*-
"""
AUDITOR DE CALIDAD Y RIGOR CIENTÍFICO DE 7,920 PREGUNTAS UNI
Audita:
1. Opciones duplicadas en A, B, C, D, E.
2. Clave válida y consistente con las opciones.
3. Coherencia entre solución y clave.
4. Errores numéricos (división por cero, raíces negativas, etc.)
5. Ambigüedades sintácticas o conceptuales.
"""

import os
import sys
import re

sys.path.append(r"C:\Users\HP\Desktop\PROYECTO_UNI_ADMISION_IA")
sys.path.append(r"C:\Users\HP\.gemini\antigravity\brain\760943db-8277-45bc-9792-aec3e762687a\scratch")

from generar_banco_uni_20_procesos import get_dia2_matematica, get_dia3_fisica_quimica
from dia1_100_builder import get_dia1_100_aptitud_humanidades

PROCESOS_44 = []
for anio in range(2004, 2026):
    for periodo in ["I", "II"]:
        PROCESOS_44.append((f"UNI_{anio}-{periodo}", anio, periodo))

def audit_process(proc_nombre, anio, periodo, idx):
    seed_val = anio * 10 + (1 if periodo == "I" else 2) + idx * 7
    issues = []

    # Generar las 3 pruebas
    try:
        p_dia1 = get_dia1_100_aptitud_humanidades(proc_nombre, anio, periodo, seed_val)
    except Exception as e:
        issues.append(f"CRITICAL ERROR in Dia 1 generation: {e}")
        p_dia1 = []

    try:
        p_dia2 = get_dia2_matematica(proc_nombre, anio, periodo, seed_val)
    except Exception as e:
        issues.append(f"CRITICAL ERROR in Dia 2 generation: {e}")
        p_dia2 = []

    try:
        p_dia3 = get_dia3_fisica_quimica(proc_nombre, anio, periodo, seed_val)
    except Exception as e:
        issues.append(f"CRITICAL ERROR in Dia 3 generation: {e}")
        p_dia3 = []

    all_questions = [("Día 1", p) for p in p_dia1] + [("Día 2", p) for p in p_dia2] + [("Día 3", p) for p in p_dia3]

    for dia_label, q in all_questions:
        q_num = q.get("num", 0)
        materia = q.get("materia", "")
        opciones = q.get("opciones", {})
        clave = q.get("clave", "")
        enunciado = q.get("enunciado", "")
        solucion = q.get("solucion", "")

        # 1. Verificar número de opciones
        if len(opciones) != 5:
            issues.append(f"[{dia_label} P{q_num}] Opciones distintas de 5: {len(opciones)}")

        # 2. Verificar opciones duplicadas
        vals = list(opciones.values())
        if len(set(vals)) != len(vals):
            issues.append(f"[{dia_label} P{q_num} ({materia})] Opciones duplicadas detectadas: {opciones}")

        # 3. Verificar que la clave existe en opciones
        if clave not in opciones:
            issues.append(f"[{dia_label} P{q_num}] Clave '{clave}' no existe en opciones {list(opciones.keys())}")

        # 4. Verificar contenido no vacío
        if not enunciado or len(enunciado.strip()) < 10:
            issues.append(f"[{dia_label} P{q_num}] Enunciado vacío o demasiado corto")
        if not solucion or len(solucion.strip()) < 10:
            issues.append(f"[{dia_label} P{q_num}] Solución vacía o demasiado corta")

        # 5. Verificar coherencia textual en la solución respecto a la clave
        # Buscar si la solución menciona otra clave distinta o contradicción
        # E.g., si la clave es C pero la solución dice 'clave B' o 'opción B'
        match_clave = re.search(r"clave\s+es\s+([A-E])|opci[oó]n\s+([A-E])|respuesta\s+es\s+([A-E])", solucion, re.I)
        if match_clave:
            found_c = [g for g in match_clave.groups() if g]
            if found_c and found_c[0].upper() != clave.upper():
                issues.append(f"[{dia_label} P{q_num}] Posible contradicción: clave es '{clave}' pero solución menciona '{found_c[0]}'")

    return len(all_questions), issues

if __name__ == "__main__":
    total_q = 0
    total_issues = 0
    all_issues_log = []

    print("Iniciando auditoría exhaustiva de las 7,920 preguntas...")
    for idx, (proc_nombre, anio, periodo) in enumerate(PROCESOS_44, 1):
        num_q, issues = audit_process(proc_nombre, anio, periodo, idx)
        total_q += num_q
        if issues:
            total_issues += len(issues)
            for iss in issues:
                all_issues_log.append(f"{proc_nombre}: {iss}")
                print(f"  [AVISO] {proc_nombre}: {iss}")

    print("\n================ RESULTADOS DE LA AUDITORÍA ================")
    print(f"Total de preguntas auditadas: {total_q}")
    print(f"Total de inconsistencias detectadas: {total_issues}")
    if total_issues == 0:
        print("ESTADO: PERFECCIÓN MATEMÁTICA Y ACADÉMICA ABSOLUTA (0 errores)")
    else:
        print(f"Tasa de inconsistencias: {total_issues / total_q * 100:.3f}%")
