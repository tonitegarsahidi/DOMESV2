from PIL import Image, ImageDraw
img = Image.open('public/images/doc-cover-ocean.png')

# the cover has a spine on the left? It's a book mockup!
# Let's see if there is a spine. Let's sample colors on the left edge.
pixels = img.load()
for x in range(120, 200, 5):
    print(f"x={x}, color={pixels[x, 512]}")

