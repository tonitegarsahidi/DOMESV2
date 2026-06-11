from PIL import Image

img = Image.open('public/images/doc-cover-ocean.png')
pixels = img.load()
width, height = img.size

# We want to find the exact top-left and bottom-right of the actual cover.
# The background is roughly (200, 220, 219).
# The cover in ocean.png has a blue border.
for y in range(height):
    if sum(pixels[width//2, y][:3]) < 600 or abs(pixels[width//2, y][0] - 200) > 20:
        top = y
        break

for y in range(height-1, -1, -1):
    if sum(pixels[width//2, y][:3]) < 600 or abs(pixels[width//2, y][0] - 200) > 20:
        bottom = y
        break

for x in range(width):
    if sum(pixels[x, height//2][:3]) < 600 or abs(pixels[x, height//2][0] - 200) > 20:
        left = x
        break

for x in range(width-1, -1, -1):
    if sum(pixels[x, height//2][:3]) < 600 or abs(pixels[x, height//2][0] - 200) > 20:
        right = x
        break

print(f"Cover precisely at: Left={left}, Top={top}, Right={right}, Bottom={bottom}")
print(f"Width={right-left}, Height={bottom-top}")
