from pathlib import Path
from statistics import median
from PIL import Image

# Gera um retrato da cabeça de cada personagem em assets/retratos (o jogo usa na caixa de diálogo).
# Se o retrato cortar o queixo ou o cabelo, AUMENTE o número da cabeça. Se sobrar espaço, DIMINUA.
CABECA_CORPO = 0.40   # parte da altura do corpo inteiro ocupada pela cabeça
CABECA_BUSTO = 0.62   # o mesmo, para imagens só do busto (como o Thiago)
MARGEM = 1.2          # espaço em volta da cabeça
# Para mexer em um retrato só: AJUSTES = {'eduardo_animado': (0.05, -0.03)}  (direita/esquerda, baixo/cima)
AJUSTES = {}

saida = Path('assets/retratos')
saida.mkdir(exist_ok=True)

imagens = {}
for arq in sorted(Path('assets/personagens').glob('*.png')):
    img = Image.open(arq).convert('RGBA')
    alfa = img.getchannel('A').point(lambda v: 255 if v > 10 else 0)
    imagens[arq] = (img, alfa, alfa.getbbox())

# O tamanho da cabeça é o mesmo em todas as expressões de um personagem (usa a mediana).
alturas = {}
for arq, (img, alfa, (x0, y0, x1, y1)) in imagens.items():
    h, w = y1 - y0, x1 - x0
    fator = CABECA_BUSTO if h / w < 1.4 else CABECA_CORPO
    alturas.setdefault(arq.stem.rsplit('_', 1)[0], []).append(h * fator)
cabeca = {nome: median(v) for nome, v in alturas.items()}

for arq, (img, alfa, (x0, y0, x1, y1)) in imagens.items():
    cab = cabeca[arq.stem.rsplit('_', 1)[0]]
    w = x1 - x0

    # centro horizontal da cabeça = média das colunas ocupadas na parte de cima da cabeça
    faixa = alfa.crop((x0, y0, x1, max(y0 + 1, int(y0 + cab * 0.45))))
    colunas = list(faixa.resize((w, 1), Image.BOX).tobytes())
    total = sum(colunas) or 1
    cx = x0 + sum(i * v for i, v in enumerate(colunas)) / total

    lado = cab * MARGEM
    dx, dy = AJUSTES.get(arq.stem, (0, 0))
    esq = cx - lado / 2 + dx * lado
    topo = y0 - cab * (MARGEM - 1) / 2 + dy * lado
    retrato = img.crop((int(esq), int(topo), int(esq + lado), int(topo + lado))).resize((320, 320), Image.LANCZOS)
    retrato.save(saida / arq.name, optimize=True)
    print('retrato', arq.name)
