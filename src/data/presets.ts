import { PresetWallpaper, EtsyListingPackage } from '../types/wallpaper';

// High-quality SVG data patterns for instant test wallpapers
const botanicalPeonySvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#3A4D39" />
      <stop offset="100%" stop-color="#233023" />
    </radialGradient>
    <radialGradient id="peony" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#EED3D9" />
      <stop offset="40%" stop-color="#D58BD7" />
      <stop offset="70%" stop-color="#9B4A77" />
      <stop offset="100%" stop-color="#55223E" />
    </radialGradient>
    <linearGradient id="leaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A3B899" />
      <stop offset="100%" stop-color="#5B7050" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#0E1710" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  
  <!-- Foliage background -->
  <g filter="url(#shadow)">
    <path d="M120,400 Q80,260 220,240 Q180,350 120,400 Z" fill="url(#leaf)" opacity="0.85"/>
    <path d="M450,150 Q360,80 320,220 Q410,210 450,150 Z" fill="url(#leaf)" opacity="0.85"/>
    <path d="M480,480 Q560,340 380,360 Q420,460 480,480 Z" fill="url(#leaf)" opacity="0.8"/>
    <path d="M50,180 Q10,70 160,110 Q110,180 50,180 Z" fill="url(#leaf)" opacity="0.75"/>
  </g>

  <!-- Giant Moody Vintage Peonies -->
  <g filter="url(#shadow)">
    <!-- Peony 1 Center -->
    <circle cx="280" cy="320" r="110" fill="url(#peony)" opacity="0.95"/>
    <!-- Petal layers -->
    <path d="M220,260 C240,210 320,220 340,270 C370,250 390,300 370,340 C390,380 340,420 300,410 C260,430 220,380 210,340 C180,310 200,270 220,260 Z" fill="#D58BD7" opacity="0.6"/>
    <circle cx="280" cy="320" r="65" fill="#B34B80" opacity="0.8"/>
    <circle cx="275" cy="315" r="40" fill="#E6A4B4" opacity="0.9"/>
    <circle cx="270" cy="310" r="22" fill="#FFF0F5" opacity="0.95"/>
    <circle cx="268" cy="308" r="10" fill="#FFEAA7"/>

    <!-- Peony 2 Top Right -->
    <circle cx="480" cy="180" r="85" fill="url(#peony)" opacity="0.9"/>
    <circle cx="475" cy="175" r="50" fill="#B34B80" opacity="0.75"/>
    <circle cx="470" cy="170" r="28" fill="#E6A4B4" opacity="0.85"/>
    <circle cx="468" cy="168" r="12" fill="#FFEAA7"/>

    <!-- Peony 3 Bottom Left -->
    <circle cx="110" cy="480" r="75" fill="url(#peony)" opacity="0.9"/>
    <circle cx="105" cy="475" r="45" fill="#B34B80" opacity="0.7"/>
    <circle cx="102" cy="470" r="22" fill="#E6A4B4" opacity="0.85"/>
  </g>

  <!-- Golden Stems and Floral accents -->
  <path d="M120,480 Q250,420 280,320 T480,180" stroke="#C5A059" stroke-width="3" fill="none" opacity="0.7"/>
  <circle cx="380" cy="270" r="6" fill="#C5A059"/>
  <circle cx="395" cy="255" r="4" fill="#C5A059"/>
  <circle cx="180" cy="360" r="5" fill="#C5A059"/>
</svg>
`)}`;

const woodlandNurserySvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="nurseryBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFBF7" />
      <stop offset="100%" stop-color="#EFE9DE" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#nurseryBg)"/>
  
  <!-- Pine trees watercolor -->
  <g opacity="0.85">
    <!-- Tree 1 -->
    <polygon points="120,380 90,440 150,440" fill="#6B8E7B" opacity="0.7"/>
    <polygon points="120,340 95,390 145,390" fill="#7C9D8B" opacity="0.8"/>
    <polygon points="120,300 100,350 140,350" fill="#8EA89A" opacity="0.9"/>
    <rect x="117" y="440" width="6" height="30" fill="#A4826B"/>

    <!-- Tree 2 -->
    <polygon points="460,400 420,470 500,470" fill="#587B68" opacity="0.7"/>
    <polygon points="460,350 430,410 490,410" fill="#6B8E7B" opacity="0.8"/>
    <polygon points="460,300 440,360 480,360" fill="#7C9D8B" opacity="0.9"/>
    <rect x="456" y="470" width="8" height="35" fill="#A4826B"/>

    <!-- Cute watercolor deer -->
    <ellipse cx="280" cy="380" rx="35" ry="25" fill="#D49A6A"/>
    <ellipse cx="280" cy="330" rx="20" ry="18" fill="#D49A6A"/>
    <circle cx="273" cy="328" r="3" fill="#3D291D"/>
    <!-- Spots -->
    <circle cx="295" cy="375" r="3" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="280" cy="385" r="2.5" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="268" cy="380" r="3" fill="#FFFFFF" opacity="0.9"/>
    <!-- Ears -->
    <ellipse cx="270" cy="312" rx="4" ry="10" transform="rotate(-20 270 312)" fill="#D49A6A"/>
    <ellipse cx="290" cy="312" rx="4" ry="10" transform="rotate(20 290 312)" fill="#D49A6A"/>
    <!-- Legs -->
    <rect x="260" y="400" width="5" height="45" rx="2" fill="#B87D4E"/>
    <rect x="272" y="400" width="5" height="42" rx="2" fill="#B87D4E"/>
    <rect x="290" y="400" width="5" height="45" rx="2" fill="#B87D4E"/>
    <rect x="300" y="400" width="5" height="42" rx="2" fill="#B87D4E"/>
  </g>

  <!-- Stars and gentle dots -->
  <g fill="#D5BE9E" opacity="0.6">
    <circle cx="100" cy="120" r="4"/>
    <circle cx="220" cy="80" r="3"/>
    <circle cx="340" cy="150" r="4"/>
    <circle cx="480" cy="100" r="3.5"/>
    <circle cx="530" cy="220" r="3"/>
    <circle cx="60" cy="280" r="3.5"/>
  </g>
</svg>
`)}`;

const japandiBambooSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="japandiBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EBE7DF" />
      <stop offset="100%" stop-color="#DDD7CB" />
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D78A76" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#D78A76" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#japandiBg)"/>
  
  <!-- Subtle minimalist warm sun -->
  <circle cx="420" cy="220" r="140" fill="url(#sun)"/>

  <!-- Bamboo stalks minimalist ink wash -->
  <g stroke="#3D453D" stroke-linecap="round" opacity="0.8">
    <!-- Bamboo 1 -->
    <line x1="180" y1="580" x2="180" y2="440" stroke-width="12"/>
    <circle cx="180" cy="440" r="8" fill="#3D453D"/>
    <line x1="180" y1="435" x2="180" y2="280" stroke-width="10"/>
    <circle cx="180" cy="280" r="7" fill="#3D453D"/>
    <line x1="180" y1="275" x2="180" y2="100" stroke-width="8"/>
    <!-- Bamboo leaves 1 -->
    <path d="M180,440 Q130,410 90,430 Q140,435 180,440 Z" fill="#4B564C" stroke="none"/>
    <path d="M180,280 Q240,250 280,270 Q230,275 180,280 Z" fill="#4B564C" stroke="none"/>
    <path d="M180,275 Q210,230 250,225 Q210,250 180,275 Z" fill="#4B564C" stroke="none"/>

    <!-- Bamboo 2 -->
    <line x1="260" y1="600" x2="260" y2="380" stroke-width="14" opacity="0.9"/>
    <circle cx="260" cy="380" r="9" fill="#3D453D"/>
    <line x1="260" y1="375" x2="260" y2="160" stroke-width="11" opacity="0.9"/>
    <circle cx="260" cy="160" r="8" fill="#3D453D"/>
    <line x1="260" y1="155" x2="260" y2="20" stroke-width="9" opacity="0.9"/>
    <!-- Leaves 2 -->
    <path d="M260,380 Q320,350 360,370 Q310,380 260,380 Z" fill="#3D453D" stroke="none"/>
    <path d="M260,160 Q190,120 140,140 Q200,150 260,160 Z" fill="#3D453D" stroke="none"/>
  </g>
</svg>
`)}`;

const terracottaBohoSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#F4EFEA"/>
  
  <!-- Terracotta Arch -->
  <path d="M180,600 L180,300 A120,120 0 0 1 420,300 L420,600 Z" fill="#C96846" opacity="0.9"/>
  <!-- Inner Arch -->
  <path d="M220,600 L220,320 A80,80 0 0 1 380,320 L380,600 Z" fill="#F4EFEA"/>
  
  <!-- Mid-century Abstract Moon and Sun -->
  <circle cx="300" cy="220" r="70" fill="#DDA15E"/>
  <circle cx="480" cy="140" r="50" fill="#606C38" opacity="0.8"/>
  
  <!-- Modern line foliage -->
  <g stroke="#283618" stroke-width="4" stroke-linecap="round" fill="none">
    <path d="M300,560 Q300,420 300,340"/>
    <path d="M300,460 C260,440 260,400 300,410"/>
    <path d="M300,440 C340,420 340,380 300,390"/>
    <path d="M300,400 C270,380 270,350 300,360"/>
    <path d="M300,370 C330,350 330,320 300,330"/>
  </g>
