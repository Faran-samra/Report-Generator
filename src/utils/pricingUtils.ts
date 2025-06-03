
interface PricingData {
  brand: string;
  model: string;
  storage: string;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  broken: number;
}

// Updated default pricing with comprehensive data from your Excel
const DEFAULT_PRICING: Record<string, Record<string, Record<string, { gradeA: number; gradeB: number; gradeC: number; broken: number }>>> = {
  'Apple': {
    'iPhone 16 Pro Max': { 
      '1TB': { gradeA: 3800, gradeB: 3420, gradeC: 3078, broken: 1231.2 },
      '512GB': { gradeA: 3100, gradeB: 2790, gradeC: 2511, broken: 1004.4 },
      '256GB': { gradeA: 3100, gradeB: 2790, gradeC: 2511, broken: 1004.4 },
      '128GB': { gradeA: 3100, gradeB: 2790, gradeC: 2511, broken: 1004.4 }
    },
    'iPhone 16 Pro': { 
      '1TB': { gradeA: 3300, gradeB: 2970, gradeC: 2673, broken: 1069.2 },
      '512GB': { gradeA: 2800, gradeB: 2520, gradeC: 2268, broken: 907.2 },
      '256GB': { gradeA: 2800, gradeB: 2520, gradeC: 2268, broken: 907.2 },
      '128GB': { gradeA: 2800, gradeB: 2520, gradeC: 2268, broken: 907.2 }
    },
    'iPhone 16 Plus': { 
      '512GB': { gradeA: 2700, gradeB: 2430, gradeC: 2187, broken: 874.8 },
      '256GB': { gradeA: 2700, gradeB: 2430, gradeC: 2187, broken: 874.8 },
      '128GB': { gradeA: 2700, gradeB: 2430, gradeC: 2187, broken: 874.8 }
    },
    'iPhone 16': { 
      '512GB': { gradeA: 2600, gradeB: 2340, gradeC: 2106, broken: 842.4 },
      '256GB': { gradeA: 2600, gradeB: 2340, gradeC: 2106, broken: 842.4 },
      '128GB': { gradeA: 2600, gradeB: 2340, gradeC: 2106, broken: 842.4 }
    },
    'iPhone 15 Pro Max': { 
      '1TB': { gradeA: 600, gradeB: 540, gradeC: 486, broken: 194.4 },
      '512GB': { gradeA: 2000, gradeB: 1800, gradeC: 1620, broken: 648 },
      '256GB': { gradeA: 2000, gradeB: 1800, gradeC: 1620, broken: 648 }
    },
    'iPhone 15 Pro': { 
      '1TB': { gradeA: 500, gradeB: 450, gradeC: 405, broken: 162 },
      '512GB': { gradeA: 1800, gradeB: 1620, gradeC: 1458, broken: 583.2 },
      '256GB': { gradeA: 1800, gradeB: 1620, gradeC: 1458, broken: 583.2 },
      '128GB': { gradeA: 1800, gradeB: 1620, gradeC: 1458, broken: 583.2 }
    },
    'iPhone 15 Plus': { 
      '512GB': { gradeA: 1500, gradeB: 1350, gradeC: 1215, broken: 486 },
      '256GB': { gradeA: 1500, gradeB: 1350, gradeC: 1215, broken: 486 },
      '128GB': { gradeA: 1500, gradeB: 1350, gradeC: 1215, broken: 486 }
    },
    'iPhone 15': { 
      '512GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '256GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '128GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 }
    },
    'iPhone 14 Pro Max': { 
      '1TB': { gradeA: 1600, gradeB: 1440, gradeC: 1296, broken: 518.4 },
      '512GB': { gradeA: 1600, gradeB: 1440, gradeC: 1296, broken: 518.4 },
      '256GB': { gradeA: 1600, gradeB: 1440, gradeC: 1296, broken: 518.4 },
      '128GB': { gradeA: 1600, gradeB: 1440, gradeC: 1296, broken: 518.4 }
    },
    'iPhone 14 Pro': { 
      '1TB': { gradeA: 2200, gradeB: 1980, gradeC: 1782, broken: 712.8 },
      '512GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '256GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '128GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 }
    },
    'iPhone 14 Plus': { 
      '512GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '256GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 },
      '128GB': { gradeA: 1300, gradeB: 1170, gradeC: 1053, broken: 421.2 }
    },
    'iPhone 14': { 
      '512GB': { gradeA: 1200, gradeB: 1080, gradeC: 972, broken: 388.8 },
      '256GB': { gradeA: 1200, gradeB: 1080, gradeC: 972, broken: 388.8 },
      '128GB': { gradeA: 1100, gradeB: 990, gradeC: 891, broken: 356.4 }
    }
  },
  'Samsung': {
    'Galaxy S25 Ultra': { 
      '1TB': { gradeA: 2200, gradeB: 1980, gradeC: 1782, broken: 712.8 },
      '512GB': { gradeA: 2200, gradeB: 1980, gradeC: 1782, broken: 712.8 },
      '256GB': { gradeA: 2200, gradeB: 1980, gradeC: 1782, broken: 712.8 }
    },
    'Galaxy S25+': { 
      '512GB': { gradeA: 2200, gradeB: 1980, gradeC: 1782, broken: 712.8 }
    },
    'Galaxy S25': { 
      '256GB': { gradeA: 2000, gradeB: 1800, gradeC: 1620, broken: 648 },
      '128GB': { gradeA: 2000, gradeB: 1800, gradeC: 1620, broken: 648 }
    },
    'Galaxy S24 FE': { 
      '256GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 },
      '128GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 }
    },
    'Galaxy S24+': { 
      '512GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 },
      '256GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 }
    },
    'Galaxy S24': { 
      '512GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 },
      '256GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 },
      '128GB': { gradeA: 800, gradeB: 720, gradeC: 648, broken: 259.2 }
    }
  },
  'Google': {
    'Pixel 9 Pro XL': { 
      '1TB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '512GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '256GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '128GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 }
    },
    'Pixel 9 Pro': { 
      '1TB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '512GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '256GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '128GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 }
    },
    'Pixel 9': { 
      '256GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '128GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 }
    },
    'Pixel 8 Pro': { 
      '1TB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '512GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '256GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 },
      '128GB': { gradeA: 70, gradeB: 63, gradeC: 56.7, broken: 22.68 }
    }
  }
};

