from PIL import Image
img = Image.open('public/images/doc-cover-ocean.png')
pixels = img.load()
for x in range(850, 870):
    print(f"x={x}, color={pixels[x, 512]}")
for y in range(40, 50):
    print(f"y={y}, color={pixels[512, y]}")
for y in range(965, 980):
    print(f"y={y}, color={pixels[512, y]}")

