import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Wand2, X, RefreshCw, SlidersHorizontal, ArrowRight, CheckCircle2, Globe2, Pin } from 'lucide-react';
import { PRESET_WALLPAPERS } from '../data/presets';
import { PresetWallpaper } from '../types/wallpaper';

interface DesignInputPanelProps {
  onAnalyze: (params: {
    image?: string;
    concept: string;
    materialType: string;
    targetRoom: string;
    shopName: string;
    nicheFocus: string;
    targetMarket: string;
  }) => void;
  onSelectPreset: (preset: PresetWallpaper) => void;
  isLoading: boolean;
  language: 'en' | 'tr';
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  conceptText: string;
  setConceptText: (val: string) => void;
}

export const DesignInputPanel: React.FC<DesignInputPanelProps> = ({
  onAnalyze,
  onSelectPreset,
  isLoading,
  language,
  selectedImage,
  setSelectedImage,
  conceptText,
  setConceptText,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [materialType, setMaterialType] = useState('Smooth Peel & Stick and Traditional Unpasted');
  const [targetRoom, setTargetRoom] = useState('Powder Room, Nursery & Bedroom Accent Wall');
  const [shopName, setShopName] = useState('Boutique Wall Art Co.');
  const [nicheFocus, setNicheFocus] = useState('Vintage / Botanical / Cottagecore');
  const [targetMarket, setTargetMarket] = useState<'USA' | 'UK' | 'Canada' | 'Australia'>('USA');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      uploadTitle: 'Upload Wallpaper Image or Design Pattern',
      uploadSubtitle: 'Drop PNG, JPG or WEBP (Max 25MB). High-res pattern or room mockup.',
      orPreset: 'Or select a top-trending Etsy wallpaper niche to test instantly:',
      promptPlaceholder: 'Describe the design elements, intended style, color preferences or custom notes (optional if image is uploaded)...',
      primaryBtn: 'Generate Complete 8-Step Etsy Package',
      turkishPromptSub: 'Bu tasarım için GEO ve Pinterest Trend odaklı tam Etsy paketini oluştur.',
      ukShortcut: 'Generate UK (United Kingdom) Market Package',
      advancedToggle: 'Listing Preferences & Store Branding',
      marketLabel: 'Target Market & GEO Terminology',
      shopNameLabel: 'Etsy Store Name',
      materialLabel: 'Default Material Offering',
      targetRoomLabel: 'Primary Room Focus',
      nicheLabel: 'Niche Focus',
      removeImg: 'Remove Image',
      analyzingText: 'Gemini is running visual diagnosis, GEO localization, and Pinterest virality matrix...',
    },
    tr: {
      uploadTitle: 'Duvar Kağıdı Görseli veya Tasarım Desenini Yükleyin',
      uploadSubtitle: 'PNG, JPG veya WEBP sürükleyin. Yüksek çözünürlüklü desen veya mockup.',
      orPreset: 'Veya anında test etmek için trend bir duvar kağıdı nişi seçin:',
      promptPlaceholder: 'Desen öğelerini, hedeflenen stili, renk tercihlerini veya özel notları yazın (görsel yüklüyse opsiyonel)...',
      primaryBtn: 'GEO & Pinterest Odaklı Tam Etsy Paketini Oluştur',
      turkishPromptSub: 'Bu tasarım için GEO ve Pinterest Trend odaklı tam Etsy paketini oluştur.',
      ukShortcut: 'UK (İngiltere) Pazar Odaklı Paket Oluştur',
      advancedToggle: 'Listeleme Tercihleri & Mağaza Bilgileri',
      marketLabel: 'Hedef Pazar & GEO Terminoloji',
      shopNameLabel: 'Etsy Mağaza Adı',
      materialLabel: 'Varsayılan Malzeme Seçenekleri',
      targetRoomLabel: 'Öncelikli Oda / Kullanım Alanı',
      nicheLabel: 'Niş Odak',
      removeImg: 'Görseli Kaldır',
      analyzingText: 'Gemini görsel analizi, GEO lokasyonu ve Pinterest trend matrisini hazırlıyor...',
    }
  }[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent, forceMarket?: 'USA' | 'UK') => {
    e.preventDefault();
    if (!selectedImage && !conceptText.trim()) {
      alert(language === 'tr' ? 'Lütfen bir görsel yükleyin veya konsept açıklaması girin.' : 'Please upload an image or enter a design concept.');
      return;
    }

    const market = forceMarket || targetMarket;
    const room = market === 'UK' ? 'Feature Wall, Cloakroom & Master Bedroom' : targetRoom;

    onAnalyze({
      image: selectedImage || undefined,
      concept: conceptText.trim(),
      materialType,
      targetRoom: room,
      shopName,
      nicheFocus,
      targetMarket: market,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-200/50 p-6 sm:p-8 transition-all">
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        
        {/* Top Header & Presets */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <label className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {t.orPreset}
            </label>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRESET_WALLPAPERS.map((preset) => {
              const isSelected = selectedImage === preset.thumbnail;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`group relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-md'
                      : 'border-stone-200 bg-stone-50/70 hover:border-stone-300 hover:bg-stone-50 hover:shadow-xs'
                  }`}
                >
                  {/* Pattern Preview Square */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2.5 border border-stone-200/60 shadow-xs bg-stone-100">
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-stone-900 truncate w-full group-hover:text-amber-700">
                    {preset.title}
                  </span>
                  <span className="text-[11px] text-stone-500 truncate w-full">
                    {preset.niche}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Zone / Active Preview */}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {selectedImage ? (
            /* Selected Image Card */
            <div className="relative rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-stone-300/80 shadow-md bg-white shrink-0">
                <img
                  src={selectedImage}
                  alt="Selected wallpaper preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                    Design Loaded
                  </span>
                  <span className="text-xs text-stone-500">Ready for GEO & Pinterest analysis</span>
                </div>
                <h4 className="text-sm font-semibold text-stone-800">
                  Wallpaper Image Attached
                </h4>
                <p className="text-xs text-stone-500">
                  Gemini will analyze colors, micro motifs, room fit, US/UK terminology, and 5 viral Pinterest search keywords.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="text-xs font-semibold px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    {t.removeImg}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Dropzone Empty State */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/60 scale-[0.99]'
                  : 'border-stone-300 hover:border-amber-500/70 hover:bg-stone-50/60'
              }`}
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-3 shadow-inner">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-stone-800 mb-1">
                {t.uploadTitle}
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {t.uploadSubtitle}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Click to browse files or paste from clipboard</span>
              </div>
            </div>
          )}
        </div>

        {/* Text Input / Concept Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
            Design Notes & Concept Specification (Optional)
          </label>
          <textarea
            value={conceptText}
            onChange={(e) => setConceptText(e.target.value)}
            rows={2}
            placeholder={t.promptPlaceholder}
            className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Target Market GEO Selector Pills */}
        <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-sky-600" />
              Target Geographic Market (GEO Localization)
            </span>
            <span className="text-[11px] text-sky-700 font-semibold">
              {targetMarket === 'USA' ? 'Imperial Inches • Powder Room' : 'Metric/Imp • Feature Wall • Cloakroom'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setTargetMarket('USA')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                targetMarket === 'USA'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : 'bg-white text-stone-700 border-sky-200/70 hover:border-sky-300'
              }`}
            >
              <span>🇺🇸 USA (National)</span>
              {targetMarket === 'USA' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setTargetMarket('UK')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                targetMarket === 'UK'
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-white text-stone-700 border-sky-200/70 hover:border-indigo-300'
              }`}
            >
              <span>🇬🇧 UK (Britain/EU)</span>
              {targetMarket === 'UK' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setTargetMarket('Canada')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                targetMarket === 'Canada'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : 'bg-white text-stone-700 border-sky-200/70 hover:border-sky-300'
              }`}
            >
              <span>🇨🇦 Canada</span>
              {targetMarket === 'Canada' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setTargetMarket('Australia')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                targetMarket === 'Australia'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : 'bg-white text-stone-700 border-sky-200/70 hover:border-sky-300'
              }`}
            >
              <span>🇦🇺 Australia</span>
              {targetMarket === 'Australia' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Advanced Settings Accordion */}
        <div className="border-t border-stone-200/80 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.advancedToggle}</span>
            <span className="text-[10px] text-stone-400 font-normal">
              ({showAdvanced ? 'Click to hide' : 'Material, Store Name & Room tuning'})
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs animate-in fade-in duration-150">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t.shopNameLabel}
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. BohoWallAesthetic"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t.materialLabel}
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Smooth Peel & Stick and Traditional Unpasted">Peel & Stick (Self-Adhesive) + Unpasted Non-Woven</option>
                  <option value="Textured Canvas Peel and Stick">Textured Canvas Peel & Stick Only</option>
                  <option value="Traditional Non-Woven Unpasted">Traditional Paste-the-Wall Unpasted Only</option>
                  <option value="Pre-pasted Water-Activated Wallpaper">Pre-pasted Water-Activated Wallpaper</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t.targetRoomLabel}
                </label>
                <input
                  type="text"
                  value={targetRoom}
                  onChange={(e) => setTargetRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. Nursery, Powder Room, Master Bedroom"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t.nicheLabel}
                </label>
                <input
                  type="text"
                  value={nicheFocus}
                  onChange={(e) => setNicheFocus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. Botanical Floral, Japandi, Dark Academia"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Primary + Quick UK Toggle Shortcut */}
        <div className="space-y-2.5">
          <button
            type="submit"
            disabled={isLoading || (!selectedImage && !conceptText.trim())}
            className={`w-full relative overflow-hidden group flex flex-col items-center justify-center py-4 px-6 rounded-2xl font-black text-stone-950 transition-all shadow-xl ${
              isLoading || (!selectedImage && !conceptText.trim())
                ? 'bg-stone-300 cursor-not-allowed text-stone-500 shadow-none'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            <div className="flex items-center gap-2.5 text-base sm:text-lg tracking-tight">
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-stone-900" />
                  <span>Analyzing & Generating 8-Step GEO Package...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-stone-950 group-hover:rotate-12 transition-transform" />
                  <span>{t.primaryBtn}</span>
                  <ArrowRight className="w-5 h-5 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>

            {/* Subtitle with the Turkish command quoted in prompt */}
            {!isLoading && (
              <span className="text-[11px] font-medium text-stone-800/80 mt-0.5">
                "{t.turkishPromptSub}"
              </span>
            )}
          </button>

          {/* Quick UK Targeting Shortcut Button */}
          {!isLoading && (
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'UK')}
              className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>🇬🇧 {t.ukShortcut}</span>
              <span className="text-[10px] text-indigo-600 font-normal">
                ("Bu tasarım için UK (İngiltere) pazar odaklı GEO ve Pinterest paketini oluştur.")
              </span>
            </button>
          )}

          {isLoading && (
            <div className="mt-3 text-center">
              <p className="text-xs text-stone-500 font-medium animate-pulse flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {t.analyzingText}
              </p>
            </div>
          )}
        </div>

      </form>
    </div>
  );
};