</svg>
`)}`;

export const PRESET_WALLPAPERS: PresetWallpaper[] = [
  {
    id: 'vintage-botanical-peony',
    title: 'Vintage Moody Botanical Peony',
    niche: 'Vintage / Cottagecore Floral',
    targetRoom: 'Powder Room & Bedroom Accent Wall',
    material: 'Peel and Stick & Traditional Unpasted',
    thumbnail: botanicalPeonySvg,
    description: 'Dramatic dark botanical mural featuring lush blooming peonies, wild eucalyptus foliage, and deep forest green backdrop with golden undertones.',
    precomputed: {
      id: 'pre-vintage-peony',
      createdAt: '2026-11-04T12:00:00Z',
      designName: 'Vintage Moody Botanical Peony',
      imageThumbnail: botanicalPeonySvg,
      visualDiagnosis: {
        aestheticStyle: 'Moody Dark Academia & Vintage Victorian Cottagecore',
        patternElements: 'Lush blooming heirloom peonies, deep forest foliage, sprawling eucalyptus leaves, oil painting brushwork',
        colorPalette: [
          { name: 'Forest Evergreen', hex: '#233023' },
          { name: 'Dusty Antique Rose', hex: '#D58BD7' },
          { name: 'Muted Sage', hex: '#A3B899' },
          { name: 'Vintage Brass Ochre', hex: '#C5A059' }
        ],
        targetSpace: 'Powder Room, Master Bedroom Accent Wall, Dining Room',
        targetAudience: 'Homeowners seeking maximalist luxury, renters looking for removable statement wallpaper, boutique decorators',
        designVibe: 'Romantic, dramatic, and richly textured heritage floral atmosphere.'
      },
      optimizedTitle: {
        title: 'Moody Botanical Peel and Stick Wallpaper, Dark Floral Wall Mural, Vintage Peony Cottagecore Removable Accent Decor',
        charCount: 119,
        mobilePreview: 'Moody Botanical Peel and Stick Wallpaper, Dark',
        searchIntentsCovered: [
          'Moody Botanical / Dark Floral',
          'Peel and Stick Wallpaper',
          'Vintage Peony Cottagecore',
          'Removable Accent Wall Mural'
        ]
      },
      tags: [
        { tag: 'peel and stick', category: 'Functional & Material', charCount: 14, searchVolumeTier: 'Very High' },
        { tag: 'removable wallpaper', category: 'Functional & Material', charCount: 19, searchVolumeTier: 'Very High' },
        { tag: 'self adhesive decal', category: 'Functional & Material', charCount: 19, searchVolumeTier: 'High' },
        { tag: 'wall mural sticker', category: 'Functional & Material', charCount: 18, searchVolumeTier: 'High' },
        { tag: 'vintage wallpaper', category: 'Style & Aesthetic', charCount: 17, searchVolumeTier: 'Very High' },
        { tag: 'cottagecore decor', category: 'Style & Aesthetic', charCount: 17, searchVolumeTier: 'High' },
        { tag: 'dark academia art', category: 'Style & Aesthetic', charCount: 17, searchVolumeTier: 'High' },
        { tag: 'botanical wallpaper', category: 'Pattern & Subject', charCount: 19, searchVolumeTier: 'Very High' },
        { tag: 'floral wall mural', category: 'Pattern & Subject', charCount: 17, searchVolumeTier: 'High' },
        { tag: 'peony wall decor', category: 'Pattern & Subject', charCount: 16, searchVolumeTier: 'High' },
        { tag: 'powder room mural', category: 'Room & Target', charCount: 17, searchVolumeTier: 'High' },
        { tag: 'bedroom accent wall', category: 'Room & Target', charCount: 19, searchVolumeTier: 'Very High' },
        { tag: 'living room mural', category: 'Room & Target', charCount: 17, searchVolumeTier: 'High' }
      ],
      description: {
        hook: `Transform any room into an opulent heritage sanctuary with our Moody Botanical Peony Wallpaper. Featuring lush heirloom roses and peonies blooming out of an emerald-tinged midnight backdrop, this piece delivers instantaneous drama and timeless romantic warmth.

Whether you are crafting an unforgettable powder room jewel box or styling a serene master bedroom accent wall, this mural turns flat drywall into a museum-worthy art installation.`,
        materialOptions: `We offer two premium wallpaper finishes to suit your renovation goals:

1. Smooth Peel & Stick (Self-Adhesive):
- Premium woven polyester/vinyl substrate with a clean matte finish.
- Removable, repositionable, and 100% renter-friendly.
- Leaves zero sticky residue or surface damage upon gentle removal.

2. Traditional Non-Woven Unpasted:
- Heavyweight luxury non-woven wallpaper substrate.
- Installed using standard wallpaper adhesive paste.
- Perfect for permanent residential renovations and high-humidity rooms.`,
        sizingPanelGuide: `Available in seamless vertical panels designed for effortless pattern alignment:
- Panel Width: 24 inches (61 cm) standard width.
- Panel Heights: 96" (8 ft), 108" (9 ft), and 120" (10 ft).
- Includes 0.5-inch precision overlap on all adjacent edges for invisible seams during DIY installation.
- Custom Wall Heights & Widths: Need custom dimensions for an awkward nook or sloped ceiling? Message us for a custom scaled mock-up!`,
        ecoFriendlyHealth: `- Printed with UL GreenGuard Gold Certified, water-based latex inks.
- 100% non-toxic, odorless, VOC-free, and PVC-free options available.
- Safe for bedrooms, nursery environments, healthcare, and sensitive living spaces.`,
        applicationRules: `- Suitable for smooth, clean, dust-free drywall or flat surfaces.
- Freshly painted walls MUST cure for at least 3 to 4 weeks before wallpaper installation.
- Not recommended for heavily textured, popcorn, or freshly primed unpainted surfaces.`,
        customOrderCta: `Not sure about color matching with your vanity or bedding? We strongly encourage ordering a sample panel first to inspect texture, lighting interactions, and adhesive quality in your own space!`,
        fullText: `Transform any room into an opulent heritage sanctuary with our Moody Botanical Peony Wallpaper. Featuring lush heirloom roses and peonies blooming out of an emerald-tinged midnight backdrop, this piece delivers instantaneous drama and timeless romantic warmth.

🌿 MATERIAL OPTIONS
1. Smooth Peel & Stick (Self-Adhesive):
- 100% removable, repositionable, and renter-friendly
- Matte woven finish with zero glare
- No paste, no water, no mess: simply peel backing and smooth onto wall

2. Traditional Non-Woven Unpasted:
- Heavyweight archival wallpaper feel
- Requires standard wallpaper paste
- Highly durable and resistant to long-term wear

📐 SIZING & PANEL GUIDE
- Standard Panel Width: 24" (61 cm)
- Height Options: 96" (8 ft), 108" (9 ft), 120" (10 ft)
- Designed with 0.5" precision edge overlap for seamless DIY pattern match
- Custom sizes available upon request!

🌱 ECO-FRIENDLY & FAMILY SAFE
- UL GreenGuard Gold Certified non-toxic inks
- Odorless, VOC-free, and child-safe
- Hypoallergenic and fire-rated

💡 APPLICATION & INSTALLATION TIPS
- Best on smooth, dry, flat interior walls
- If your wall was recently painted, allow 3-4 weeks cure time
- Wipe wall with isopropyl alcohol/water blend before installation

📦 SAMPLES & CUSTOM ORDERS
Color representation can vary across screens. Order a sample sheet first to see the rich tones and premium texture in your home's natural light!`
      },
      listingAttributes: {
        etsyCategoryPath: 'Home & Living > Home Decor > Wall Decor > Wallpaper',
        primaryColor: 'Dark Green',
        secondaryColor: 'Pink',
        roomAttributes: ['Powder room', 'Bedroom', 'Living room', 'Dining room'],
        materialAttribute: 'Peel and stick self-adhesive / Non-woven unpasted',
        patternAttribute: 'Floral & Botanical',
        suggestedPriceRange: {
          samplePrice: '$8.50 - $12.00 (8x10" Swatch)',
          panelPrice: '$42.00 - $68.00 (per 24" x 96" panel)',
          largeMuralPrice: '$210.00 - $340.00 (Full 12ft Wall Kit)',
          strategyNote: 'Keep sample price under $10 with free shipping to generate high-converting first-touch buyers that convert to $250+ full-room orders.'
        }
      },
      geoLocalization: {
        targetMarket: 'USA National & East Coast Grandmillennial',
        spellingConvention: 'US',
        unitStandards: '24" x 96" (61cm x 244cm)',
        regionalKeywords: ['Powder Room', 'Half Bath', 'Renter Friendly', 'Nursery Accent Wall', 'Coastal Grandma'],
        regionalAestheticFit: 'Exceptional fit for East Coast traditional, historic brownstones, and suburban powder rooms seeking moody heritage drama.',
        architecturalCompatibility: 'Colonial, Victorian brownstones, Craftsman bungalows, and modern apartment feature walls.'
      },
      pinterestPackage: {
        top5PinterestKeywords: [
          'dark floral powder room aesthetic',
          'vintage botanical bedroom wallpaper',
          'moody green peel and stick wallpaper',
          'peony wall mural makeover',
          'renter friendly bathroom wallpaper'
        ],
        targetBoards: [
          'Powder Room Makeovers',
          'Dark Academia Bedroom Aesthetic',
          'Renter Friendly Home Inspo'
        ],
        pinOverlayTextIdeas: [
          'Renter-Friendly Powder Room Transformation',
          'The Viral Dark Floral Wallpaper'
        ],
        visualFramingStrategy: 'Shoot vertical 2:3 ratio in natural warm morning sunlight. Angle slightly from doorway to show wallpaper spanning ceiling-to-vanity alongside warm glowing brass sconces.',
        pinCallToAction: 'Tap to shop this removable vintage floral wallpaper on Etsy! ✨'
      },
      marketingAndMockups: {
        leadImages: [
          {
            slot: 'Image 1 (Hero Lifestyle)',
            concept: 'Moody powder room setting with warm brass wall sconces, arched gold mirror, and dark vanity highlighting the peony scale.',
            whyItConverts: 'Instant emotional aspiration; buyers visualize their own powder room transformation within 2 seconds.'
          },
          {
            slot: 'Image 2 (Macro Detail & Texture)',
            concept: 'Close-up 45-degree angle showing matte woven substrate texture and crisp pigment lines on the floral petals.',
            whyItConverts: 'Eliminates fears of cheap glossy plastic stickers and showcases artisanal print quality.'
          },
          {
            slot: 'Image 3 (Installation & Panels Infographic)',
            concept: 'Clean split graphic showing peel & stick backing being peeled by hand alongside roll dimensions.',
            whyItConverts: 'Overcomes DIY intimidation and reassures renters that removal will not damage drywall.'
          }
        ],
        midjourneyPrompt: '/imagine prompt: modern luxury powder room interior featuring a dark moody floral wallpaper accent wall with giant blush peonies and emerald leaves, brass vintage mirror, marble sink, soft warm architectural lighting, photorealistic, architectural digest photography, 8k resolution --ar 4:3 --v 6.1',
        socialHook: 'Can you believe this powder room glow up was done in under 2 hours with peel and stick wallpaper? ✨ Tap the link to shop our Moody Peony Mural! #peelandstick #wallpaperdecor #roommakeover #darkacademia #etsyfinds'
      },
      formattedMarkdownOutput: `🎯 Step 1: Visual & Style Diagnosis
Aesthetic / Style: Moody Dark Academia & Vintage Victorian Cottagecore
Pattern / Elements: Lush blooming heirloom peonies, deep forest foliage, sprawling eucalyptus leaves
Color Palette: Forest Evergreen (#233023), Dusty Antique Rose (#D58BD7), Muted Sage (#A3B899), Vintage Brass Ochre (#C5A059)
Target Space: Powder Room, Master Bedroom Accent Wall, Dining Room

📝 Step 2: Optimized Etsy Title
Moody Botanical Peel and Stick Wallpaper, Dark Floral Wall Mural, Vintage Peony Cottagecore Removable Accent Decor

(Character Count: 119 / 140)

🏷️ Step 3: 13 Tag Matrix (Max 20 Chars Each)
peel and stick (14 chars) - Functional
removable wallpaper (19 chars) - Functional
self adhesive decal (19 chars) - Functional
wall mural sticker (18 chars) - Functional
vintage wallpaper (17 chars) - Style
cottagecore decor (17 chars) - Style
dark academia art (17 chars) - Style
botanical wallpaper (19 chars) - Pattern
floral wall mural (17 chars) - Pattern
peony wall decor (16 chars) - Pattern
powder room mural (17 chars) - Room
bedroom accent wall (19 chars) - Room
living room mural (17 chars) - Room

📄 Step 4: Product Description (US/Imperial Units Default)
Transform any room into an opulent heritage sanctuary with our Moody Botanical Peony Wallpaper. Featuring lush heirloom roses and peonies blooming out of an emerald-tinged midnight backdrop, this piece delivers instantaneous drama and timeless romantic warmth.

🌿 MATERIAL OPTIONS
1. Smooth Peel & Stick (Self-Adhesive):
- 100% removable, repositionable, and renter-friendly
- Matte woven finish with zero glare

2. Traditional Non-Woven Unpasted:
- Heavyweight archival wallpaper feel
- Requires standard wallpaper paste

📐 SIZING & PANEL GUIDE
- Standard Panel Width: 24" (61 cm)
- Height Options: 96" (244 cm), 108" (274 cm), 120" (305 cm)
- Includes 0.5" precision edge overlap

🌱 ECO-FRIENDLY & FAMILY SAFE
- UL GreenGuard Gold Certified non-toxic inks
- Odorless, VOC-free, child-safe

⚙️ Step 5: Listing Attributes & Pricing
Etsy Category: Home & Living > Home Decor > Wall Decor > Wallpaper
Attributes: Color: Dark Green & Pink, Room: Powder room, Material: Peel & Stick / Unpasted
Suggested Price Range: Sample: $8.50-$12.00 | Panel: $42-$68 | Full Wall: $210-$340

🌎 Step 6: Etsy GEO & Localization Breakdown
Target US Region/Demographic: US National & East Coast Grandmillennial
High-Converting Regional Keywords: Powder Room, Half Bath, Renter Friendly, Nursery Accent Wall
Unit Standards: Inches primary (24" x 96" / 61cm x 244cm)

📌 Step 7: Pinterest Trends & Visual Virality Package
Top 5 Pinterest Search Terms:
1. dark floral powder room aesthetic
2. vintage botanical bedroom wallpaper
3. moody green peel and stick wallpaper
4. peony wall mural makeover
5. renter friendly bathroom wallpaper

Target Pinterest Boards:
1. Powder Room Makeovers
2. Dark Academia Bedroom Aesthetic
3. Renter Friendly Home Inspo

Pin Graphic Text Overlays:
1. "Renter-Friendly Powder Room Transformation"
2. "The Viral Dark Floral Wallpaper"

Visual Framing Strategy:
Shoot vertical 2:3 ratio in natural warm morning sunlight. Angle slightly from doorway to show wallpaper spanning ceiling-to-vanity alongside warm glowing brass sconces.

🖼️ Step 8: Visual Marketing & AI Mockup Prompt
Lead Image Order:
1. Hero powder room with brass mirror & warm sconces
2. Macro texture close-up on petal pigment
3. Step-by-step panel installation infographic

Midjourney Mockup Prompt:
/imagine prompt: modern luxury powder room interior featuring a dark moody floral wallpaper accent wall with giant blush peonies and emerald leaves, brass vintage mirror, marble sink, soft warm architectural lighting, photorealistic, architectural digest photography, 8k resolution --ar 4:3 --v 6.1`
    }
  },
  {
    id: 'cute-woodland-nursery',
    title: 'Cute Woodland Forest Animals',
    niche: 'Nursery / Kids Watercolor',
    targetRoom: 'Baby Nursery & Toddler Playroom',
    material: 'Peel and Stick Removable',
    thumbnail: woodlandNurserySvg,
    description: 'Gentle hand-painted watercolor baby deer, pine trees, and soft neutral starry accents on warm cream backdrop. Perfect for gender-neutral nurseries.',
    precomputed: undefined
  },
  {
    id: 'japandi-bamboo-mural',
    title: 'Japandi Minimalist Bamboo Mist',
    niche: 'Japandi / Zen Minimalist',
    targetRoom: 'Living Room & Home Office',
    material: 'Smooth Peel & Stick or Canvas',
    thumbnail: japandiBambooSvg,
    description: 'Serene Japanese ink wash bamboo stalks with foggy morning sun gradient in warm greige and earthy taupe tones.',
    precomputed: undefined
  },
  {
    id: 'terracotta-abstract-boho',
    title: 'Terracotta Minimalist Arch & Sun',
    niche: 'Boho Modern Abstract',
    targetRoom: 'Living Room & Entryway',
    material: 'Textured Peel & Stick',
    thumbnail: terracottaBohoSvg,
    description: 'Warm Southwestern boho geometric arches, earthy clay tones, mid-century sun curves, and botanical contour lines.',
    precomputed: undefined
  }
];
