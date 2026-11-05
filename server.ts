import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json({ limit: '35mb' }));
  app.use(express.urlencoded({ extended: true, limit: '35mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Post-processing helper to guarantee strict Etsy tag constraints
  function sanitizeTags(rawTags: Array<{ tag: string; category?: string; searchVolumeTier?: string }>) {
    const fallbackFunctional = ['peel and stick', 'removable wall art', 'self adhesive decal', 'wall mural sticker'];
    const fallbackStyle = ['vintage wallpaper', 'boho home decor', 'japandi aesthetic'];
    const fallbackPattern = ['botanical wallpaper', 'floral wall mural', 'nature wall paper'];
    const fallbackRoom = ['nursery wallpaper', 'bedroom accent wall', 'living room mural'];

    const seen = new Set<string>();
    const cleaned: Array<{ tag: string; category: string; charCount: number; searchVolumeTier: string }> = [];

    const categorySlots = [
      'Functional & Material',
      'Functional & Material',
      'Functional & Material',
      'Functional & Material',
      'Style & Aesthetic',
      'Style & Aesthetic',
      'Style & Aesthetic',
      'Pattern & Subject',
      'Pattern & Subject',
      'Pattern & Subject',
      'Room & Target',
      'Room & Target',
      'Room & Target'
    ];

    for (let i = 0; i < (rawTags || []).length; i++) {
      let t = (rawTags[i].tag || '').toLowerCase().trim().replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      if (t.length > 20) {
        // Trim to 20 or closest word boundary
        t = t.substring(0, 20).trim();
      }
      if (t.length > 1 && !seen.has(t)) {
        seen.add(t);
        const cat = rawTags[i].category || categorySlots[cleaned.length] || 'Functional & Material';
        cleaned.push({
          tag: t,
          category: cat,
          charCount: t.length,
          searchVolumeTier: rawTags[i].searchVolumeTier || 'High'
        });
      }
      if (cleaned.length === 13) break;
    }

    // If less than 13, fill from fallbacks
    const pool = [...fallbackFunctional, ...fallbackStyle, ...fallbackPattern, ...fallbackRoom];
    let poolIdx = 0;
    while (cleaned.length < 13 && poolIdx < pool.length) {
      const candidate = pool[poolIdx++];
      if (!seen.has(candidate)) {
        seen.add(candidate);
        const cat = categorySlots[cleaned.length] || 'Functional & Material';
        cleaned.push({
          tag: candidate,
          category: cat,
          charCount: candidate.length,
          searchVolumeTier: 'High'
        });
      }
    }

    return cleaned.slice(0, 13);
  }

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString()
    });
  });

  // API Wallpaper SEO Generation
  app.post('/api/analyze-wallpaper', async (req, res) => {
    try {
      const {
        image,           // base64 data url or base64 string
        concept,         // text description
        materialType,    // e.g. "Peel and Stick", "Traditional Unpasted"
        targetRoom,      // e.g. "Nursery", "Living Room"
        shopName,        // optional custom shop name
        nicheFocus,      // optional niche (Botanical, Japandi, Cottagecore, etc.)
        targetMarket     // 'USA' | 'UK' | 'Canada' | 'Australia'
      } = req.body;

      if (!image && !concept) {
        return res.status(400).json({ error: 'Please provide either an image of the wallpaper or a design concept description.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in the environment. Please configure it in Settings > Secrets.'
        });
      }

      const isUkTarget = targetMarket === 'UK' || (concept && concept.toLowerCase().includes('uk'));

      const systemPrompt = `You are the world-class Etsy Wallpaper E-Commerce Strategist & SEO Specialist.
Your mission is to perform end-to-end (A to Z) visual diagnosis, 2026 Etsy SEO optimization, GEO localization targeting, Pinterest visual virality strategy, and listing package generation for Etsy wallpaper and wall mural stores.

DATA-DRIVEN KNOWLEDGE BASE:
1. Search Intent Stacking: Combine 3-4 distinct search intents (Style + Pattern + Material/Type + Room/Use Case + Color/Feature) without keyword stuffing.
2. Mobile-First Optimization: The first 40-50 characters of the title are critical! They must immediately communicate style, subject, and product type (Peel and Stick Wallpaper or Wall Mural).
3. Exact 13 Tag Matrix: Exactly 13 tags. EVERY TAG MUST BE <= 20 CHARACTERS (including spaces). No tag can exceed 20 characters!
   Distribution:
   - 4x Functional & Material (e.g. "peel and stick", "removable wallpaper", "self adhesive decal")
   - 3x Style & Aesthetic (e.g. "vintage wallpaper", "cottagecore decor", "japandi wallpaper")
   - 3x Pattern & Subject (e.g. "woodland wallpaper", "botanical wall art", "floral wall mural")
   - 3x Room & Target (e.g. "nursery wallpaper", "accent wall mural", "powder room decor" or "feature wall decal")
4. Standard Product Details:
   - Materials: Smooth Peel & Stick (Self-Adhesive woven or vinyl) vs Traditional Unpasted (requires paste)
   - Eco-Friendly: GreenGuard Gold certified, non-toxic water-based inks, VOC-free, child-safe
   - Panels: Standard 19"-24" or 25" width panels with custom height options (96", 108", 120" etc.) and 0.5" overlap guide

ADDITIONAL MODULE A: ETSY GEO (LOCATION-BASED TARGETING & LOCALIZATION)
- Measurement & Spelling Conventions:
  * Always prioritize Imperial System units (Inches, Feet) for primary specifications, followed by Metric (cm, m) in parentheses (e.g., 24" x 96" / 61cm x 244cm).
  * Use US English spelling defaults ('Color', 'Modeling', 'Personalized') unless UK market targeting is explicitly requested ('Colour', 'Personalised').
- Market-Specific Style & Room Terminology:
  * USA Market Keywords: 'Renter Friendly', 'Powder Room', 'Half Bath', 'Mudroom', 'Nursery Accent Wall', 'Midwest Farmhouse', 'Coastal Grandma'.
  * UK/EU Market Keywords: 'Feature Wall', 'Cloakroom', 'En-Suite', 'Victorian Terrace', 'Cottagecore'.
- Regional Aesthetic Preferences:
  * US West Coast/California: Japandi, Organic Modern, Boho Neutral, Light Sage, Terracotta.
  * US East Coast/Southern: Traditional Floral, Chinoiserie, Grandmillennial, Coastal Blue, William Morris.
  * US Midwest/Suburbs: Farmhouse Stripe, Rustic Woodland, Neutral Nursery, Warm Beige.
  * UK/European: Victorian Heritage, Arts & Crafts, English Country Garden, Moody Floral.

ADDITIONAL MODULE B: PINTEREST TRENDS & VISUAL VIRALITY STRATEGY
Pinterest serves as the primary visual search engine driving Etsy wallpaper decisions:
1. Pinterest Trend Keyword Extraction: Extract top 5 high-converting Pinterest search terms based on visual features (e.g., 'sage green nursery wall decor', 'dark floral bedroom aesthetic', 'peel and stick powder room ideas').
2. Pinterest Pin Strategy & Visual Framing: Recommend optimal Pin presentation angles (e.g., 'In-situ full wall shot with natural sunlight', 'Close-up macro texture shot', 'Before/After room makeover transformation').
3. Viral Board & Moodboard Positioning: Identify top 3 Pinterest Board categories where this design is most likely to be saved (e.g., 'Dream Home Makeovers', 'Gender Neutral Nursery Ideas', 'Small Bathroom Remodel').
4. Pinterest Rich Pin & Overlay Text Prompts: Provide 2 conversion-focused text overlay suggestions for Pinterest Graphics (e.g., 'Renter-Friendly Bathroom Transformation', 'The Viral Nursery Wallpaper').

Language: All titles, tags, descriptions, attributes, and prompts MUST ALWAYS BE IN ENGLISH for maximum international reach on Etsy.`;

      const userPromptParts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (image) {
        let mimeType = 'image/jpeg';
        let base64Data = image;

        if (image.includes(';base64,')) {
          const match = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
          if (match) {
            mimeType = match[1];
            base64Data = image.replace(/^data:[a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+;base64,/, '');
          }
        }

        userPromptParts.push({
          inlineData: {
            mimeType,
            data: base64Data
          }
        });
      }

      const userTextInstructions = `Analyze this wallpaper design and produce the full Etsy listing package with GEO and Pinterest Trend modules.
Store Name: ${shopName || 'Boutique Wall Art Co.'}
Target Geographic Market: ${targetMarket || (isUkTarget ? 'UK (United Kingdom & Europe)' : 'USA (North America)')}
Preferred Material: ${materialType || 'Smooth Peel & Stick and Traditional Unpasted'}
Target Room Preference: ${targetRoom || (isUkTarget ? 'Feature Wall, Cloakroom & Bedroom' : 'Powder Room, Nursery & Bedroom Accent Wall')}
Niche Focus: ${nicheFocus || 'Auto-detect from visual elements'}
Design Concept / Notes: ${concept || 'Analyze the visual design provided in the image.'}

Return a valid JSON object matching the requested schema with all 8 comprehensive steps.`;

      userPromptParts.push({
        text: userTextInstructions
      });

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          visualDiagnosis: {
            type: Type.OBJECT,
            properties: {
              aestheticStyle: { type: Type.STRING, description: "e.g. Moody Dark Academia, Vintage Cottagecore, Minimalist Japandi, Botanical Art Nouveau" },
              patternElements: { type: Type.STRING, description: "Detailed list of visual motifs, e.g. lush blooming peonies, winding eucalyptus, soft watercolor brushwork" },
              colorPalette: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Color name like 'Sage Green' or 'Dusty Terracotta'" },
                    hex: { type: Type.STRING, description: "Hex code like '#8A9A86'" }
                  },
                  required: ["name", "hex"]
                },
                description: "3 to 5 dominant colors with hex codes"
              },
              targetSpace: { type: Type.STRING, description: "Ideal rooms e.g. Nursery Accent Wall, Powder Room, Master Bedroom, Cozy Reading Nook" },
              targetAudience: { type: Type.STRING, description: "Target buyer persona, e.g. New parents, renters seeking removable luxury, boutique interior designers" },
              designVibe: { type: Type.STRING, description: "Evocative 1-sentence mood description" }
            },
            required: ["aestheticStyle", "patternElements", "colorPalette", "targetSpace", "targetAudience", "designVibe"]
          },
          optimizedTitle: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Etsy SEO 2026 title strictly between 120 and 140 characters, using | or , separators. Mobile-first 45 chars." },
              mobilePreview: { type: Type.STRING, description: "First 45 characters that show in mobile search feed" },
              searchIntentsCovered: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 to 4 distinct search intent pillars combined in this title"
              }
            },
            required: ["title", "mobilePreview", "searchIntentsCovered"]
          },
          tags: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tag: { type: Type.STRING, description: "Etsy tag, MUST BE STRICTLY UNDER OR EQUAL TO 20 CHARACTERS including spaces" },
                category: { type: Type.STRING, description: "Functional & Material, Style & Aesthetic, Pattern & Subject, or Room & Target" },
                searchVolumeTier: { type: Type.STRING, description: "Very High, High, or Niche Gem" }
              },
              required: ["tag", "category"]
            },
            description: "Exactly 13 tags adhering to the 4:3:3:3 distribution, each under 20 chars"
          },
          description: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING, description: "Engaging 2-paragraph hook connecting the wallpaper to transformative room vibes" },
              materialOptions: { type: Type.STRING, description: "Detailed breakdown of Peel & Stick (removable, self-adhesive) vs Traditional Unpasted" },
              sizingPanelGuide: { type: Type.STRING, description: "Explanation of panel widths in Imperial inches primary with Metric in parentheses, height options, measurement instructions, safety margins" },
              ecoFriendlyHealth: { type: Type.STRING, description: "GreenGuard Gold inks, child-safe, non-toxic, odorless, VOC-free" },
              applicationRules: { type: Type.STRING, description: "Smooth clean wall rules, paint cure times, not recommended for textured walls" },
              customOrderCta: { type: Type.STRING, description: "Order samples first advice, custom wall sizing request call-to-action" },
              fullText: { type: Type.STRING, description: "Complete, ready-to-paste Etsy product description formatted with clear headers and bullet points" }
            },
            required: ["hook", "materialOptions", "sizingPanelGuide", "ecoFriendlyHealth", "applicationRules", "customOrderCta", "fullText"]
          },
          listingAttributes: {
            type: Type.OBJECT,
            properties: {
              etsyCategoryPath: { type: Type.STRING, description: "Home & Living > Home Decor > Wall Decor > Wallpaper" },
              primaryColor: { type: Type.STRING },
              secondaryColor: { type: Type.STRING },
              roomAttributes: { type: Type.ARRAY, items: { type: Type.STRING } },
              materialAttribute: { type: Type.STRING },
              patternAttribute: { type: Type.STRING },
              suggestedPriceRange: {
                type: Type.OBJECT,
                properties: {
                  samplePrice: { type: Type.STRING, description: "e.g. $8.00 - $12.00 (Sample 8x10\" or 9x12\")" },
                  panelPrice: { type: Type.STRING, description: "e.g. $38.00 - $68.00 per standard roll/panel (24\" x 96\")" },
                  largeMuralPrice: { type: Type.STRING, description: "e.g. $180.00 - $320.00 (Full accent wall kit)" },
                  strategyNote: { type: Type.STRING, description: "Why offering low-barrier sample listings boosts conversion & reduces return rate" }
                },
                required: ["samplePrice", "panelPrice", "largeMuralPrice", "strategyNote"]
              }
            },
            required: ["etsyCategoryPath", "primaryColor", "secondaryColor", "roomAttributes", "materialAttribute", "patternAttribute", "suggestedPriceRange"]
          },
          geoLocalization: {
            type: Type.OBJECT,
            properties: {
              targetMarket: { type: Type.STRING, description: "e.g. 'US West Coast & National' or 'UK & European Heritage'" },
              spellingConvention: { type: Type.STRING, description: "'US' (Color, Modeling) or 'UK' (Colour, Modelling)" },
              unitStandards: { type: Type.STRING, description: "e.g. '24\" x 96\" (61cm x 244cm)' with Imperial primary" },
              regionalKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "e.g. ['Powder Room', 'Half Bath', 'Renter Friendly', 'Nursery Accent Wall'] or ['Feature Wall', 'Cloakroom', 'Victorian Terrace']"
              },
              regionalAestheticFit: { type: Type.STRING, description: "Why this design fits regional buyer preferences (e.g. California Organic Modern, East Coast Grandmillennial)" },
              architecturalCompatibility: { type: Type.STRING, description: "Compatible home architecture styles (e.g. Modern apartments, Victorian brownstones, Craftsman bungalows)" }
            },
            required: ["targetMarket", "spellingConvention", "unitStandards", "regionalKeywords", "regionalAestheticFit", "architecturalCompatibility"]
          },
          pinterestPackage: {
            type: Type.OBJECT,
            properties: {
              top5PinterestKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Top 5 high-converting Pinterest visual search terms"
              },
              targetBoards: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Top 3 Pinterest Board categories where users save this design"
              },
              pinOverlayTextIdeas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2 high-CTR text overlay hook suggestions for Pinterest pin graphics"
              },
              visualFramingStrategy: { type: Type.STRING, description: "Specific camera framing and daylight styling advice for viral pins" },
              pinCallToAction: { type: Type.STRING, description: "Conversion CTA for the Pin description" }
            },
            required: ["top5PinterestKeywords", "targetBoards", "pinOverlayTextIdeas", "visualFramingStrategy", "pinCallToAction"]
          },
          marketingAndMockups: {
            type: Type.OBJECT,
            properties: {
              leadImages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slot: { type: Type.STRING, description: "e.g. Image 1 (Hero), Image 2 (Detail), Image 3 (Scale/Material)" },
                    concept: { type: Type.STRING, description: "Visual direction for this photo" },
                    whyItConverts: { type: Type.STRING, description: "Psychological reason this photo converts browsing visitors" }
                  },
                  required: ["slot", "concept", "whyItConverts"]
                }
              },
              midjourneyPrompt: { type: Type.STRING, description: "Hyper-realistic Midjourney v6/v7 or AI room mockup generation prompt" },
              socialHook: { type: Type.STRING, description: "Engaging Pinterest and Instagram Reel caption with high-volume hashtags" }
            },
            required: ["leadImages", "midjourneyPrompt", "socialHook"]
          },
          formattedMarkdownOutput: {
            type: Type.STRING,
            description: "The complete structured output in standard Etsy Specialist markdown format with emojis (Step 1 to Step 8)"
          }
        },
        required: [
          "visualDiagnosis",
          "optimizedTitle",
          "tags",
          "description",
          "listingAttributes",
          "geoLocalization",
          "pinterestPackage",
          "marketingAndMockups",
          "formattedMarkdownOutput"
        ]
      };

      const generateWithRetry = async () => {
        const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
        let lastError: any = null;

        for (const modelName of modelsToTry) {
          for (let attempt = 1; attempt <= 2; attempt++) {
            try {
              const res = await ai.models.generateContent({
                model: modelName,
                contents: {
                  parts: userPromptParts
                },
                config: {
                  systemInstruction: systemPrompt,
                  responseMimeType: 'application/json',
                  responseSchema: responseSchema
                }
              });
              if (res.text) {
                return res;
              }
            } catch (err: any) {
              lastError = err;
              console.warn(`Attempt ${attempt} on ${modelName} failed:`, err?.message || err);
              // Wait 1.5s before retry
              await new Promise((r) => setTimeout(r, 1500));
            }
          }
        }
        throw lastError;
      };

      const response = await generateWithRetry();

      const rawJson = (response.text || '{}').trim();
      let parsedData;
      try {
        parsedData = JSON.parse(rawJson);
      } catch (err) {
        console.error('Failed to parse Gemini JSON output:', rawJson);
        return res.status(500).json({ error: 'Failed to parse AI response. Please retry.' });
      }

      // Strict tag sanitization to guarantee <= 20 chars per tag and exactly 13 tags
      parsedData.tags = sanitizeTags(parsedData.tags || []);

      // Ensure title length is tracked accurately
      if (parsedData.optimizedTitle) {
        parsedData.optimizedTitle.charCount = parsedData.optimizedTitle.title ? parsedData.optimizedTitle.title.length : 0;
      }

      res.json({
        success: true,
        data: parsedData
      });
    } catch (error: any) {
      console.error('Error in /api/analyze-wallpaper:', error);
      res.status(500).json({
        error: error.message || 'An unexpected error occurred while analyzing the wallpaper.'
      });
    }
  });

  // Setup Vite dev server or serve static build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Etsy Wallpaper Strategist Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
