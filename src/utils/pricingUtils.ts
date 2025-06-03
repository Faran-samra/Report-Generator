
interface PricingData {
  brand: string;
  model: string;
  storage: string;
  basePrice: number;
}

// Default pricing fallback
const DEFAULT_PRICING: Record<string, Record<string, Record<string, number>>> = {
  'iPhone': {
    'iPhone 15 Pro': { '128GB': 350, '256GB': 400, '512GB': 450, '1TB': 500 },
    'iPhone 15': { '128GB': 300, '256GB': 350, '512GB': 400 },
    'iPhone 14 Pro': { '128GB': 320, '256GB': 370, '512GB': 420, '1TB': 470 },
    'iPhone 14': { '128GB': 280, '256GB': 330, '512GB': 380 }
  },
  'Samsung': {
    'Galaxy S24 Ultra': { '256GB': 380, '512GB': 430, '1TB': 480 },
    'Galaxy S24': { '128GB': 320, '256GB': 370, '512GB': 420 },
    'Galaxy S23': { '128GB': 300, '256GB': 350, '512GB': 400 },
    'Galaxy Note 20': { '128GB': 250, '256GB': 300 }
  },
  'Google': {
    'Pixel 8 Pro': { '128GB': 280, '256GB': 330, '512GB': 380 },
    'Pixel 8': { '128GB': 250, '256GB': 300, '512GB': 350 },
    'Pixel 7': { '128GB': 220, '256GB': 270, '512GB': 320 }
  }
};

export const getDevicePrice = (brand: string, model: string, storage: string): number => {
  // First try to get pricing from uploaded Excel data
  const uploadedPricing = getUploadedPricing();
  
  if (uploadedPricing.length > 0) {
    const match = uploadedPricing.find(item => 
      item.brand.toLowerCase() === brand.toLowerCase() &&
      item.model.toLowerCase() === model.toLowerCase() &&
      item.storage.toLowerCase() === storage.toLowerCase()
    );
    
    if (match) {
      console.log(`Found uploaded price for ${brand} ${model} ${storage}: $${match.basePrice}`);
      return match.basePrice;
    }
  }

  // Fallback to default pricing
  const brandPricing = DEFAULT_PRICING[brand];
  if (brandPricing && brandPricing[model] && brandPricing[model][storage]) {
    console.log(`Using default price for ${brand} ${model} ${storage}: $${brandPricing[model][storage]}`);
    return brandPricing[model][storage];
  }

  // Ultimate fallback
  console.log(`No specific pricing found for ${brand} ${model} ${storage}, using default $300`);
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
