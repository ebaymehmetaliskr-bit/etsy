import React, { useState } from 'react';
import { Copy, Check, Download, FileSpreadsheet, Code, BookmarkPlus, Sparkles } from 'lucide-react';
import { EtsyListingPackage } from '../types/wallpaper';

interface ListingPackageExportProps {
  packageData: EtsyListingPackage;
  onSaveToLibrary: () => void;
  isAlreadySaved: boolean;
}

export const ListingPackageExport: React.FC<ListingPackageExportProps> = ({
  packageData,
  onSaveToLibrary,
  isAlreadySaved,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);

  // Generate complete Markdown text if not already formatted
  const fullMarkdown = packageData.formattedMarkdownOutput || `🎯 Step 1: Visual & Style Diagnosis
Aesthetic / Style: ${packageData.visualDiagnosis.aestheticStyle}
Pattern / Elements: ${packageData.visualDiagnosis.patternElements}
Color Palette: ${packageData.visualDiagnosis.colorPalette.map(c => `${c.name} (${c.hex})`).join(', ')}
Target Space: ${packageData.visualDiagnosis.targetSpace}

📝 Step 2: Optimized Etsy Title
${packageData.optimizedTitle.title}

(Character Count: ${packageData.optimizedTitle.charCount} / 140)

🏷️ Step 3: 13 Tag Matrix (Max 20 Chars Each)
${packageData.tags.map(t => `${t.tag} (${t.charCount} chars) - ${t.category.split('&')[0].trim()}`).join('\n')}

📄 Step 4: Product Description (US/Imperial Units Default)
${packageData.description.fullText}

⚙️ Step 5: Listing Attributes & Pricing
Etsy Category: ${packageData.listingAttributes.etsyCategoryPath}
Attributes: Color: ${packageData.listingAttributes.primaryColor} & ${packageData.listingAttributes.secondaryColor}, Room: ${packageData.listingAttributes.roomAttributes.join(', ')}, Material: ${packageData.listingAttributes.materialAttribute}
Suggested Price Range: Sample: ${packageData.listingAttributes.suggestedPriceRange.samplePrice} | Panel: ${packageData.listingAttributes.suggestedPriceRange.panelPrice} | Kit: ${packageData.listingAttributes.suggestedPriceRange.largeMuralPrice}

🌎 Step 6: Etsy GEO & Localization Breakdown
Target US Region/Demographic: ${packageData.geoLocalization?.targetMarket || 'US National'}
High-Converting Regional Keywords: ${(packageData.geoLocalization?.regionalKeywords || []).join(', ')}
Unit Standards: ${packageData.geoLocalization?.unitStandards || '24" x 96" (61cm x 244cm)'}

📌 Step 7: Pinterest Trends & Visual Virality Package
Top 5 Pinterest Search Terms:
${(packageData.pinterestPackage?.top5PinterestKeywords || []).map((k, i) => `${i + 1}. ${k}`).join('\n')}

Target Pinterest Boards:
${(packageData.pinterestPackage?.targetBoards || []).map((b, i) => `${i + 1}. ${b}`).join('\n')}

Pin Graphic Text Overlays:
${(packageData.pinterestPackage?.pinOverlayTextIdeas || []).map((o, i) => `${i + 1}. "${o}"`).join('\n')}

Visual Framing Strategy:
${packageData.pinterestPackage?.visualFramingStrategy || 'Shoot vertical 2:3 ratio in natural warm sunlight.'}

🖼️ Step 8: Visual Marketing & AI Mockup Prompt
Lead Image Order:
${packageData.marketingAndMockups.leadImages.map(img => `${img.slot}: ${img.concept}`).join('\n')}

Midjourney Mockup Prompt:
${packageData.marketingAndMockups.midjourneyPrompt}`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = [
      'Title',
      'Tags',
      'Category',
      'Primary Color',
      'Secondary Color',
      'Price Panel',
      'GEO Target Market',
      'Regional Keywords',
      'Pinterest Search Terms',
      'Pinterest Overlay Hook',
      'Description',
      'Midjourney Prompt'
    ];

    const tagList = packageData.tags.map(t => t.tag).join(', ');
    const geoTerms = (packageData.geoLocalization?.regionalKeywords || []).join('; ');
    const pinKeywords = (packageData.pinterestPackage?.top5PinterestKeywords || []).join('; ');
    const pinOverlay = (packageData.pinterestPackage?.pinOverlayTextIdeas || [])[0] || '';

    const row = [
      `"${packageData.optimizedTitle.title.replace(/"/g, '""')}"`,
      `"${tagList.replace(/"/g, '""')}"`,
      `"${packageData.listingAttributes.etsyCategoryPath.replace(/"/g, '""')}"`,
      `"${packageData.listingAttributes.primaryColor}"`,
      `"${packageData.listingAttributes.secondaryColor}"`,
      `"${packageData.listingAttributes.suggestedPriceRange.panelPrice.replace(/"/g, '""')}"`,
      `"${packageData.geoLocalization?.targetMarket || 'USA'}"`,
      `"${geoTerms.replace(/"/g, '""')}"`,
      `"${pinKeywords.replace(/"/g, '""')}"`,
      `"${pinOverlay.replace(/"/g, '""')}"`,
      `"${packageData.description.fullText.replace(/"/g, '""')}"`,
      `"${packageData.marketingAndMockups.midjourneyPrompt.replace(/"/g, '""')}"`
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `etsy-wallpaper-${packageData.designName.toLowerCase().replace(/\s+/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(packageData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etsy-wallpaper-${packageData.designName.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            📦
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Publication-Ready Listing Package & Bulk Exports
            </h3>
            <p className="text-xs text-stone-500">
              One-click export to CSV (Vela / Bulk Etsy upload), raw Markdown, and JSON
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Save to Library */}
          <button
            onClick={onSaveToLibrary}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isAlreadySaved
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>{isAlreadySaved ? 'Saved in Library' : 'Save to Library'}</span>
          </button>

          {/* Download CSV */}
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV</span>
          </button>

          {/* Download JSON */}
          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-purple-700" />
            <span>Export JSON</span>
          </button>

          {/* Copy Full Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copiedMd
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
            }`}
          >
            {copiedMd ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied All Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Raw Markdown Output Preview */}
      <div className="relative">
        <textarea
          readOnly
          value={fullMarkdown}
          rows={16}
          className="w-full p-4 rounded-2xl bg-stone-900 font-mono text-xs text-stone-200 leading-relaxed border border-stone-800 select-all resize-y focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
          <span>Standardized Etsy Specialist Markdown layout (Step 1 to Step 6)</span>
          <span className="font-mono">{fullMarkdown.length} chars</span>
        </div>
      </div>

    </div>
  );
};
