from PIL import Image

def process_children_cover(bg_path, fg_path, out_path):
    bg = Image.open(bg_path).convert('RGBA')
    fg = Image.open(fg_path).convert('RGBA')
    
    # doc-cover-children.png is originally 1024x1024 and takes the whole frame
    # We just resize the whole thing
    target_x = 170
    target_y = 44
    target_w = 860 - 170  # 690
    target_h = 971 - 44   # 927
    
    # We want to crop it to match the target ratio so it doesn't stretch weirdly
    orig_ratio = fg.width / fg.height
    target_ratio = target_w / target_h
    
    if orig_ratio > target_ratio:
        # Original is wider
        new_width = int(fg.height * target_ratio)
        left = (fg.width - new_width) // 2
        fg = fg.crop((left, 0, left + new_width, fg.height))
    else:
        # Original is taller
        new_height = int(fg.width / target_ratio)
        top_crop = (fg.height - new_height) // 2
        fg = fg.crop((0, top_crop, fg.width, top_crop + new_height))
        
    fg_resized = fg.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Paste
    bg.paste(fg_resized, (target_x, target_y))
    
    # Save
    bg.convert('RGB').save(out_path)

# First we need to restore the ORIGINAL original of doc-cover-children.png
# because make_images.py overwrote it
import os
os.system('git checkout public/images/doc-cover-children.png')

process_children_cover('public/images/doc-cover-ocean.png', 'public/images/doc-cover-children.png', 'public/images/doc-cover-children.png')

print("Perfect children cover generated!")
