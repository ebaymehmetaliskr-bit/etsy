import React from 'react';
import { X, Trash2, ArrowRight, Layers, Calendar, ExternalLink } from 'lucide-react';
import { EtsyListingPackage } from '../types/wallpaper';

interface SavedListingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedListings: EtsyListingPackage[];
  onSelectListing: (listing: EtsyListingPackage) => void;
  onDeleteListing: (id: string) => void;
}

export const SavedListingsDrawer: React.FC<SavedListingsDrawerProps> = ({
  isOpen,
  onClose,
  savedListings,
  onSelectListing,
  onDeleteListing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-stone-100">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">
                Saved Etsy Listings
              </h3>
              <p className="text-xs text-stone-400">
                {savedListings.length} {savedListings.length === 1 ? 'package' : 'packages'} saved in local library
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listings List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedListings.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <Layers className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm font-semibold text-stone-400">No saved packages yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Generate a listing and click "Save to Library" to keep your wallpaper catalog organized.
              </p>
            </div>
          ) : (
            savedListings.map((listing) => (
              <div
                key={listing.id}
                className="group relative bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/50 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shrink-0">
                    {listing.imageThumbnail ? (
                      <img
                        src={listing.imageThumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600">
                        Pattern
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-100 truncate">
                      {listing.designName || 'Custom Wallpaper'}
                    </h4>
                    <p className="text-[11px] text-amber-400/90 truncate font-mono">
                      {listing.optimizedTitle.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-stone-400">
                      <span>{listing.tags.length} tags</span>
                      <span>•</span>
                      <span>{listing.visualDiagnosis.aestheticStyle.split('&')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-700/50">
                  <span className="text-[10px] text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteListing(listing.id)}
                      className="p-1 text-stone-500 hover:text-rose-400 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectListing(listing);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close Library
          </button>
        </div>

      </div>
    </div>
  );
};
