import React, { useState } from 'react';
import { Copy, Check, Smartphone, AlertCircle, Edit3, CheckCircle2, Sparkles } from 'lucide-react';
import { OptimizedTitle } from '../types/wallpaper';

interface TitleOptimizerViewProps {
  initialTitle: OptimizedTitle;
  onTitleChange?: (updatedTitle: string) => void;
  thumbnailUrl?: string;
}

export const TitleOptimizerView: React.FC<TitleOptimizerViewProps> = ({
  initialTitle,
  onTitleChange,
  thumbnailUrl,
}) => {
  const [titleText, setTitleText] = useState(initialTitle.title);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const charCount = titleText.length;
  const isOptimalLength = charCount >= 120 && charCount <= 140;
  const isTooLong = charCount > 140;
  const isTooShort = charCount < 120;

  const handleCopy = () => {
    navigator.clipboard.writeText(titleText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTitleText(val);
    if (onTitleChange) {
      onTitleChange(val);
    }
  };

  // Mobile cut-off preview (approx 45 characters)
  const mobileChars = titleText.substring(0, 48);

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            📝
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 2: Optimized Etsy Title
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isOptimalLength
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : isTooLong
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {charCount} / 140 Characters
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Search intent stacking (Style + Pattern + Material + Room) & mobile-first priority
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Title'}</span>
          </button>
          
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Title!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Title</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Title Box */}
      <div className="space-y-2">
        {isEditing ? (
          <div className="space-y-1.5">
            <textarea
              value={titleText}
              onChange={handleTextChange}
              rows={3}
              className="w-full p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/20 text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <div className="flex justify-between text-xs text-stone-500 px-1">
              <span>Target: 120–140 characters without repeating spam phrases.</span>
              <span className={`font-mono font-bold ${isOptimalLength ? 'text-emerald-600' : 'text-amber-600'}`}>
                {charCount} chars
              </span>
            </div>
          </div>
        ) : (
          <div className="relative p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 group">
            <p className="text-base font-semibold text-stone-900 leading-relaxed font-sans select-all">
              {titleText}
            </p>
          </div>
        )}

        {/* Character Count Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${
                isOptimalLength
                  ? 'bg-emerald-500'
                  : isTooLong
                  ? 'bg-rose-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min((charCount / 140) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              {isOptimalLength && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Etsy SEO Length (120-140)
                </span>
              )}
              {isTooShort && (
                <span className="text-amber-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Good, but could add {120 - charCount} more characters for maximum long-tail visibility
                </span>
              )}
              {isTooLong && (
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Exceeds Etsy limit by {charCount - 140} chars. Please trim!
                </span>
              )}
            </span>
            <span className="font-mono font-semibold">{charCount} / 140 max</span>
          </div>
        </div>
      </div>

      {/* Two Column Breakdown: Search Intents + Etsy Mobile Search Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
        
        {/* Mobile Search Card Preview */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/60 border border-stone-200/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Etsy Mobile Search Preview (First 48 Chars)</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-stone-500 border border-stone-200">
              Mobile-First
            </span>
          </div>

          {/* Simulated Etsy Mobile Product Card */}
          <div className="flex gap-3.5 bg-white p-3 rounded-xl border border-stone-200/80 shadow-xs max-w-sm">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                  Wallpaper
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Ad by BoutiqueWallArt</span>
                <p className="text-xs font-bold text-stone-900 leading-snug line-clamp-2">
                  <span className="text-amber-900 bg-amber-50 px-1 py-0.5 rounded font-black">
                    {mobileChars}
                  </span>
                  <span className="text-stone-400">...</span>
                </p>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs font-black text-stone-900">$45.00</span>
                <span className="text-[10px] text-emerald-700 font-semibold">FREE shipping</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 italic">
            Over 65% of Etsy buyers browse on mobile phones where titles truncate after ~45 characters. The first phrase must state the material and primary subject immediately!
          </p>
        </div>

        {/* Search Intent Pillars */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Search Intent Stacking Formula</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {initialTitle.searchIntentsCovered.map((intent, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {intent}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-stone-500 leading-relaxed">
            Formula applied: <code className="text-stone-800 font-mono text-[10px] bg-stone-200/70 px-1 py-0.5 rounded">[Style/Aesthetic] + [Pattern/Subject] + [Material/Product Type] + [Room/Use Case]</code>
          </p>
        </div>

      </div>
    </div>
  );
};
