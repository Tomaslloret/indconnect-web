// components.jsx — INDCONNECT shared building blocks
// Exposed on window so multiple <script type="text/babel"> files can share scope.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─────────────────────────────────────────────────────────────
   LOGO IC — variants
   ───────────────────────────────────────────────────────────── */

function Logo({ variant = 1, size = 28, withText = true, light = false }) {
  const burg = "var(--ic-burgundy)";
  const gold = "var(--ic-gold)";
  const w = size; const h = size;

  const mark = (() => {
    if (variant === 1) {
      // Solid burgundy rounded rect, bold IC
      return (
        <svg width={w} height={h} viewBox="0 0 28 28" fill="none" aria-label="IC">
          <rect x="0" y="0" width="28" height="28" rx="7" fill={burg}/>
          <text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text>
        </svg>
      );
    }
    if (variant === 2) {
      // Burgundy with gold accent stripe at right
      return (
        <svg width={w} height={h} viewBox="0 0 28 28" fill="none" aria-label="IC">
          <rect x="0" y="0" width="28" height="28" rx="7" fill={burg}/>
          <rect x="22" y="4" width="2.5" height="20" rx="1.25" fill={gold}/>
          <text x="13" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text>
        </svg>
      );
    }
    if (variant === 3) {
      // Outlined burgundy, IC in burgundy
      return (
        <svg width={w} height={h} viewBox="0 0 28 28" fill="none" aria-label="IC">
          <rect x="1" y="1" width="26" height="26" rx="7" fill="#fff" stroke={burg} strokeWidth="1.5"/>
          <text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill={burg}>IC</text>
        </svg>
      );
    }
    if (variant === 4) {
      // Monogram — overlapping I+C as geometric forms
      return (
        <svg width={w} height={h} viewBox="0 0 28 28" fill="none" aria-label="IC">
          <rect x="0" y="0" width="28" height="28" rx="7" fill={burg}/>
          <rect x="7" y="7" width="3" height="14" fill="#fff"/>
          <path d="M22 9.2a6 6 0 1 0 0 9.6" stroke="#fff" strokeWidth="3" strokeLinecap="square" fill="none"/>
        </svg>
      );
    }
    // variant 5: gold bg
    return (
      <svg width={w} height={h} viewBox="0 0 28 28" fill="none" aria-label="IC">
        <rect x="0" y="0" width="28" height="28" rx="7" fill={burg}/>
        <rect x="3" y="3" width="22" height="22" rx="5" fill="none" stroke={gold} strokeWidth="1"/>
        <text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text>
      </svg>
    );
  })();

  return (
    <a href="index.html" style={{display:'inline-flex',alignItems:'center',gap:10,color:light?'#fff':'var(--ic-ink)'}}>
      {mark}
      {withText && (
        <span style={{fontWeight:700,letterSpacing:'-.025em',fontSize:17}}>
          INDCONNECT
        </span>
      )}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   HEADER
   ───────────────────────────────────────────────────────────── */

function Header({ active = "home", logoVariant = 1 }) {
  return (
    <header className="ic-header">
      <div className="ic-wrap ic-header-inner">
        <Logo variant={logoVariant} />
        <nav className="ic-nav">
          <a href="map.html"      className={active==="map"?"active":""}>Mapa IA</a>
          <a href="search.html"   className={active==="search"?"active":""}>Buscar</a>
          <a href="invest.html"   className={active==="invest"?"active":""}>Invertir</a>
          <a href="dashboard.html" className={active==="dash"?"active":""}>Dashboard</a>
        </nav>
        <div className="ic-header-actions">
          <a className="ic-btn ic-btn-ghost" href="publish.html">Publicar</a>
          <a className="ic-btn ic-btn-secondary" href="#">Ingresar</a>
          <a className="ic-btn ic-btn-primary" href="#">Crear cuenta</a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="ic-footer">
      <div className="ic-wrap">
        <div className="ic-footer-grid">
          <div>
            <Logo variant={1} light={true}/>
            <p style={{marginTop:18, maxWidth:280, fontSize:13.5, lineHeight:1.6}}>
              Marketplace especializado en propiedades industriales y logísticas con inteligencia artificial integrada. Bahía Blanca, Argentina.
            </p>
            <div style={{marginTop:18,display:'flex',gap:8}}>
              <span className="ic-mono" style={{color:'rgba(255,255,255,.5)',fontSize:10}}>v1.0 · BETA</span>
            </div>
          </div>
          <div>
            <h5>Plataforma</h5>
            <ul>
              <li><a href="map.html">Mapa Inteligente</a></li>
              <li><a href="search.html">Buscar propiedades</a></li>
              <li><a href="invest.html">Inversión fraccionada</a></li>
              <li><a href="publish.html">Publicar</a></li>
            </ul>
          </div>
          <div>
            <h5>Empresa</h5>
            <ul>
              <li><a href="#">Sobre IndConnect</a></li>
              <li><a href="#">Modelo de IA</a></li>
              <li><a href="#">Sistema de reputación</a></li>
              <li><a href="#">Prensa</a></li>
            </ul>
          </div>
          <div>
            <h5>Soporte</h5>
            <ul>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Verificación de identidad</a></li>
              <li><a href="#">Términos</a></li>
              <li><a href="#">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="ic-footer-bottom">
          <span>© 2026 IndConnect S.A. · Bahía Blanca, Buenos Aires, Argentina</span>
          <span className="ic-mono">PROPTECH · INDUSTRIAL</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   REPUTATION
   ───────────────────────────────────────────────────────────── */

function Stars({ value = 0, size = 13 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="ic-stars" style={{fontSize:size}}>
      {[0,1,2,3,4].map(i => (
        <span key={i} className={i < full || (i===full && half) ? "" : "empty"}>
          {i===full && half ? "★" : "★"}
        </span>
      ))}
    </span>
  );
}

function Reputation({ rating, count, compact = false }) {
  return (
    <span className="ic-rep">
      <Stars value={rating}/>
      <span className="ic-num">{rating.toFixed(1)}</span>
      {!compact && <span style={{color:'var(--ic-text-2)'}}>· {count} op.</span>}
    </span>
  );
}

function VerifiedBadge({ premium = false, ai = false }) {
  if (ai) return <span className="ic-badge ic-badge-ai"><span className="dot"/>Verificado IA</span>;
  if (premium) return <span className="ic-badge ic-badge-premium">★ Premium</span>;
  return <span className="ic-badge ic-badge-verified">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 3.5l3 .5-2 2 .5 3-3-1.5L3 9l.5-3-2-2 3-.5L6 1z" fill="currentColor"/></svg>
    Verificado
  </span>;
}

/* ─────────────────────────────────────────────────────────────
   PROPERTY CARD
   ───────────────────────────────────────────────────────────── */

function PropertyCard({ p, compact = false }) {
  return (
    <a href="property.html" className="ic-card ic-card-hover" style={{display:'block', textDecoration:'none', color:'inherit'}}>
      <div className="ic-photo" data-label={p.photoLabel || "FOTO PROPIEDAD"} style={{aspectRatio:'4/3'}}>
        <div style={{position:'absolute',top:12,left:12,display:'flex',gap:6,zIndex:2}}>
          {p.aiPick && <span className="ic-badge ic-badge-ai"><span className="dot"/>IA destaca</span>}
          {!p.aiPick && p.tag && <span className="ic-badge" style={{background:'rgba(255,255,255,.95)'}}>{p.tag}</span>}
        </div>
        <div style={{position:'absolute',top:12,right:12,zIndex:2}}>
          <button className="ic-btn ic-btn-sm" style={{background:'rgba(255,255,255,.95)',borderColor:'transparent'}}>♡</button>
        </div>
        <div style={{position:'absolute',bottom:12,left:12,zIndex:2}}>
          <span className="ic-mono" style={{background:'rgba(20,22,28,.78)',color:'#fff',padding:'4px 8px',borderRadius:4,fontSize:10}}>
            {p.mode}
          </span>
        </div>
      </div>
      <div style={{padding:'16px 18px 18px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
          <span className="ic-mono" style={{color:'var(--ic-text-2)'}}>{p.type}</span>
          <span className="ic-mono" style={{color:'var(--ic-text-3)'}}>{p.surface} m²</span>
        </div>
        <h4 style={{margin:'4px 0 6px',fontSize:16,fontWeight:600,letterSpacing:'-.015em'}}>{p.title}</h4>
        <div style={{fontSize:13,color:'var(--ic-text-2)',marginBottom:14}}>{p.location}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <div style={{fontSize:20,fontWeight:600,letterSpacing:'-.02em'}} className="ic-num">USD {p.price}</div>
            <div style={{fontSize:11.5,color:'var(--ic-text-3)',marginTop:2}} className="ic-num">USD {p.pricePerM2}/m²</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,justifyContent:'flex-end',marginBottom:4}}>
              <Reputation rating={p.sellerRating} count={p.sellerOps} compact/>
            </div>
            <div style={{display:'flex',gap:4,justifyContent:'flex-end'}}>
              {p.verified && <VerifiedBadge/>}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI PILL — used to wrap "AI-generated" snippets
   ───────────────────────────────────────────────────────────── */

function AILabel({ children }) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'var(--ic-text-2)',fontSize:11,fontFamily:'var(--ic-mono)',letterSpacing:'.14em',textTransform:'uppercase'}}>
      <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ic-gold)',boxShadow:'0 0 0 3px rgba(201,168,76,.22)'}}/>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA — Bahía Blanca real zones
   ───────────────────────────────────────────────────────────── */

const ZONES = [
  { id: "white",   name: "Puerto Ing. White",     subtitle: "Logística portuaria · Petroquímico",
    avgPrice: 480, change6m: +4.2, demand: 92, proj12m: +6.8, proj36m: +22.4,
    coords: [-38.7785, -62.2680], type: "logistica" },
  { id: "parque",  name: "Parque Industrial",     subtitle: "Manufactura · Almacenamiento",
    avgPrice: 320, change6m: +2.1, demand: 78, proj12m: +4.5, proj36m: +15.2,
    coords: [-38.6920, -62.2580], type: "manufactura" },
  { id: "cerri",   name: "General Cerri",         subtitle: "Frigorífico · Alimentaria",
    avgPrice: 210, change6m: +1.4, demand: 64, proj12m: +3.2, proj36m: +10.8,
    coords: [-38.7480, -62.4030], type: "alimentaria" },
  { id: "cabildo", name: "Cabildo Industrial",    subtitle: "Logística regional",
    avgPrice: 175, change6m: +0.8, demand: 52, proj12m: +2.4, proj36m: +9.0,
    coords: [-38.4830, -61.8780], type: "logistica" },
  { id: "carrin",  name: "La Carrindanga",        subtitle: "Logística · Acceso ruta",
    avgPrice: 260, change6m: +3.1, demand: 81, proj12m: +5.6, proj36m: +18.6,
    coords: [-38.7020, -62.3120], type: "logistica" },
  { id: "polo",    name: "Polo Petroquímico",     subtitle: "Industria pesada",
    avgPrice: 540, change6m: +5.6, demand: 88, proj12m: +7.4, proj36m: +25.1,
    coords: [-38.7920, -62.2480], type: "petroquimica" },
];

const PROPS = [
  { id:"p1", type:"Galpón", title:"Galpón 1.800 m² · acceso camiones",
    location:"Puerto Ing. White · Bahía Blanca", surface:"1.800",
    price:"680.000", pricePerM2:"378",
    mode:"VENTA", tag:"Destacado",
    sellerRating:4.8, sellerOps:34, verified:true, premium:true,
    photoLabel:"GALPÓN INDUSTRIAL · 1800 m²", aiPick:true },
  { id:"p2", type:"Nave Industrial", title:"Nave 3.200 m² · oficinas + planta",
    location:"Parque Industrial Bahía Blanca", surface:"3.200",
    price:"1.450.000", pricePerM2:"453",
    mode:"VENTA",
    sellerRating:4.6, sellerOps:21, verified:true,
    photoLabel:"NAVE INDUSTRIAL · 3200 m²" },
  { id:"p3", type:"Terreno", title:"Terreno 8.500 m² · uso industrial",
    location:"La Carrindanga · sobre ruta 3", surface:"8.500",
    price:"320.000", pricePerM2:"38",
    mode:"VENTA", tag:"Subvaluado",
    sellerRating:4.9, sellerOps:48, verified:true, premium:true,
    photoLabel:"TERRENO INDUSTRIAL · 8500 m²", aiPick:true },
  { id:"p4", type:"Centro Logístico", title:"Centro logístico 5.400 m² + playa",
    location:"Puerto Ing. White · Bahía Blanca", surface:"5.400",
    price:"2.100.000", pricePerM2:"389",
    mode:"VENTA",
    sellerRating:4.4, sellerOps:12, verified:true,
    photoLabel:"CENTRO LOGÍSTICO · 5400 m²" },
  { id:"p5", type:"Galpón", title:"Galpón 920 m² · ideal e-commerce",
    location:"Parque Industrial Bahía Blanca", surface:"920",
    price:"4.800", pricePerM2:"5.2",
    mode:"ALQUILER",
    sellerRating:4.7, sellerOps:19, verified:true,
    photoLabel:"GALPÓN MEDIANO · 920 m²" },
  { id:"p6", type:"Inversión en pozo", title:"Centro Log. Sur · pre-construcción",
    location:"Parque Industrial · sector C", surface:"6.200",
    price:"500", pricePerM2:"—",
    mode:"FRACCIONADA", tag:"En pozo",
    sellerRating:4.9, sellerOps:8, verified:true, premium:true,
    photoLabel:"PROYECTO EN POZO · 6200 m²", aiPick:true },
  { id:"p7", type:"Local Industrial", title:"Local 380 m² · sobre avenida",
    location:"Cabildo Industrial", surface:"380",
    price:"185.000", pricePerM2:"487",
    mode:"VENTA",
    sellerRating:4.3, sellerOps:9, verified:true,
    photoLabel:"LOCAL INDUSTRIAL · 380 m²" },
  { id:"p8", type:"Nave Industrial", title:"Nave alimentaria 2.100 m²",
    location:"General Cerri", surface:"2.100",
    price:"720.000", pricePerM2:"343",
    mode:"VENTA",
    sellerRating:4.5, sellerOps:15, verified:true,
    photoLabel:"NAVE ALIMENTARIA · 2100 m²" },
];

const INVEST_PROJECTS = [
  { id:"i1", name:"Centro Logístico Sur", location:"Parque Industrial · Sector C",
    photo:"PROYECTO LOG. SUR · 6200 m²",
    total:"3.200.000", min:"500", roi:"14.2", funded:62, term:"36 meses",
    status:"En construcción", developerRep:4.9, developerOps:7 },
  { id:"i2", name:"Nave Petroquímica Norte", location:"Polo Petroquímico",
    photo:"NAVE PETROQUÍMICA · 4400 m²",
    total:"5.800.000", min:"1.000", roi:"16.8", funded:38, term:"48 meses",
    status:"Pre-venta", developerRep:4.7, developerOps:4 },
  { id:"i3", name:"Hub Logístico White", location:"Puerto Ing. White",
    photo:"HUB LOGÍSTICO · 8200 m²",
    total:"7.400.000", min:"500", roi:"12.4", funded:91, term:"24 meses",
    status:"Operativo", developerRep:4.8, developerOps:12 },
  { id:"i4", name:"Galpones Cabildo I-III", location:"Cabildo Industrial",
    photo:"3 GALPONES MODULARES",
    total:"1.800.000", min:"250", roi:"11.5", funded:24, term:"36 meses",
    status:"Pre-venta", developerRep:4.6, developerOps:9 },
];

/* expose globally */
Object.assign(window, {
  Logo, Header, Footer, Stars, Reputation, VerifiedBadge,
  PropertyCard, AILabel, ZONES, PROPS, INVEST_PROJECTS,
});
