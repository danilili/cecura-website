const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "lavanda",
  "heroVariant": "centered",
  "showPattern": true,
  "floatingButterflies": true
}/*EDITMODE-END*/;

const PALETTES = {
  lavanda: {
    label: "Lavanda + Mezclilla",
    css: {
      '--bg': '#F7F5F9',
      '--bg-warm': '#FAF8F4',
      '--ink': '#1A1B2E',
      '--ink-soft': '#4B4C68',
      '--mezclilla': '#3563A9',
      '--bizancio': '#72195A',
      '--lavanda': '#AFA0C8',
      '--lavanda-pale': '#EDE8F4',
    }
  },
  azul: {
    label: "Azul protagonista",
    css: {
      '--bg': '#F4F6FB',
      '--bg-warm': '#FAFAFC',
      '--ink': '#0E1B33',
      '--ink-soft': '#3D4A66',
      '--mezclilla': '#3563A9',
      '--bizancio': '#2A4F88',
      '--lavanda': '#7C95C5',
      '--lavanda-pale': '#DEE6F4',
    }
  },
  oscuro: {
    label: "Institucional oscuro",
    css: {
      '--bg': '#F2EFE8',
      '--bg-warm': '#E9E6DE',
      '--ink': '#1F2A28',
      '--ink-soft': '#4A5654',
      '--mezclilla': '#426B69',
      '--bizancio': '#1F3937',
      '--lavanda': '#9FAFAE',
      '--lavanda-pale': '#D8DEDC',
    }
  },
  calido: {
    label: "Cálido leonado",
    css: {
      '--bg': '#FAF6F0',
      '--bg-warm': '#FFFBF4',
      '--ink': '#2A1F1A',
      '--ink-soft': '#5C4E45',
      '--mezclilla': '#B86A1F',
      '--bizancio': '#72195A',
      '--lavanda': '#D9B58A',
      '--lavanda-pale': '#F3E6D2',
    }
  }
};

function applyPalette(name) {
  const p = PALETTES[name];
  if (!p) return;
  const root = document.documentElement;
  Object.entries(p.css).forEach(([k, v]) => root.style.setProperty(k, v));
}

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyPalette(t.palette); }, [t.palette]);
  useEffect(() => {
    const pattern = document.querySelector('.hero-pattern');
    if (pattern) pattern.style.display = t.showPattern ? '' : 'none';
  }, [t.showPattern]);
  useEffect(() => {
    document.querySelectorAll('.float').forEach(f => f.style.display = t.floatingButterflies ? '' : 'none');
  }, [t.floatingButterflies]);
  useEffect(() => {
    const hero = document.querySelector('.hero-inner');
    if (!hero) return;
    const h1 = hero.querySelector('h1');
    const sub = hero.querySelector('.hero-sub');
    const eyebrow = hero.querySelector('.eyebrow');
    const cta = hero.querySelector('.hero-cta');
    if (t.heroVariant === 'left') {
      hero.style.textAlign = 'left';
      hero.style.maxWidth = '900px';
      hero.style.marginLeft = '0';
      hero.style.marginRight = 'auto';
      if (h1) h1.style.margin = '24px 0 32px';
      if (sub) sub.style.margin = '0 0 40px';
      if (eyebrow) eyebrow.style.justifyContent = 'flex-start';
      if (cta) cta.style.justifyContent = 'flex-start';
    } else {
      hero.style.textAlign = 'center';
      hero.style.maxWidth = '';
      hero.style.marginLeft = '';
      hero.style.marginRight = '';
      if (h1) h1.style.margin = '24px auto 32px';
      if (sub) sub.style.margin = '0 auto 40px';
      if (eyebrow) eyebrow.style.justifyContent = 'center';
      if (cta) cta.style.justifyContent = 'center';
    }
  }, [t.heroVariant]);

  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect } = window;

  return (
    <TweaksPanel>
      <TweakSection label="Paleta de color">
        <TweakSelect
          label="Combinación"
          value={t.palette}
          onChange={v => setTweak('palette', v)}
          options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.label }))}
        />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakRadio
          label="Alineación"
          value={t.heroVariant}
          onChange={v => setTweak('heroVariant', v)}
          options={[
            { value: 'centered', label: 'Centro' },
            { value: 'left', label: 'Izquierda' },
          ]}
        />
        <TweakToggle
          label="Patrón de fondo"
          value={t.showPattern}
          onChange={v => setTweak('showPattern', v)}
        />
        <TweakToggle
          label="Mariposas flotantes"
          value={t.floatingButterflies}
          onChange={v => setTweak('floatingButterflies', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);

// Apply default palette on load
applyPalette(TWEAK_DEFAULTS.palette);
