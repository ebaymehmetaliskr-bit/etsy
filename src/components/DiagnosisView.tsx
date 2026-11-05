import React, { useState } from 'react';
import { Target, Palette, Check, Copy, Compass, Users, Sparkles } from 'lucide-react';
import { VisualDiagnosis, ColorSwatch } from '../types/wallpaper';

interface DiagnosisViewProps {
  diagnosis: VisualDiagnosis;
  onOpenVisualizer: () => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({ diagnosis, onOpenVisualizer }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            🎯
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 1: Visual & Style Diagnosis
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                Visual Elements Extracted
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Pattern motifs, aesthetic classification, and dominant color palette
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVisualizer}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/80 text-xs font-bold transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Launch Room Visualizer</span>
        </button>
      </div>

      {/* Grid of Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Style & Aesthetic */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Aesthetic / Style</span>
          </div>
          <p className="text-sm font-semibold text-stone-900 leading-snug">
            {diagnosis.aestheticStyle}
          </p>
          <p className="text-xs text-stone-500 italic">
            "{diagnosis.designVibe}"
          </p>
        </div>

        {/* Pattern & Elements */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Pattern & Subject Elements</span>
          </div>
          <p className="text-sm font-medium text-stone-800 leading-relaxed">
            {diagnosis.patternElements}
          </p>
        </div>

        {/* Target Room & Audience */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Target Space & Buyer Persona</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-stone-700">
              <strong className="text-stone-900">Rooms:</strong> {diagnosis.targetSpace}
            </p>
            <p className="text-xs text-stone-600">
              <strong className="text-stone-900">Audience:</strong> {diagnosis.targetAudience}
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
              <Palette className="w-4 h-4 text-rose-600" />
              <span>Extracted Color Palette</span>
            </div>
            <span className="text-[10px] text-stone-400">Click swatch to copy HEX</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {diagnosis.colorPalette.map((color: ColorSwatch, idx: number) => {
              const isCopied = copiedHex === color.hex;
              return (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs transition-all text-left"
                >
                  <span
                    className="w-4 h-4 rounded-full shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-stone-800 leading-none">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {color.hex}
                    </span>
                  </div>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-stone-300 group-hover:text-stone-500 ml-1 transition-colors" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
