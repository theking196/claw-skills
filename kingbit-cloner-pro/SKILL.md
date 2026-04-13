# Kingbit Clone Pro - OpenClaw Skill (v2)

## Overview

**FULL website cloning!** Pull everything - CSS, JS, images, all pages - and bundle into a deployable package. This is the real deal! 🕷️

## Features

| Feature | Description |
|---------|-------------|
| 🕷️ **Full Scrape** | Downloads ALL assets |
| 📦 **Bundle** | Combines into single HTML or zip |
| 🎨 **Inline CSS** | All styles inlined |
| 📜 **Inline JS** | All scripts inlined |
| 🖼️ **Images** | Downloads all images (base64) |
| 📄 **Multi-page** | Clones all internal links |
| 💾 **Download** | Save as .zip bundle |
| 🚀 **Deploy** | One-click deployment |

## Installation

```bash
/skill install kingbit-cloner
```

## Usage

### Clone with Full Assets
```
/clone https://example.com --full      Full clone with all assets
/clone https://example.com --inline    Inline all CSS/JS
/clone https://example.com --images    Download all images
/clone https://example.com --pages      Clone all pages
```

### Quick Commands
```
/clone https://stripe.com --full        Full Stripe clone
/clone https://google.com --full        Clone Google landing
/clone https://apple.com --full         Clone Apple
```

### Advanced
```
/clone bundle             Create zip bundle
/clone extract           Extract to folder
/clone deploy            Deploy bundle
/clone save <name>       Save for later
```

## What Gets Cloned

| Asset | What Happens |
|-------|--------------|
| **HTML** | Parsed, links rewritten |
| **CSS** | Inlined or downloaded |
| **JS** | Inlined or downloaded |
| **Images** | Downloaded, paths rewritten |
| **Fonts** | Downloaded |
| **Videos** | Downloaded |
| **Links** | Relative paths fixed |

## Output Options

- **Single HTML**: Everything in one file (images as base64)
- **Folder**: index.html + /assets/ with all files
- **Zip Bundle**: Ready to download/deploy

## Deployment

After cloning, deploy instantly:
- GitHub Pages (automatic)
- Netlify (drag & drop zip)
- Vercel

## Example

```
You: /clone https://github.com --full
Kingbit: 🕷️ Cloning https://github.com...
   ✓ Downloaded 45 CSS files
   ✓ Downloaded 23 JS files
   ✓ Downloaded 156 images
   ✓ Processed 12 pages
   ✅ Bundle ready! (4.2MB)
   → Deploy: /clone deploy
```

---

Made with ❤️ by Kingbit