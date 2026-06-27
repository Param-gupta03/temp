import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

async function fetchGeminiLCA(name: string, category: string, description: string, materialUsed: string, weight: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("No Gemini API key configured");
  }

  // UPDATED PROMPT: Explicitly asking the AI to identify the standard market equivalent
  const prompt = `You are a professional environmental engineer specialized in Lifecycle Assessment (LCA) and carbon footprint calculation.
The user is providing an eco-friendly product. 
First, identify the standard, conventional market alternative for this product (e.g., if the user provides a "Bamboo Toothbrush", the conventional alternative is a "Plastic Toothbrush").
Then, calculate realistic estimated lifecycle carbon footprints (from raw materials to disposal) in kg CO2e for BOTH products based on their typical materials and weights.

User's Eco-friendly Product details:
- Name: ${name}
- Category: ${category}
- Description: ${description}
- Material Used: ${materialUsed}
- Weight: ${weight}

Please provide a JSON response STRICTLY in the following format:
{
  "ecoProductName": "${name}",
  "normalProductName": "Name of the conventional alternative (e.g., Plastic Toothbrush)",
  "normalProductMaterial": "Primary material of the conventional alternative (e.g., Polypropylene plastic)",
  "ecoProductFootprint": 1.2,
  "normalProductFootprint": 5.8,
  "reductionAmount": 4.6,
  "reductionPercentage": 79.3,
  "stages": {
    "manufacturing": {
      "eco": 0.5,
      "normal": 3.0
    },
    "transportation": {
      "eco": 0.2,
      "normal": 0.8
    },
    "usage": {
      "eco": 0.1,
      "normal": 0.4
    },
    "disposal": {
      "eco": 0.4,
      "normal": 1.6
    }
  },
  "explanation": "A short, engaging paragraph summarizing why the user's specific eco-materials reduce carbon emissions compared to the specific conventional material you identified."
}

Ensure the response is STRICTLY a valid JSON object matching the schema above. Do not wrap the JSON in markdown code blocks (like \`\`\`json) or add any preamble/postamble.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${errorText}`);
  }

  const result = await response.json();
  const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!jsonText) {
    throw new Error("Empty response from Gemini API");
  }

  return JSON.parse(jsonText.trim());
}

// UPDATED FALLBACK: Adjusted to match the new JSON schema in case the API fails
function estimateLCA(name: string, category: string, description: string, materialUsed: string, weightStr: string) {
  let weight = 0.5; // default 0.5 kg
  const numMatch = weightStr.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) {
    const parsedNum = parseFloat(numMatch[1]);
    if (weightStr.toLowerCase().includes('g') && !weightStr.toLowerCase().includes('k')) {
      weight = parsedNum / 1000;
    } else {
      weight = parsedNum;
    }
  }
  weight = Math.max(0.01, Math.min(50, weight));

  let matEcoCoeff = 1.2;
  
  // Standard market alternative is usually plastic, steel, or standard synthetic textiles
  const standardMarketCoeff = 6.5; 
  let normalMaterialName = "Standard Plastic/Synthetic";

  const material = (materialUsed + " " + name + " " + description).toLowerCase();
  
  if (material.includes('bamboo') || material.includes('cork') || material.includes('jute')) {
    matEcoCoeff = 0.35;
    normalMaterialName = "Standard Plastic";
  } else if (material.includes('cotton') || material.includes('linen') || material.includes('fabric')) {
    matEcoCoeff = 0.75;
    normalMaterialName = "Synthetic Polyester";
  } else if (material.includes('glass')) {
    matEcoCoeff = 0.85;
    normalMaterialName = "Single-use Plastic";
  } else if (material.includes('wood') || material.includes('wooden')) {
    matEcoCoeff = 0.45;
    normalMaterialName = "Standard Plastic/Metal mix";
  } else if (material.includes('paper') || material.includes('cardboard')) {
    matEcoCoeff = 0.28;
    normalMaterialName = "Plastic Packaging";
  }

  const ecoBase = weight * matEcoCoeff;
  const normalBase = weight * standardMarketCoeff;

  const ecoMfg = Number((ecoBase * 0.45).toFixed(2));
  const ecoTrn = Number((ecoBase * 0.20).toFixed(2));
  const ecoUsg = Number((ecoBase * 0.10).toFixed(2));
  const ecoDsp = Number((ecoBase * 0.25).toFixed(2));
  const ecoTotal = Number((ecoMfg + ecoTrn + ecoUsg + ecoDsp).toFixed(2));

  const normalMfg = Number((normalBase * 0.55).toFixed(2));
  const normalTrn = Number((normalBase * 0.18).toFixed(2));
  const normalUsg = Number((normalBase * 0.08).toFixed(2));
  const normalDsp = Number((normalBase * 0.19).toFixed(2));
  const normalTotal = Number((normalMfg + normalTrn + normalUsg + normalDsp).toFixed(2));

  const reduction = Number((normalTotal - ecoTotal).toFixed(2));
  const reductionPct = Number(((reduction / normalTotal) * 100).toFixed(1));

  const explanation = `By substituting carbon-intensive standard market materials like ${normalMaterialName} with sustainably sourced ${materialUsed || 'natural materials'}, this product cuts raw material extraction and manufacturing emissions significantly.`;

  return {
    ecoProductName: name,
    normalProductName: `Conventional ${category || 'Alternative'}`,
    normalProductMaterial: normalMaterialName,
    ecoProductFootprint: ecoTotal,
    normalProductFootprint: normalTotal,
    reductionAmount: reduction,
    reductionPercentage: reductionPct,
    stages: {
      manufacturing: { eco: ecoMfg, normal: normalMfg },
      transportation: { eco: ecoTrn, normal: normalTrn },
      usage: { eco: ecoUsg, normal: normalUsg },
      disposal: { eco: ecoDsp, normal: normalDsp }
    },
    explanation
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, name, category, description, materialUsed, weight } = body;

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    // 1. Try to fetch from database if productId is provided and Supabase is configured
    if (productId && supabase) {
      try {
        const { data: product, error } = await supabase
          .from('products')
          .select('carbon_footprint')
          .eq('id', productId)
          .maybeSingle();

        if (!error && product?.carbon_footprint) {
          // Found cached carbon footprint in the database!
          return NextResponse.json({ ...product.carbon_footprint, source: 'database' });
        } else if (error) {
          console.warn('Error fetching carbon footprint from database (column might not exist yet):', error.message);
        }
      } catch (dbError: any) {
        console.warn('Database error while checking carbon footprint cache:', dbError.message);
      }
    }

    let data;
    let source = 'gemini';

    // 2. Fetch from Gemini API
    try {
      data = await fetchGeminiLCA(name, category || '', description || '', materialUsed || '', weight || '');
    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to local LCA estimator:', apiError.message);
      data = estimateLCA(name, category || '', description || '', materialUsed || '', weight || '');
      source = 'estimator';
    }

    // 3. Save to database if productId is provided, Supabase is configured, and it's a valid ID
    if (productId && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .update({ carbon_footprint: data })
          .eq('id', productId);
        
        if (error) {
          console.warn('Failed to cache carbon footprint in database:', error.message);
        } else {
          console.log(`Successfully cached carbon footprint for product ${productId} in database.`);
        }
      } catch (dbSaveError: any) {
        console.warn('Database error while saving carbon footprint cache:', dbSaveError.message);
      }
    }

    return NextResponse.json({ ...data, source });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}