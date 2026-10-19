from pathlib import Path
from PIL import Image, ImageDraw

for arq in sorted(Path('assets/personagens').glob('*.png')):
    img = Image.open(arq).convert('RGBA')
    w, h = img.size
    for ponto in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if img.getpixel(ponto)[3] > 0:
            ImageDraw.floodfill(img, ponto, (255, 255, 255, 0), thresh=60)
    img.save(arq)
    print('ok', arq.name)
