from PIL import Image

def process_cover(bg_path, fg_path, out_path):
    bg = Image.open(bg_path).convert('RGBA')
    fg = Image.open(fg_path).convert('RGBA')
    
    # We want to crop the actual document from the generated image
    # left=194, top=61. Right and bottom might include shadow.
    # Let's crop slightly inside to ensure we don't get the shadow.
    left, top, right, bottom = 194, 61, 810, 938
    fg_cropped = fg.crop((left, top, right, bottom))
    
    # Target bounding box in doc-cover-ocean.png
    target_x = 170
    target_y = 44
    target_w = 860 - 170  # 690
    target_h = 971 - 44   # 927
    
    # Resize and crop to target ratio
    orig_ratio = fg_cropped.width / fg_cropped.height
    target_ratio = target_w / target_h
    
    if orig_ratio > target_ratio:
        # Original is wider
        new_width = int(fg_cropped.height * target_ratio)
        crop_left = (fg_cropped.width - new_width) // 2
        fg_cropped = fg_cropped.crop((crop_left, 0, crop_left + new_width, fg_cropped.height))
    else:
        # Original is taller
        new_height = int(fg_cropped.width / target_ratio)
        crop_top = (fg_cropped.height - new_height) // 2
        fg_cropped = fg_cropped.crop((0, crop_top, fg_cropped.width, crop_top + new_height))
        
    fg_resized = fg_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Paste
    bg.paste(fg_resized, (target_x, target_y))
    
    # Save
    bg.convert('RGB').save(out_path)

process_cover('public/images/doc-cover-ocean.png', '/home/ruangrimbun/.gemini/antigravity/brain/c89de924-90ad-4205-a593-80bd985c3347/photo_report_cover_design_1781168388496.png', 'public/images/report_cover.png')

print("Perfect photo cover generated!")
