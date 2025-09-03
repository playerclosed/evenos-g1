export type DisplayProfile = {
  name: string;
  pixelRatio: number;
  safeArea: { top: number; bottom: number; left: number; right: number };
  scale: number;
  fontBasePx: number;
};
export async function loadProfile(): Promise<DisplayProfile> {
  const res = await fetch('/display/profile.g1.json');
  return (await res.json()) as DisplayProfile;
}
export function applyCssVars(p: DisplayProfile) {
  const r = document.documentElement.style;
  r.setProperty('--safe-top', p.safeArea.top + 'px');
  r.setProperty('--safe-bottom', p.safeArea.bottom + 'px');
  r.setProperty('--safe-left', p.safeArea.left + 'px');
  r.setProperty('--safe-right', p.safeArea.right + 'px');
  r.setProperty('--ui-scale', String(p.scale));
  r.setProperty('--font-base', p.fontBasePx + 'px');
}
