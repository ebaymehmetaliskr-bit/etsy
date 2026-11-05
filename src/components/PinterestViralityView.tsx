import React, { useState } from 'react';
import { Pin, TrendingUp, Sparkles, Copy, Check, Bookmark, Camera, Eye, Share2 } from 'lucide-react';
import { PinterestViralityPackage } from '../types/wallpaper';

interface PinterestViralityViewProps {
  pinterest: PinterestViralityPackage;
  wallpaperThumbnail?: string;
  designTitle: string;
}

export const PinterestViralityView: React.FC<PinterestViralityViewProps> = ({
  pinterest,
  wallpaperThumbnail,
  designTitle,
}) => {
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [copiedOverlay, setCopiedOverlay] = useState<number | null>(null);
  const [selectedOverlayIdx, setSelectedOverlayIdx] = useState<number>(0);

  const copyAllKeywords = () => {
    navigator.clipboard.writeText(pinterest.top5PinterestKeywords.join(', '));
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  const copyOverlayText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedOverlay(idx);
    setTimeout(() => setCopiedOverlay(null), 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold text-lg border border-rose-500/20">
            📌
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 7: Pinterest Trends & Visual Virality Package
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Primary Visual Traffic Engine
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Visual search keywords, viral board targeting, and 2:3 vertical graphic text overlays
            </p>
          </div>
        </div>

        <button
          onClick={copyAllKeywords}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
            copiedKeywords ? 'bg-emerald-600 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white'
          }`}
        >
          {copiedKeywords ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
          <span>{copiedKeywords ? 'Copied Pinterest Tags!' : 'Copy 5 Pinterest Keywords'}</span>
        </button>
      </div>

      {/* Two Column Layout: Left Details, Right Live 2:3 Pinterest Pin Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Keywords, Boards, Overlays & Framing */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Top 5 Pinterest Search Terms */}
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                Top 5 High-Converting Pinterest Search Terms
              </span>
              <span className="text-[10px] text-rose-700 font-semibold">High Save & Repin Velocity</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {pinterest.top5PinterestKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-rose-200/80 text-xs font-bold text-stone-800 shadow-2xs flex items-center gap-1.5"
                >
                  <Pin className="w-3 h-3 text-rose-500 fill-rose-500" />
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Pinterest Graphic Overlay Text Hooks */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Conversion-Focused Graphic Text Overlays (For Canva / Photoshop Pin Graphics)
            </span>

            <div className="space-y-2.5">
              {pinterest.pinOverlayTextIdeas.map((overlay, idx) => {
                const isSelected = selectedOverlayIdx === idx;
                const isCopied = copiedOverlay === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected ? 'bg-amber-50/60 border-amber-300' : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedOverlayIdx(idx)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                        title="Preview on Pin"
                      >
                        #{idx + 1}
                      </button>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
                        "{overlay}"
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOverlayIdx(idx)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-md transition-colors ${
                          isSelected ? 'text-amber-800 bg-amber-100/70' : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        {isSelected ? 'Active Preview' : 'Test on Pin'}
                      </button>
                      <button
                        onClick={() => copyOverlayText(overlay, idx)}
                        className="p-1 text-stone-400 hover:text-stone-800 rounded transition-colors"
                        title="Copy text overlay"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-500">
              Pins with bold 4-6 word text overlays receive up to <strong>3.2x higher click-through rates</strong> directly to Etsy shops.
            </p>
          </div>

          {/* Target Pinterest Boards & Visual Framing Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Viral Boards */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-rose-500" />
                Target Pinterest Boards
              </span>
              <ul className="space-y-1.5 pt-1">
                {pinterest.targetBoards.map((board, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-stone-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{board}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Framing Camera Advice */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-sky-600" />
                Visual Framing & Daylight Strategy
              </span>
              <p className="text-stone-700 leading-relaxed font-medium pt-1">
                {pinterest.visualFramingStrategy}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Simulated 2:3 Pinterest Pin Card */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            Simulated 2:3 Viral Pin
          </span>

          <div className="relative w-full max-w-[260px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group select-none">
            {/* Wallpaper background pattern */}
            {wallpaperThumbnail ? (
              <img
                src={wallpaperThumbnail}
                alt="Pin Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-stone-800 to-stone-900 flex items-center justify-center text-xs text-stone-500">
                Pattern Preview
              </div>
            )}

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

            {/* Top Pin Header: Pinterest Logo badge + Save button */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                P
              </span>
              <button
                type="button"
                className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105"
              >
                Save
              </button>
            </div>

            {/* Centered Graphic Text Overlay Hook */}
            <div className="absolute inset-x-3 bottom-14 text-center">
              <div className="inline-block bg-white/95 backdrop-blur-md text-stone-950 font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-xl uppercase tracking-tight border border-white">
                {pinterest.pinOverlayTextIdeas[selectedOverlayIdx] || pinterest.pinOverlayTextIdeas[0] || 'Room Makeover'}
              </div>
            </div>

            {/* Bottom Store Link */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/90 font-medium">
              <span className="truncate">etsy.com/shop/wallart</span>
              <span className="text-amber-400 font-bold">Tap to Shop ↗</span>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 text-center mt-2 max-w-[240px]">
            Previewing 2:3 vertical aspect ratio (1000x1500px) ideal for Pinterest algorithm distribution.
          </p>
        </div>

      </div>

    </div>
  );
};
