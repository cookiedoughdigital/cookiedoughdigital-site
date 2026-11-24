// CD-261119-4 / CD-261124-1 Chip chat bubble: single source of truth.
// CHIP_WIDGET_ID = PayMeGPT agent "Chip" (public widget id, not a secret).
// CHIP_EXCLUDE: routes that never render the bubble. GO-DARK: set CHIP_ENABLED = false.
export const CHIP_ENABLED = true;
export const CHIP_WIDGET_ID = '47882242';
export const CHIP_EXCLUDE = ['/services/chatbots/', '/contact/']; // chatbots: inline Chip (no double bot); contact: page has its own form (CD-261124-1 D6, launcher overlapped fields on mobile)

export function showChip(pathname, base = '/') {
  if (!CHIP_ENABLED) return false;
  const b = base.replace(/\/$/, '');
  let p = b && pathname.startsWith(b) ? pathname.slice(b.length) : pathname;
  p = '/' + p.replace(/^\/+|\/+$/g, '');
  return !CHIP_EXCLUDE.some((r) => '/' + r.replace(/^\/+|\/+$/g, '') === p);
}
