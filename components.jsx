// components.jsx — INDCONNECT shared building blocks
// Requires auth.js + db.js loaded BEFORE this file.

const { useState, useEffect, useRef, useCallback } = React;

/* ─── Logo ─── */
function Logo({ variant = 1, size = 28, withText = true, light = false }) {
  const burg = "var(--ic-burgundy)", gold = "var(--ic-gold)";
  const w = size, h = size;
  const mark = (() => {
    if (variant===1) return <svg width={w} height={h} viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={burg}/><text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text></svg>;
    if (variant===2) return <svg width={w} height={h} viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={burg}/><rect x="22" y="4" width="2.5" height="20" rx="1.25" fill={gold}/><text x="13" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text></svg>;
    if (variant===3) return <svg width={w} height={h} viewBox="0 0 28 28" fill="none"><rect x="1" y="1" width="26" height="26" rx="7" fill="#fff" stroke={burg} strokeWidth="1.5"/><text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill={burg}>IC</text></svg>;
    if (variant===4) return <svg width={w} height={h} viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={burg}/><rect x="7" y="7" width="3" height="14" fill="#fff"/><path d="M22 9.2a6 6 0 1 0 0 9.6" stroke="#fff" strokeWidth="3" strokeLinecap="square" fill="none"/></svg>;
    return <svg width={w} height={h} viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={burg}/><rect x="3" y="3" width="22" height="22" rx="5" fill="none" stroke={gold} strokeWidth="1"/><text x="14" y="20" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" letterSpacing="-0.04em" fill="#fff">IC</text></svg>;
  })();
  return (
    <a href="index.html" style={{display:'inline-flex',alignItems:'center',gap:10,color:light?'#fff':'var(--ic-ink)'}}>
      {mark}
      {withText && <span style={{fontWeight:700,letterSpacing:'-.025em',fontSize:17}}>INDCONNECT</span>}
    </a>
  );
}

