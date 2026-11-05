import React, { useState } from 'react';
import { Camera, Copy, Check, Sparkles, Layers, Share2, Compass, Eye } from 'lucide-react';
import { MarketingAndMockups } from '../types/wallpaper';

interface MarketingMockupViewProps {
  marketing: MarketingAndMockups;
  onOpenVisualizer: () => void;
  designName: string;
}

export const MarketingMockupView: React.FC<MarketingMockupViewProps> = ({
  marketing,
  onOpenVisualizer,
  designName,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSocial, setCopiedSocial] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(marketing.midjourneyPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copySocial = () => {
    navigator.clipboard.writeText(marketing.socialHook);
    setCopiedSocial(true);
    setTimeout(() => setCopiedSocial(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            🖼️
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 6: Visual Marketing & AI Mockup Prompt
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                Lead Image Psychology
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Listing photo hierarchy and generation prompt for ultra-realistic lifestyle staging
            </p>
          </div>
        </div>

        {/* Launch Visualizer Button */}
        <button
          onClick={onOpenVisualizer}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
        >
          <Eye className="w-4 h-4" />
          <span>Launch Room Visualizer</span>
        </button>
      </div>

      {/* 3 Lead Images Hierarchy */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
          Recommended 3 Primary Listing Photos (Click-Through Conversion Flow)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketing.leadImages.map((leadImg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-900 text-amber-400 font-mono">
                    {leadImg.slot.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">
                    {leadImg.slot.includes('Hero') ? 'Hero Mockup' : leadImg.slot.includes('Detail') ? 'Texture Proof' : 'Installation'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                  {leadImg.concept}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/60">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                  Why It Converts:
                </span>
                <p className="text-xs text-stone-600 italic">
                  "{leadImg.whyItConverts}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Midjourney / AI Room Mockup Generation Prompt */}
      <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Photorealistic Room Mockup AI Prompt (Midjourney v6 / Flux)
            </span>
          </div>

          <button
            onClick={copyPrompt}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copiedPrompt ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-amber-400'
            }`}
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy Midjourney Prompt'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-950 font-mono text-xs text-stone-200 leading-relaxed border border-stone-800 select-all">
          {marketing.midjourneyPrompt}
        </div>
        <p className="text-[11px] text-stone-400">
          Paste this prompt directly into Midjourney, Flux, or Leonardo to produce architectural-digest quality room settings featuring this wallpaper accent wall.
        </p>
      </div>

      {/* Social Media & Pinterest Hook */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-blue-600" />
            Pinterest Pin & Instagram Reel Caption (External Traffic)
          </span>
          <button
            onClick={copySocial}
            className="text-xs text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1"
          >
            {copiedSocial ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Caption
          </button>
        </div>
        <p className="text-xs text-stone-800 bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
          {marketing.socialHook}
        </p>
      </div>

    </div>
  );
};
