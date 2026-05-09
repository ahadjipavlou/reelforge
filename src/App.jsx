import { useState } from "react";

const FAL_KEY = "a68e1d53-d6f1-48a3-96c7-8d63868ccdc6:0f5699db847fb71d23f1484334f8225e";

const COLORS = [
  { bg: "#1e1560", fg: "#c4b8ff" },
  { bg: "#0a3d2a", fg: "#5effd0" },
  { bg: "#3d1030", fg: "#ffaad8" },
  { bg: "#3d2600", fg: "#ffd080" },
  { bg: "#0a2d42", fg: "#80c8ff" },
  { bg: "#2e0a0a", fg: "#ff9b9b" },
];

const NICHES = ["Skincare & Beauty","Fashion & Apparel","Fitness & Health","Food & Beverage","Tech & Gadgets","Home & Lifestyle","Travel & Experience","Pet Products","Education & Courses","E-commerce / DTC","Other"];
const TONES = ["Fun & Energetic","Luxury & Premium","Trendy & Gen-Z","Motivational","Educational","Warm & Friendly","Bold & Edgy","Minimalist & Clean"];
const GOALS = ["Drive sales & purchases","Build brand awareness","Boost engagement & interaction","Build trust & credibility","Go viral & maximize shares"];
const IMAGE_STYLES = ["Product on clean white background","Lifestyle shot — product in use","Flat lay with props","Dark luxury studio lighting","Outdoor natural light","Minimalist aesthetic","Bold colorful editorial"];
const TONE_PHOTO = {
  "Luxury & Premium": "ultra luxury product photography, dark moody background, dramatic chiaroscuro lighting, cinematic",
  "Fun & Energetic": "bright vibrant colors, playful composition, pastel pop background, energetic",
  "Trendy & Gen-Z": "aesthetic trendy style, soft gradient background, social media ready, modern editorial",
  "Motivational": "bold strong composition, clean powerful lighting, stark contrast, dynamic",
  "Educational": "clean product shot, soft even lighting, neutral white background, clear",
  "Warm & Friendly": "warm golden tones, cozy inviting atmosphere, soft bokeh background",
  "Bold & Edgy": "high contrast, dark dramatic background, striking neon accents, edgy",
  "Minimalist & Clean": "pure minimalism, white background, lots of negative space, clean lines",
};

const INITIAL_CLIENTS = [
  { id:1, name:"Glow Studio", niche:"Skincare & Beauty", tone:"Luxury & Premium", audience:"Women 25-40 into self-care", notes:'Use "ritual", "radiant". Avoid clinical language.', c:0 },
  { id:2, name:"FitCore", niche:"Fitness & Health", tone:"Motivational", audience:"Men & women 20-35 into home workouts", notes:"High energy, empowering language.", c:1 },
  { id:3, name:"ByteGear", niche:"Tech & Gadgets", tone:"Bold & Edgy", audience:"Tech enthusiasts 18-30", notes:"Short and punchy. Early adopters.", c:2 },
];

function initials(n) { return n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase(); }

const baseInp = { background:"#1a1a26", border:"1px solid #252535", borderRadius:7, padding:"8px 11px", color:"#ededf5", fontFamily:"inherit", fontSize:13, outline:"none", width:"100%" };

