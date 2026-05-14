// db.js — INDCONNECT Local Database
// Vanilla JS. Uses localStorage as data store.
// Auto-seeds with Bahía Blanca real estate data on first load.

const IndDB = (() => {
  'use strict';
  const _get = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } };
  const _set = (k, v)   => localStorage.setItem(k, JSON.stringify(v));
  const K = {
    props: 'ic.properties', seeded: 'ic.seeded.v2',
    favs: 'ic.favorites', inquiries: 'ic.inquiries',
    investments: 'ic.investments', projects: 'ic.investProjects',
  };

  // ─── Seed data — Bahía Blanca real zones + realistic properties ───
  const SEED_PROPS = [
    { id:'p1', type:'Galpón', title:'Galpón 1.800 m² · acceso camiones',
      location:'Puerto Ing. White · Bahía Blanca', surface:1800, price:680000, pricePerM2:378,
      mode:'VENTA', tag:'Destacado', sellerRating:4.8, sellerOps:34, verified:true, premium:true,
      photoLabel:'GALPÓN INDUSTRIAL · 1800 m²', aiPick:true, zone:'white', height:10,
      access:'Camiones articulados', power:'220/380V trifásico', floor:'Hormigón armado H-30',
      description:'Galpón industrial de 1.800 m² estratégicamente ubicado a 800m del Puerto Ingeniero White. Portón eléctrico de 7m ancho × 8m alto, oficinas integradas de 120 m², 3 baños, vigilancia 24hs. Acceso directo para camiones articulados. Ideal para logística, almacenamiento y distribución portuaria.',
      sellerId:'seller1', sellerName:'Logística Sur SRL', views:284, inquiries:12,
      aiAnalysis:'Zona con proyección de revalorización del +22.4% en 36 meses. Demanda de la zona: 92/100. Precio por m² 8% por debajo del promedio sectorial.',
      createdAt: new Date(Date.now()-7*864e5).toISOString() },
    { id:'p2', type:'Nave Industrial', title:'Nave 3.200 m² · oficinas + planta',
      location:'Parque Industrial Bahía Blanca', surface:3200, price:1450000, pricePerM2:453,
      mode:'VENTA', sellerRating:4.6, sellerOps:21, verified:true, premium:false,
      photoLabel:'NAVE INDUSTRIAL · 3200 m²', zone:'parque', height:12,
      access:'Camiones + acceso ferroviario', power:'Alta tensión disponible', floor:'Industrial antideslizante',
      description:'Nave industrial de 3.200 m² en el Parque Industrial de Bahía Blanca. Incluye sector de oficinas (280 m²), playa de maniobras de 1.500 m², conectividad ferroviaria directa y todos los servicios industriales. Habilitada municipalmente. Posibilidad de ampliar 1.000 m² adicionales.',
      sellerId:'seller2', sellerName:'Grupo Inmob. Pampa', views:189, inquiries:8,
      aiAnalysis:'Zona de manufactura consolidada. Proyección +15.2% a 36 meses. Alta demanda sectorial por cercanía a corredor logístico.',
      createdAt: new Date(Date.now()-14*864e5).toISOString() },
    { id:'p3', type:'Terreno', title:'Terreno 8.500 m² · uso industrial',
      location:'La Carrindanga · sobre ruta 3', surface:8500, price:320000, pricePerM2:38,
      mode:'VENTA', tag:'Subvaluado', sellerRating:4.9, sellerOps:48, verified:true, premium:true,
      photoLabel:'TERRENO INDUSTRIAL · 8500 m²', aiPick:true, zone:'carrin',
      access:'Ruta Nacional 3 · acceso directo', power:'Tendido disponible a 200m', floor:null,
      description:'Terreno de 8.500 m² sobre Ruta Nacional 3 con excelente visibilidad y accesibilidad. Apto uso industrial según zonificación municipal. Suelo arenoso compacto, sin restricciones hídricas. El modelo de IA detecta subvaluación del 23% respecto al promedio zonal.',
      sellerId:'seller1', sellerName:'Logística Sur SRL', views:412, inquiries:21,
      aiAnalysis:'OPORTUNIDAD DETECTADA: precio 23% bajo promedio zonal. Proyección +18.6% a 36 meses por obras de acceso vial programadas. Zona de especialización logística en expansión.',
      createdAt: new Date(Date.now()-3*864e5).toISOString() },
    { id:'p4', type:'Centro Logístico', title:'Centro logístico 5.400 m² + playa',
      location:'Puerto Ing. White · Bahía Blanca', surface:5400, price:2100000, pricePerM2:389,
      mode:'VENTA', sellerRating:4.4, sellerOps:12, verified:true, premium:false,
      photoLabel:'CENTRO LOGÍSTICO · 5400 m²', zone:'white', height:14,
      access:'Camiones pesados · 2 accesos independientes', power:'220/380V · UPS industrial', floor:'Hormigón reforzado carga 5t/m²',
      description:'Centro logístico completo de 5.400 m² con playa de maniobras de 2.000 m². 8 andenes de carga y descarga con niveladores. Cámaras de frío de 800 m³, sector seco 4.600 m². Sistema contra incendios NFPA. Vigilancia con CCTV 24hs.',
      sellerId:'seller3', sellerName:'Naves del Atlántico', views:156, inquiries:6,
      aiAnalysis:'Zona portuaria de alta demanda. Índice de ocupación sectorial: 94%. Proyección +22.4% a 36 meses.',
      createdAt: new Date(Date.now()-21*864e5).toISOString() },
    { id:'p5', type:'Galpón', title:'Galpón 920 m² · ideal e-commerce',
      location:'Parque Industrial Bahía Blanca', surface:920, price:4800, pricePerM2:5.22,
      mode:'ALQUILER', sellerRating:4.7, sellerOps:19, verified:true, premium:false,
      photoLabel:'GALPÓN MEDIANO · 920 m²', zone:'parque', height:7,
      access:'Camioneta y camión chico', power:'220/380V', floor:'Cemento pulido nivelado',
      description:'Galpón de 920 m² ideal para e-commerce, distribución y almacenamiento. Piso de cemento pulido nivelado, iluminación LED, baños y vestuarios, comedor. Portón eléctrico 4m × 4.5m. Disponible inmediatamente. Contrato desde 12 meses.',
      sellerId:'seller2', sellerName:'Grupo Inmob. Pampa', views:320, inquiries:17,
      aiAnalysis:'Alta demanda de alquiler industrial en zona. Precio por debajo del mercado. Recomendado para distribución y última milla.',
      createdAt: new Date(Date.now()-5*864e5).toISOString() },
    { id:'p6', type:'Inversión en pozo', title:'Centro Log. Sur · pre-construcción',
      location:'Parque Industrial · sector C', surface:6200, price:500, pricePerM2:null,
      mode:'FRACCIONADA', tag:'En pozo', sellerRating:4.9, sellerOps:8, verified:true, premium:true,
      photoLabel:'PROYECTO EN POZO · 6200 m²', aiPick:true, zone:'parque',
      access:'Camiones articulados · 3 accesos', power:'Alta tensión', floor:'En construcción',
      description:'Proyecto de centro logístico de 6.200 m² en construcción, Parque Industrial Sector C. Inversión fraccionada desde USD 500. Retorno proyectado 14.2% anual a 36 meses. Documentación completa, desarrollador con 7 proyectos exitosos.',
      sellerId:'seller1', sellerName:'Logística Sur SRL', views:543, inquiries:31,
      aiAnalysis:'Retorno proyectado 14.2% anual (modelo IndConnect IA). Alta confianza: 87/100. Zona en expansión, demanda de almacenamiento creciente post-ampliación portuaria.',
      createdAt: new Date(Date.now()-2*864e5).toISOString() },
    { id:'p7', type:'Local Industrial', title:'Local 380 m² · sobre avenida',
      location:'Cabildo Industrial', surface:380, price:185000, pricePerM2:487,
      mode:'VENTA', sellerRating:4.3, sellerOps:9, verified:true, premium:false,
      photoLabel:'LOCAL INDUSTRIAL · 380 m²', zone:'cabildo', height:5,
      access:'Auto y camioneta', power:'220V monofásico', floor:'Mosaico industrial',
      description:'Local industrial de 380 m² sobre avenida principal de Cabildo. Incluye depósito 280 m², área de atención al público 100 m² y estacionamiento propio para 8 autos. Habilitado para comercio industrial y servicios.',
      sellerId:'seller4', sellerName:'M. Fernández — Independiente', views:98, inquiries:3,
      aiAnalysis:'Zona logística regional en desarrollo. Proyección +9.0% a 36 meses. Buena relación precio/superficie para el segmento comercial-industrial.',
      createdAt: new Date(Date.now()-30*864e5).toISOString() },
    { id:'p8', type:'Nave Industrial', title:'Nave alimentaria 2.100 m² habilitada SENASA',
      location:'General Cerri', surface:2100, price:720000, pricePerM2:343,
      mode:'VENTA', sellerRating:4.5, sellerOps:15, verified:true, premium:false,
      photoLabel:'NAVE ALIMENTARIA · 2100 m²', zone:'cerri', height:8,
      access:'Camiones', power:'220/380V trifásico', floor:'Epoxi antideslizante apto alimentos',
      description:'Nave alimentaria de 2.100 m² con habilitación SENASA vigente. Cámara fría 420 m³, sector seco 1.680 m², vestuarios diferenciados, laboratorio de análisis 40 m². Piso epoxi apto contacto alimentario. Ideal frigorífico, industria láctea o distribución de alimentos.',
      sellerId:'seller3', sellerName:'Naves del Atlántico', views:201, inquiries:9,
      aiAnalysis:'Zona frigorífica-alimentaria de General Cerri. Alta especialización sectorial. Proyección +10.8% a 36 meses por crecimiento agro-exportador.',
      createdAt: new Date(Date.now()-10*864e5).toISOString() },
  ];

  const SEED_PROJECTS = [
    { id:'i1', name:'Centro Logístico Sur', location:'Parque Industrial · Sector C',
      photo:'PROYECTO LOG. SUR · 6200 m²', total:3200000, min:500, roi:14.2,
      funded:62, term:36, status:'En construcción', developerRep:4.9, developerOps:7,
      developerId:'seller1', developerName:'Logística Sur SRL',
      description:'Centro logístico de última generación. 6.200 m² con 8 andenes, playa de maniobras y control climático. Contrato de pre-arrendamiento firmado con empresa exportadora de granos.',
      timeline:[{label:'Inicio obras',date:'Mar 2026',done:true},{label:'Estructura',date:'Jun 2026',done:false},{label:'Cierre',date:'Oct 2026',done:false},{label:'Entrega',date:'Mar 2027',done:false}] },
    { id:'i2', name:'Nave Petroquímica Norte', location:'Polo Petroquímico',
      photo:'NAVE PETROQUÍMICA · 4400 m²', total:5800000, min:1000, roi:16.8,
      funded:38, term:48, status:'Pre-venta', developerRep:4.7, developerOps:4,
      developerId:'seller2', developerName:'Grupo Inmob. Pampa',
      description:'Nave industrial de uso petroquímico en el Polo Petroquímico de Ing. White. Infraestructura reforzada con certificaciones API y NFPA.',
      timeline:[{label:'Diseño',date:'Jun 2026',done:false},{label:'Permisos',date:'Sep 2026',done:false},{label:'Inicio obras',date:'Dic 2026',done:false},{label:'Entrega',date:'Dic 2027',done:false}] },
    { id:'i3', name:'Hub Logístico White', location:'Puerto Ing. White',
      photo:'HUB LOGÍSTICO · 8200 m²', total:7400000, min:500, roi:12.4,
      funded:91, term:24, status:'Operativo', developerRep:4.8, developerOps:12,
      developerId:'seller3', developerName:'Naves del Atlántico',
      description:'Hub logístico ya operativo con contrato de arrendamiento firmado por 10 años con empresa exportadora. Distribución de retornos trimestrales.',
      timeline:[{label:'Construcción',date:'Ene 2025',done:true},{label:'Habilitación',date:'May 2025',done:true},{label:'Operativo',date:'Jul 2025',done:true},{label:'Primer retorno',date:'Oct 2025',done:true}] },
    { id:'i4', name:'Galpones Cabildo I-III', location:'Cabildo Industrial',
      photo:'3 GALPONES MODULARES', total:1800000, min:250, roi:11.5,
      funded:24, term:36, status:'Pre-venta', developerRep:4.6, developerOps:9,
      developerId:'seller4', developerName:'M. Fernández — Independiente',
      description:'Tres galpones modulares de 600 m² cada uno. Esquema de pre-venta con escrituración garantizada al finalizar obra. Alquiler a empresa de e-commerce ya acordado.',
      timeline:[{label:'Diseño',date:'Abr 2026',done:false},{label:'Inicio obras',date:'Jul 2026',done:false},{label:'Estructura',date:'Nov 2026',done:false},{label:'Entrega',date:'Abr 2027',done:false}] },
  ];

  // ─── Init ───
  function seed() {
    if (_get(K.seeded, false)) return;
    _set(K.props,     SEED_PROPS);
    _set(K.projects,  SEED_PROJECTS);
    _set(K.favs,      {});
    _set(K.inquiries, []);
    _set(K.investments, []);
    _set(K.seeded, true);
  }

  // ─── Properties ───
  function getProperties(filters = {}) {
    let props = _get(K.props, []);
    const q = (filters.q || '').toLowerCase().trim();
    if (q) {
      props = props.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }
    if (filters.type && filters.type !== 'all')    props = props.filter(p => p.type === filters.type);
    if (filters.mode && filters.mode !== 'all')    props = props.filter(p => p.mode === filters.mode);
    if (filters.zone && filters.zone !== 'all')    props = props.filter(p => p.zone === filters.zone);
    if (filters.minPrice)   props = props.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice)   props = props.filter(p => p.price <= Number(filters.maxPrice));
    if (filters.minSurface) props = props.filter(p => p.surface >= Number(filters.minSurface));
    if (filters.maxSurface) props = props.filter(p => p.surface <= Number(filters.maxSurface));
    if (filters.verified)   props = props.filter(p => p.verified);
    if (filters.aiPick)     props = props.filter(p => p.aiPick);
    if (filters.sellerId)   props = props.filter(p => p.sellerId === filters.sellerId);
    switch (filters.sort) {
      case 'price_asc':    props.sort((a,b) => a.price - b.price); break;
      case 'price_desc':   props.sort((a,b) => b.price - a.price); break;
      case 'surface_desc': props.sort((a,b) => b.surface - a.surface); break;
      case 'recent':       props.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)); break;
      default: // AI relevance
        props.sort((a,b) => (b.aiPick?2:0)+(b.verified?1:0) - ((a.aiPick?2:0)+(a.verified?1:0)) || b.views - a.views);
    }
    return props;
  }

  function getProperty(id)      { return _get(K.props,[]).find(p=>p.id===id)||null; }
  function getUserProperties(uid){ return _get(K.props,[]).filter(p=>p.sellerId===uid); }

  function addProperty(data) {
    const props = _get(K.props, []);
    const prop = { ...data, id:'p'+Date.now(), createdAt:new Date().toISOString(), views:0, inquiries:0, aiPick:false };
    _set(K.props, [prop, ...props]);
    return prop;
  }

  function incrementViews(id) {
    const props = _get(K.props, []);
    const i = props.findIndex(p=>p.id===id);
    if (i>-1) { props[i].views=(props[i].views||0)+1; _set(K.props,props); }
  }

  function deleteProperty(id, userId) {
    const props = _get(K.props,[]).filter(p=>!(p.id===id && p.sellerId===userId));
    _set(K.props, props);
  }

  // ─── Favorites ───
  function getFavorites(uid)       { const f=_get(K.favs,{}); const ids=f[uid]||[]; return _get(K.props,[]).filter(p=>ids.includes(p.id)); }
  function isFavorite(uid, pid)    { return (_get(K.favs,{})[uid]||[]).includes(pid); }
  function toggleFavorite(uid, pid){
    const f=_get(K.favs,{}); const ids=f[uid]||[];
    f[uid]=ids.includes(pid)?ids.filter(i=>i!==pid):[...ids,pid];
    _set(K.favs,f); return f[uid].includes(pid);
  }

  // ─── Inquiries ───
  function sendInquiry({ fromUserId, fromName, fromEmail, toSellerId, propId, propTitle, message }) {
    const inqs = _get(K.inquiries,[]);
    const inq  = { id:crypto.randomUUID(), fromUserId, fromName, fromEmail, toSellerId, propId, propTitle, message, createdAt:new Date().toISOString(), read:false };
    _set(K.inquiries, [inq,...inqs]);
    const props=_get(K.props,[]); const i=props.findIndex(p=>p.id===propId);
    if(i>-1){props[i].inquiries=(props[i].inquiries||0)+1;_set(K.props,props);}
    return inq;
  }
  function getInquiriesReceived(sellerId){ return _get(K.inquiries,[]).filter(i=>i.toSellerId===sellerId); }
  function getInquiriesSent(uid)        { return _get(K.inquiries,[]).filter(i=>i.fromUserId===uid); }
  function markInquiryRead(id)          { const inqs=_get(K.inquiries,[]); const i=inqs.findIndex(q=>q.id===id); if(i>-1){inqs[i].read=true;_set(K.inquiries,inqs);} }

  // ─── Invest Projects ───
  function getInvestProjects()  { return _get(K.projects,[]); }
  function getInvestProject(id) { return _get(K.projects,[]).find(p=>p.id===id)||null; }

  function invest({ userId, userName, projectId, amount }) {
    const projects = _get(K.projects,[]);
    const pi = projects.findIndex(p=>p.id===projectId);
    if(pi===-1) throw new Error('Proyecto no encontrado.');
    const proj = projects[pi];
    amount = Number(amount);
    if(amount < proj.min) throw new Error(`El mínimo de inversión es USD ${proj.min.toLocaleString()}.`);
    const inv = {
      id: crypto.randomUUID(), userId, userName, projectId,
      projectName: proj.name, amount, roi: proj.roi, term: proj.term,
      returnAmount: Math.round(amount*(1+proj.roi/100*proj.term/12)),
      createdAt: new Date().toISOString(), status:'Activa',
    };
    _set(K.investments, [inv,..._get(K.investments,[])]);
    const funded = (proj.total*proj.funded/100)+amount;
    projects[pi].funded = Math.min(100, Math.round(funded/proj.total*100));
    _set(K.projects, projects);
    return inv;
  }

  function getUserInvestments(uid){ return _get(K.investments,[]).filter(i=>i.userId===uid); }

  // ─── Stats ───
  function getStats() {
    const props = _get(K.props,[]);
    const invs  = _get(K.investments,[]);
    return {
      activeProps: props.length,
      verifiedSellers: 312,
      totalInvested: invs.reduce((s,i)=>s+Number(i.amount),0) + 28400000,
    };
  }

  return {
    seed, getProperties, getProperty, getUserProperties, addProperty, incrementViews, deleteProperty,
    getFavorites, isFavorite, toggleFavorite,
    sendInquiry, getInquiriesReceived, getInquiriesSent, markInquiryRead,
    getInvestProjects, getInvestProject, invest, getUserInvestments,
    getStats,
  };
})();

IndDB.seed();
Object.assign(window, { IndDB });
