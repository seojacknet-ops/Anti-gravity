// Template Types and Interfaces

export type TemplateCategory =
  | 'restaurant'
  | 'law-firm'
  | 'real-estate'
  | 'fitness'
  | 'photography'
  | 'ecommerce'
  | 'saas'
  | 'dental'
  | 'medical'
  | 'salon'
  | 'construction'
  | 'education'
  | 'nonprofit'
  | 'portfolio'
  | 'agency'
  | 'consulting'
  | 'travel'
  | 'wedding'
  | 'automotive'
  | 'pet-services';

export interface TemplateSection {
  id: string;
  type: 'hero' | 'features' | 'services' | 'about' | 'testimonials' | 'pricing' | 'contact' | 'gallery' | 'team' | 'cta' | 'stats' | 'faq';
  content: Record<string, unknown>;
}

export interface TemplateColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  thumbnail: string;
  colorScheme: TemplateColorScheme;
  createdAt: Date;
}

export interface Template extends TemplateMetadata {
  sections: TemplateSection[];
  businessName: string;
  tagline: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface NicheConfig {
  category: TemplateCategory;
  displayName: string;
  icon: string;
  description: string;
  defaultSections: TemplateSection['type'][];
  sampleBusinessNames: string[];
  sampleTaglines: string[];
  keywords: string[];
}

// Category display configuration
export const CATEGORY_CONFIG: Record<TemplateCategory, { displayName: string; icon: string; description: string }> = {
  'restaurant': { displayName: 'Restaurant', icon: '🍽️', description: 'Fine dining, cafes, and food establishments' },
  'law-firm': { displayName: 'Law Firm', icon: '⚖️', description: 'Legal services and attorney offices' },
  'real-estate': { displayName: 'Real Estate', icon: '🏠', description: 'Property listings and real estate agencies' },
  'fitness': { displayName: 'Fitness', icon: '💪', description: 'Gyms, personal trainers, and fitness studios' },
  'photography': { displayName: 'Photography', icon: '📷', description: 'Photographers and creative studios' },
  'ecommerce': { displayName: 'E-Commerce', icon: '🛒', description: 'Online stores and retail businesses' },
  'saas': { displayName: 'SaaS', icon: '💻', description: 'Software as a service platforms' },
  'dental': { displayName: 'Dental', icon: '🦷', description: 'Dental clinics and oral health services' },
  'medical': { displayName: 'Medical', icon: '🏥', description: 'Healthcare providers and medical practices' },
  'salon': { displayName: 'Salon & Spa', icon: '💅', description: 'Beauty salons and wellness spas' },
  'construction': { displayName: 'Construction', icon: '🏗️', description: 'Construction and contracting services' },
  'education': { displayName: 'Education', icon: '📚', description: 'Schools, courses, and educational platforms' },
  'nonprofit': { displayName: 'Non-Profit', icon: '❤️', description: 'Charitable organizations and NGOs' },
  'portfolio': { displayName: 'Portfolio', icon: '🎨', description: 'Personal portfolios and creative showcases' },
  'agency': { displayName: 'Agency', icon: '🚀', description: 'Marketing, design, and creative agencies' },
  'consulting': { displayName: 'Consulting', icon: '💼', description: 'Business and professional consulting' },
  'travel': { displayName: 'Travel', icon: '✈️', description: 'Travel agencies and tourism services' },
  'wedding': { displayName: 'Wedding', icon: '💒', description: 'Wedding planners and event services' },
  'automotive': { displayName: 'Automotive', icon: '🚗', description: 'Car dealerships and auto services' },
  'pet-services': { displayName: 'Pet Services', icon: '🐕', description: 'Pet care, grooming, and veterinary' },
};
