# Original retro desktop art direction

## Public visual-study links

- [人人都是产品经理: QQ 旧版界面回顾](https://www.woshipm.com/ucd/76894.html)
- [腾讯云开发者社区: QQ 历史版本回顾](https://cloud.tencent.com/developer/article/1088789)
- [嗨软: QQ 历史版本截图](https://ihacksoft.com/archive/qq-history-version-screenshots.html)
- [Enorth: QQ 2007 Beta2 multi-image release](https://it.enorth.com.cn/system/2007/04/29/001639331.shtml)
- [PCHome: QQ 2007 Beta2 image gallery](http://article.pchome.net/content-331179-1.html)
- [PConline: QQ 2007 Beta2 screenshot index](https://g.pconline.com.cn/x/101/1017522.html)
- [Enorth: QQ 2007 official-release visual review](http://it.enorth.com.cn/system/2007/08/29/001845388.shtml)
- [ZOL: QQ 2007 official-release experience](https://soft.zol.com.cn/64/640000_all.html)

## Findings used as era cues

The public examples show a bright blue-and-white desktop palette, 30–36 px glossy title bands, navy 1 px outlines with inner white highlights, compact Tahoma-scale text, dense colored toolbar glyphs, full-width beveled contact-group rows, a pale cyan/white transcript, a rectangular composer, recessed scrollbars, and a thin factual status strip. This asset set retains only those broad era cues: cyan/cobalt glass, soft cream highlights, compact plastic material, subtle pixel-like edging, avatar-oriented presentation, and roomy desktop wallpaper composition. It deliberately avoids modern blur, oversized radii, deep floating shadows, and large chat bubbles.

## Originality boundaries

No source screenshot, source pixel, logo, product name, penguin/bird mascot, level glyph, historical proprietary icon, or copyrighted character was supplied to the image model or reused. The buddy is an original blue robot with an antenna and headset; it is expressly not a penguin. All images require no text, marks, controls, or branded UI.

## Native image-generation calls

The four assets were generated in Host-Native Mode B using Codex's built-in image generator with the model path requested by the user (`gpt-image-2` / native image generation), one call per raster asset. Transparent assets were requested on a flat #ff00ff chroma-key field and the native outputs arrived with alpha; their alpha corners were inspected. The buddy output was resampled from the native square result to the requested 1024 x 1024 delivery size without adding any drawn content.

| Native call | Model path | Chosen delivery asset |
| --- | --- | --- |
| `exec-44bb5f1f-cbed-46bd-a7a6-920f33ffead4` | native `gpt-image-2` | `generated-source/retro-buddy-stage.png` |
| `exec-aa60058c-df8b-400c-aeda-26ea9cc3a15e` | native `gpt-image-2` | `generated-source/blue-glass-chrome.png` |
| `exec-6e2536f9-a0fa-4631-b3c6-5294f44101cd` | native `gpt-image-2` | `generated-source/retro-toolbar-icons.png` |
| `exec-bd7e8234-bc52-4a07-ace1-52e2ec3a18b0` | native `gpt-image-2` | `generated-source/buddy-room-wallpaper.png` |

## Asset roles

- `generated-source/retro-buddy-stage.png`: original robot buddy cutout.
- `generated-source/blue-glass-chrome.png`: crop-safe glossy title-bar material.
- `generated-source/retro-toolbar-icons.png`: one-row eight-icon toolbar sprite.
- `generated-source/buddy-room-wallpaper.png`: calm wide background with central readability.
