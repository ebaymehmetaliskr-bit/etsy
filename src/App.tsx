import React, { useState } from 'react';
import { Header } from './components/Header';
import { DesignInputPanel } from './components/DesignInputPanel';
import { DiagnosisView } from './components/DiagnosisView';
import { TitleOptimizerView } from './components/TitleOptimizerView';
import { TagMatrixView } from './components/TagMatrixView';
import { DescriptionView } from './components/DescriptionView';
import { AttributesAndPricingView } from './components/AttributesAndPricingView';
import { GeoLocalizationView } from './components/GeoLocalizationView';
import { PinterestViralityView } from './components/PinterestViralityView';
import { MarketingMockupView } from './components/MarketingMockupView';
import { ListingPackageExport } from './components/ListingPackageExport';
import { RoomVisualizerModal } from './components/RoomVisualizerModal';
import { SavedListingsDrawer } from './components/SavedListingsDrawer';
import { PRESET_WALLPAPERS } from './data/presets';
import { EtsyListingPackage, PresetWallpaper } from './types/wallpaper';
import { Eye, Sparkles, Globe2, Pin } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'tr'>('en');
  const [selectedImage, setSelectedImage] = useState<string | null>(PRESET_WALLPAPERS[0].thumbnail);
  const [conceptText, setConceptText] = useState<string>('');
  const [activePackage, setActivePackage] = useState<EtsyListingPackage | null>(
    PRESET_WALLPAPERS[0].precomputed || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals & Drawers
  const [isRoomVisualizerOpen, setIsRoomVisualizerOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Saved Listings in LocalStorage
  const [savedListings, setSavedListings] = useState<EtsyListingPackage[]>(() => {
    try {
      const stored = localStorage.getItem('etsy_wallpaper_saved_listings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Active step filter for scrolling or focusing
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleSaveToLibrary = () => {
    if (!activePackage) return;
    const exists = savedListings.some((l) => l.id === activePackage.id);
    let updated;
    if (exists) {
      updated = savedListings.map((l) => (l.id === activePackage.id ? activePackage : l));
    } else {
      updated = [activePackage, ...savedListings];
    }
    setSavedListings(updated);
    try {
      localStorage.setItem('etsy_wallpaper_saved_listings', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  };

  const handleDeleteListing = (id: string) => {
    const updated = savedListings.filter((l) => l.id !== id);
    setSavedListings(updated);
    try {
      localStorage.setItem('etsy_wallpaper_saved_listings', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to delete from local storage', e);
    }
  };

  const handleSelectPreset = (preset: PresetWallpaper) => {
    setSelectedImage(preset.thumbnail);
    setConceptText(preset.description);
    if (preset.precomputed) {
      setActivePackage(preset.precomputed);
      setErrorMsg(null);
    } else {
      // Run analysis automatically for fresh presets
      handleAnalyze({
        image: preset.thumbnail,
        concept: preset.description,
        materialType: preset.material,
        targetRoom: preset.targetRoom,
        shopName: 'Boutique Wall Art Co.',
        nicheFocus: preset.niche,
        targetMarket: 'USA',
      });
    }
  };

  const handleAnalyze = async (params: {
    image?: string;
    concept: string;
    materialType: string;
    targetRoom: string;
    shopName: string;
    nicheFocus: string;
    targetMarket?: string;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/analyze-wallpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to analyze wallpaper.');
      }

      const generated = json.data;
      const newPackage: EtsyListingPackage = {
        id: 'pkg-' + Date.now(),
        createdAt: new Date().toISOString(),
        designName: params.nicheFocus || 'Wallpaper Design',
        imageThumbnail: params.image || selectedImage || undefined,
        visualDiagnosis: generated.visualDiagnosis,
        optimizedTitle: generated.optimizedTitle,
        tags: generated.tags,
        description: generated.description,
        listingAttributes: generated.listingAttributes,
        geoLocalization: generated.geoLocalization || {
          targetMarket: params.targetMarket || 'USA National',
          spellingConvention: params.targetMarket === 'UK' ? 'UK' : 'US',
          unitStandards: '24" x 96" (61cm x 244cm)',
          regionalKeywords: ['Powder Room', 'Half Bath', 'Renter Friendly'],
          regionalAestheticFit: 'Modern residential aesthetic fit',
          architecturalCompatibility: 'Apartments, bungalows and family homes'
        },
        pinterestPackage: generated.pinterestPackage || {
          top5PinterestKeywords: ['wallpaper aesthetic', 'peel and stick wallpaper', 'accent wall decor', 'room makeover ideas', 'home transformation'],
          targetBoards: ['Home Decor Inspo', 'Room Makeover', 'Wallpaper Ideas'],
          pinOverlayTextIdeas: ['Renter Friendly Wallpaper Glow Up', 'The Viral Accent Wall'],
          visualFramingStrategy: 'Shoot vertical 2:3 ratio in natural morning daylight.',
          pinCallToAction: 'Tap to shop on Etsy!'
        },
        marketingAndMockups: generated.marketingAndMockups,
        formattedMarkdownOutput: generated.formattedMarkdownOutput,
      };

      setActivePackage(newPackage);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while contacting Gemini AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const isAlreadySaved = activePackage
    ? savedListings.some((l) => l.id === activePackage.id)
    : false;

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-24 font-sans">
      {/* Top Navigation */}
      <Header
        savedCount={savedListings.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenPresets={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Intro Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-100 p-8 sm:p-10 shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Etsy Wallpaper E-Commerce Strategist & SEO Specialist</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-400/20 text-sky-300 border border-sky-400/30">
                <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Etsy GEO Targeting</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-400/20 text-rose-300 border border-rose-400/30">
                <Pin className="w-3.5 h-3.5 text-rose-400" />
                <span>Pinterest Trends & Virality</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-sans">
              End-to-End A-to-Z Etsy Wallpaper Listing Creator
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Upload your wallpaper pattern or room mockup. Our system analyzes visual motifs, crafts an algorithm-tuned 120–140 character title, generates 13 strict ≤20-char tags, writes high-converting product copy, optimizes for US/UK GEO terminology, extracts 5 viral Pinterest search keywords, and builds photorealistic AI mockup prompts.
            </p>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Design Input & File Upload Panel */}
        <DesignInputPanel
          onAnalyze={handleAnalyze}
          onSelectPreset={handleSelectPreset}
          isLoading={isLoading}
          language={language}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          conceptText={conceptText}
          setConceptText={setConceptText}
        />

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs font-bold underline ml-4 hover:text-rose-950"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Active Generated Package Output */}
        {activePackage && (
          <div className="space-y-6 pt-2">
            
            {/* Step Navigation Pill Bar */}
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md p-2 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'all'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  All 8 Steps
                </button>
                <button
                  onClick={() => setActiveTab('diagnosis')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'diagnosis'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🎯 1. Diagnosis
                </button>
                <button
                  onClick={() => setActiveTab('title')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'title'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📝 2. Title
                </button>
                <button
                  onClick={() => setActiveTab('tags')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'tags'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🏷️ 3. 13 Tags
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'description'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📄 4. Description
                </button>
                <button
                  onClick={() => setActiveTab('attributes')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'attributes'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  ⚙️ 5. Attributes
                </button>
                <button
                  onClick={() => setActiveTab('geo')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'geo'
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🌎 6. Etsy GEO
                </button>
                <button
                  onClick={() => setActiveTab('pinterest')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'pinterest'
                      ? 'bg-rose-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📌 7. Pinterest Trends
                </button>
                <button
                  onClick={() => setActiveTab('mockup')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'mockup'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  🖼️ 8. AI Mockups
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === 'export'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  📦 Export
                </button>
              </div>

              {/* Room Visualizer Trigger */}
              <button
                onClick={() => setIsRoomVisualizerOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold hover:shadow-md transition-all shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Simulate on Wall</span>
              </button>
            </div>

            {/* Step 1: Visual & Style Diagnosis */}
            {(activeTab === 'all' || activeTab === 'diagnosis') && (
              <DiagnosisView
                diagnosis={activePackage.visualDiagnosis}
                onOpenVisualizer={() => setIsRoomVisualizerOpen(true)}
              />
            )}

            {/* Step 2: Optimized Etsy Title */}
            {(activeTab === 'all' || activeTab === 'title') && (
              <TitleOptimizerView
                initialTitle={activePackage.optimizedTitle}
                thumbnailUrl={activePackage.imageThumbnail || selectedImage || undefined}
                onTitleChange={(updatedTitle) => {
                  setActivePackage({
                    ...activePackage,
                    optimizedTitle: {
                      ...activePackage.optimizedTitle,
                      title: updatedTitle,
                      charCount: updatedTitle.length,
                    },
                  });
                }}
              />
            )}

            {/* Step 3: 13 Tag Matrix */}
            {(activeTab === 'all' || activeTab === 'tags') && (
              <TagMatrixView
                initialTags={activePackage.tags}
                onTagsChange={(updatedTags) => {
                  setActivePackage({
                    ...activePackage,
                    tags: updatedTags,
                  });
                }}
              />
            )}

            {/* Step 4: High-Converting Description */}
            {(activeTab === 'all' || activeTab === 'description') && (
              <DescriptionView description={activePackage.description} />
            )}

            {/* Step 5: Attributes & Pricing Strategy */}
            {(activeTab === 'all' || activeTab === 'attributes') && (
              <AttributesAndPricingView attributes={activePackage.listingAttributes} />
            )}

            {/* Step 6: Etsy GEO & Localization Breakdown */}
            {(activeTab === 'all' || activeTab === 'geo') && activePackage.geoLocalization && (
              <GeoLocalizationView geo={activePackage.geoLocalization} />
            )}

            {/* Step 7: Pinterest Trends & Visual Virality Package */}
            {(activeTab === 'all' || activeTab === 'pinterest') && activePackage.pinterestPackage && (
              <PinterestViralityView
                pinterest={activePackage.pinterestPackage}
                wallpaperThumbnail={selectedImage || activePackage.imageThumbnail}
                designTitle={activePackage.designName}
              />
            )}

            {/* Step 8: Visual Marketing & AI Mockup Prompts */}
            {(activeTab === 'all' || activeTab === 'mockup') && (
              <MarketingMockupView
                marketing={activePackage.marketingAndMockups}
                onOpenVisualizer={() => setIsRoomVisualizerOpen(true)}
                designName={activePackage.designName}
              />
            )}

            {/* Step 9 / Export: Export Markdown, CSV & JSON */}
            {(activeTab === 'all' || activeTab === 'export') && (
              <ListingPackageExport
                packageData={activePackage}
                onSaveToLibrary={handleSaveToLibrary}
                isAlreadySaved={isAlreadySaved}
              />
            )}
          </div>
        )}
      </main>

      {/* Room Mockup Visualizer Modal */}
      <RoomVisualizerModal
        isOpen={isRoomVisualizerOpen}
        onClose={() => setIsRoomVisualizerOpen(false)}
        wallpaperImage={selectedImage || activePackage?.imageThumbnail}
        wallpaperTitle={activePackage?.designName || 'Custom Wallpaper'}
      />

      {/* Saved Listings Drawer */}
      <SavedListingsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedListings={savedListings}
        onSelectListing={(listing) => {
          setActivePackage(listing);
          if (listing.imageThumbnail) {
            setSelectedImage(listing.imageThumbnail);
          }
        }}
        onDeleteListing={handleDeleteListing}
      />
    </div>
  );
}