function Label({ children }) {
  return <div style={{ fontSize:11, color:"#888898", marginBottom:5, fontWeight:500 }}>{children}</div>;
}
function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, marginTop:18 }}>
      <div style={{ fontSize:10, color:"#888898", fontWeight:600, letterSpacing:".09em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{children}</div>
      <div style={{ flex:1, height:1, background:"#252535" }} />
    </div>
  );
}
function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false),2000); }}
      style={{ padding:"3px 10px", borderRadius:5, border:`1px solid ${ok?"#22d3a0":"#353548"}`, background:"none", color:ok?"#22d3a0":"#888898", cursor:"pointer", fontSize:11, fontFamily:"inherit", flexShrink:0 }}>
      {ok ? "Copied!" : "Copy"}
    </button>
  );
}
function HookCard({ num, text }) {
  return (
    <div style={{ background:"#1a1a26", border:"1px solid #252535", borderRadius:9, padding:"12px 14px", marginBottom:7 }}>
      <div style={{ fontSize:10, color:"#444458", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:5 }}>Hook {num}</div>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ fontSize:14, lineHeight:1.6, color:"#ededf5" }}>{text}</div>
        <CopyBtn text={text} />
      </div>
    </div>
  );
}
function OutBox({ label, text }) {
  return (
    <div style={{ background:"#1a1a26", border:"1px solid #252535", borderRadius:9, padding:14, marginBottom:10 }}>
      {label && <div style={{ fontSize:11, color:"#888898", marginBottom:7, fontWeight:500 }}>{label}</div>}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap", color:"#ededf5", flex:1 }}>{text}</div>
        <CopyBtn text={text} />
      </div>
    </div>
  );
}
function Panel({ title, children }) {
  return (
    <div style={{ background:"#13131c", border:"1px solid #252535", borderRadius:12, padding:18, marginBottom:14 }}>
      {title && <div style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"#888898", fontWeight:600, marginBottom:14 }}>{title}</div>}
      {children}
    </div>
  );
}
function GenBtn({ onClick, disabled, loading, label }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:12, borderRadius:9, border:"none", background:loading?"#252535":"linear-gradient(135deg,#7c6aff,#a855f7)", color:"#fff", fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:13, fontWeight:600, cursor:loading?"not-allowed":"pointer", marginTop:14, opacity:loading?.65:1 }}>
      {loading ? "✦ Generating..." : `✦ ${label}`}
    </button>
  );
}
function ErrorBox({ msg }) {
  if (!msg) return null;
  return <div style={{ background:"rgba(244,114,182,.08)", border:"1px solid rgba(244,114,182,.2)", borderRadius:9, padding:14, color:"#f472b6", fontSize:13, marginBottom:14 }}>⚠ {msg}</div>;
}

