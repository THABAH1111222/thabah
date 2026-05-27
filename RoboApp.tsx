'use client'

import React, { useState, useEffect } from "react";

// ─── Local Storage DB ───────────────────────────────────────
const STORAGE_KEY = "robo_store_subs";

function getStored(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function setStored(data: any[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

async function loadSubs() {
  return getStored();
}

async function addSub(sub: any) {
  const newSub = { ...sub, id: Date.now() };
  setStored([...getStored(), newSub]);
  return newSub;
}

async function updateSub(sub: any) {
  setStored(getStored().map((s: any) => s.id === sub.id ? sub : s));
}

async function deleteSub(id: number) {
  setStored(getStored().filter((s: any) => s.id !== id));
}

// ─── Image assets (extracted to avoid JSX parser issues with long base64) ───
const LOGO_IMG = "data:image/jpeg;base64,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";
const DEV_IMG  = "data:image/jpeg;base64,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";


// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const PLANS = [
  { id: "weekly",  label: "أسبوعي", days: 7,   color: "#f87171", glow: "#f8717140" },
  { id: "monthly", label: "شهري",   days: 30,  color: "#fb923c", glow: "#fb923c40" },
  { id: "yearly",  label: "سنوي",   days: 365, color: "#e53935", glow: "#e5393540" },
];

const INIT_SUBS: any[] = [];

const APPS = [
  { id:"netflix",      name:"نتفلكس",     color:"#E50914", tag:"أفلام ومسلسلات", emoji:"🎬" },
  { id:"shahid",       name:"شاهد",       color:"#00B4D8", tag:"عربي مميز",       emoji:"📺" },
  { id:"bein",         name:"beIN Sports",color:"#8B00FF", tag:"رياضة حصرية",     emoji:"⚽" },
  { id:"duolingo",     name:"دولينجو",    color:"#58CC02", tag:"تعلم اللغات",     emoji:"🦉" },
  { id:"8ball",        name:"هاك 8Ball",  color:"#FFD700", tag:"بلياردو هاك",     emoji:"🎱" },
  { id:"pubg",         name:"هاك PUBG",   color:"#F9A825", tag:"موبايل هاك",      emoji:"🎮" },
  { id:"instaplus",    name:"إنستقرام+",  color:"#E1306C", tag:"نسخة بلس",        emoji:"📸" },
  { id:"waplus",       name:"واتساب+",    color:"#25D366", tag:"نسخة بلس",        emoji:"💬" },
  { id:"telegramplus", name:"تيليقرام+",  color:"#229ED9", tag:"نسخة بلس",        emoji:"✈️" },
  { id:"snapplus",     name:"سناب+",      color:"#FFFC00", tag:"نسخة بلس",        emoji:"👻" },
];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function daysLeft(startDate: string, planDays: number): number {
  const end = new Date(startDate);
  end.setDate(end.getDate() + planDays);
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

function fmt(n: number): string { return Number(n).toLocaleString("ar-IQ") + " د.ع"; }

function planOf(id: string) { return PLANS.find(p => p.id === id)!; }

// ═══════════════════════════════════════════════════════════
// CSS INJECTION
// ═══════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

* { box-sizing:border-box; margin:0; padding:0; }
body { background:#0a0505; }

::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-thumb { background:linear-gradient(#e53935,#ff6b6b); border-radius:10px; }

@keyframes slideInRight {
  from { opacity:0; transform:translateX(-22px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes slideInLeft {
  from { opacity:0; transform:translateX(22px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes scaleIn {
  from { opacity:0; transform:scale(0.93); }
  to   { opacity:1; transform:scale(1); }
}
@keyframes pulse {
  0%,100% { opacity:1; }
  50%      { opacity:0.5; }
}
@keyframes spin {
  to { transform:rotate(360deg); }
}
@keyframes slideUp {
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes shimmer {
  0%   { background-position:200% 0; }
  100% { background-position:-200% 0; }
}
@keyframes glow {
  0%,100% { box-shadow:0 0 20px #e5393540; }
  50%      { box-shadow:0 0 40px #e5393580; }
}
@keyframes logoIn {
  0%   { transform:scale(0.3) rotate(-15deg); opacity:0; }
  60%  { transform:scale(1.1) rotate(3deg); opacity:1; }
  100% { transform:scale(1) rotate(0deg); opacity:1; }
}
@keyframes textIn {
  from { opacity:0; letter-spacing:8px; transform:translateY(10px); }
  to   { opacity:1; letter-spacing:1px; transform:translateY(0); }
}

.page-enter-right { animation:slideInRight .26s cubic-bezier(0.22,1,0.36,1) both; }
.page-enter-left  { animation:slideInLeft  .26s cubic-bezier(0.22,1,0.36,1) both; }
.fu { animation:fadeUp .22s cubic-bezier(0.22,1,0.36,1) both; }
.su { animation:slideUp .24s cubic-bezier(0.22,1,0.36,1) both; }
.si { animation:scaleIn .2s cubic-bezier(0.34,1.56,0.64,1) both; }

.close-btn {
  display:flex; align-items:center; justify-content:center;
  width:34px; height:34px; border-radius:50%;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.12);
  color:rgba(255,255,255,0.7);
  font-size:18px; line-height:1;
  cursor:pointer; transition:all .15s ease;
  flex-shrink:0;
}
.close-btn:hover { background:rgba(255,77,109,0.25); border-color:#ff4d6d60; color:#ff4d6d; }
.close-btn:active { transform:scale(0.88); }

.tab-btn { transition:all .25s cubic-bezier(0.22,1,0.36,1); }
.tab-btn:hover { background:rgba(255,255,255,0.08) !important; }

.card-hover { transition:transform .2s cubic-bezier(0.34,1.56,0.64,1), box-shadow .2s ease; }
.card-hover:hover { transform:translateY(-3px) scale(1.01); }
.card-hover:active { transform:scale(0.97); }

.app-card { transition:transform .15s cubic-bezier(0.34,1.56,0.64,1), box-shadow .15s ease; cursor:pointer; }
.app-card:active { transform:scale(0.88) !important; }

.btn-primary {
  background:linear-gradient(135deg,#e53935,#ff6b6b);
  border:none; border-radius:14px; color:#fff;
  font-family:'Tajawal',sans-serif; font-weight:900;
  font-size:15px; padding:14px 20px;
  cursor:pointer; transition:all .2s ease;
  box-shadow:0 4px 20px #e5393540;
  display:inline-flex; align-items:center; justify-content:center; gap:6px;
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px #e5393560; }
.btn-primary:active { transform:scale(0.96); }

.btn-danger {
  background:rgba(255,77,109,0.1);
  border:1px solid rgba(255,77,109,0.35);
  border-radius:14px; color:#ff4d6d;
  font-family:'Tajawal',sans-serif; font-weight:800;
  font-size:15px; padding:14px 20px;
  cursor:pointer; transition:all .2s ease;
  display:inline-flex; align-items:center; justify-content:center; gap:6px;
}
.btn-danger:hover { background:rgba(255,77,109,0.2); transform:translateY(-1px); }

.inp {
  width:100%; background:rgba(255,255,255,0.06);
  border:1.5px solid rgba(255,255,255,0.12);
  border-radius:12px; padding:12px 15px;
  color:#f1f5f9; font-size:14px; font-family:'Tajawal',sans-serif;
  outline:none; transition:border-color .2s ease;
}
.inp:focus { border-color:rgba(229,57,53,0.5); background:rgba(255,255,255,0.09); }

.stat-card { animation:fadeUp .4s cubic-bezier(0.22,1,0.36,1) both; }

.badge {
  display:inline-flex; align-items:center; gap:5px;
  border-radius:20px; padding:4px 12px;
  font-size:11px; font-weight:800; letter-spacing:0.3px;
}

.overlay {
  position:fixed; inset:0;
  background:rgba(0,0,0,0.85);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  display:flex; align-items:flex-start; justify-content:center;
  z-index:500; padding:16px 16px 100px;
  overflow-y:auto;
  animation:fadeUp .2s ease both;
}

.modal {
  background:linear-gradient(160deg,#1c0808,#120404);
  border:1px solid rgba(229,57,53,0.25);
  border-radius:24px; padding:28px 24px 32px;
  width:100%; max-width:380px;
  box-shadow:0 0 80px rgba(229,57,53,0.15), 0 30px 60px rgba(0,0,0,0.7);
  animation:scaleIn .25s cubic-bezier(0.34,1.56,0.64,1) both;
  margin:auto 0;
}

.nav-item { transition:all .2s cubic-bezier(0.22,1,0.36,1); }

.search-box { position:relative; }
.search-box::before {
  content:'🔍';
  position:absolute; right:14px; top:50%; transform:translateY(-50%);
  font-size:13px; pointer-events:none; opacity:0.5;
}

.progress-bar {
  height:4px; border-radius:4px;
  background:rgba(255,255,255,0.08);
  overflow:hidden;
}
.progress-fill {
  height:100%; border-radius:4px;
  transition:width .6s cubic-bezier(0.22,1,0.36,1);
}

.skeleton {
  background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
}

.floating-action {
  position:fixed; bottom:90px; left:50%;
  transform:translateX(-50%);
  background:linear-gradient(135deg,#e53935,#ff6b6b);
  color:#fff; border:none; border-radius:30px;
  padding:13px 28px;
  font-family:'Tajawal',sans-serif; font-weight:900; font-size:14px;
  cursor:pointer; z-index:150;
  box-shadow:0 8px 30px #e5393550;
  transition:all .25s cubic-bezier(0.34,1.56,0.64,1);
  display:flex; align-items:center; gap:8px;
}
.floating-action:hover { transform:translateX(-50%) translateY(-3px); box-shadow:0 12px 40px #e5393570; }
`;

// ═══════════════════════════════════════════════════════════
// BADGE COMPONENT
// ═══════════════════════════════════════════════════════════
function Badge({ d }: { d: number }) {
  if (d < 0)  return <span className="badge" style={{ background:"#ff4d6d18",color:"#ff4d6d",border:"1px solid #ff4d6d40" }}>✗ منتهي</span>;
  if (d === 0) return <span className="badge" style={{ background:"#ff4d6d18",color:"#ff4d6d",border:"1px solid #ff4d6d40" }}>⏰ ينتهي اليوم</span>;
  if (d <= 3)  return <span className="badge" style={{ background:"#fbbf2418",color:"#fbbf24",border:"1px solid #fbbf2440" }}>⚡ ينتهي قريباً</span>;
  return         <span className="badge" style={{ background:"#22c55e18",color:"#22c55e", border:"1px solid #22c55e40" }}>✓ نشط</span>;
}

// ═══════════════════════════════════════════════════════════
// APP MODAL
// ═══════════════════════════════════════════════════════════
function AppModal({ app, onClose }) {
  if (!app) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{
            width:80, height:80, borderRadius:22,
            background:`linear-gradient(135deg,${app.color}30,${app.color}10)`,
            border:`2px solid ${app.color}40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 14px", fontSize:36,
          }}>{app.emoji}</div>
          <div style={{ fontSize:20, fontWeight:900, color:"#fff", marginBottom:6 }}>{app.name}</div>
          <span style={{
            background:`${app.color}20`, color:app.color,
            border:`1px solid ${app.color}35`,
            borderRadius:20, padding:"3px 14px", fontSize:11, fontWeight:800,
          }}>{app.tag}</span>
        </div>

        {/* Info */}
        <div style={{
          background:"rgba(255,255,255,0.04)", borderRadius:16,
          padding:"16px 18px", marginBottom:18,
          border:"1px solid rgba(255,255,255,0.07)",
          textAlign:"center", lineHeight:2.2,
          fontSize:13, color:"rgba(255,255,255,0.45)",
        }}>
          للحصول على هذا التطبيق أو الاشتراك فيه<br/>
          تواصل معنا مباشرةً عبر الإنستقرام 👇
        </div>

        <a
          href="https://www.instagram.com/robo_store1"
          target="_blank" rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:9,
            padding:"14px 0", marginBottom:10,
            background:"linear-gradient(135deg,#E1306C,#F77737)",
            borderRadius:14, color:"#fff",
            fontFamily:"Tajawal", fontWeight:900, fontSize:15,
            textDecoration:"none", transition:"opacity .2s",
          }}
        >
          <span>📲</span> تواصل للاشتراك
        </a>

        <button onClick={onClose} style={{
          width:"100%", padding:"12px 0",
          background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:14, color:"rgba(255,255,255,0.4)",
          fontFamily:"Tajawal", fontWeight:700, fontSize:14, cursor:"pointer",
        }}>إغلاق</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════
function HomePage({ subs, setTab, isAdmin }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const active   = subs.filter(s => daysLeft(s.startDate, planOf(s.plan).days) > 0).length;
  const expiring = subs.filter(s => { const d = daysLeft(s.startDate, planOf(s.plan).days); return d > 0 && d <= 3; }).length;
  const expired  = subs.filter(s => daysLeft(s.startDate, planOf(s.plan).days) <= 0).length;
  const revenue  = subs.reduce((a,s) => a + +s.price, 0);

  return (
    <div style={{ padding:"24px 18px 110px", fontFamily:"Tajawal,sans-serif", color:"#f1f5f9" }}>
      {/* Header */}
      <div className="fu" style={{ marginBottom:28 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginBottom:3, letterSpacing:2 }}>مرحباً في</div>
        <div style={{
          fontSize:28, fontWeight:900, lineHeight:1.2,
          background:"linear-gradient(120deg,#ff8a80,#e53935,#c62828)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>روبو ستور 🤖</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:5 }}>
          {isAdmin ? "لوحة إدارة الاشتراكات" : "متجر روبو للاشتراكات الرقمية"}
        </div>
      </div>

      {isAdmin ? (
        <>
          {/* Revenue Card */}
          <div className="fu card-hover" style={{
            background:"linear-gradient(135deg,rgba(229,57,53,0.2),rgba(251,146,60,0.1))",
            border:"1px solid rgba(229,57,53,0.3)",
            borderRadius:22, padding:"24px 22px", marginBottom:16,
          }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:2, fontWeight:800, marginBottom:8 }}>
              💰 إجمالي الإيرادات
            </div>
            <div style={{ fontSize:32, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>{fmt(revenue)}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:5 }}>من {subs.length} مشترك مسجل</div>
          </div>

          {/* Stats Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
            {[
              { label:"نشط",         value:active,      icon:"✅", c:"#22c55e" },
              { label:"ينتهي قريباً", value:expiring,    icon:"⚡", c:"#fbbf24" },
              { label:"منتهي",       value:expired,     icon:"✗",  c:"#ff4d6d" },
              { label:"إجمالي",      value:subs.length, icon:"👥", c:"#fb923c" },
            ].map((s) => (
              <div key={s.label} className="stat-card card-hover" style={{
                background:"rgba(255,255,255,0.04)",
                backdropFilter:"blur(20px)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:18, padding:"18px 16px",
              }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:30, fontWeight:900, color:s.c }}>{s.value}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Action */}
          <button onClick={() => setTab("subs")} className="btn-primary fu" style={{ width:"100%", padding:"15px 0", fontSize:15 }}>
            عرض كل الاشتراكات ←
          </button>
        </>
      ) : (
        <div className="fu card-hover" style={{
          background:"linear-gradient(135deg,rgba(229,57,53,0.12),rgba(255,107,107,0.06))",
          border:"1px solid rgba(229,57,53,0.25)",
          borderRadius:22, padding:"28px 24px", marginBottom:22, textAlign:"center",
        }}>
          <img src={LOGO_IMG} style={{width:28,height:28,borderRadius:8,objectFit:"cover"}} alt="logo" />
          <div style={{ fontSize:18, fontWeight:900, color:"#fff", marginBottom:8 }}>روبو ستور</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.9 }}>
            للتحقق من اشتراكك انتقل لتبويب<br/>
            <span style={{ color:"#fb923c", fontWeight:800 }}>«اشتراكاتي»</span>
          </div>
        </div>
      )}

      {/* Apps Section */}
      <div style={{ marginTop:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:16, fontWeight:900, color:"#fff" }}>🛍️ تطبيقاتنا</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:700 }}>اضغط للتفاصيل</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {APPS.map((app) => (
            <div
              key={app.id}
              className="app-card"
              onClick={() => setSelectedApp(app)}
              style={{
                background:`linear-gradient(145deg,${app.color}18,${app.color}08)`,
                border:`1px solid ${app.color}30`,
                borderRadius:18, padding:"14px 8px 12px",
                display:"flex", flexDirection:"column",
                alignItems:"center", gap:7,
              }}
            >
              <div style={{ fontSize:36 }}>{app.emoji}</div>
              <div style={{ fontSize:11, fontWeight:900, color:"#fff", textAlign:"center", lineHeight:1.3 }}>
                {app.name}
              </div>
              <div style={{
                fontSize:8, color:app.color, fontWeight:800,
                background:`${app.color}18`, border:`1px solid ${app.color}30`,
                borderRadius:20, padding:"2px 8px",
              }}>{app.tag}</div>
            </div>
          ))}
        </div>
      </div>

      <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SUBS PAGE
// ═══════════════════════════════════════════════════════════
const EMPTY = { name:"", plan:"monthly", price:"", startDate:new Date().toISOString().slice(0,10), instagram:"" };

function SubsPage({ subs, setSubs, isAdmin, onBack }: { subs: any[], setSubs: any, isAdmin: boolean, onBack?: () => void }) {
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editId,   setEditId]   = useState(null);
  const [selected, setSelected] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [dateError, setDateError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = subs.filter(s =>
    (filter === "all" || s.plan === filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.instagram.toLowerCase().includes(search.toLowerCase()))
  );

  const clientResults = subs.filter(s =>
    clientSearch.trim() &&
    s.instagram.toLowerCase().trim().includes(clientSearch.toLowerCase().trim())
  );

  function save() {
    // التحقق من الحقول
    if (!form.name.trim()) { alert("⚠️ يرجى إدخال الاسم الكامل"); return; }
    if (!form.price || +form.price <= 0) { alert("⚠️ يرجى إدخال السعر"); return; }
    if (!form.startDate) { setDateError("⚠️ يرجى اختيار تاريخ البداية"); return; }

    setDateError("");
    setSaving(true);
    (async () => {
      try {
        if (editId) {
          const updated = {...form, id: editId, price: +form.price};
          const newList = subs.map(s => s.id === editId ? updated : s);
          setSubs(newList);
          setStored(newList);
          setEditId(null);
          setForm(EMPTY); setShowForm(false);
        } else {
          const newSub = {...form, id: Date.now(), price: +form.price};
          const newList = [...subs, newSub];
          setSubs(newList);
          setStored(newList);
          setForm(EMPTY); setShowForm(false);
        }
      } catch(e) {
        console.error("Save error:", e);
      }
      setSaving(false);
    })();
  }

  function startEdit(sub) {
    setForm({name:sub.name,plan:sub.plan,price:String(sub.price),startDate:sub.startDate,instagram:sub.instagram});
    setEditId(sub.id); setShowForm(true); setSelected(null);
  }

  function del(id) {
    setConfirmDelete(id);
  }

  function confirmDelAction() {
    const id = confirmDelete;
    const newList = subs.filter(s => s.id !== id);
    setSubs(newList);
    setStored(newList);
    setSelected(null);
    setConfirmDelete(null);
    setShowForm(false);
  }

  // ── Client View ──
  if (!isAdmin) {
    return (
      <div style={{ padding:"24px 18px 100px", fontFamily:"Tajawal,sans-serif", color:"#f1f5f9" }}>
        <div className="fu" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <div style={{ fontSize:19, fontWeight:900 }}>🔍 التحقق من اشتراكي</div>
          {onBack && <button onClick={onBack} className="close-btn">✕</button>}
        </div>

        <div className="fu search-box" style={{ marginBottom:22 }}>
          <input
            className="inp"
            value={clientSearch}
            onChange={e => setClientSearch(e.target.value)}
            placeholder="أدخل يوزر الإنستقرام"
            style={{ textAlign:"center", fontSize:15, paddingLeft:14 }}
          />
        </div>

        {clientSearch.trim() && (
          clientResults.length > 0 ? (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {clientResults.map(clientResult => (
            <div key={clientResult.id} className="su" style={{
              background:"rgba(34,197,94,0.06)",
              border:"1px solid rgba(34,197,94,0.25)",
              borderRadius:20, padding:"20px 18px",
            }}>
              {/* Sub details */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <div style={{ fontWeight:900, fontSize:17, color:"#fff" }}>{clientResult.name}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:3 }}>{clientResult.instagram}</div>
                </div>
                <Badge d={daysLeft(clientResult.startDate, planOf(clientResult.plan).days)} />
              </div>

              {/* Progress */}
              {(() => {
                const plan = planOf(clientResult.plan);
                const d = daysLeft(clientResult.startDate, plan.days);
                const pct = Math.max(0, Math.min(100, (d / plan.days) * 100));
                const end = new Date(clientResult.startDate);
                end.setDate(end.getDate() + plan.days);
                return (
                  <>
                    <div className="progress-bar" style={{ marginBottom:16 }}>
                      <div className="progress-fill" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${plan.color},${plan.color}aa)` }} />
                    </div>
                    {[
                      ["📦 الباقة",         plan.label, plan.color],
                      ["⏳ أيام متبقية",    d <= 0 ? "منتهي" : `${d} يوم`, d <= 0 ? "#ff4d6d" : "#fff"],
                      ["🏁 تاريخ الانتهاء", end.toLocaleDateString("ar-SA"), "rgba(255,255,255,0.7)"],
                    ].map(([k,v,c]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:13 }}>
                        <span style={{ color:"rgba(255,255,255,0.4)" }}>{k}</span>
                        <span style={{ fontWeight:800, color:c }}>{v}</span>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
              ))}
            </div>
          ) : (
            <div className="su" style={{
              textAlign:"center", padding:"40px 20px",
              background:"rgba(255,77,109,0.05)",
              border:"1px solid rgba(255,77,109,0.15)",
              borderRadius:20,
            }}>
              <div style={{ fontSize:40, marginBottom:12 }}>😔</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>
                هذا الحساب غير مسجل في المتجر حالياً
              </div>
              <a href="https://www.instagram.com/robo_store1" target="_blank" rel="noopener noreferrer"
                style={{
                  display:"inline-block", marginTop:16, padding:"10px 22px",
                  background:"linear-gradient(135deg,#E1306C,#F77737)",
                  borderRadius:12, color:"#fff",
                  fontFamily:"Tajawal", fontWeight:800, fontSize:13, textDecoration:"none",
                }}>
                تواصل للاشتراك 📲
              </a>
            </div>
          )
        )}
      </div>
    );
  }

  // ── Admin View ──
  return (
    <div style={{ padding:"20px 18px 160px", fontFamily:"Tajawal,sans-serif", color:"#f1f5f9" }}>
      <div className="fu" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div style={{ fontSize:18, fontWeight:900 }}>الاشتراكات</div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", fontWeight:700 }}>{subs.length} مشترك</div>
          {onBack && <button onClick={onBack} className="close-btn">✕</button>}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="fu" style={{ display:"flex", gap:8, marginBottom:16 }}>
        <div className="search-box" style={{ flex:1 }}>
          <input
            className="inp"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="بحث عن مشترك..."
            style={{ paddingLeft:14 }}
          />
        </div>
        <select
          className="inp"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ width:"auto", flexShrink:0, cursor:"pointer", paddingLeft:10 }}
        >
          <option value="all">الكل</option>
          {PLANS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      </div>

      {/* List */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"50px 0", color:"rgba(255,255,255,0.2)", fontSize:14 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
            لا توجد نتائج
          </div>
        )}
        {filtered.map((sub) => {
          const plan = planOf(sub.plan);
          const d = daysLeft(sub.startDate, plan.days);
          const pct = Math.max(0, Math.min(100, (d / plan.days) * 100));
          return (
            <div key={sub.id} onClick={() => setSelected(sub)}
              className="card-hover"
              style={{
                background:"rgba(255,255,255,0.04)",
                backdropFilter:"blur(16px)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:18, padding:"16px 18px",
                cursor:"pointer",
              }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:800, fontSize:15 }}>{sub.name}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{sub.instagram}</div>
                </div>
                <Badge d={d} />
              </div>

              <div className="progress-bar" style={{ marginBottom:10 }}>
                <div className="progress-fill" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${plan.color},${plan.color}aa)` }} />
              </div>

              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{
                  background:`${plan.glow}`, color:plan.color,
                  border:`1px solid ${plan.color}40`,
                  padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:800,
                }}>{plan.label}</span>
                <span style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{fmt(sub.price)}</span>
                <span style={{
                  fontSize:12, marginRight:"auto",
                  color: d <= 0 ? "#ff4d6d" : d <= 3 ? "#fbbf24" : "rgba(255,255,255,0.35)",
                }}>
                  {d <= 0 ? "منتهي" : `${d} يوم`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Button — ثابت داخل الصفحة فوق الـ nav */}
      <div style={{
        position:"fixed", bottom:72, left:0, right:0,
        display:"flex", justifyContent:"center",
        pointerEvents:"none", zIndex:150,
      }}>
        <button
          className="btn-primary"
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          style={{
            pointerEvents:"all",
            padding:"14px 32px", fontSize:15, borderRadius:18,
            display:"flex", alignItems:"center", gap:8,
            boxShadow:"0 8px 32px #e5393560",
          }}
        >
          <span style={{ fontSize:20, lineHeight:1 }}>+</span> إضافة مشترك
        </button>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight:900, fontSize:18, marginBottom:20, color:"#fff" }}>
              👤 تفاصيل المشترك
            </div>
            {(() => {
              const plan = planOf(selected.plan);
              const d = daysLeft(selected.startDate, plan.days);
              const end = new Date(selected.startDate); end.setDate(end.getDate() + plan.days);
              return (
                <>
                  {[
                    ["الاسم",          selected.name],
                    ["إنستقرام",       selected.instagram],
                    ["الخطة",          plan.label],
                    ["السعر",          fmt(selected.price)],
                    ["تاريخ البداية",  new Date(selected.startDate).toLocaleDateString("ar-SA")],
                    ["تاريخ الانتهاء", end.toLocaleDateString("ar-SA")],
                    ["أيام متبقية",    d <= 0 ? "منتهي" : `${d} يوم`],
                  ].map(([k,v]) => (
                    <div key={k} style={{
                      display:"flex", justifyContent:"space-between",
                      padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.07)",
                      fontSize:13,
                    }}>
                      <span style={{ color:"rgba(255,255,255,0.4)" }}>{k}</span>
                      <span style={{ fontWeight:800, color:"#fff" }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:12 }}><Badge d={d} /></div>
                </>
              );
            })()}
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={() => startEdit(selected)} className="btn-primary" style={{ flex:1, padding:"12px 0", fontSize:14 }}>✏️ تعديل</button>
              <button onClick={() => del(selected.id)} className="btn-danger" style={{ flex:1, padding:"12px 0", fontSize:14 }}>🗑 حذف</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth:340, textAlign:"center" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>🗑️</div>
            <div style={{ fontWeight:900, fontSize:17, color:"#fff", marginBottom:10 }}>تأكيد الحذف</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:8, lineHeight:1.8 }}>
              هل أنت متأكد من حذف المشترك:
            </div>
            <div style={{ fontSize:15, fontWeight:900, color:"#fff", marginBottom:16 }}>
              {subs.find(s => s.id === confirmDelete)?.name}
            </div>
            <div style={{ fontSize:12, color:"#ff4d6d", fontWeight:800, marginBottom:24 }}>
              ⚠️ لا يمكن التراجع عن هذا الإجراء
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={confirmDelAction} className="btn-danger" style={{ flex:1, padding:"13px 0", fontSize:14 }}>
                نعم، احذف
              </button>
              <button onClick={() => setConfirmDelete(null)} style={{
                flex:1, padding:"13px 0",
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:14, color:"rgba(255,255,255,0.5)",
                fontFamily:"Tajawal", fontWeight:800, fontSize:14, cursor:"pointer",
              }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth:400 }}>
            <div style={{ fontWeight:900, fontSize:18, marginBottom:20, color:"#fff" }}>
              {editId ? "✏️ تعديل مشترك" : "➕ إضافة مشترك"}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { label:"الاسم الكامل",  key:"name",      type:"text",   ph:"محمد العنزي" },
                { label:"يوزر إنستقرام",key:"instagram", type:"text",   ph:"@username"   },
                { label:"السعر (د.ع)",   key:"price",     type:"number", ph:"15000", min:"0"  },
                { label:"تاريخ البداية",key:"startDate", type:"date",   ph:"",
                  dateMin: (() => { const d=new Date(); d.setFullYear(d.getFullYear()-1); return d.toISOString().slice(0,10); })(),
                  dateMax: (() => {
                    const d=new Date();
                    const planDaysLimit = form.plan === "weekly" ? 7 : 31;
                    d.setDate(d.getDate() + planDaysLimit);
                    return d.toISOString().slice(0,10);
                  })(),
                },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:11, color:"rgba(255,255,255,0.4)", display:"block", marginBottom:7, fontWeight:700, letterSpacing:0.5 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e => { setForm({...form,[f.key]:e.target.value}); if(f.key==="startDate") setDateError(""); }}
                    className="inp"
                    {...(f.min     !== undefined ? { min: f.min }         : {})}
                    {...(f.dateMin !== undefined ? { min: f.dateMin }     : {})}
                    {...(f.dateMax !== undefined ? { max: f.dateMax }     : {})}
                  />
                  {f.key === "startDate" && dateError && (
                    <div style={{ marginTop:6, fontSize:11, color:"#ff4d6d", fontWeight:800 }}>{dateError}</div>
                  )}
                </div>
              ))}
              <div>
                <label style={{ fontSize:11, color:"rgba(255,255,255,0.4)", display:"block", marginBottom:7, fontWeight:700, letterSpacing:0.5 }}>نوع الاشتراك</label>
                <select className="inp" value={form.plan} onChange={e => setForm({...form,plan:e.target.value})} style={{ cursor:"pointer" }}>
                  {PLANS.map(p => <option key={p.id} value={p.id}>{p.label} ({p.days} يوم)</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:22, paddingBottom:4 }}>
              <button onClick={save} className="btn-primary" style={{ flex:1, padding:"14px 0", fontSize:15, borderRadius:14 }} disabled={saving}>
                {saving ? "⏳ جاري الحفظ..." : "💾 حفظ"}
              </button>
              <button onClick={() => setShowForm(false)} style={{
                flex:1, padding:"14px 0",
                background:"rgba(255,255,255,0.1)",
                border:"1.5px solid rgba(255,255,255,0.25)",
                borderRadius:14, color:"#fff",
                fontFamily:"Tajawal", fontWeight:800, fontSize:15, cursor:"pointer",
              }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECURITY HELPERS
// ═══════════════════════════════════════════════════════════
// SHA-256 hash of "Rb@2819#x" — password never stored in plain text
const ADMIN_HASH      = "f1e4c42b0d5d597767a0925ad3b54af29f75b6da90fed5b12cb60c9bf2bc9c52";
// SHA-256 of unlock PIN "2819" — يفك القفل فقط بدون صلاحيات أدمن
const UNLOCK_PIN_HASH = "c05562111bb2b94ae2eebdbb85e408884622fffd762a7e132198b960d2ad4d17";

async function hashPassword(val: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(val));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

// ── AES-GCM encryption for localStorage data ──────────────
const ENC_SECRET = "robo_store_2819_secure_key_v1";

async function getEncKey(): Promise<CryptoKey> {
  const raw = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ENC_SECRET));
  return crypto.subtle.importKey("raw", raw, { name:"AES-GCM" }, false, ["encrypt","decrypt"]);
}

async function encryptData(data: string): Promise<string> {
  const key = await getEncKey();
  const iv  = crypto.getRandomValues(new Uint8Array(12));
  const enc = await crypto.subtle.encrypt({ name:"AES-GCM", iv }, key, new TextEncoder().encode(data));
  const combined = new Uint8Array(iv.byteLength + enc.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(enc), iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

async function decryptData(b64: string): Promise<string> {
  const key    = await getEncKey();
  const bytes  = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const iv     = bytes.slice(0, 12);
  const cipher = bytes.slice(12);
  const plain  = await crypto.subtle.decrypt({ name:"AES-GCM", iv }, key, cipher);
  return new TextDecoder().decode(plain);
}

function getLockUntil(): number {
  try { return Number(sessionStorage.getItem("robo_lock_until") || 0); } catch { return 0; }
}

// ═══════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════
function AboutPage({ isAdmin, setIsAdmin, subs = [] }) {
  const [showInput, setShowInput] = useState(false);
  const [pass, setPass]           = useState("");
  const [showPin,  setShowPin]    = useState(false);
  const [pin,      setPin]        = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(() => {
    try { return Number(sessionStorage.getItem("robo_wrong_tries") || 0); } catch { return 0; }
  });
  const [lockMsg, setLockMsg] = useState("");
  const [toast, setToast] = useState<{msg:string,type:"success"|"error"|"warn"}|null>(null);

  function showToast(msg: string, type: "success"|"error"|"warn" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const handleGearClick = () => {
    if (isAdmin) {
      if (window.confirm("هل تريد الخروج من وضع الأدمن؟")) {
        setIsAdmin(false);
        try { sessionStorage.setItem("robo_admin_role","false"); } catch {}
      }
      return;
    }
    // Check time-based lockout
    const lockUntil = getLockUntil();
    if (Date.now() < lockUntil) {
      const mins = Math.ceil((lockUntil - Date.now()) / 60000);
      setLockMsg(`🔒 مقفل — أدخل PIN لفك القفل أو انتظر ${mins} دقيقة`);
      setShowPin(true); setPin("");
      return;
    }
    if (wrongAttempts >= 5) {
      setLockMsg("❌ مقفل نهائياً — أدخل PIN لفك القفل");
      setShowPin(true); setPin(""); return;
    }
    setLockMsg(""); setShowPin(false);
    setShowInput(v => !v); setPass("");
  };

  const handlePassChange = async (e) => {
    const val = e.target.value;
    setPass(val);

    // Check time-based lockout first
    if (Date.now() < getLockUntil()) return;
    if (wrongAttempts >= 5) return;

    if (val.length < 9) return; // wait for full length

    const hash = await hashPassword(val);
    if (hash === ADMIN_HASH) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem("robo_admin_role","true");
        sessionStorage.setItem("robo_wrong_tries","0");
        sessionStorage.removeItem("robo_lock_until");
      } catch {}
      setWrongAttempts(0); setPass(""); setShowInput(false); setLockMsg("");
      showToast("🔓 أهلاً بك يا مصطفى! تم تفعيل وضع الأدمن.", "success");
    } else {
      const next = wrongAttempts + 1;
      setWrongAttempts(next);
      try { sessionStorage.setItem("robo_wrong_tries", String(next)); } catch {}
      setPass("");
      if (next >= 3) {
        // Progressive lockout: 3→5min, 4→15min, 5→permanent
        const lockMins = next === 3 ? 5 : next === 4 ? 15 : 999999;
        const until = Date.now() + lockMins * 60000;
        try { sessionStorage.setItem("robo_lock_until", String(until)); } catch {}
        setShowInput(false);
        const msg = next >= 5
          ? "🚨 تم قفل النظام نهائياً لحماية بيانات المتجر!"
          : `🚨 محاولة خاطئة! النظام مقفل ${lockMins} دقائق.`;
        setLockMsg(msg);
        showToast(msg, "error");
      } else {
        showToast(`❌ رمز خاطئ! تبقى ${3 - next} محاولات`, "error");
      }
    }
  };

  const handlePinChange = async (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6); // أرقام فقط، 6 حد أقصى
    setPin(val);
    if (val.length < 4) return;
    const hash = await hashPassword(val);
    if (hash === UNLOCK_PIN_HASH) {
      // فك القفل — صفّر العداد بدون صلاحيات أدمن
      try {
        sessionStorage.setItem("robo_wrong_tries", "0");
        sessionStorage.removeItem("robo_lock_until");
      } catch {}
      setWrongAttempts(0);
      setPin(""); setShowPin(false); setLockMsg("");
      showToast("✅ تم فك القفل! أدخل رمز الأدمن الآن.", "success");
      setTimeout(() => { setShowInput(true); }, 500);
    } else if (val.length >= 6) {
      setPin("");
      showToast("❌ PIN خاطئ", "error");
    }
  };

  return (
    <div style={{ padding:"24px 18px 100px", fontFamily:"Tajawal,sans-serif", color:"#f1f5f9" }}>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position:"fixed", top:70, left:"50%", transform:"translateX(-50%)",
          zIndex:9999, padding:"12px 22px", borderRadius:14,
          fontFamily:"Tajawal", fontWeight:800, fontSize:13,
          background: toast.type==="success" ? "rgba(34,197,94,0.95)" : toast.type==="error" ? "rgba(239,68,68,0.95)" : "rgba(251,191,36,0.95)",
          color:"#fff", boxShadow:"0 8px 30px rgba(0,0,0,0.4)",
          animation:"slideUp .3s ease both", whiteSpace:"nowrap",
        }}>{toast.msg}</div>
      )}

      {/* Admin badge */}
      {isAdmin && (
        <div className="fu" style={{ display:"flex", justifyContent:"flex-end", marginBottom:16 }}>
          <button onClick={() => { setIsAdmin(false); try{sessionStorage.setItem("robo_admin_role","false");}catch{}; showToast("🔒 تم الخروج من وضع الأدمن.", "warn"); }}
            style={{
              background:"rgba(34,197,94,0.15)", color:"#22c55e",
              padding:"5px 14px", borderRadius:12,
              border:"1px solid #22c55e44", cursor:"pointer",
              fontFamily:"Tajawal", fontWeight:800, fontSize:12,
            }}>
            ⚙️ وضع الأدمن (خروج)
          </button>
        </div>
      )}

      {/* App Info */}
      <div className="fu card-hover" style={{
        background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)",
        border:"1px solid rgba(255,255,255,0.09)", borderRadius:22, padding:"24px", marginBottom:14,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:900, color:"#e53935", letterSpacing:3 }}>عن التطبيق</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", fontWeight:700 }}>v1.0</div>
        </div>
        <div style={{ fontSize:20, fontWeight:900, lineHeight:1.6, marginBottom:10 }}>
          إدارة اشتراكات<br/>روبو ستور 🤖
        </div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:2, marginBottom:18 }}>
          منصة متكاملة لإدارة الاشتراكات الرقمية مع تتبع المشتركين وحساب مدد الاشتراكات.
        </div>
        {/* إحصائية سريعة */}
        <div style={{ display:"flex", gap:10, marginBottom:18 }}>
          <div style={{ flex:1, background:"rgba(229,57,53,0.1)", border:"1px solid rgba(229,57,53,0.2)", borderRadius:14, padding:"10px 0", textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:900, color:"#f87171" }}>{subs.length}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:2 }}>مشترك</div>
          </div>
          <div style={{ flex:1, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:14, padding:"10px 0", textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:900, color:"#22c55e" }}>
              {subs.filter(s => { const p = s.plan==="weekly"?7:s.plan==="monthly"?30:365; return Math.ceil((new Date(s.startDate).getTime()+p*86400000-Date.now())/86400000)>0; }).length}
            </div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:2 }}>نشط</div>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["💾 حفظ تلقائي","🔒 تشفير البيانات","📊 تتبع الاشتراكات","⚡ سريع وخفيف"].map(t => (
            <span key={t} style={{
              background:"rgba(229,57,53,0.15)", color:"#f87171",
              padding:"5px 14px", borderRadius:20, fontSize:11, fontWeight:800,
              border:"1px solid rgba(229,57,53,0.3)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Store Link */}
      <a href="https://www.instagram.com/robo_store1?igsh=MTY1aHg4MGYxaGN0ZQ==" target="_blank" rel="noopener noreferrer"
        className="fu card-hover"
        style={{
          background:"linear-gradient(135deg,rgba(225,48,108,0.18),rgba(247,119,55,0.12))",
          border:"1px solid rgba(225,48,108,0.3)",
          borderRadius:22, padding:"18px 22px",
          display:"flex", alignItems:"center", gap:14,
          textDecoration:"none", marginBottom:14,
        }}>
        <span style={{ fontSize:30 }}>🏪</span>
        <div>
          <div style={{ fontWeight:900, fontSize:14, color:"#fff" }}>روبو ستور</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>@robo_store1 · زيارة المتجر ←</div>
        </div>
      </a>

      {/* Developer */}
      <div className="fu card-hover" style={{
        background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)",
        border:"1px solid rgba(255,255,255,0.09)", borderRadius:22, padding:"24px", marginBottom:24,
      }}>
        <div style={{ fontSize:10, fontWeight:900, color:"#e53935", letterSpacing:3, marginBottom:16 }}>المطوّر</div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
          <img src={DEV_IMG} style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",border:isAdmin?"2.5px solid #22c55e":"2.5px solid #e53935",flexShrink:0}} alt="مصطفى محمد" />
          <div>
            <div style={{ fontWeight:900, fontSize:17 }}>مصطفى محمد</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>Full-Stack Developer</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <a href="https://t.me/robo_store11" target="_blank" rel="noopener noreferrer"
            style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              padding:"13px 0",
              background:"linear-gradient(135deg,#229ED9,#1a7ab5)",
              borderRadius:14, color:"#fff",
              fontFamily:"Tajawal", fontWeight:800, fontSize:14, textDecoration:"none",
            }}>
            ✈️ قناة تيليقرام
          </a>
          <a href="https://www.instagram.com/root404error?igsh=MW9rZmJmd3dtMWVydA==" target="_blank" rel="noopener noreferrer"
            style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              padding:"13px 0",
              background:"linear-gradient(135deg,#E1306C,#F77737)",
              borderRadius:14, color:"#fff",
              fontFamily:"Tajawal", fontWeight:800, fontSize:14, textDecoration:"none",
            }}>
            📸 انستقرام
          </a>
        </div>
      </div>

      {/* Hidden Admin Gear */}
      <div style={{ textAlign:"center", padding:"10px 0 0" }}>
        <button onClick={handleGearClick} style={{
          background:"none", border:"none", cursor:"pointer",
          opacity: isAdmin ? 1 : 0.15, fontSize:20, padding:8,
          transition:"opacity .3s",
        }}>⚙️</button>

        {lockMsg && (
          <div style={{ marginTop:8, fontSize:12, color:"#ff4d6d", fontWeight:800 }}>{lockMsg}</div>
        )}

        {showPin && (
          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginBottom:6, fontWeight:700 }}>
              🔑 أدخل PIN فك القفل
            </div>
            <input
              type="number" value={pin} onChange={handlePinChange}
              placeholder="••••" autoFocus autoComplete="off"
              className="inp"
              style={{ width:120, textAlign:"center", letterSpacing:8, fontSize:22 }}
            />
          </div>
        )}

        {showInput && (
          <div style={{ marginTop:12 }}>
            <input
              type="password" value={pass} onChange={handlePassChange}
              placeholder="••••••••" autoFocus autoComplete="off"
              className="inp"
              style={{ width:160, textAlign:"center", letterSpacing:6, fontSize:18 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════════════════════════
function Splash() {
  return (
    <div style={{
      position:"fixed", inset:0,
      background:"radial-gradient(ellipse at 30% 20%,#3b0a0a,#0d0404)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      zIndex:9999,
    }}>
      <div style={{
        width:110, height:110, borderRadius:28,
        background:"linear-gradient(135deg,#e53935,#c62828)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
        animation:"logoIn 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        boxShadow:"0 0 60px #e5393550, 0 20px 40px rgba(0,0,0,0.5)",
        border:"3px solid rgba(255,107,107,0.3)",
      }}><img src={LOGO_IMG} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="logo" /></div>

      <h1 style={{
        fontSize:22, fontWeight:900,
        background:"linear-gradient(90deg,#fff,#ff8a80,#e53935)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        fontFamily:"Tajawal,sans-serif",
        animation:"textIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
        letterSpacing:1,
      }}>روبو ستور</h1>

      <div style={{
        marginTop:8, fontSize:11, color:"rgba(255,255,255,0.25)",
        letterSpacing:4, fontFamily:"Tajawal,sans-serif",
        animation:"textIn 0.8s 0.8s both",
      }}>يتم التحميل...</div>

      {/* Spinner */}
      <div style={{
        marginTop:30, width:28, height:28,
        border:"2.5px solid rgba(229,57,53,0.2)",
        borderTop:"2.5px solid #e53935",
        borderRadius:"50%",
        animation:"spin 0.9s linear infinite",
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [tab,        setTab]        = useState("home");
  const [prevTab,    setPrevTab]    = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [now,        setNow]        = useState(new Date());

  const TAB_ORDER = ["home", "subs", "about"];

  function navigateTo(nextTab: string) {
    setPrevTab(tab);
    setTab(nextTab);
  }

  function goBack() {
    navigateTo("home");
  }

  function pageClass(currentTab: string): string {
    const prev = TAB_ORDER.indexOf(prevTab);
    const curr = TAB_ORDER.indexOf(currentTab);
    if (prev < curr) return "page-enter-left";
    if (prev > curr) return "page-enter-right";
    return "page-enter-right";
  }

  const showBackBtn = tab === "subs";

  const [subs, setSubs] = useState(INIT_SUBS);

  const [isAdmin, setIsAdmin] = useState(() => {
    try { return sessionStorage.getItem("robo_admin_role") === "true"; }
    catch { return false; }
  });

  // Load subs from localStorage on mount
  useEffect(() => {
    (async () => {
      const data = await loadSubs();
      setSubs(data);
    })();
  }, []);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Splash
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(t);
  }, []);

  // Hidden admin trigger in topbar — uses hash, never plaintext
  const triggerAdmin = async () => {
    // ── نفس نظام القفل المستخدم في AboutPage ──
    const lockUntil = getLockUntil();
    if (Date.now() < lockUntil) { return; }

    const tries = (() => { try { return Number(sessionStorage.getItem("robo_wrong_tries") || 0); } catch { return 0; } })();
    if (tries >= 5) { return; }

    const p = window.prompt("🔑 رمز المرور:");
    if (p === null) return;

    const hash = await hashPassword(p);
    if (hash === ADMIN_HASH) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem("robo_admin_role","true");
        sessionStorage.setItem("robo_wrong_tries","0");
        sessionStorage.removeItem("robo_lock_until");
      } catch {}
    } else {
      const next = tries + 1;
      try { sessionStorage.setItem("robo_wrong_tries", String(next)); } catch {}
      if (next >= 3) {
        const lockMins = next === 3 ? 5 : next === 4 ? 15 : 999999;
        const until = Date.now() + lockMins * 60000;
        try { sessionStorage.setItem("robo_lock_until", String(until)); } catch {}
      }
      // فشل صامت + إشعار بسيط بدون كشف السبب
      alert("❌ رمز خاطئ");
    }
  };

  const tabs = [
    { id:"home",  label:"الرئيسية", icon:"🏠" },
    { id:"subs",  label:"اشتراكاتي", icon:"📋" },
    { id:"about", label:"حول",       icon:"ℹ️" },
  ];

  const dateStr = now.toLocaleDateString("ar-SA", { weekday:"short", month:"short", day:"numeric" });

  return (
    <div dir="rtl" style={{
      minHeight:"100vh",
      background:"radial-gradient(ellipse at 20% 10%,#2d0808 0%,#160303 45%,#0a0202 100%)",
      fontFamily:"'Tajawal',sans-serif", color:"#f1f5f9", overflowX:"hidden",
    }}>
      <style>{CSS}</style>

      {showSplash && <Splash />}

      {/* TOP BAR */}
      <div style={{
        background:"rgba(0,0,0,0.5)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        padding:"12px 20px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        position:"sticky", top:0, zIndex:100,
        gap:10,
      }}>
        {/* Logo always */}
        <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:17, fontWeight:900 }}>
          <img src={LOGO_IMG} style={{width:28,height:28,borderRadius:8,objectFit:"cover"}} alt="logo" />
          <span style={{background:"linear-gradient(90deg,#ff6b6b,#e53935)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:900,fontSize:17}}>روبو ستور</span>
        </div>

        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", flexShrink:0 }}>{dateStr}</div>

        {/* Hidden admin trigger — right side only, behind other elements */}
        {!isAdmin && !showBackBtn && (
          <div onClick={triggerAdmin} style={{
            position:"absolute", left:"35%", right:0, top:0, bottom:0,
            cursor:"default", zIndex:0,
          }} />
        )}
      </div>

      {/* PAGE */}
      <div className={pageClass(tab)} key={tab}>
        {tab === "home"  && <HomePage  subs={subs} setTab={navigateTo} isAdmin={isAdmin} />}
        {tab === "subs"  && <SubsPage  subs={subs} setSubs={setSubs} isAdmin={isAdmin} onBack={() => setTab("home")} />}
        {tab === "about" && <AboutPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} subs={subs} />}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:200,
        background:"rgba(10,2,2,0.9)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex", justifyContent:"space-around",
        padding:"10px 0 18px",
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => navigateTo(t.id)} className="nav-item"
              style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                background:"none", border:"none", cursor:"pointer", padding:"6px 0",
              }}>
              <span style={{
                fontSize:22,
                filter: active ? "drop-shadow(0 0 8px #e53935)" : "none",
                transform: active ? "scale(1.12)" : "scale(1)",
                transition:"all .2s cubic-bezier(0.34,1.56,0.64,1)",
              }}>{t.icon}</span>
              <span style={{
                fontSize:10, fontFamily:"Tajawal", fontWeight:800,
                color: active ? "#ff6b6b" : "rgba(255,255,255,0.3)",
                transition:"color .15s",
                letterSpacing:0.5,
              }}>{t.label}</span>
              <div style={{
                width: active ? 18 : 0, height:2,
                background:"linear-gradient(90deg,#e53935,#ff6b6b)",
                borderRadius:10,
                transition:"width .25s cubic-bezier(0.34,1.56,0.64,1)",
              }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
