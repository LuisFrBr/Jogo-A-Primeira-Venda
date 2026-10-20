from pathlib import Path
from PIL import Image

# Personagens: corta as margens transparentes e reduz o tamanho do arquivo.
for arq in sorted(Path('assets/personagens').glob('*.png')):
    img = Image.open(arq).convert('RGBA')
    caixa = img.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox()
    if caixa:
        img = img.crop(caixa)
    img.thumbnail((900, 900))
    img.save(arq, optimize=True)
    print('personagem', arq.name, img.size)

# Cenários: reduz para no máximo 1600 px de largura.
for arq in sorted(Path('assets/bg').glob('*.png')):
    img = Image.open(arq)
    img.thumbnail((1600, 900))
    img.save(arq, optimize=True)
    print('cenario', arq.name, img.size)
