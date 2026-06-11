from PIL import Image

img = Image.open('/home/ruangrimbun/.gemini/antigravity/brain/c89de924-90ad-4205-a593-80bd985c3347/photo_report_cover_design_1781168388496.png')
pixels = img.load()
width, height = img.size

# Background color is (201, 207, 210) roughly
bg_color = pixels[0, 0]

# Find top edge
top = 0
for y in range(height):
    if sum(abs(pixels[width//2, y][i] - bg_color[i]) for i in range(3)) > 30:
        top = y
        break

# Find bottom edge
bottom = height
for y in range(height-1, -1, -1):
    if sum(abs(pixels[width//2, y][i] - bg_color[i]) for i in range(3)) > 30:
        bottom = y
        break

# Find left edge
left = 0
for x in range(width):
    if sum(abs(pixels[x, height//2][i] - bg_color[i]) for i in range(3)) > 30:
        left = x
        break

# Find right edge
right = width
for x in range(width-1, -1, -1):
    if sum(abs(pixels[x, height//2][i] - bg_color[i]) for i in range(3)) > 30:
        right = x
        break

print(f"Crop bounds: left={left}, top={top}, right={right}, bottom={bottom}")
