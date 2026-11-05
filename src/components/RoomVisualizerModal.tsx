import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Download, Check, Sparkles, Layers } from 'lucide-react';

interface RoomVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallpaperImage?: string;
  wallpaperTitle: string;
}

type RoomType = 'nursery' | 'living' | 'bedroom' | 'powder';
type ScaleMode = 'repeat-small' | 'repeat-med' | 'repeat-large' | 'mural-cover';

export const RoomVisualizerModal: React.FC<RoomVisualizerModalProps> = ({
  isOpen,
  onClose,
  wallpaperImage,
  wallpaperTitle,
}) => {
  const [activeRoom, setActiveRoom] = useState<RoomType>('living');
  const [scaleMode, setScaleMode] = useState<ScaleMode>('repeat-med');
  const [brightness, setBrightness] = useState<number>(100);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getBackgroundSize = () => {
    switch (scaleMode) {
      case 'repeat-small':
        return '180px 180px';
      case 'repeat-med':
        return '320px 320px';
      case 'repeat-large':
        return '480px 480px';
      case 'mural-cover':
        return 'cover';
    }
  };

  const getBackgroundRepeat = () => {
    return scaleMode === 'mural-cover' ? 'no-repeat' : 'repeat';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                Room Mockup Simulator
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  Live Preview
                </span>
              </h3>
              <p className="text-xs text-stone-400 truncate max-w-md">
                Testing "{wallpaperTitle || 'Custom Wallpaper'}" in realistic interior settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-stone-950/60 border-b border-stone-800/80 text-xs">
          {/* Room Selector */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveRoom('living')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRoom === 'living'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              🛋️ Living Room
            </button>
            <button
              onClick={() => setActiveRoom('nursery')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRoom === 'nursery'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              🧸 Baby Nursery
            </button>
            <button
              onClick={() => setActiveRoom('powder')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRoom === 'powder'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              🪞 Powder Room
            </button>
            <button
              onClick={() => setActiveRoom('bedroom')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRoom === 'bedroom'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              🛏️ Master Bedroom
            </button>
          </div>

          {/* Scale Selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-medium">Scale:</span>
            <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => setScaleMode('repeat-small')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scaleMode === 'repeat-small' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Small Repeat
              </button>
              <button
                onClick={() => setScaleMode('repeat-med')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scaleMode === 'repeat-med' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setScaleMode('repeat-large')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scaleMode === 'repeat-large' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Large Scale
              </button>
              <button
                onClick={() => setScaleMode('mural-cover')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scaleMode === 'mural-cover' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Full Wall Mural
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Canvas Area */}
        <div className="relative flex-1 min-h-[460px] bg-stone-950 flex items-center justify-center overflow-hidden select-none">
          {/* Room Frame Container */}
          <div className="relative w-full h-[520px] max-w-4xl bg-stone-900 shadow-2xl overflow-hidden flex flex-col justify-end">
            
            {/* The Wallpaper Accent Wall Area */}
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                backgroundImage: wallpaperImage ? `url(${wallpaperImage})` : undefined,
                backgroundSize: getBackgroundSize(),
                backgroundRepeat: getBackgroundRepeat(),
                backgroundPosition: 'center 20%',
                filter: `brightness(${brightness}%)`,
              }}
            >
              {/* If no image provided */}
              {!wallpaperImage && (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-stone-800">
                  <p className="text-sm">Upload or select a wallpaper design to visualize here</p>
                </div>
              )}

              {/* Realistic Wall Lighting & Ambient Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45 pointer-events-none" />
              <div className="absolute inset-0 bg-radial from-amber-100/10 via-transparent to-black/35 pointer-events-none" />
            </div>

            {/* Room Architecture & Furniture Overlay based on activeRoom */}
            <div className="relative z-10 w-full pointer-events-none">
              
              {/* Top Crown Molding / Ceiling shadow */}
              <div className="absolute -top-[520px] left-0 right-0 h-6 bg-gradient-to-b from-stone-950/80 to-transparent" />

              {/* LIVING ROOM OVERLAY */}
              {activeRoom === 'living' && (
                <div className="relative w-full h-[320px] flex items-end justify-between px-10 pb-0">
                  {/* Hardwood Flooring & Baseboard */}
                  <div className="absolute -bottom-6 left-0 right-0 h-28 bg-gradient-to-r from-[#593d2b] via-[#6f4e37] to-[#593d2b] border-t-8 border-[#3c281a] shadow-inner" />
                  
                  {/* Plant on Left */}
                  <div className="relative z-20 mb-8 opacity-95 drop-shadow-2xl">
                    <svg width="140" height="240" viewBox="0 0 140 240" fill="none">
                      <ellipse cx="70" cy="225" rx="24" ry="12" fill="#D97706" opacity="0.9" />
                      <path d="M50,180 L55,225 L85,225 L90,180 Z" fill="#B45309" />
                      {/* Monstera leaves */}
                      <path d="M70,180 Q60,110 30,80 Q55,100 68,140" stroke="#166534" stroke-width="4" fill="none"/>
                      <path d="M70,180 Q85,90 120,60 Q105,95 72,145" stroke="#15803D" stroke-width="4" fill="none"/>
                      <ellipse cx="30" cy="80" rx="35" ry="25" fill="#14532D" transform="rotate(-30 30 80)"/>
                      <ellipse cx="120" cy="60" rx="32" ry="22" fill="#15803D" transform="rotate(25 120 60)"/>
                      <ellipse cx="70" cy="50" rx="36" ry="26" fill="#166534"/>
                    </svg>
                  </div>

                  {/* Modern Mid-Century Sofa in Center */}
                  <div className="relative z-20 flex-1 max-w-lg mx-auto mb-2 drop-shadow-2xl">
                    <div className="relative bg-gradient-to-b from-[#e6dfd5] to-[#c7bcb0] rounded-t-3xl pt-8 pb-5 px-6 border-t border-[#f4ede4] shadow-2xl">
                      {/* Back cushions */}
                      <div className="flex gap-2 mb-2">
                        <div className="flex-1 h-20 bg-[#d9cfc3] rounded-2xl shadow-inner border border-white/30" />
                        <div className="flex-1 h-20 bg-[#d9cfc3] rounded-2xl shadow-inner border border-white/30" />
                      </div>
                      {/* Seat cushions */}
                      <div className="h-14 bg-[#cdc2b4] rounded-xl shadow-md border-t border-white/40 flex items-center justify-around">
                        <div className="w-10 h-10 rounded-full bg-amber-600/70 shadow-sm" />
                        <div className="w-12 h-8 rounded-lg bg-emerald-800/80 shadow-sm transform -rotate-6" />
                      </div>
                      {/* Wooden legs */}
                      <div className="flex justify-between px-6 pt-1">
                        <div className="w-2.5 h-6 bg-[#4a3525] transform -rotate-12 rounded-b" />
                        <div className="w-2.5 h-6 bg-[#4a3525] transform rotate-12 rounded-b" />
                      </div>
                    </div>
                  </div>

                  {/* Brass floor lamp on right */}
                  <div className="relative z-20 mb-8 opacity-90 drop-shadow-2xl">
                    <svg width="90" height="290" viewBox="0 0 90 290" fill="none">
                      <line x1="45" y1="280" x2="45" y2="40" stroke="#C5A059" stroke-width="4" />
                      <ellipse cx="45" cy="280" rx="20" ry="6" fill="#A37B35" />
                      <path d="M25,40 L65,40 L58,15 L32,15 Z" fill="#D4AF37" />
                      <circle cx="45" cy="50" r="12" fill="#FEF08A" opacity="0.6" filter="blur(4px)" />
                    </svg>
                  </div>
                </div>
              )}

              {/* NURSERY OVERLAY */}
              {activeRoom === 'nursery' && (
                <div className="relative w-full h-[320px] flex items-end justify-between px-12 pb-0">
                  <div className="absolute -bottom-6 left-0 right-0 h-28 bg-[#f5efe6] border-t-8 border-[#e3d8c8]" />
                  {/* Wooden Crib */}
                  <div className="relative z-20 max-w-md mx-auto mb-4 drop-shadow-2xl">
                    <div className="w-96 bg-[#d4a373] p-3 rounded-2xl border-2 border-[#b58352] shadow-2xl">
                      {/* Crib Rails */}
                      <div className="flex justify-between h-28 bg-[#faedcd] px-2 py-1 rounded-lg border border-[#d4a373]">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div key={i} className="w-1.5 h-full bg-[#d4a373] rounded-full" />
                        ))}
                      </div>
                      {/* Mattress & Blanket */}
                      <div className="h-6 bg-white rounded-md mt-1 shadow-sm flex items-center px-4">
                        <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Organic Cotton</span>
                      </div>
                    </div>
                    {/* Crib Legs */}
                    <div className="flex justify-between px-6 pt-1">
                      <div className="w-3 h-8 bg-[#b58352] rounded-b" />
                      <div className="w-3 h-8 bg-[#b58352] rounded-b" />
                    </div>
                  </div>
                </div>
              )}

              {/* POWDER ROOM OVERLAY */}
              {activeRoom === 'powder' && (
                <div className="relative w-full h-[340px] flex items-end justify-center px-10 pb-0">
                  <div className="absolute -bottom-6 left-0 right-0 h-24 bg-stone-900 border-t-8 border-stone-800" />
                  
                  {/* Arched Brass Mirror on Wall */}
                  <div className="absolute top-[-160px] left-1/2 transform -translate-x-1/2 w-44 h-72 rounded-t-full border-4 border-[#d4af37] bg-white/20 backdrop-blur-xs shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full rounded-t-full bg-gradient-to-tr from-white/10 via-transparent to-white/40" />
                  </div>

                  {/* Floating Marble Vanity with Brass Faucet */}
                  <div className="relative z-20 w-80 mb-6 drop-shadow-2xl text-center">
                    {/* Faucet */}
                    <div className="mx-auto w-4 h-12 border-t-4 border-r-4 border-[#d4af37] rounded-tr-xl mb-1 transform translate-x-3" />
                    {/* Basin */}
                    <div className="w-40 h-8 mx-auto bg-stone-100 rounded-b-2xl shadow-inner border border-stone-300" />
                    {/* Marble Counter */}
                    <div className="w-full h-12 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 rounded-xl border border-stone-300 shadow-xl flex items-center justify-center">
                      <span className="text-[10px] text-stone-500 font-serif tracking-widest uppercase">Carrara Marble</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BEDROOM OVERLAY */}
              {activeRoom === 'bedroom' && (
                <div className="relative w-full h-[320px] flex items-end justify-center px-8 pb-0">
                  <div className="absolute -bottom-6 left-0 right-0 h-28 bg-[#523b2c] border-t-8 border-[#3b2a1f]" />
                  {/* Bed & Headboard */}
                  <div className="relative z-20 w-full max-w-xl mx-auto mb-2 drop-shadow-2xl">
                    {/* Padded Headboard */}
                    <div className="w-full h-36 bg-[#8a7968] rounded-t-3xl border-4 border-[#6e5f50] p-4 shadow-2xl flex gap-3">
                      <div className="flex-1 rounded-2xl bg-[#9d8c79] border border-white/20 shadow-inner" />
                      <div className="flex-1 rounded-2xl bg-[#9d8c79] border border-white/20 shadow-inner" />
                    </div>
                    {/* Pillows and Duvet */}
                    <div className="relative -mt-6 bg-[#f7f4ee] rounded-t-xl pt-4 pb-10 px-8 shadow-2xl border-t border-white">
                      <div className="flex justify-center gap-4 mb-2">
                        <div className="w-24 h-12 bg-stone-100 rounded-xl shadow-md border" />
                        <div className="w-24 h-12 bg-stone-100 rounded-xl shadow-md border" />
                      </div>
                      <div className="h-6 bg-[#e2dad0] rounded-md shadow-inner flex items-center justify-center">
                        <span className="text-[9px] text-stone-600 font-medium">Linen Throw Blanket</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Room Name Badge in corner */}
            <div className="absolute top-4 left-4 z-20 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-stone-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {activeRoom === 'living' && 'Modern Scandinavian Living Room'}
                {activeRoom === 'nursery' && 'Whimsical Baby Nursery'}
                {activeRoom === 'powder' && 'Artisan Luxury Powder Room'}
                {activeRoom === 'bedroom' && 'Master Suite Accent Wall'}
              </span>
            </div>

            {/* Scale badge in bottom right */}
            <div className="absolute top-4 right-4 z-20 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-stone-300">
              Scale: <strong className="text-amber-400 uppercase">{scaleMode.replace('repeat-', '')}</strong>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-800 bg-stone-900/90 text-xs text-stone-400">
          <div>
            Tip: Use this room mockup preview to visualize scale alignment before generating Midjourney prompts!
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded-xl transition-colors"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
