import React, { useState } from 'react';
import { Globe2, MapPin, Ruler, BookOpen, Check, Copy, Sparkles, Building2, Home } from 'lucide-react';
import { EtsyGeoLocalization } from '../types/wallpaper';

interface GeoLocalizationViewProps {
  geo: EtsyGeoLocalization;
  onSelectMarket?: (market: string) => void;
}

export const GeoLocalizationView: React.FC<GeoLocalizationViewProps> = ({ geo }) => {
  const [copiedKw, setCopiedKw] = useState(false);

  const copyKeywords = () => {
    navigator.clipboard.writeText(geo.regionalKeywords.join(', '));
    setCopiedKw(true);
    setTimeout(() => setCopiedKw(false), 2000);
  };

  const isUk = geo.spellingConvention === 'UK' || geo.targetMarket.includes('UK');

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold text-lg border border-sky-500/20">
            🌎
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 6: Etsy GEO & Localization Breakdown
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isUk ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}>
                {geo.targetMarket}
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Measurement conventions, regional search vocabulary, and architectural interior fit
            </p>
          </div>
        </div>

        <button
          onClick={copyKeywords}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
            copiedKw ? 'bg-emerald-600 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          {copiedKw ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKw ? 'Copied Regional Terms!' : 'Copy Regional Keywords'}</span>
        </button>
      </div>

      {/* Top 3 Core Rules Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Measurement Standards */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Ruler className="w-3.5 h-3.5 text-sky-600" />
            Unit Standards
          </span>
          <p className="text-xs font-bold text-stone-900 font-mono">
            {geo.unitStandards}
          </p>
          <span className="text-[10px] text-stone-400 block">
            Imperial (Inches/Feet) primary, Metric in parentheses
          </span>
        </div>

        {/* Spelling Convention */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Spelling Convention
          </span>
          <p className="text-xs font-bold text-stone-900">
            {geo.spellingConvention === 'UK' ? 'UK English (Colour, Personalised)' : 'US English (Color, Personalized)'}
          </p>
          <span className="text-[10px] text-stone-400 block">
            {geo.spellingConvention === 'UK' ? 'Targeted for UK/EU buyers' : 'Targeted for 80%+ US Etsy search volume'}
          </span>
        </div>

        {/* Regional Style Profile */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            Target Demographic
          </span>
          <p className="text-xs font-bold text-stone-900 truncate">
            {geo.targetMarket}
          </p>
          <span className="text-[10px] text-stone-400 block">
            Aligned with regional home buying & rental trends
          </span>
        </div>
      </div>

      {/* Regional High-Converting Keywords Matrix */}
      <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            High-Converting Regional Search Vocabulary ({isUk ? 'UK / European Terminology' : 'USA Terminology'})
          </span>
          <span className="text-[10px] text-sky-700 font-medium">Auto-inserted in listing</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {geo.regionalKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-white border border-sky-200/80 text-xs font-bold text-sky-900 shadow-2xs flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Regional Aesthetic & Architectural Compatibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
          <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Regional Aesthetic Alignment
          </span>
          <p className="text-stone-800 leading-relaxed font-medium">
            {geo.regionalAestheticFit}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
          <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-purple-500" />
            Architectural Interior Match
          </span>
          <p className="text-stone-800 leading-relaxed font-medium">
            {geo.architecturalCompatibility}
          </p>
        </div>
      </div>

    </div>
  );
};
