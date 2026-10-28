import fs from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Offline/CI fallback: use a local headless Chromium if Remotion can't download its own.
// Override with REMOTION_BROWSER=/path/to/chrome-headless-shell.
const local = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
if (fs.existsSync(local)) {
  Config.setBrowserExecutable(local);
  Config.setChromeMode('headless-shell');
}
