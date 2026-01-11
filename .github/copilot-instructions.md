# CODE-AI 2026 Conference Website - AI Coding Agent Instructions

## Project Overview
This is a **static event website** for CODE-AI 2026 (3rd International Conference on Data Science & AI) running April 7-8, 2026 in Dubai. The site is built with HTML, CSS, and vanilla JavaScript—no build tools or frameworks beyond `http-server` for local development.

**Key Details:**
- **Stack:** HTML5 + CSS3 + Vanilla JavaScript
- **Server:** `http-server` (npm package, starts on port 3001)
- **Architecture:** 11 independent HTML pages + shared CSS system + image/GIF assets
- **Design System:** Glassmorphism with `backdrop-filter: blur(20px)`, `Zen Dots` typography

## Critical Architecture Patterns

### Page Structure (11 pages)
Each page follows this template:
- **Navigation bar** with links to all pages (shared across all pages)
- **Animated GIF background** (page-specific GIFs in `src/file/`)
- **Glassmorphism card containers** with content
- **Page-specific CSS file** (e.g., `awards.html` uses `awards.css`)
- **Example:** `committee.html` + `src/css/committee.css` are paired

**Page List:** `index.html`, `committee.html`, `speakers.html`, `registration.html`, `publication.html`, `awards.html`, `schedule.html`, `souvenir.html`, `call.html`, `callforPhd.html`, `sponsor.html`

### CSS Design System: Glassmorphism
The entire site uses a consistent glassmorphism design (see [src/css/style.css](src/css/style.css)):

```css
.glass-card {
  background: linear-gradient(135deg, rgba(150, 120, 182, 0.05) 0%, rgba(150, 120, 182, 0.02) 100%);
  border: 1px solid rgba(150, 120, 182, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 16px;
}
```

**Key rules:**
- All cards inherit `.glass-card` class or similar `backdrop-filter: blur(20px)`
- Color scheme: Purple gradient overlays (`rgba(150, 120, 182, ...)`) + white text
- Hover effects: `transform: translateY(-8px)` + elevated box-shadow
- Tables styled with glassmorphism (except `.registration table` which has custom styles)

### Typography
- **Primary:** `'Zen Dots'` (cursive font from Google Fonts, applied to headings/nav)
- **Body:** `'Inter'` (system fallback: `-apple-system, BlinkMacSystemFont, sans-serif`)
- **Monospace:** `'JetBrains Mono'` (for code/technical text)

### Background Animations
Different pages use different animated GIFs:
- **Home:** `src/file/new-background.gif`
- **Committee/Speakers:** `src/file/v5-background.gif`
- **Other pages:** `src/file/v2-background.gif`

Images are inserted via `<img class="background-gif">` element (positioned absolutely, z-index lower than content).

## Developer Workflows

### Local Development
```bash
npm install              # Install http-server
npm run dev              # Starts server with auto-refresh (-o opens browser)
npm run serve            # Manual server start (port 3001)
```

**Key:** No build step needed—edit HTML/CSS/JS directly and refresh browser.

### Project Perfect State
**Important:** This codebase has a documented "perfect state" (see [PERFECT_STATE_RESTORE.md](PERFECT_STATE_RESTORE.md)):
- Git tag: `v1.0-perfect-state`
- Backup branch: `perfect-state-backup`
- Restoration command: `git checkout v1.0-perfect-state`

**Use this:** Before making major changes, understand the perfect state as the reference design. If experiments break the site, restore via Git commands in PERFECT_STATE_RESTORE.md.

## Project-Specific Conventions

### Naming & Organization
- **Page files:** Lowercase, no spaces (e.g., `callforPhd.html`, not `call-for-phd.html`)
- **CSS files:** Match page name (e.g., `awards.html` → `src/css/awards.css`)
- **Images:** Organized in `src/img/` subdirectories (`Organisers/`, `Speakers/`, `sponsors/`)
- **Animations/GIFs:** Stored in `src/file/`

### CSS Inheritance Pattern
1. **Global styles:** `src/css/style.css` (base reset, `.glass-card` class, typography)
2. **Page-specific:** `src/css/{pagename}.css` (layout overrides, page-unique styling)
3. **Never:** Hardcode colors directly—use glassmorphism palette (`rgba(150, 120, 182, ...)`)

### Common HTML Structure
```html
<header class="header">
  <nav class="navbar"><!-- Links to all 11 pages --></nav>
  <div class="bx bx-menu" id="menu-icon"></div> <!-- Mobile menu toggle -->
</header>
<img id="background-animation" src="src/file/*.gif" class="background-gif">
<section class="home"><!-- Page content in glass-card containers --></section>
```

## Integration Points & Dependencies

### External Resources
- **Google Fonts:** `'Zen Dots'`, `'Inter'`, `'JetBrains Mono'` (loaded via `@import` in style.css)
- **Boxicons:** CDN link for icon library (`<link rel="stylesheet" href="https://unpkg.com/boxicons...">`)
- **Images:** Conference logos, speaker photos, sponsor logos (all local files in `src/img/`)

### Cross-Page Communication
- **No client-side routing:** Each page is independent HTML file
- **Navigation:** All pages link to each other via navbar (hardcoded in each page's HTML)
- **Shared state:** None (static site—no JavaScript state management needed)

### JavaScript Usage
- Likely minimal vanilla JS (countdown timer on homepage, mobile menu toggle)
- No frameworks, no build transpilation—code runs as-is in the browser

## When Making Changes

### Adding New Content
1. **Edit the relevant HTML page** + corresponding CSS file
2. **Maintain glassmorphism:** Wrap content in `.glass-card` div or apply `backdrop-filter: blur(20px)`
3. **Update navbar links** if adding a new page

### Updating Styling
1. **Check [src/css/style.css](src/css/style.css) first** for global classes (`.glass-card`, table styles, etc.)
2. **Override only in page-specific CSS** files
3. **Color palette:** Always use `rgba(150, 120, 182, ...)` for overlays (not hardcoded RGB values)

### Testing
- Start local server: `npm run dev`
- Test all 11 pages for visual consistency
- Verify mobile responsiveness (viewport meta tag present in all pages)
- Check glassmorphism effects render correctly (backdrop-filter support in target browsers)

## Critical Files to Reference
- **Global styles:** [src/css/style.css](src/css/style.css) (2167 lines—defines `.glass-card`, tables, typography)
- **Homepage:** [index.html](index.html) (countdown timer, sponsor logos, multi-section layout)
- **Perfect state guide:** [PERFECT_STATE_RESTORE.md](PERFECT_STATE_RESTORE.md) (reference design state, Git restoration commands)
- **Package config:** [package.json](package.json) (scripts, dependencies)
