from PIL import Image
img = Image.open('public/images/doc-cover-ocean.png')
pixels = img.load()
width, height = img.size

# Find left and right edges in the middle row (y = 512)
mid_y = height // 2
for x in range(width):
    if sum(pixels[x, mid_y][:3]) < 600:  # looking for a darker edge/shadow
        print(f"Left edge at x={x}, color={pixels[x, mid_y]}")
        break

for x in range(width - 1, -1, -1):
    if sum(pixels[x, mid_y][:3]) < 600:
        print(f"Right edge at x={x}, color={pixels[x, mid_y]}")
        break

# Find top and bottom edges in the middle column (x = 512)
mid_x = width // 2
for y in range(height):
    if sum(pixels[mid_x, y][:3]) < 600:
        print(f"Top edge at y={y}, color={pixels[mid_x, y]}")
        break

for y in range(height - 1, -1, -1):
    if sum(pixels[mid_x, y][:3]) < 600:
        print(f"Bottom edge at y={y}, color={pixels[mid_x, y]}")
        break
