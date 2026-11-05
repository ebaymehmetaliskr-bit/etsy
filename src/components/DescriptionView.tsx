import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Shield, Ruler, Sparkle, Layers } from 'lucide-react';
import { ProductDescription } from '../types/wallpaper';

interface DescriptionViewProps {
  description: ProductDescription;
}

export const DescriptionView: React.FC<DescriptionViewProps> = ({ description }) => {
  const [activeTab, setActiveTab] = useState<'full' | 'sections'>('full');
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(description.fullText);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopySection = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            📄
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 4: High-Converting English Description
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                SEO & Buyer Protection Formatted
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Structured layout overcoming buyer hesitation, material confusion, and sizing mistakes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="flex bg-stone-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'full' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Full Description
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'sections' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              By Sections
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyFull}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copiedFull
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
            }`}
          >
            {copiedFull ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Full Description!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Description</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Full Description Box */}
      {activeTab === 'full' ? (
        <div className="relative">
          <textarea
            readOnly
            value={description.fullText}
            rows={15}
            className="w-full p-5 rounded-2xl bg-stone-50 border border-stone-200 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed focus:outline-none select-all resize-y font-mono"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
            <span>Includes: Emotional Hook, Material Comparison, Panel Overlap Guide, Eco Credentials & Sample CTA.</span>
            <span className="font-mono">{description.fullText.length} characters</span>
          </div>
        </div>
      ) : (
        /* Tab 2: Individual Sections Grid */
        <div className="space-y-4">
          
          {/* Section 1: Hook */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1. Emotional Hook & Transformation
              </span>
              <button
                onClick={() => handleCopySection(description.hook, 'hook')}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1"
              >
                {copiedSection === 'hook' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Section
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
              {description.hook}
            </p>
          </div>

          {/* Section 2: Material Options */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                2. Material Options (Peel & Stick vs Unpasted)
              </span>
              <button
                onClick={() => handleCopySection(description.materialOptions, 'materials')}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1"
              >
                {copiedSection === 'materials' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Section
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed font-mono">
              {description.materialOptions}
            </p>
          </div>

          {/* Section 3: Sizing & Panel Guide */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-purple-500" />
                3. Sizing, Panel Heights & Overlap Margin
              </span>
              <button
                onClick={() => handleCopySection(description.sizingPanelGuide, 'sizing')}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1"
              >
                {copiedSection === 'sizing' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Section
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
              {description.sizingPanelGuide}
            </p>
          </div>

          {/* Section 4: Eco & Health Safety */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                4. Eco-Friendly & Health Safety (GreenGuard Inks)
              </span>
              <button
                onClick={() => handleCopySection(description.ecoFriendlyHealth, 'eco')}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1"
              >
                {copiedSection === 'eco' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Section
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
              {description.ecoFriendlyHealth}
            </p>
          </div>

          {/* Section 5: Application Rules & Custom CTA */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                5. Application Rules & Sample Orders
              </span>
              <button
                onClick={() => handleCopySection(description.applicationRules + '\n\n' + description.customOrderCta, 'rules')}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1"
              >
                {copiedSection === 'rules' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Section
              </button>
            </div>
            <div className="text-xs sm:text-sm text-stone-800 space-y-2">
              <p className="whitespace-pre-line">{description.applicationRules}</p>
              <p className="italic text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 font-medium">
                {description.customOrderCta}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