export const getDevicePrice = (brand: string, model: string, storage: string, grade: string = 'A'): number => {
  // First try to get pricing from uploaded Excel data
  const uploadedPricing = getUploadedPricing();
  
  if (uploadedPricing.length > 0) {
    const match = uploadedPricing.find(item => 
      item.brand.toLowerCase() === brand.toLowerCase() &&
      item.model.toLowerCase() === model.toLowerCase() &&
      item.storage.toLowerCase() === storage.toLowerCase()
    );
    
    if (match) {
      let price = match.gradeA; // Default to Grade A
      if (grade === 'B') price = match.gradeB;
      else if (grade === 'C') price = match.gradeC;
      else if (grade === 'Broken') price = match.broken;
      
      console.log(`Found uploaded price for ${brand} ${model} ${storage} Grade ${grade}: $${price}`);
      return price;
    }
  }

  // Fallback to default pricing
  const brandPricing = DEFAULT_PRICING[brand];
  if (brandPricing && brandPricing[model] && brandPricing[model][storage]) {
    const gradeKey = grade === 'A' ? 'gradeA' : grade === 'B' ? 'gradeB' : grade === 'C' ? 'gradeC' : 'broken';
    const price = brandPricing[model][storage][gradeKey];
    console.log(`Using default price for ${brand} ${model} ${storage} Grade ${grade}: $${price}`);
    return price;
  }

  // Ultimate fallback
  console.log(`No specific pricing found for ${brand} ${model} ${storage} Grade ${grade}, using default $300`);
  return 300;
};

export const getUploadedPricing = (): PricingData[] => {
  try {
    const stored = localStorage.getItem('devicePricing');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading uploaded pricing:', error);
    return [];
  }
};

export const clearUploadedPricing = (): void => {
  localStorage.removeItem('devicePricing');
};

// Get all available brands from uploaded + default data
export const getAvailableBrands = (): string[] => {
  const defaultBrands = Object.keys(DEFAULT_PRICING);
  const uploadedPricing = getUploadedPricing();
  const uploadedBrands = [...new Set(uploadedPricing.map(item => item.brand))];
  
  return [...new Set([...defaultBrands, ...uploadedBrands])];
};

// Get models for a specific brand
export const getModelsForBrand = (brand: string): string[] => {
  const defaultModels = DEFAULT_PRICING[brand] ? Object.keys(DEFAULT_PRICING[brand]) : [];
  const uploadedPricing = getUploadedPricing();
  const uploadedModels = uploadedPricing
    .filter(item => item.brand.toLowerCase() === brand.toLowerCase())
    .map(item => item.model);
  
  return [...new Set([...defaultModels, ...uploadedModels])];
};

// Get storage options for a specific brand and model
export const getStorageOptions = (brand: string, model: string): string[] => {
  const defaultOptions = DEFAULT_PRICING[brand]?.[model] ? Object.keys(DEFAULT_PRICING[brand][model]) : [];
  const uploadedPricing = getUploadedPricing();
  const uploadedOptions = uploadedPricing
    .filter(item => 
      item.brand.toLowerCase() === brand.toLowerCase() && 
      item.model.toLowerCase() === model.toLowerCase()
    )
    .map(item => item.storage);
  
  return [...new Set([...defaultOptions, ...uploadedOptions])];
};

// Parse uploaded Excel data with proper column mapping
export const parseExcelData = (jsonData: any[]): PricingData[] => {
  return jsonData.map((row: any) => ({
    brand: row.Make || row.Brand || row.brand || '',
    model: row.Model || row.model || '',
    storage: row.MemorySize || row.Storage || row.storage || '',
    gradeA: parseFloat(row.GradeA || row['Grade A'] || row.gradeA || '0'),
    gradeB: parseFloat(row.GradeB || row['Grade B'] || row.gradeB || '0'),
    gradeC: parseFloat(row.GradeC || row['Grade C'] || row.gradeC || '0'),
    broken: parseFloat(row.Broken || row.broken || '0')
  })).filter(item => item.brand && item.model && item.gradeA > 0);
};
