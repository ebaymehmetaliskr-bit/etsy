import React, { useState } from 'react';
import { Sparkles, BookmarkCheck, HelpCircle, Layers, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenPresets: () => void;
  language: 'en' | 'tr';
  setLanguage: (lang: 'en' | 'tr') => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenPresets,
  language,
  setLanguage,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  const t = {
    en: {
      title: 'Etsy Wallpaper SEO Strategist',
      badge: '2026 Etsy Algorithm Ready',
      presetsBtn: 'Curated Presets',
      savedBtn: 'Saved Packages',
      helpBtn: 'SEO Framework',
      tagline: 'End-to-End A-to-Z Listing Optimization for Wallpaper & Wall Mural Creators'
    },
    tr: {
      title: 'Etsy Duvar Kağıdı SEO Stratejisti',
      badge: '2026 Etsy Algoritması Uyumlu',
      presetsBtn: 'Hazır Tasarımlar',
      savedBtn: 'Kayıtlı Paketler',
      helpBtn: 'SEO Kılavuzu',
      tagline: 'Duvar Kağıdı & Duvar Posteri Mağazaları İçin Uçtan Uca A-Z Listeleme Optimizasyonu'
    }
  }[language];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Mission */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-black shadow-lg shadow-amber-500/20">
            <Layers className="w-6 h-6 text-stone-950" />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-stone-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                {t.title}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/25">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.badge}
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden md:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Presets Quick Button */}
          <button
            onClick={onOpenPresets}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700/60 transition-all hover:border-stone-600 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.presetsBtn}
          </button>

          {/* Saved Drawer Button */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700/60 transition-all hover:border-stone-600"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">{t.savedBtn}</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {savedCount}
              </span>
            )}
          </button>

          {/* Help / Guide Trigger */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 border border-stone-700/60 transition-colors"
            title="Etsy SEO Knowledge Base"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{t.helpBtn}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-stone-800/90 p-0.5 rounded-xl border border-stone-700 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                language === 'en'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                language === 'tr'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              TR
            </button>
          </div>
        </div>
      </div>

      {/* SEO Framework Info Modal / Bar */}
      {showHelp && (
        <div className="border-t border-stone-800 bg-stone-950/95 px-4 py-4 text-xs text-stone-300 animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                Etsy 2026 Wallpaper Algorithm Core Rules:
              </span>
              <p className="text-stone-300">
                1. <strong>Strict 20-Char Tags:</strong> All 13 tags must be filled and ≤ 20 characters (including spaces).
                &nbsp;|&nbsp;
                2. <strong>First 45 Chars:</strong> Mobile Etsy truncates titles after 45-50 characters; high-intent keywords come first.
                &nbsp;|&nbsp;
                3. <strong>Search Intent Stacking:</strong> Style + Subject + Material + Room + Color without repeating spam words.
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="text-stone-400 hover:text-stone-200 px-3 py-1 bg-stone-800 rounded-lg text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
