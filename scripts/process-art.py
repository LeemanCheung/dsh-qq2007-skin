"""Create compact offline WebP assets from the committed Codex imagegen sources.

Requires Pillow 10+. The generated runtime files are committed so npm build/test does
not require Python or network access.
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "generated-source"
OUTPUT = ROOT / "assets" / "runtime"
OUTPUT.mkdir(parents=True, exist_ok=True)
RESAMPLE = Image.Resampling.LANCZOS


def save(image: Image.Image, name: str, *, quality: int = 82, lossless: bool = False) -> None:
    destination = OUTPUT / name
    image.save(destination, "WEBP", quality=quality, method=6, lossless=lossless)
    print(f"{destination.relative_to(ROOT)} {image.width}x{image.height} {destination.stat().st_size} bytes")


with Image.open(SOURCE / "retro-buddy-stage.png") as raw:
    buddy = raw.convert("RGBA")
    box = buddy.getbbox()
    if box is None:
        raise RuntimeError("retro buddy source is fully transparent")
    buddy = buddy.crop(box)
    buddy.thumbnail((480, 480), RESAMPLE)
    canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    canvas.alpha_composite(buddy, ((512 - buddy.width) // 2, 512 - buddy.height))
    save(canvas, "retro-buddy-stage.webp", quality=88)

with Image.open(SOURCE / "blue-glass-chrome.png") as raw:
    chrome = raw.convert("RGB")
    top = round(chrome.height * 0.26)
    bottom = round(chrome.height * 0.50)
    chrome = chrome.crop((0, top, chrome.width, bottom)).resize((1200, 192), RESAMPLE)
    save(chrome, "blue-glass-chrome.webp", quality=80)

with Image.open(SOURCE / "retro-toolbar-icons.png") as raw:
    toolbar = raw.convert("RGBA")
    # Native alpha contains a few nearly transparent edge pixels; threshold
    # them so the delivered sprite keeps the intended single-row geometry.
    visible_alpha = toolbar.getchannel("A").point(lambda value: 255 if value > 32 else 0)
    box = visible_alpha.getbbox()
    if box is None:
        raise RuntimeError("toolbar source is fully transparent")
    margin = 8
    box = (
        max(0, box[0] - margin),
        max(0, box[1] - margin),
        min(toolbar.width, box[2] + margin),
        min(toolbar.height, box[3] + margin),
    )
    toolbar = toolbar.crop(box)
    target_width = 800
    target_height = max(1, round(toolbar.height * target_width / toolbar.width))
    toolbar = toolbar.resize((target_width, target_height), RESAMPLE)
    save(toolbar, "retro-toolbar-icons.webp", lossless=True)

with Image.open(SOURCE / "buddy-room-wallpaper.png") as raw:
    wallpaper = ImageOps.fit(raw.convert("RGB"), (1280, 720), method=RESAMPLE, centering=(0.5, 0.5))
    save(wallpaper, "buddy-room-wallpaper.webp", quality=78)
