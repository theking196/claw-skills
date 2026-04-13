# Kingbit Clone - OpenClaw Skill

## Overview

Point to any website and I'll clone it as a deployable HTML/CSS/JS template! Perfect for:

- 📝 Clone landing pages
- 🎨 Extract design templates
- 🚀 Deploy instantly to web

## Features

| Feature | Description |
|---------|-------------|
| 🎯 **Site Clone** | Point to URL, get the template |
| 📄 **HTML Extract** | Pull out the HTML structure |
| 🎨 **CSS Extract** | Grab the styling |
| 📱 **Responsive** | Mobile-friendly templates |
| 🚀 **Deploy** | One-click deploy options |
| 💾 **Save** | Store templates locally |

## Installation

```bash
/skill install kingbit-cloner
```

## Usage

### Clone a Website
```
/clone https://example.com
/clone https://example.com --html-only
/clone https://example.com --full
```

### Get Template
```
/clone template          Show available templates
/clone list              List saved templates
/clone export <name>    Export as zip
```

### Deploy
```
/clone deploy            Deploy last template
/clone deploy <name>     Deploy specific template
/clone preview           Preview template
```

### Custom Build
```
/clone create landing   Create landing page template
/clone create portfolio Create portfolio template
/clone create dashboard Create admin dashboard
```

## Examples

```
/clone https://stripe.com
→ Extracts Stripe's landing page structure, styling, creates deployable template

/clone create landing
→ Creates a beautiful landing page template with responsive design
```

## Deployment Options

| Option | Description |
|--------|-------------|
| GitHub Pages | Push to GitHub, deploy as pages |
| Netlify | Connect to Netlify for instant deploy |
| Vercel | Deploy with Vercel |
| Local | Save locally as HTML file |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `default_deploy` | github | Where to deploy |
| `include_images` | true | Download images too |
| `minify_css` | false | Minify output CSS |

## Uninstall

```bash
/skill remove kingbit-cloner
```

---

Made with ❤️ by Kingbit