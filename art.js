// ===== Illustrations (inline SVG, no external images) =====
const ART = {
  hospital: `<svg class="scene" data-no-tr viewBox="0 0 560 440" role="img" aria-label="Illustration of a hospital building">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff1f1"/><stop offset="1" stop-color="#f7fbfb"/></linearGradient>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef5f6"/></linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fd3d6"/><stop offset="1" stop-color="#5fb3b8"/></linearGradient>
    </defs>
    <rect x="20" y="20" width="520" height="400" rx="36" fill="url(#sky)"/>
    <circle cx="455" cy="88" r="34" fill="#fbd38d" opacity=".75"/>
    <g fill="#ffffff" opacity=".9"><ellipse cx="120" cy="80" rx="38" ry="12"/><ellipse cx="150" cy="72" rx="26" ry="12"/><ellipse cx="380" cy="120" rx="30" ry="9"/></g>
    <!-- main block -->
    <rect x="150" y="110" width="260" height="250" rx="10" fill="url(#wall)" stroke="#cfe3e5" stroke-width="2"/>
    <rect x="150" y="110" width="260" height="34" rx="10" fill="#0b6e74"/>
    <text x="280" y="133" text-anchor="middle" font-family="Plus Jakarta Sans, Inter, sans-serif" font-weight="800" font-size="15" fill="#fff" letter-spacing="1.5">ALI MEDICAL COMPLEX</text>
    <!-- cross sign -->
    <circle cx="280" cy="186" r="28" fill="#fff" stroke="#e8a33d" stroke-width="4"/>
    <path d="M272 168h16v10h10v16h-10v10h-16v-10h-10v-16h10z" fill="#e05d5d"/>
    <!-- windows -->
    <g fill="url(#glass)">
      <rect x="172" y="160" width="40" height="30" rx="5"/><rect x="348" y="160" width="40" height="30" rx="5"/>
      <rect x="172" y="212" width="40" height="30" rx="5"/><rect x="230" y="232" width="40" height="30" rx="5"/><rect x="290" y="232" width="40" height="30" rx="5"/><rect x="348" y="212" width="40" height="30" rx="5"/>
      <rect x="172" y="264" width="40" height="30" rx="5"/><rect x="348" y="264" width="40" height="30" rx="5"/>
    </g>
    <!-- door -->
    <rect x="246" y="290" width="68" height="70" rx="6" fill="#0b6e74"/>
    <rect x="252" y="296" width="26" height="64" rx="3" fill="url(#glass)"/><rect x="282" y="296" width="26" height="64" rx="3" fill="url(#glass)"/>
    <rect x="232" y="282" width="96" height="10" rx="4" fill="#e8a33d"/>
    <!-- side wings -->
    <rect x="70" y="200" width="80" height="160" rx="8" fill="#f2f8f8" stroke="#cfe3e5" stroke-width="2"/>
    <rect x="410" y="180" width="86" height="180" rx="8" fill="#f2f8f8" stroke="#cfe3e5" stroke-width="2"/>
    <g fill="url(#glass)"><rect x="88" y="222" width="44" height="24" rx="4"/><rect x="88" y="262" width="44" height="24" rx="4"/><rect x="88" y="302" width="44" height="24" rx="4"/>
      <rect x="430" y="204" width="46" height="24" rx="4"/><rect x="430" y="244" width="46" height="24" rx="4"/><rect x="430" y="284" width="46" height="24" rx="4"/></g>
    <!-- ground, trees -->
    <rect x="20" y="356" width="520" height="64" rx="0" fill="#e3efe9"/>
    <path d="M20 356h520v28c0 20-16 36-36 36H56c-20 0-36-16-36-36z" fill="#d5e8de"/>
    <rect x="232" y="360" width="96" height="60" fill="#eef3f4"/>
    <g><rect x="50" y="318" width="6" height="40" fill="#8a6b4a"/><circle cx="53" cy="306" r="22" fill="#5fa77a"/><circle cx="40" cy="318" r="14" fill="#6fb88a"/></g>
    <g><rect x="506" y="322" width="6" height="36" fill="#8a6b4a"/><circle cx="509" cy="310" r="20" fill="#5fa77a"/><circle cx="522" cy="322" r="12" fill="#6fb88a"/></g>
    <!-- heartbeat line -->
    <path d="M40 392h150l14-22 16 40 14-28 10 10h276" fill="none" stroke="#0b6e74" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>
    <!-- ambulance -->
    <g transform="translate(372 330)"><rect x="0" y="8" width="70" height="28" rx="6" fill="#fff" stroke="#cfe3e5" stroke-width="2"/><path d="M70 16h14l10 12v8H70z" fill="#fff" stroke="#cfe3e5" stroke-width="2"/>
      <rect x="0" y="22" width="94" height="4" fill="#e05d5d"/><path d="M28 13h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#e05d5d"/>
      <circle cx="18" cy="38" r="7" fill="#33434d"/><circle cx="76" cy="38" r="7" fill="#33434d"/><circle cx="18" cy="38" r="3" fill="#dfe6e8"/><circle cx="76" cy="38" r="3" fill="#dfe6e8"/></g>
  </svg>`,

  care: `<svg viewBox="0 0 480 360" role="img" aria-label="Illustration of a doctor consulting a family">
    <rect x="10" y="10" width="460" height="340" rx="30" fill="#eef7f7"/>
    <circle cx="380" cy="80" r="46" fill="#fdebc8"/>
    <rect x="60" y="250" width="360" height="12" rx="6" fill="#cfe3e5"/>
    <!-- doctor -->
    <g transform="translate(110 92)">
      <circle cx="50" cy="34" r="26" fill="#c98c65"/><path d="M24 30c0-18 12-28 26-28s27 10 27 26c-8-8-20-10-30-8-9 2-15 6-23 10z" fill="#2d2f36"/>
      <path d="M8 160c0-52 18-80 42-80s42 28 42 80z" fill="#fff" stroke="#cfe3e5" stroke-width="2"/>
      <path d="M36 82l14 26 14-26" fill="#0b6e74"/>
      <path d="M30 96c0 22 6 34 14 38M70 96c0 22-6 34-14 38" fill="none" stroke="#0b6e74" stroke-width="3" stroke-linecap="round"/><circle cx="56" cy="136" r="5" fill="#0b6e74"/>
      <rect x="62" y="110" width="22" height="28" rx="3" fill="#e8a33d"/>
    </g>
    <!-- parent + child -->
    <g transform="translate(260 110)">
      <circle cx="40" cy="30" r="22" fill="#a86e4c"/><path d="M16 34c-2-22 12-34 26-34s26 12 22 34c-6-12-14-18-24-18s-18 6-24 18z" fill="#4b3a5e"/>
      <path d="M2 142c0-50 16-74 38-74s38 24 38 74z" fill="#e87ba4" opacity=".85"/>
      <circle cx="104" cy="74" r="16" fill="#c98c65"/><path d="M88 74c0-12 8-18 16-18s16 6 16 18c-4-6-10-8-16-8s-12 2-16 8z" fill="#2d2f36"/>
      <path d="M82 142c0-34 10-50 22-50s22 16 22 50z" fill="#2a78d6" opacity=".85"/>
    </g>
    <!-- speech bubble with heart -->
    <g transform="translate(212 52)"><rect width="64" height="44" rx="14" fill="#fff" stroke="#cfe3e5" stroke-width="2"/><path d="M20 44l-6 12 16-12" fill="#fff"/>
      <path d="M32 33l-10-10a6 6 0 0 1 10-7 6 6 0 0 1 10 7z" fill="#e05d5d"/></g>
  </svg>`
};
