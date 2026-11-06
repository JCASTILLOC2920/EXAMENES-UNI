# -*- coding: utf-8 -*-
"""
JC PATH LAB & DR. JOSÉ CASTILLO
GENERADOR DE ARCHIVOS DE SIMULACRO PREDICTIVO OFICIAL UNI 2026 EN FORMATO MARKDOWN
"""
import os
import sys

BASE_DIR = r"C:\Users\HP\Desktop\PROYECTO_UNI_ADMISION_IA"
SIM_DIR = os.path.join(BASE_DIR, "04_SIMULACROS_PREDICTIVOS_GENERADOS")
os.makedirs(SIM_DIR, exist_ok=True)

sys.path.append(BASE_DIR)
from generar_banco_uni_20_procesos import get_dia2_matematica, get_dia3_fisica_quimica, formatear_examen_markdown
from dia1_100_builder import get_dia1_100_aptitud_humanidades

print("Generando Simulacro Predictivo Oficial 2026 en 04_SIMULACROS_PREDICTIVOS_GENERADOS...")

seed_2026 = 20261
p1 = get_dia1_100_aptitud_humanidades("UNI_2026-PREDICTIVO", 2026, "I", seed_2026)
p2 = get_dia2_matematica("UNI_2026-PREDICTIVO", 2026, "I", seed_2026)
p3 = get_dia3_fisica_quimica("UNI_2026-PREDICTIVO", 2026, "I", seed_2026)

# Dia 1
md1 = formatear_examen_markdown("UNI_2026-PREDICTIVO", 2026, "I", "dia_1", "Día 1: Aptitud Académica y Humanidades", p1)
with open(os.path.join(SIM_DIR, "SIMULACRO_PREDICTIVO_OFICIAL_UNI_2026_DIA_1.md"), "w", encoding="utf-8") as f:
    f.write(md1)

# Dia 2
md2 = formatear_examen_markdown("UNI_2026-PREDICTIVO", 2026, "I", "dia_2", "Día 2: Matemática (Aritmética, Álgebra, Geometría, Trigonometría)", p2)
with open(os.path.join(SIM_DIR, "SIMULACRO_PREDICTIVO_OFICIAL_UNI_2026_DIA_2.md"), "w", encoding="utf-8") as f:
    f.write(md2)

# Dia 3
md3 = formatear_examen_markdown("UNI_2026-PREDICTIVO", 2026, "I", "dia_3", "Día 3: Física y Química", p3)
with open(os.path.join(SIM_DIR, "SIMULACRO_PREDICTIVO_OFICIAL_UNI_2026_DIA_3.md"), "w", encoding="utf-8") as f:
    f.write(md3)

# Clavero
clavero_path = os.path.join(SIM_DIR, "CLAVERO_OFICIAL_SIMULACRO_PREDICTIVO_2026.md")
with open(clavero_path, "w", encoding="utf-8") as f:
    f.write("# CLAVERO MAESTRO OFICIAL - SIMULACRO PREDICTIVO UNI 2026\n")
    f.write("## JC PATH LAB & DR. JOSÉ CASTILLO - PREPARACIÓN DE ÉLITE PARA SU HIJA\n")
    f.write("### DIRECTIVA: CERO ALUCINACIONES | VERDAD ABSOLUTA\n\n---\n\n")
    
    for dia_nombre, p_list in [("DÍA 1: APTITUD ACADÉMICA Y HUMANIDADES (100 PREGUNTAS)", p1),
                              ("DÍA 2: MATEMÁTICA (40 PREGUNTAS)", p2),
                              ("DÍA 3: FÍSICA Y QUÍMICA (40 PREGUNTAS)", p3)]:
        f.write(f"### {dia_nombre}\n\n")
        f.write("| N° | Materia | Tema Canónico | Clave Oficial | Valor / Respuesta Correcta |\n")
        f.write("| :---: | :--- | :--- | :---: | :--- |\n")
        for q in p_list:
            c = q["clave"]
            val = q["opciones"][c]
            f.write(f"| {q['num']} | {q['materia']} | {q['tema']} | **{c}** | `{val}` |\n")
        f.write("\n---\n\n")

print("Simulacros y Clavero generados exitosamente en:", SIM_DIR)
