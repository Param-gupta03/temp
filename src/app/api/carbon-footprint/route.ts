import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function fetchGeminiLCA(name: string, category: string, description: string, materialUsed: string, weight: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("No Gemini API key configured");
  }

  const prompt = `You are a professional environmental engineer specialized in Lifecycle Assessment (LCA) and carbon footprint calculation.
Analyze the following eco-friendly product and its equivalent conventional (standard market) alternative.
Calculate the lifecycle carbon footprint (from raw materials/manufacturing to disposal) in kg CO2e.

Eco-friendly Product details:
- Name: ${name}
- Category: ${category}
- Description: ${description}
- Material Used: ${materialUsed}
- Weight: ${weight}

Please provide a JSON response in the following format:
{
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
  "explanation": "A short, engaging paragraph summarizing why the eco-friendly materials and design lead to this carbon reduction (e.g., composting, organic sourcing, renewable energy in production) over standard conventional products."
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

  // Determine material category coefficients
  let matEcoCoeff = 1.2;
  let matNormCoeff = 5.6;

  const material = (materialUsed + " " + name + " " + description).toLowerCase();
  
  if (material.includes('bamboo') || material.includes('cork') || material.includes('jute')) {
    matEcoCoeff = 0.35;
    matNormCoeff = 4.5;
  } else if (material.includes('cotton') || material.includes('linen') || material.includes('fabric')) {
    matEcoCoeff = 0.75;
    matNormCoeff = 5.2;
  } else if (material.includes('glass')) {
    matEcoCoeff = 0.85;
    matNormCoeff = 2.2;
  } else if (material.includes('steel') || material.includes('metal') || material.includes('iron')) {
    matEcoCoeff = 1.9;
    matNormCoeff = 7.2;
  } else if (material.includes('clay') || material.includes('ceramic') || material.includes('terracotta')) {
    matEcoCoeff = 0.55;
    matNormCoeff = 3.8;
  } else if (material.includes('wood') || material.includes('wooden')) {
    matEcoCoeff = 0.45;
    matNormCoeff = 4.8;
  } else if (material.includes('paper') || material.includes('cardboard')) {
    matEcoCoeff = 0.28;
    matNormCoeff = 2.6;
  }

  const ecoBase = weight * matEcoCoeff;
  const normalBase = weight * matNormCoeff;

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

  const explanation = `By substituting carbon-intensive standard industry plastics and polymers with sustainably sourced ${materialUsed || 'natural materials'} like organic composites, this product cuts raw material extraction and manufacturing emissions. Over its full life cycle—covering raw extraction, production, transport, bed usage, and final compostable or recyclable disposal—it saves an estimated ${reduction} kg of carbon dioxide equivalent (CO2e), lowering carbon footprints and preventing plastic pollution.`;

  return {
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
    const { name, category, description, materialUsed, weight } = body;

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    try {
      const data = await fetchGeminiLCA(name, category || '', description || '', materialUsed || '', weight || '');
      return NextResponse.json({ ...data, source: 'gemini' });
    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to local LCA estimator:', apiError.message);
      const data = estimateLCA(name, category || '', description || '', materialUsed || '', weight || '');
      return NextResponse.json({ ...data, source: 'estimator' });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
