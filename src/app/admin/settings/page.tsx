"use client";

import { useState } from "react";
import { Plus, X, GripVertical, Save } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
      <h2 className="font-bold text-gray-800 text-sm">{title}</h2>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white";
const label = (text: string) => (
  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{text}</label>
);

export default function AdminSettingsPage() {
  const { hero, settings, updateHero, updateSettings } = useAdminStore();

  /* ── Hero local state ── */
  const [heroForm, setHeroForm] = useState({ ...hero });
  const [heroSaved, setHeroSaved] = useState(false);

  const saveHero = () => {
    updateHero(heroForm);
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2000);
  };

  /* ── Site Settings local state ── */
  const [siteForm, setSiteForm] = useState({
    siteName: settings.siteName,
    siteTagline: settings.siteTagline,
    freeShippingThreshold: settings.freeShippingThreshold,
    announcementSpeed: settings.announcementSpeed,
  });
  const [siteSaved, setSiteSaved] = useState(false);

  const saveSite = () => {
    updateSettings(siteForm);
    setSiteSaved(true);
    setTimeout(() => setSiteSaved(false), 2000);
  };

  /* ── Announcement messages ── */
  const [messages, setMessages] = useState<string[]>([...settings.announcementMessages]);
  const [newMsg, setNewMsg] = useState("");
  const [msgSaved, setMsgSaved] = useState(false);

  const addMsg = () => {
    const m = newMsg.trim();
    if (m) { setMessages((prev) => [...prev, m]); setNewMsg(""); }
  };

  const removeMsg = (i: number) => setMessages((prev) => prev.filter((_, idx) => idx !== i));

  const updateMsg = (i: number, val: string) =>
    setMessages((prev) => prev.map((m, idx) => (idx === i ? val : m)));

  const saveMsgs = () => {
    updateSettings({ announcementMessages: messages });
    setMsgSaved(true);
    setTimeout(() => setMsgSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Control every aspect of your storefront.</p>
      </div>

      {/* ── Hero Banner ── */}
      <Section title="Hero Banner">
        <div className="space-y-3">
          <div>
            {label("Title")}
            <input className={inputCls} value={heroForm.title}
              onChange={(e) => setHeroForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            {label("Subtitle")}
            <textarea className={`${inputCls} min-h-[80px] resize-y`} value={heroForm.subtitle}
              onChange={(e) => setHeroForm((f) => ({ ...f, subtitle: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {label("CTA Label")}
              <input className={inputCls} value={heroForm.ctaLabel}
                onChange={(e) => setHeroForm((f) => ({ ...f, ctaLabel: e.target.value }))} />
            </div>
            <div>
              {label("CTA Link")}
              <input className={inputCls} value={heroForm.ctaHref}
                onChange={(e) => setHeroForm((f) => ({ ...f, ctaHref: e.target.value }))} />
            </div>
          </div>
          <div>
            {label("Background Image URL")}
            <input className={inputCls} value={heroForm.imageSrc}
              onChange={(e) => setHeroForm((f) => ({ ...f, imageSrc: e.target.value }))}
              placeholder="https://…" />
          </div>
          <div>
            {label(`Overlay Opacity: ${Math.round(heroForm.overlayOpacity * 100)}%`)}
            <input type="range" min={0} max={1} step={0.01}
              value={heroForm.overlayOpacity}
              onChange={(e) => setHeroForm((f) => ({ ...f, overlayOpacity: Number(e.target.value) }))}
              className="w-full accent-black" />
          </div>

          {/* Preview */}
          {heroForm.imageSrc && (
            <div className="relative rounded-xl overflow-hidden h-36 mt-2">
              <img src={heroForm.imageSrc} alt="Hero preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${heroForm.overlayOpacity})` }} />
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <p className="text-white font-bold text-lg leading-tight">{heroForm.title}</p>
                <p className="text-white/80 text-xs mt-1 line-clamp-2">{heroForm.subtitle}</p>
                <span className="mt-2 inline-block bg-white text-black text-xs font-bold px-3 py-1 rounded-full w-fit">
                  {heroForm.ctaLabel}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end pt-1">
          <button onClick={saveHero}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${heroSaved ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}>
            <Save size={14} />
            {heroSaved ? "Saved!" : "Save Hero"}
          </button>
        </div>
      </Section>

      {/* ── Announcement Bar ── */}
      <Section title="Announcement Bar">
        <p className="text-xs text-gray-400 -mt-2">Messages rotate in the top banner. Drag to reorder.</p>
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical size={14} className="text-gray-300 shrink-0" />
              <input
                className={`${inputCls} flex-1`}
                value={msg}
                onChange={(e) => updateMsg(i, e.target.value)}
              />
              <button onClick={() => removeMsg(i)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className={`${inputCls} flex-1`}
            placeholder="Add new message…"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMsg(); } }}
          />
          <button onClick={addMsg}
            className="px-4 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
            <Plus size={14} />
          </button>
        </div>
        <div className="flex justify-end pt-1">
          <button onClick={saveMsgs}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${msgSaved ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}>
            <Save size={14} />
            {msgSaved ? "Saved!" : "Save Messages"}
          </button>
        </div>
      </Section>

      {/* ── Site Settings ── */}
      <Section title="Site Settings">
        <div className="grid grid-cols-2 gap-4">
          <div>
            {label("Site Name")}
            <input className={inputCls} value={siteForm.siteName}
              onChange={(e) => setSiteForm((f) => ({ ...f, siteName: e.target.value }))} />
          </div>
          <div>
            {label("Tagline")}
            <input className={inputCls} value={siteForm.siteTagline}
              onChange={(e) => setSiteForm((f) => ({ ...f, siteTagline: e.target.value }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {label("Free Shipping Threshold (cents)")}
            <input type="number" className={inputCls} min={0}
              value={siteForm.freeShippingThreshold}
              onChange={(e) => setSiteForm((f) => ({ ...f, freeShippingThreshold: Number(e.target.value) }))} />
            <p className="text-xs text-gray-400 mt-1">= ${(siteForm.freeShippingThreshold / 100).toFixed(2)}</p>
          </div>
          <div>
            {label("Announcement Rotation (ms)")}
            <input type="number" className={inputCls} min={1000} step={500}
              value={siteForm.announcementSpeed}
              onChange={(e) => setSiteForm((f) => ({ ...f, announcementSpeed: Number(e.target.value) }))} />
            <p className="text-xs text-gray-400 mt-1">Each message shows for this long</p>
          </div>
        </div>
        <div className="flex justify-end pt-1">
          <button onClick={saveSite}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${siteSaved ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}>
            <Save size={14} />
            {siteSaved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </Section>
    </div>
  );
}
