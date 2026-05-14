// tweaks.jsx — INDCONNECT tweak state shared across pages.
// Reads localStorage so changes survive cross-page navigation.
// Also writes back to the host via __edit_mode_set_keys so disk persists.

const IND_TWEAK_KEY = "indconnect.tweaks.v1";

const IND_TWEAK_DEFAULTS = {
  burgundy:  "#6B0F1A",
  goldOn:    true,
  density:   "regular",   // compact | regular | comfy
  heroVar:   "split",     // split | minimal | bigtype
  logoVar:   1,
};

function loadIndTweaks(initial) {
  try {
    const raw = localStorage.getItem(IND_TWEAK_KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch (_) {}
  return initial;
}

function saveIndTweaks(state) {
  try { localStorage.setItem(IND_TWEAK_KEY, JSON.stringify(state)); } catch(_) {}
  try {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
  } catch(_){}
}

// Apply tweak state to :root so CSS picks it up.
function applyIndTweaks(t) {
  const root = document.documentElement;
  // Burgundy + computed derived
  root.style.setProperty('--ic-burgundy', t.burgundy);
  // Derive deep / soft / tint by mixing — quick hex math
  root.style.setProperty('--ic-burgundy-deep', shade(t.burgundy, -0.22));
  root.style.setProperty('--ic-burgundy-soft', shade(t.burgundy, +0.18));
  root.style.setProperty('--ic-burgundy-tint', mixWhite(t.burgundy, 0.92));

  // Gold accent toggle
  if (!t.goldOn) {
    root.style.setProperty('--ic-gold', '#9698A2');
    root.style.setProperty('--ic-gold-soft', '#D8DADF');
    root.style.setProperty('--ic-gold-tint', '#EEEFF2');
  } else {
    root.style.setProperty('--ic-gold', '#C9A84C');
    root.style.setProperty('--ic-gold-soft', '#E5D49A');
    root.style.setProperty('--ic-gold-tint', '#FAF4E1');
  }

  // Density
  document.body.classList.remove('density-compact','density-comfy');
  if (t.density === 'compact') document.body.classList.add('density-compact');
  if (t.density === 'comfy')   document.body.classList.add('density-comfy');
}

function shade(hex, amt) {
  const c = hexToRgb(hex);
  const r = Math.max(0, Math.min(255, Math.round(c.r + amt * (amt > 0 ? 255 - c.r : c.r))));
  const g = Math.max(0, Math.min(255, Math.round(c.g + amt * (amt > 0 ? 255 - c.g : c.g))));
  const b = Math.max(0, Math.min(255, Math.round(c.b + amt * (amt > 0 ? 255 - c.b : c.b))));
  return rgbToHex(r,g,b);
}
function mixWhite(hex, t) {
  const c = hexToRgb(hex);
  return rgbToHex(
    Math.round(c.r + (255 - c.r) * t),
    Math.round(c.g + (255 - c.g) * t),
    Math.round(c.b + (255 - c.b) * t)
  );
}
function hexToRgb(h) {
  const x = h.replace('#','');
  return { r: parseInt(x.slice(0,2),16), g: parseInt(x.slice(2,4),16), b: parseInt(x.slice(4,6),16) };
}
function rgbToHex(r,g,b) {
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// React hook + panel — wired via the starter <TweaksPanel> shell.
function useIndTweaks() {
  const [t, setT] = React.useState(() => loadIndTweaks(IND_TWEAK_DEFAULTS));
  React.useEffect(() => { applyIndTweaks(t); saveIndTweaks(t); }, [t]);
  // Cross-page sync
  React.useEffect(() => {
    const fn = (e) => {
      if (e.key === IND_TWEAK_KEY && e.newValue) {
        try { setT({ ...IND_TWEAK_DEFAULTS, ...JSON.parse(e.newValue) }); } catch(_){}
      }
    };
    window.addEventListener('storage', fn);
    return () => window.removeEventListener('storage', fn);
  }, []);
  const set = (k, v) => setT(prev => {
    if (typeof k === 'object') return { ...prev, ...k };
    return { ...prev, [k]: v };
  });
  return [t, set];
}

function IndTweaksPanel({ showLogoVar = true, showHeroVar = true }) {
  const [t, setT] = useIndTweaks();
  return (
    <TweaksPanel title="Tweaks · INDCONNECT">
      <TweakSection label="Color"/>
      <TweakColor label="Bordo" value={t.burgundy}
        options={['#6B0F1A','#5C0A14','#7A1626','#4D0712','#8A2533']}
        onChange={v => setT('burgundy', v)} />
      <TweakToggle label="Acento dorado" value={t.goldOn}
        onChange={v => setT('goldOn', v)} />

      <TweakSection label="Densidad"/>
      <TweakRadio label="Spacing" value={t.density}
        options={['compact','regular','comfy']}
        onChange={v => setT('density', v)} />

      {showHeroVar && <>
        <TweakSection label="Landing"/>
        <TweakRadio label="Hero" value={t.heroVar}
          options={['split','minimal','bigtype']}
          onChange={v => setT('heroVar', v)} />
      </>}

      {showLogoVar && <>
        <TweakSection label="Logo IC"/>
        <TweakSelect label="Variante" value={String(t.logoVar)}
          options={[
            {value:'1', label:'1 · Sólido bordo'},
            {value:'2', label:'2 · Stripe dorada'},
            {value:'3', label:'3 · Outline'},
            {value:'4', label:'4 · Monograma'},
            {value:'5', label:'5 · Marco dorado'},
          ]}
          onChange={v => setT('logoVar', Number(v))} />
      </>}
    </TweaksPanel>
  );
}

// Quick standalone mount helper used by every page
function mountTweaks(opts = {}) {
  // Apply tweaks immediately even before React mounts, so first paint is right
  applyIndTweaks(loadIndTweaks(IND_TWEAK_DEFAULTS));

  const host = document.createElement('div');
  host.id = '__ic_tweaks_host';
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<IndTweaksPanel {...opts}/>);
}

Object.assign(window, {
  IND_TWEAK_DEFAULTS, useIndTweaks, IndTweaksPanel, mountTweaks, applyIndTweaks, loadIndTweaks,
});