function CampaignTab({ client }) {
  const [product,setProduct]=useState(""); const [goal,setGoal]=useState(GOALS[0]);
  const [usp,setUsp]=useState(""); const [extra,setExtra]=useState("");
  const [loading,setLoading]=useState(false); const [output,setOutput]=useState(null); const [error,setError]=useState("");

  const generate = async () => {
    if (!product.trim()) { alert("Please enter a product or service."); return; }
    setLoading(true); setOutput(null); setError("");
    const prompt = `You are an expert short-form video content strategist at a creative agency.
CLIENT:
- Brand: ${client.name}
- Niche: ${client.niche}
- Tone: ${client.tone}
- Audience: ${client.audience||"Not specified"}
- Notes: ${client.notes||"None"}
BRIEF:
- Product: ${product}
- Goal: ${goal}
- Key Selling Point: ${usp||"Not specified"}
- Platforms: TikTok and Instagram Reels
- Extra: ${extra||"None"}
Reply in EXACTLY this format:
HOOK_1: [scroll-stopping opening line, max 12 words]
HOOK_2: [curiosity or question-based hook, max 12 words]
HOOK_3: [relatable or emotional hook, max 12 words]
CTA: [one strong call-to-action, max 15 words]
TIKTOK: [TikTok caption 50-80 words with hashtags]
REELS: [Instagram Reels caption 60-90 words with 5-8 hashtags]
CONCEPT: [Simple 15-30 second video concept, 3-4 sentences]`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.find(b=>b.type==="text")?.text||"";
      const ex  = k => { const m=text.match(new RegExp(`^${k}:\\s*(.+)$`,"m")); return m?m[1].trim():""; };
      const exB = k => { const m=text.match(new RegExp(`^${k}:\\s*([\\s\\S]+?)(?=\\n[A-Z_]+:|$)`,"m")); return m?m[1].trim():""; };
      setOutput({ hooks:[ex("HOOK_1"),ex("HOOK_2"),ex("HOOK_3")].filter(Boolean), cta:exB("CTA"), tiktok:exB("TIKTOK"), reels:exB("REELS"), concept:exB("CONCEPT") });
    } catch(e) { setError(e.message||"Generation failed."); }
    setLoading(false);
  };

  return (
    <div>
      <Panel title="Campaign brief">
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div><Label>Product / service</Label><input value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. Vitamin C Serum" style={baseInp}/></div>
            <div><Label>Campaign goal</Label><select value={goal} onChange={e=>setGoal(e.target.value)} style={baseInp}>{GOALS.map(g=><option key={g}>{g}</option>)}</select></div>
          </div>
          <div><Label>Key selling point</Label><input value={usp} onChange={e=>setUsp(e.target.value)} placeholder="e.g. Visible results in 7 days, cruelty-free, only $29" style={baseInp}/></div>
          <div><Label>Extra context (optional)</Label><textarea value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Specific angle, trending format, sound ideas..." style={{...baseInp,minHeight:56,resize:"none",lineHeight:1.5}}/></div>
        </div>
        <GenBtn onClick={generate} loading={loading} label="Generate campaign content"/>
      </Panel>
      <ErrorBox msg={error}/>
      {loading && <div style={{ textAlign:"center", padding:32, color:"#888898", fontSize:13 }}>Crafting campaign for {client.name}...</div>}
      {output && <>
        <SectionLabel>Hooks — pick one to open your video</SectionLabel>
        {output.hooks.map((h,i)=><HookCard key={i} num={i+1} text={h}/>)}
        <SectionLabel>Call to action</SectionLabel>
        <OutBox text={output.cta}/>
        <SectionLabel>Captions</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
          <OutBox label="TikTok" text={output.tiktok}/>
          <OutBox label="Instagram Reels" text={output.reels}/>
        </div>
        <SectionLabel>Video concept</SectionLabel>
        <OutBox text={output.concept}/>
      </>}
    </div>
  );
}

