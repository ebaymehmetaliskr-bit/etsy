import React, { useState } from 'react';
import { DollarSign, Tag, Calculator, Check, Copy, ArrowRight, HelpCircle, TrendingUp } from 'lucide-react';
import { ListingAttributes } from '../types/wallpaper';

interface AttributesAndPricingViewProps {
  attributes: ListingAttributes;
}

export const AttributesAndPricingView: React.FC<AttributesAndPricingViewProps> = ({ attributes }) => {
  const [copiedCategory, setCopiedCategory] = useState(false);
  
  // Profit Calculator State
  const [calcRetailPrice, setCalcRetailPrice] = useState<number>(48);
  const [calcPrintCost, setCalcPrintCost] = useState<number>(14);
  const [calcShippingCharge, setCalcShippingCharge] = useState<number>(0);
  const [calcShippingCost, setCalcShippingCost] = useState<number>(6);
  const [calcUseAds, setCalcUseAds] = useState<boolean>(false);

  // Calculations based on Etsy 2026 seller fees:
  // Listing fee: $0.20
  // Transaction fee: 6.5% of total (item + shipping charged)
  // Payment processing: 3% + $0.25
  // Offsite/Onsite ads optional: 15%
  const totalCharged = calcRetailPrice + calcShippingCharge;
  const listingFee = 0.20;
  const transactionFee = totalCharged * 0.065;
  const paymentFee = totalCharged * 0.03 + 0.25;
  const adsFee = calcUseAds ? totalCharged * 0.15 : 0;
  const totalEtsyFees = listingFee + transactionFee + paymentFee + adsFee;
  const totalProductionCost = calcPrintCost + calcShippingCost;
  const netProfit = totalCharged - totalEtsyFees - totalProductionCost;
  const profitMarginPercent = totalCharged > 0 ? (netProfit / totalCharged) * 100 : 0;

  const copyCategory = () => {
    navigator.clipboard.writeText(attributes.etsyCategoryPath);
    setCopiedCategory(true);
    setTimeout(() => setCopiedCategory(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-7 space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-500/20">
            ⚙️
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Step 5: Category, Attributes & Pricing Strategy
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                Backend Etsy Fields
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Taxonomy path, search filter attributes, and sample conversion pricing model
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Attributes on Left, Pricing Model & Calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Etsy Backend Attributes */}
        <div className="space-y-4">
          
          {/* Category Recommendation */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                Recommended Etsy Category
              </span>
              <button
                onClick={copyCategory}
                className="text-xs text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1"
              >
                {copiedCategory ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Path
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-xs text-stone-800 font-medium">
              {attributes.etsyCategoryPath}
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
              Attributes to Select in Etsy Dashboard
            </span>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] text-stone-400 block font-semibold">Primary Color</span>
                <span className="font-bold text-stone-900">{attributes.primaryColor}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] text-stone-400 block font-semibold">Secondary Color</span>
                <span className="font-bold text-stone-900">{attributes.secondaryColor}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] text-stone-400 block font-semibold">Material</span>
                <span className="font-bold text-stone-900 truncate block">{attributes.materialAttribute}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] text-stone-400 block font-semibold">Pattern</span>
                <span className="font-bold text-stone-900">{attributes.patternAttribute}</span>
              </div>
            </div>

            {/* Room Attributes */}
            <div className="pt-1">
              <span className="text-[10px] text-stone-500 font-semibold block mb-1.5">
                Applicable Room Attributes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {attributes.roomAttributes.map((room, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-800"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Pricing Benchmarks */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Recommended Price Tiers
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200/50">
                <span className="text-stone-600 font-medium">Sample Swatch (8x10"):</span>
                <span className="font-bold text-stone-900">{attributes.suggestedPriceRange.samplePrice}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200/50">
                <span className="text-stone-600 font-medium">Standard Panel (24"x96"):</span>
                <span className="font-bold text-emerald-800">{attributes.suggestedPriceRange.panelPrice}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200/50">
                <span className="text-stone-600 font-medium">Full Wall Accent Kit:</span>
                <span className="font-bold text-stone-900">{attributes.suggestedPriceRange.largeMuralPrice}</span>
              </div>
            </div>

            <p className="text-[11px] text-amber-900/90 leading-relaxed italic bg-amber-100/50 p-2.5 rounded-xl border border-amber-200/60">
              💡 <strong>Strategy:</strong> {attributes.suggestedPriceRange.strategyNote}
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Etsy Wallpaper Profit Calculator */}
        <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold tracking-wider uppercase text-stone-200">
                Etsy Wallpaper Profit & Margin Calculator
              </span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              2026 Fee Schedule
            </span>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Panel Retail Price ($)
              </label>
              <input
                type="number"
                value={calcRetailPrice}
                onChange={(e) => setCalcRetailPrice(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Printing / Roll Cost ($)
              </label>
              <input
                type="number"
                value={calcPrintCost}
                onChange={(e) => setCalcPrintCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Shipping Charged ($)
              </label>
              <input
                type="number"
                value={calcShippingCharge}
                onChange={(e) => setCalcShippingCharge(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Actual Postage Cost ($)
              </label>
              <input
                type="number"
                value={calcShippingCost}
                onChange={(e) => setCalcShippingCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Toggle for Etsy Ads */}
          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={calcUseAds}
              onChange={(e) => setCalcUseAds(e.target.checked)}
              className="rounded accent-amber-500"
            />
            <span>Include Etsy Ads attribution fee (15%)</span>
          </label>

          {/* Fee Breakdown Summary */}
          <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Gross Customer Total:</span>
              <span className="font-mono text-stone-200">${totalCharged.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Est. Etsy Fees (Trans. 6.5% + Pay 3% + Listing):</span>
              <span className="font-mono text-rose-400">-${totalEtsyFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Production & Shipping Outlay:</span>
              <span className="font-mono text-rose-400">-${totalProductionCost.toFixed(2)}</span>
            </div>

            {/* Net Profit Big Callout */}
            <div className="border-t border-stone-800 pt-2 mt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Estimated Net Profit / Panel</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono">
                  ${netProfit.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block">Profit Margin</span>
                <span className={`text-base font-bold font-mono ${profitMarginPercent > 40 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {profitMarginPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
