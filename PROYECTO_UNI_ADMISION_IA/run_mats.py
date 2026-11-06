import sys
sys.path.append(r'C:\Users\HP\Desktop\PROYECTO_UNI_ADMISION_IA')
from collections import defaultdict
from generar_banco_uni_20_procesos import get_dia2_matematica, get_dia3_fisica_quimica

mats = defaultdict(lambda: {'count': 0, 'materia': ''})

for anio in range(2004, 2026):
    for per in ['I', 'II']:
        seed = anio * 10 + (1 if per == 'I' else 2)
        d2 = get_dia2_matematica(f'UNI_{anio}-{per}', anio, per, seed)
        d3 = get_dia3_fisica_quimica(f'UNI_{anio}-{per}', anio, per, seed)
        for q in d2 + d3:
            t = q.get('tema', 'General')
            m = q.get('materia', 'General')
            mats[f"[{m}] {t}"]['count'] += 1
            mats[f"[{m}] {t}"]['materia'] = m

print(f"Total temas en Dia 2 y Dia 3: {len(mats)}")
sorted_mats = sorted(mats.items(), key=lambda x: x[1]['count'], reverse=True)
for item, d in sorted_mats[:35]:
    pct = (d['count'] / 44.0) * 100.0
    print(f"{item} -> {d['count']} veces ({pct:.1f}%)")
