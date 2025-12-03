
export enum GenerationMode {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export enum AppView {
  LANDING = 'LANDING',
  HUB = 'HUB',
  GENERATOR = 'GENERATOR',
  TEMPLATES = 'TEMPLATES',
  DOCUMENTS = 'DOCUMENTS'
}

export interface GenerationState {
  originalImage: string | null;
  generatedImage: string | null;
  generatedVideoUri: string | null;
  prompt: string;
  mode: GenerationMode;
  isLoading: boolean;
  error: string | null;
  progressMessage: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  credits: string;
  features: string[];
  isPopular?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// --- AI Model Configuration Registry ---
// This is where you define new models and what they accept.

export interface ModelConfig {
  id: string; // The value passed to the API
  label: string; // The display name
  mode: GenerationMode;
  description: string;
  capabilities: {
    supportsAspectRatio: boolean;
    supportsResolution: boolean; // 1K, 2K, 4K
    supportsQuantity: boolean; // Batch generation
    supportsInputImage: boolean; // TRUE for Background Swap, FALSE for pure Text-to-Image
  };
  defaultAspectRatio: string;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gemini-2.5-flash-image',
    label: 'Gemini Flash (Standard)',
    mode: GenerationMode.IMAGE,
    description: 'Fastest generation. Best for background replacement.',
    capabilities: {
      supportsAspectRatio: true,
      supportsResolution: false,
      supportsQuantity: false,
      supportsInputImage: true, 
    },
    defaultAspectRatio: '1:1'
  },
  {
    id: 'gemini-3-pro-image-preview',
    label: 'Nano Banana Pro (High Res)',
    mode: GenerationMode.IMAGE,
    description: 'High fidelity 4K output. Best for professional product shots.',
    capabilities: {
      supportsAspectRatio: true,
      supportsResolution: true,
      supportsQuantity: false,
      supportsInputImage: true,
    },
    defaultAspectRatio: '1:1'
  },
  {
    id: 'imagen-4.0-generate-001',
    label: 'Imagen 4 Ultra (Creative)',
    mode: GenerationMode.IMAGE,
    description: 'Pure creative generation from text. Does not use input image.',
    capabilities: {
      supportsAspectRatio: true,
      supportsResolution: false,
      supportsQuantity: true, // Supports generating multiple options
      supportsInputImage: false, // Text-to-Image only
    },
    defaultAspectRatio: '1:1'
  },
  {
    id: 'veo-3.1-fast-generate-preview',
    label: 'Veo Fast (Video)',
    mode: GenerationMode.VIDEO,
    description: 'Generate 1080p video ads rapidly.',
    capabilities: {
      supportsAspectRatio: true,
      supportsResolution: true,
      supportsQuantity: false,
      supportsInputImage: true,
    },
    defaultAspectRatio: '9:16'
  }
];