function ImagesTab({ client }) {
  const [product,setProduct]=useState(""); const [style,setStyle]=useState(IMAGE_STYLES[0]);
  const [extra,setExtra]=useState(""); const [count,setCount]=useState(2);
  const [loading,setLoading]=useState(false); const [images,setImages]=useState([]); const [error,setError]=useState("");

  const generate = async () => {
    if (!product.trim()) { alert("Please enter a product name."); return; }
    setLoading(true); setImages([]); setError("");
    const toneStyle = TONE_PHOTO[client.tone]||"professional commercial photography";
    const basePrompt = `${style} of ${product}, ${client.niche} brand. ${toneStyle}. Professional product photography, commercial quality, highly detailed. ${extra}`.trim();
    try {
      const jobs = Array.from({length:count}, (_,i) =>
        fetch("https://fal.run/fal-ai/flux/schnell", {
          method:"POST",
          headers:{ "Authorization":`Key ${FAL_KEY}`, "Content-Type":"application/json" },
          body:JSON.stringify({ prompt: basePrompt + (i > 0 ? ` variation ${i+1}` : ""), num_images:1, image_size:"square_hd", num_inference_steps:4 })
        }).then(r=>r.json())
      );
      const results = await Promise.all(jobs);
      const urls = results.flatMap(r=>(r.images||[]).map(img=>img.url)).filter(Boolean);
      if (!urls.length) throw new Error("No images returned. Please check your fal.ai credits.");
      setImages(urls);
    } catch(e) { setError(e.message||"Image generation failed."); }
    setLoading(false);
  };

  return (
    <div>
      <Panel title="Image brief">
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div><Label>Product name</Label><input value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. Vitamin C Serum" style={baseInp}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div><Label>Image style</Label><select value={style} onChange={e=>setStyle(e.target.value)} style={baseInp}>{IMAGE_STYLES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><Label>Number of images</Label><select value={count} onChange={e=>setCount(Number(e.target.value))} style={baseInp}>{[1,2,3,4].map(n=><option key={n} value={n}>{n} image{n>1?"s":""}</option>)}</select></div>
          </div>
          <div><Label>Extra details (optional)</Label><input value={extra} onChange={e=>setExtra(e.target.value)} placeholder="e.g. pink roses, marble surface, gold packaging..." style={baseInp}/></div>
          <div style={{ padding:"10px 12px", background:"rgba(124,106,255,.07)", border:"1px solid rgba(124,106,255,.15)", borderRadius:8, fontSize:12, color:"#888898", lineHeight:1.5 }}>
            <span style={{ color:"#7c6aff", fontWeight:500 }}>Auto-tuned for {client.name}:</span> Lighting and mood will match the <span style={{color:"#ededf5"}}>{client.tone}</span> brand tone automatically.
          </div>
        </div>
        <GenBtn onClick={generate} loading={loading} label={`Generate ${count} product image${count>1?"s":""}`}/>
      </Panel>
      <ErrorBox msg={error}/>
      {loading && (
        <div style={{ textAlign:"center", padding:48, color:"#888898" }}>
          <div style={{ fontSize:13, marginBottom:6 }}>Generating {count} image{count>1?"s":""} for {client.name}...</div>
          <div style={{ fontSize:11 }}>This takes 10–20 seconds ☕</div>
        </div>
      )}
      {images.length>0 && <>
        <SectionLabel>Generated images — right-click to save</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(count,2)},1fr)`, gap:12, marginBottom:12 }}>
          {images.map((url,i)=>(
            <div key={i} style={{ background:"#1a1a26", border:"1px solid #252535", borderRadius:10, overflow:"hidden" }}>
              <img src={url} alt={`Product image ${i+1}`} style={{ width:"100%", display:"block" }}/>
              <div style={{ padding:"9px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:11, color:"#888898" }}>Image {i+1}</span>
                <a href={url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:"#7c6aff", textDecoration:"none", padding:"3px 10px", border:"1px solid rgba(124,106,255,.3)", borderRadius:5 }}>Open full ↗</a>
              </div>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
}

function AddClientModal({ onClose, onSave }) {
  const [name,setName]=useState(""); const [niche,setNiche]=useState("");
  const [tone,setTone]=useState(""); const [audience,setAudience]=useState(""); const [notes,setNotes]=useState("");
  const save = () => {
    if (!name.trim()||!niche||!tone) { alert("Please fill in name, niche, and tone."); return; }
    onSave({ name:name.trim(), niche, tone, audience, notes }); onClose();
  };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
      <div style={{ background:"#13131c", border:"1px solid #353548", borderRadius:14, padding:24, width:440, maxWidth:"93vw" }}>
        <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:16, fontWeight:700, marginBottom:18, color:"#ededf5" }}>Add new client</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div><Label>Brand name</Label><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Glow Studio" style={baseInp}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div><Label>Niche</Label><select value={niche} onChange={e=>setNiche(e.target.value)} style={baseInp}><option value="">Select...</option>{NICHES.map(n=><option key={n}>{n}</option>)}</select></div>
            <div><Label>Brand tone</Label><select value={tone} onChange={e=>setTone(e.target.value)} style={baseInp}><option value="">Select...</option>{TONES.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div><Label>Target audience</Label><input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="e.g. Women 25-35 into skincare" style={baseInp}/></div>
          <div><Label>Brand notes (optional)</Label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Key words, things to avoid..." style={{...baseInp,minHeight:60,resize:"none",lineHeight:1.5}}/></div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:18, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ padding:"8px 16px", borderRadius:7, border:"1px solid #353548", background:"none", color:"#ededf5", cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>Cancel</button>
          <button onClick={save} style={{ padding:"8px 16px", borderRadius:7, border:"none", background:"#7c6aff", color:"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500 }}>Save client</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [clients,setClients]=useState(INITIAL_CLIENTS);
  const [nextId,setNextId]=useState(4);
  const [selected,setSelected]=useState(null);
  const [showModal,setShowModal]=useState(false);
  const [tab,setTab]=useState("campaign");

  const selectClient = c => { setSelected(c); setTab("campaign"); };
  const addClient = data => { setClients(prev=>[...prev,{...data,id:nextId,c:clients.length%COLORS.length}]); setNextId(n=>n+1); };

  const tabBtn = (id, icon, label) => (
    <button onClick={()=>setTab(id)} style={{ padding:"7px 16px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500, background:tab===id?"#7c6aff":"transparent", color:tab===id?"#fff":"#888898", transition:"all .15s" }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ display:"grid", gridTemplateColumns:"240px 1fr", minHeight:"100vh", background:"#0d0d14", color:"#ededf5", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:14 }}>
      <div style={{ background:"#13131c", borderRight:"1px solid #252535", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid #252535" }}>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:16, fontWeight:700 }}>reel<span style={{color:"#7c6aff"}}>forge</span></div>
          <div style={{ fontSize:10, color:"#888898", marginTop:2, letterSpacing:".07em", textTransform:"uppercase" }}>Agency Platform</div>
        </div>
        <div style={{ padding:"14px 14px 6px", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"#444458", fontWeight:600 }}>Clients</div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 6px" }}>
          {clients.map(c => {
            const col=COLORS[c.c%COLORS.length], active=selected?.id===c.id;
            return (
              <div key={c.id} onClick={()=>selectClient(c)} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 8px", borderRadius:8, cursor:"pointer", marginBottom:2, background:active?"rgba(124,106,255,.12)":"transparent", outline:active?"1px solid rgba(124,106,255,.25)":"none" }}>
                <div style={{ width:28, height:28, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, background:col.bg, color:col.fg, fontFamily:"'Space Grotesk',system-ui,sans-serif" }}>{initials(c.name)}</div>
                <div style={{minWidth:0}}>
                  <div style={{ fontSize:13, fontWeight:500, color:active?"#7c6aff":"#ededf5", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</div>
                  <div style={{ fontSize:11, color:"#888898", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.niche}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={()=>setShowModal(true)} style={{ margin:8, padding:9, border:"1px dashed #353548", borderRadius:9, background:"none", color:"#888898", cursor:"pointer", fontFamily:"inherit", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>+ Add client</button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #252535", background:"#13131c", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:15, fontWeight:600 }}>{selected?selected.name:"Select a client"}</div>
            <div style={{ fontSize:11, color:"#888898", marginTop:1 }}>{selected?`${selected.niche} · ${selected.tone}`:"Add or select a client to get started"}</div>
          </div>
          {selected && (
            <div style={{ display:"flex", gap:4, background:"#0d0d14", padding:4, borderRadius:10, border:"1px solid #252535" }}>
              {tabBtn("campaign","✦","Campaign")}
              {tabBtn("images","⬡","Images")}
            </div>
          )}
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>
          {!selected ? (
            <div style={{ textAlign:"center", padding:"80px 20px", color:"#888898" }}>
              <div style={{ fontSize:32, marginBottom:12, opacity:.2 }}>✦</div>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:15, fontWeight:600, color:"#ededf5", marginBottom:6 }}>No client selected</div>
              <div style={{ fontSize:13, lineHeight:1.6 }}>Pick a client from the sidebar or add a new one<br/>to start generating campaigns and images.</div>
            </div>
          ) : tab==="campaign" ? (
            <CampaignTab key={selected.id+"-c"} client={selected}/>
          ) : (
            <ImagesTab key={selected.id+"-i"} client={selected}/>
          )}
        </div>
      </div>

      {showModal && <AddClientModal onClose={()=>setShowModal(false)} onSave={addClient}/>}
      <style>{`* { box-sizing: border-box; } select option { background: #1a1a26; color: #ededf5; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #353548; border-radius: 4px; }`}</style>
    </div>
  );
}
