import sys, os
from collections import defaultdict

sys.path.append(r'C:\Users\HP\Desktop\PROYECTO_UNI_ADMISION_IA')
from generar_banco_uni_20_procesos import get_dia2_matematica, get_dia3_fisica_quimica
from dia1_100_builder import get_dia1_100_aptitud_humanidades

topics = defaultdict(lambda: {'count': 0, 'materia': '', 'arquetipos': set()})

for anio in range(2004, 2026):
    for per in ['I', 'II']:
        seed = anio * 10 + (1 if per == 'I' else 2)
        d1 = get_dia1_100_aptitud_humanidades(f'UNI_{anio}-{per}', anio, per, seed)
        d2 = get_dia2_matematica(f'UNI_{anio}-{per}', anio, per, seed)
        d3 = get_dia3_fisica_quimica(f'UNI_{anio}-{per}', anio, per, seed)
        for q in d1 + d2 + d3:
            t = q.get('tema', 'General')
            m = q.get('materia', 'General')
            topics[t]['count'] += 1
            topics[t]['materia'] = m
            topics[t]['arquetipos'].add(q.get('arquetipo', ''))

sorted_top = sorted(topics.items(), key=lambda x: x[1]['count'], reverse=True)

out_file = r'C:\Users\HP\Desktop\PROYECTO_UNI_ADMISION_IA\frecuencias_temas_44_procesos.txt'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write('MATERIA | TEMA | FRECUENCIA (44 PROCESOS) | PROBABILIDAD REPETICION (%) | ARQUETIPOS DISTINTOS\n')
    f.write('=' * 110 + '\n')
    for t, d in sorted_top:
        pct = (d['count'] / 44.0) * 100.0
        f.write(f"{d['materia']} | {t} | {d['count']} veces | {pct:.1f}% | {len(d['arquetipos'])} arquetipos\n")

print(f'Total temas analizados: {len(topics)}')
print('TOP 30 TEMAS FIJOS (RECURRENCIA >= 100%):')
for t, d in sorted_top[:30]:
    pct = (d['count'] / 44.0) * 100.0
    print(f"[{d['materia']}] {t}: {d['count']} apariciones ({pct:.1f}%)")
