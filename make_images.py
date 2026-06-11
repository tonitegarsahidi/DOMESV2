from PIL import Image, ImageDraw, ImageFilter

def create_flat_cover(original_path, output_path, cover_width, cover_height, top_offset):
    # 1. Open original cover
    orig = Image.open(original_path)
    
    # Resize and crop original cover to fit cover_width x cover_height
    # We want to maintain aspect ratio, so we crop the center if needed
    orig_ratio = orig.width / orig.height
    target_ratio = cover_width / cover_height
    
    if orig_ratio > target_ratio:
        # Original is wider, crop width
        new_width = int(orig.height * target_ratio)
        left = (orig.width - new_width) // 2
        orig = orig.crop((left, 0, left + new_width, orig.height))
    else:
        # Original is taller, crop height
        new_height = int(orig.width / target_ratio)
        top_crop = (orig.height - new_height) // 2
        orig = orig.crop((0, top_crop, orig.width, top_crop + new_height))
        
    orig = orig.resize((cover_width, cover_height), Image.Resampling.LANCZOS)
    
    # 2. Create the gray background
    bg = Image.new('RGB', (1024, 1024), (220, 225, 228)) # Light gray background from ocean img
    
    # 3. Create shadow
    shadow = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    
    left_offset = (1024 - cover_width) // 2
    
    # Draw dark shadow
    shadow_box = [left_offset - 10, top_offset - 10, left_offset + cover_width + 10, top_offset + cover_height + 20]
    draw.rectangle(shadow_box, fill=(0, 0, 0, 80))
    
    # Blur shadow
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=15))
    
    # Composite shadow on bg
    bg.paste(shadow, (0, 0), shadow)
    
    # 4. Paste cover
    bg.paste(orig, (left_offset, top_offset))
    
    # Save
    bg.save(output_path)

# Let's approximate the ocean cover size:
# The ocean cover is about 676x896, let's say width=676, height=896
# It's centered horizontally, and top offset is around 44-60.
create_flat_cover('public/images/report_cover.png', 'public/images/report_cover.png', 680, 900, 62)
create_flat_cover('public/images/doc-cover-children.png', 'public/images/doc-cover-children.png', 680, 900, 62)

print("Done creating flat covers.")
