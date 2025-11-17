export type IconName = 'image' | 'reels' | 'carousel' | 'story' | 'campaign' | 'check' | 'question' | 'instagram' | 'whatsapp';

export interface PlanFeature {
  name: string;
  icon: IconName;
  description: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  features: PlanFeature[];
  isHighlighted: boolean;
}

export interface Addon {
  id: string;
  name:string;
  description: string;
  price: number;
  originalPrice: number;
}