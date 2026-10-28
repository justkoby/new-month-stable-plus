# Stable Plus Healthcare — Happy November (Remotion)

9:16 · 1080×1920 · 30 fps · H.264 MP4 · ~20 s. Built with React + Remotion + TypeScript.

## Quick start
```bash
npm install
npm run dev        # Remotion Studio preview (scrub the timeline)
npm run render     # → out/stable-plus-november.mp4
npm run still      # → out/poster.png (single frame)
npm run typecheck
```
If Remotion can't download its browser (offline/CI), point it at a local Chromium:
`npx remotion render src/index.ts NovemberAd out/x.mp4 --browser-executable=<path> --chrome-mode=headless-shell`

## Editing
- **All copy, contact details and logo path:** `src/config.ts` (`campaign`).
- **Timeline / trims / slow-motion:** `src/config.ts` (`scenes`, `END_PHASE_B`, `XFADE`).
- **Colours, fonts, safe zones:** `src/styles/theme.ts` (colours sampled from the logo).
- **Components:** `src/components/` — `VideoScene`, `RevealText`, `Logo`, `ContactInfo`, `EndCard`; composition in `src/compositions/NovemberAd.tsx`.
- For a new month: swap clips in `public/assets/videos/`, edit `campaign`, re-render.

## Assets
Original files remain untouched in the repo root. Working copies with clean names are in `public/assets/`
(`logo-4x.png` is a Lanczos-upscaled copy of the 319×219 logo; `logo-original.png` is the untouched copy).

## Audio
Only the clips' own low-level ambience is used (faded per scene). No music is included because no licensed track is in the repo; drop one in `public/assets/audio/` and add an `<Audio>` to `NovemberAd.tsx`.