/* ─── Auth Modal ─── */
function AuthModal({ tab = 'login', onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState(tab);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [loginEmail, setLoginEmail]   = useState('');
  const [loginPw, setLoginPw]         = useState('');
  const [regName, setRegName]         = useState('');
  const [regCompany, setRegCompany]   = useState('');
  const [regEmail, setRegEmail]       = useState('');
  const [regPw, setRegPw]             = useState('');
  const [regPw2, setRegPw2]           = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { const u = await IndAuth.login(loginEmail, loginPw); onSuccess(u); }
    catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setError('');
    if (regPw !== regPw2) { setError('Las contraseñas no coinciden.'); return; }
    setLoading(true);
    try { const u = await IndAuth.register({ email:regEmail, password:regPw, name:regName, company:regCompany }); onSuccess(u); }
    catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const switchTab = (t) => { setActiveTab(t); setError(''); };

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(6px)',padding:20}}>
      <div className="ic-card" style={{width:'100%',maxWidth:440,borderRadius:20,overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,.28)'}}>
        <div style={{display:'flex',borderBottom:'1px solid var(--ic-line)'}}>
          {[['login','Ingresar'],['register','Crear cuenta']].map(([t,label])=>(
            <button key={t} onClick={()=>switchTab(t)} style={{flex:1,padding:'16px',border:0,background:activeTab===t?'var(--ic-card)':'var(--ic-bg-2)',fontWeight:activeTab===t?600:400,fontSize:14,color:activeTab===t?'var(--ic-burgundy)':'var(--ic-text)',borderBottom:activeTab===t?'2px solid var(--ic-burgundy)':'2px solid transparent',cursor:'default',transition:'all .15s',fontFamily:'var(--ic-font)'}}>
              {label}
            </button>
          ))}
        </div>
        <div style={{padding:'28px 32px 32px'}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{width:44,height:44,borderRadius:11,background:'var(--ic-burgundy)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:'#fff',fontWeight:700,fontSize:18,letterSpacing:'-.03em'}}>IC</span>
            </div>
            <p style={{color:'var(--ic-text)',fontSize:14,marginTop:10,marginBottom:0}}>
              {activeTab==='login'?'Bienvenido de vuelta a IndConnect':'Creá tu cuenta en IndConnect'}
            </p>
          </div>
          {error && <div style={{padding:'10px 14px',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,color:'#b91c1c',fontSize:13,marginBottom:16}}>{error}</div>}
          {activeTab==='login' ? (
            <form onSubmit={handleLogin}>
              <div style={{marginBottom:14}}>
                <label className="ic-label">Email</label>
                <input className="ic-input" type="email" required placeholder="tu@email.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
              </div>
              <div style={{marginBottom:20}}>
                <label className="ic-label">Contraseña</label>
                <input className="ic-input" type="password" required placeholder="••••••••" value={loginPw} onChange={e=>setLoginPw(e.target.value)}/>
              </div>
              <button className="ic-btn ic-btn-primary" type="submit" disabled={loading} style={{width:'100%',justifyContent:'center',padding:'12px'}}>
                {loading?'Ingresando...':'Ingresar'}
              </button>
              <p style={{textAlign:'center',fontSize:13,color:'var(--ic-text-2)',marginTop:16,marginBottom:0}}>
                ¿No tenés cuenta?{' '}
                <button type="button" onClick={()=>switchTab('register')} style={{background:'none',border:'none',color:'var(--ic-burgundy)',fontWeight:600,cursor:'default',fontFamily:'inherit',fontSize:'inherit',padding:0}}>Registrate</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                <div>
                  <label className="ic-label">Nombre completo *</label>
                  <input className="ic-input" type="text" required placeholder="Juan García" value={regName} onChange={e=>setRegName(e.target.value)}/>
                </div>
                <div>
                  <label className="ic-label">Empresa (opcional)</label>
                  <input className="ic-input" type="text" placeholder="Mi SRL" value={regCompany} onChange={e=>setRegCompany(e.target.value)}/>
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="ic-label">Email *</label>
                <input className="ic-input" type="email" required placeholder="tu@email.com" value={regEmail} onChange={e=>setRegEmail(e.target.value)}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
                <div>
                  <label className="ic-label">Contraseña *</label>
                  <input className="ic-input" type="password" required placeholder="Mín. 6 caracteres" value={regPw} onChange={e=>setRegPw(e.target.value)}/>
                </div>
                <div>
                  <label className="ic-label">Repetir *</label>
                  <input className="ic-input" type="password" required placeholder="••••••••" value={regPw2} onChange={e=>setRegPw2(e.target.value)}/>
                </div>
              </div>
              <button className="ic-btn ic-btn-primary" type="submit" disabled={loading} style={{width:'100%',justifyContent:'center',padding:'12px'}}>
                {loading?'Creando cuenta...':'Crear cuenta gratis'}
              </button>
              <p style={{textAlign:'center',fontSize:12,color:'var(--ic-text-2)',marginTop:12,marginBottom:0}}>
                Al registrarte aceptás los Términos y Privacidad de IndConnect.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Header ─── */
function Header({ active = "home", logoVariant = 1 }) {
  const [user, setUser]         = useState(() => IndAuth.getCurrentUser());
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab]   = useState('login');

  useEffect(() => {
    const h = (e) => setUser(e.detail);
    window.addEventListener('ic:auth', h);
    return () => window.removeEventListener('ic:auth', h);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('auth')==='login')    { setAuthTab('login');    setAuthOpen(true); }
    if (p.get('auth')==='register') { setAuthTab('register'); setAuthOpen(true); }
  }, []);

  const openAuth = (tab) => { setAuthTab(tab); setAuthOpen(true); };

  return (
    <>
      <header className="ic-header">
        <div className="ic-wrap ic-header-inner">
          <Logo variant={logoVariant}/>
          <nav className="ic-nav">
            <a href="map.html"       className={active==="map"   ?"active":""}>Mapa IA</a>
            <a href="search.html"    className={active==="search"?"active":""}>Buscar</a>
            <a href="invest.html"    className={active==="invest"?"active":""}>Invertir</a>
            <a href="dashboard.html" className={active==="dash"  ?"active":""}>Dashboard</a>
          </nav>
          <div className="ic-header-actions">
            <a className="ic-btn ic-btn-ghost" href="publish.html">Publicar</a>
            {user ? (
              <>
                <a href="dashboard.html" className="ic-btn ic-btn-secondary" style={{gap:8}}>
                  <div style={{width:22,height:22,borderRadius:'50%',background:'var(--ic-burgundy)',color:'#fff',fontSize:10,fontWeight:700,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {user.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                  </div>
                  {user.name.split(' ')[0]}
                </a>
                <button className="ic-btn ic-btn-ghost" onClick={()=>IndAuth.logout()}>Salir</button>
              </>
            ) : (
              <>
                <button className="ic-btn ic-btn-secondary" onClick={()=>openAuth('login')}>Ingresar</button>
                <button className="ic-btn ic-btn-primary"   onClick={()=>openAuth('register')}>Crear cuenta</button>
              </>
            )}
          </div>
        </div>
      </header>
      {authOpen && <AuthModal tab={authTab} onClose={()=>setAuthOpen(false)} onSuccess={(u)=>{setUser(u);setAuthOpen(false);}}/>}
    </>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="ic-footer">
      <div className="ic-wrap">
        <div className="ic-footer-grid">
          <div>
            <Logo variant={1} light={true}/>
            <p style={{marginTop:18,maxWidth:280,fontSize:13.5,lineHeight:1.6}}>
              Marketplace especializado en propiedades industriales y logísticas con inteligencia artificial integrada. Bahía Blanca, Argentina.
            </p>
            <div style={{marginTop:18}}><span className="ic-mono" style={{color:'rgba(255,255,255,.5)',fontSize:10}}>v1.0 · BETA</span></div>
          </div>
          <div><h5>Plataforma</h5><ul>
            <li><a href="map.html">Mapa Inteligente</a></li>
            <li><a href="search.html">Buscar propiedades</a></li>
            <li><a href="invest.html">Inversión fraccionada</a></li>
            <li><a href="publish.html">Publicar</a></li>
          </ul></div>
          <div><h5>Empresa</h5><ul>
            <li><a href="#">Sobre IndConnect</a></li>
            <li><a href="#">Modelo de IA</a></li>
            <li><a href="#">Sistema de reputación</a></li>
            <li><a href="#">Prensa</a></li>
          </ul></div>
          <div><h5>Soporte</h5><ul>
            <li><a href="#">Centro de ayuda</a></li>
            <li><a href="#">Verificación de identidad</a></li>
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul></div>
        </div>
        <div className="ic-footer-bottom">
          <span>© 2026 IndConnect S.A. · Bahía Blanca, Buenos Aires, Argentina</span>
          <span className="ic-mono">PROPTECH · INDUSTRIAL</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Reputation ─── */
function Stars({ value = 0, size = 13 }) {
  return (
    <span className="ic-stars" style={{fontSize:size}}>
      {[0,1,2,3,4].map(i=><span key={i} className={i<Math.floor(value)?"":"empty"}>★</span>)}
    </span>
  );
}
function Reputation({ rating, count, compact = false }) {
  if (!rating) return null;
  return (
    <span className="ic-rep">
      <Stars value={rating}/>
      <span className="ic-num">{Number(rating).toFixed(1)}</span>
      {!compact && <span style={{color:'var(--ic-text-2)'}}>· {count} op.</span>}
    </span>
  );
}
function VerifiedBadge({ premium = false, ai = false }) {
  if (ai)      return <span className="ic-badge ic-badge-ai"><span className="dot"/>Verificado IA</span>;
  if (premium) return <span className="ic-badge ic-badge-premium">★ Premium</span>;
  return <span className="ic-badge ic-badge-verified">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 3.5l3 .5-2 2 .5 3-3-1.5L3 9l.5-3-2-2 3-.5L6 1z" fill="currentColor"/></svg>
    Verificado
  </span>;
}

/* ─── Property Card ─── */
function PropertyCard({ p, compact = false }) {
  const user = IndAuth.getCurrentUser();
  const [fav, setFav] = useState(() => user ? IndDB.isFavorite(user.id, p.id) : false);

  const toggleFav = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!user) { window.location.href='index.html?auth=login'; return; }
    setFav(IndDB.toggleFavorite(user.id, p.id));
  };

  const priceDisplay = p.mode==='ALQUILER'
    ? `USD ${Number(p.price).toLocaleString()}/mes`
    : p.mode==='FRACCIONADA'
    ? `Desde USD ${Number(p.price).toLocaleString()}`
    : `USD ${Number(p.price).toLocaleString()}`;

  return (
    <a href={`property.html?id=${p.id}`} className="ic-card ic-card-hover" style={{display:'block',textDecoration:'none',color:'inherit'}}>
      <div className="ic-photo" data-label={p.photoLabel||"FOTO PROPIEDAD"} style={{aspectRatio:'4/3',position:'relative'}}>
        <div style={{position:'absolute',top:12,left:12,display:'flex',gap:6,zIndex:2}}>
          {p.aiPick && <span className="ic-badge ic-badge-ai"><span className="dot"/>IA destaca</span>}
          {!p.aiPick && p.tag && <span className="ic-badge" style={{background:'rgba(255,255,255,.95)'}}>{p.tag}</span>}
        </div>
        <button onClick={toggleFav} style={{position:'absolute',top:12,right:12,zIndex:2,width:32,height:32,borderRadius:8,background:'rgba(255,255,255,.95)',border:'1px solid var(--ic-line)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,cursor:'default',color:fav?'var(--ic-burgundy)':'var(--ic-text-2)'}}>
          {fav?'♥':'♡'}
        </button>
        <div style={{position:'absolute',bottom:12,left:12,zIndex:2}}>
          <span className="ic-mono" style={{background:'rgba(20,22,28,.78)',color:'#fff',padding:'4px 8px',borderRadius:4,fontSize:10}}>{p.mode}</span>
        </div>
      </div>
      <div style={{padding:'16px 18px 18px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
          <span className="ic-mono" style={{color:'var(--ic-text-2)'}}>{p.type}</span>
          <span className="ic-mono" style={{color:'var(--ic-text-3)'}}>{Number(p.surface).toLocaleString()} m²</span>
        </div>
        <h4 style={{margin:'4px 0 6px',fontSize:16,fontWeight:600,letterSpacing:'-.015em'}}>{p.title}</h4>
        <div style={{fontSize:13,color:'var(--ic-text-2)',marginBottom:14}}>{p.location}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <div style={{fontSize:20,fontWeight:600,letterSpacing:'-.02em'}} className="ic-num">{priceDisplay}</div>
            {p.pricePerM2 && <div style={{fontSize:11.5,color:'var(--ic-text-3)',marginTop:2}} className="ic-num">USD {p.pricePerM2}/m²</div>}
          </div>
          <div style={{textAlign:'right'}}>
            <Reputation rating={p.sellerRating} count={p.sellerOps} compact/>
            <div style={{display:'flex',gap:4,justifyContent:'flex-end',marginTop:4}}>
              {p.verified && <VerifiedBadge/>}
              {p.premium  && <VerifiedBadge premium/>}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ─── AI Label ─── */
function AILabel({ children }) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'var(--ic-text-2)',fontSize:11,fontFamily:'var(--ic-mono)',letterSpacing:'.14em',textTransform:'uppercase'}}>
      <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ic-gold)',boxShadow:'0 0 0 3px rgba(201,168,76,.22)'}}/>
      {children}
    </span>
  );
}

/* ─── Data references ─── */
const ZONES = [
  { id:"white",   name:"Puerto Ing. White",  subtitle:"Logística portuaria · Petroquímico", avgPrice:480,change6m:+4.2,demand:92,proj12m:+6.8,proj36m:+22.4,coords:[-38.7785,-62.2680],type:"logistica" },
  { id:"parque",  name:"Parque Industrial",  subtitle:"Manufactura · Almacenamiento",       avgPrice:320,change6m:+2.1,demand:78,proj12m:+4.5,proj36m:+15.2,coords:[-38.6920,-62.2580],type:"manufactura" },
  { id:"cerri",   name:"General Cerri",      subtitle:"Frigorífico · Alimentaria",           avgPrice:210,change6m:+1.4,demand:64,proj12m:+3.2,proj36m:+10.8,coords:[-38.7480,-62.4030],type:"alimentaria" },
  { id:"cabildo", name:"Cabildo Industrial", subtitle:"Logística regional",                  avgPrice:175,change6m:+0.8,demand:52,proj12m:+2.4,proj36m:+9.0, coords:[-38.4830,-61.8780],type:"logistica" },
  { id:"carrin",  name:"La Carrindanga",     subtitle:"Logística · Acceso ruta",             avgPrice:260,change6m:+3.1,demand:81,proj12m:+5.6,proj36m:+18.6,coords:[-38.7020,-62.3120],type:"logistica" },
  { id:"polo",    name:"Polo Petroquímico",  subtitle:"Industria pesada",                    avgPrice:540,change6m:+5.6,demand:88,proj12m:+7.4,proj36m:+25.1,coords:[-38.7920,-62.2480],type:"petroquimica" },
];

const PROPS = IndDB.getProperties();
const INVEST_PROJECTS = IndDB.getInvestProjects();

Object.assign(window, {
  Logo, Header, Footer, Stars, Reputation, VerifiedBadge,
  PropertyCard, AILabel, AuthModal,
  ZONES, PROPS, INVEST_PROJECTS,
});
