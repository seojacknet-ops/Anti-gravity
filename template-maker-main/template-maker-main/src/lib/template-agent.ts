// Autonomous Template Generation Agent
// This agent generates complete mini-websites for various business niches

import { Template, TemplateCategory, TemplateSection, TemplateColorScheme, CATEGORY_CONFIG } from '@/types/template';

// Color schemes for different moods/industries
const COLOR_SCHEMES: Record<string, TemplateColorScheme> = {
  professional: {
    primary: '#1e3a5f',
    secondary: '#2c5282',
    accent: '#ed8936',
    background: '#ffffff',
    text: '#1a202c'
  },
  modern: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#0f172a',
    text: '#f8fafc'
  },
  warm: {
    primary: '#dc2626',
    secondary: '#f97316',
    accent: '#fbbf24',
    background: '#fffbeb',
    text: '#451a03'
  },
  nature: {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#34d399',
    background: '#ecfdf5',
    text: '#064e3b'
  },
  elegant: {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#d4af37',
    background: '#f9fafb',
    text: '#111827'
  },
  health: {
    primary: '#0891b2',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#f0fdfa',
    text: '#134e4a'
  },
  creative: {
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#a855f7',
    background: '#fdf4ff',
    text: '#701a75'
  },
  tech: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    accent: '#22c55e',
    background: '#0f172a',
    text: '#e2e8f0'
  },
  luxury: {
    primary: '#78350f',
    secondary: '#92400e',
    accent: '#d4af37',
    background: '#1c1917',
    text: '#fafaf9'
  },
  fresh: {
    primary: '#16a34a',
    secondary: '#22c55e',
    accent: '#fbbf24',
    background: '#ffffff',
    text: '#166534'
  }
};

// Niche-specific content generators
const NICHE_DATA: Record<TemplateCategory, {
  businessNames: string[];
  taglines: string[];
  services: string[];
  features: string[];
  testimonials: { name: string; role: string; text: string }[];
  stats: { value: string; label: string }[];
  colorSchemes: string[];
}> = {
  'restaurant': {
    businessNames: ['The Golden Fork', 'Bella Cucina', 'Urban Bites', 'Savory Kitchen', 'The Rustic Table'],
    taglines: ['Where Every Bite Tells a Story', 'Authentic Flavors, Modern Experience', 'Farm to Table Excellence'],
    services: ['Fine Dining', 'Private Events', 'Catering', 'Wine Tasting', 'Chef\'s Table Experience'],
    features: ['Locally Sourced Ingredients', 'Award-Winning Chef', 'Romantic Atmosphere', 'Outdoor Seating'],
    testimonials: [
      { name: 'Sarah M.', role: 'Food Critic', text: 'An extraordinary culinary experience that exceeds all expectations.' },
      { name: 'James L.', role: 'Regular Guest', text: 'The best restaurant in town. The attention to detail is remarkable.' }
    ],
    stats: [{ value: '15+', label: 'Years of Excellence' }, { value: '50k+', label: 'Happy Guests' }, { value: '4.9', label: 'Rating' }],
    colorSchemes: ['warm', 'elegant', 'luxury']
  },
  'law-firm': {
    businessNames: ['Sterling & Associates', 'Justice Partners LLP', 'Thompson Legal Group', 'Apex Law Firm', 'Heritage Attorneys'],
    taglines: ['Your Rights, Our Priority', 'Excellence in Legal Advocacy', 'Trusted Legal Partners Since 1995'],
    services: ['Corporate Law', 'Family Law', 'Criminal Defense', 'Real Estate Law', 'Personal Injury'],
    features: ['Free Consultation', '24/7 Availability', 'No Win No Fee', 'Experienced Attorneys'],
    testimonials: [
      { name: 'Robert K.', role: 'Business Owner', text: 'They handled our case with professionalism and got us the results we needed.' },
      { name: 'Maria G.', role: 'Client', text: 'Compassionate and thorough. They made a difficult time much easier.' }
    ],
    stats: [{ value: '500+', label: 'Cases Won' }, { value: '25+', label: 'Years Experience' }, { value: '98%', label: 'Success Rate' }],
    colorSchemes: ['professional', 'elegant']
  },
  'real-estate': {
    businessNames: ['Premier Properties', 'Skyline Realty', 'Dream Home Experts', 'Cornerstone Real Estate', 'Urban Living Co'],
    taglines: ['Find Your Dream Home Today', 'Where Home Begins', 'Turning Dreams Into Addresses'],
    services: ['Residential Sales', 'Commercial Leasing', 'Property Management', 'Investment Consulting', 'Luxury Estates'],
    features: ['Virtual Tours', 'Expert Agents', 'Market Analysis', 'Financing Assistance'],
    testimonials: [
      { name: 'The Johnson Family', role: 'Home Buyers', text: 'Found our perfect home in just two weeks. Amazing service!' },
      { name: 'David R.', role: 'Investor', text: 'Their market knowledge helped me make smart investment decisions.' }
    ],
    stats: [{ value: '1000+', label: 'Homes Sold' }, { value: '$2B+', label: 'In Sales' }, { value: '15+', label: 'Years in Business' }],
    colorSchemes: ['professional', 'modern', 'elegant']
  },
  'fitness': {
    businessNames: ['Iron Will Gym', 'FitLife Studio', 'Peak Performance', 'Transform Fitness', 'Elevate Athletics'],
    taglines: ['Transform Your Body, Transform Your Life', 'Where Champions Train', 'Your Fitness Journey Starts Here'],
    services: ['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Weight Loss Programs', 'Strength Training'],
    features: ['State-of-the-Art Equipment', 'Certified Trainers', 'Flexible Hours', 'Sauna & Recovery'],
    testimonials: [
      { name: 'Mike T.', role: 'Member', text: 'Lost 50 pounds in 6 months. The trainers here are incredible!' },
      { name: 'Jessica H.', role: 'Athlete', text: 'Best gym I\'ve ever been to. The community is so supportive.' }
    ],
    stats: [{ value: '5000+', label: 'Active Members' }, { value: '50+', label: 'Classes Weekly' }, { value: '100%', label: 'Results Guaranteed' }],
    colorSchemes: ['modern', 'nature', 'fresh']
  },
  'photography': {
    businessNames: ['Lens & Light Studio', 'Captured Moments', 'Aperture Arts', 'Frame Perfect', 'Visual Stories'],
    taglines: ['Capturing Life\'s Beautiful Moments', 'Where Memories Become Art', 'Your Story, Beautifully Told'],
    services: ['Wedding Photography', 'Portrait Sessions', 'Commercial Photography', 'Event Coverage', 'Photo Editing'],
    features: ['Professional Equipment', 'Quick Turnaround', 'Online Gallery', 'Print Services'],
    testimonials: [
      { name: 'Emily & John', role: 'Wedding Clients', text: 'Our wedding photos are absolutely stunning. We couldn\'t be happier!' },
      { name: 'Brand Co.', role: 'Commercial Client', text: 'Professional, creative, and a pleasure to work with.' }
    ],
    stats: [{ value: '1000+', label: 'Sessions' }, { value: '500+', label: 'Weddings' }, { value: '10+', label: 'Awards' }],
    colorSchemes: ['creative', 'elegant', 'modern']
  },
  'ecommerce': {
    businessNames: ['StyleVault', 'TrendMart', 'Luxe Boutique', 'The Modern Shop', 'Essentials Co'],
    taglines: ['Shop Smarter, Live Better', 'Curated Collections for Modern Living', 'Where Style Meets Savings'],
    services: ['Free Shipping', 'Easy Returns', 'Gift Wrapping', 'Personal Shopping', 'Loyalty Rewards'],
    features: ['Secure Checkout', 'Same-Day Delivery', 'Price Match Guarantee', '24/7 Support'],
    testimonials: [
      { name: 'Amanda L.', role: 'Customer', text: 'Amazing quality and super fast shipping. My go-to store!' },
      { name: 'Chris M.', role: 'VIP Member', text: 'The best online shopping experience I\'ve ever had.' }
    ],
    stats: [{ value: '100k+', label: 'Happy Customers' }, { value: '10k+', label: 'Products' }, { value: '4.8', label: 'Star Rating' }],
    colorSchemes: ['modern', 'creative', 'fresh']
  },
  'saas': {
    businessNames: ['CloudFlow', 'DataSync Pro', 'TaskMaster', 'Workflow.io', 'Streamline HQ'],
    taglines: ['Simplify Your Workflow', 'Power Your Business Growth', 'Work Smarter, Not Harder'],
    services: ['Cloud Storage', 'Team Collaboration', 'Analytics Dashboard', 'API Integration', 'Enterprise Solutions'],
    features: ['99.9% Uptime', 'SOC 2 Certified', 'Free Trial', 'Dedicated Support'],
    testimonials: [
      { name: 'TechCorp Inc.', role: 'Enterprise Client', text: 'Increased our team productivity by 40%. Game-changing software.' },
      { name: 'StartupXYZ', role: 'Growing Business', text: 'The perfect solution for scaling our operations.' }
    ],
    stats: [{ value: '50k+', label: 'Active Users' }, { value: '99.9%', label: 'Uptime' }, { value: '150+', label: 'Countries' }],
    colorSchemes: ['tech', 'modern', 'professional']
  },
  'dental': {
    businessNames: ['Bright Smile Dental', 'Family Dental Care', 'Premier Dentistry', 'Smile Experts', 'Gentle Dental Clinic'],
    taglines: ['Creating Beautiful Smiles', 'Your Comfort, Our Priority', 'Excellence in Dental Care'],
    services: ['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Dental Implants', 'Teeth Whitening'],
    features: ['Gentle Care', 'Modern Technology', 'Emergency Services', 'Flexible Financing'],
    testimonials: [
      { name: 'Patricia W.', role: 'Patient', text: 'The staff is so gentle and caring. Best dental experience ever!' },
      { name: 'Michael R.', role: 'Patient', text: 'Finally found a dentist I actually enjoy visiting.' }
    ],
    stats: [{ value: '20k+', label: 'Patients Served' }, { value: '25+', label: 'Years Experience' }, { value: '5★', label: 'Rating' }],
    colorSchemes: ['health', 'fresh', 'professional']
  },
  'medical': {
    businessNames: ['Wellness Medical Center', 'CareFirst Clinic', 'Healing Hands Medical', 'Premier Healthcare', 'Vitality Health'],
    taglines: ['Your Health, Our Mission', 'Compassionate Care, Exceptional Results', 'Healthcare Reimagined'],
    services: ['Primary Care', 'Specialist Consultations', 'Preventive Care', 'Telehealth', 'Lab Services'],
    features: ['Board-Certified Physicians', 'Same-Day Appointments', 'Electronic Records', 'Insurance Accepted'],
    testimonials: [
      { name: 'Linda S.', role: 'Patient', text: 'The doctors here truly care about their patients. Highly recommended!' },
      { name: 'George H.', role: 'Long-term Patient', text: 'Excellent care for our entire family for over 10 years.' }
    ],
    stats: [{ value: '50k+', label: 'Patients' }, { value: '30+', label: 'Specialists' }, { value: '24/7', label: 'Support' }],
    colorSchemes: ['health', 'professional', 'nature']
  },
  'salon': {
    businessNames: ['Luxe Beauty Lounge', 'The Style Studio', 'Glow Salon & Spa', 'Bella Hair Design', 'Serenity Spa'],
    taglines: ['Where Beauty Meets Relaxation', 'Your Transformation Awaits', 'Indulge in Luxury'],
    services: ['Hair Styling', 'Spa Treatments', 'Nail Services', 'Makeup Artistry', 'Skincare'],
    features: ['Luxury Products', 'Expert Stylists', 'Relaxing Atmosphere', 'Online Booking'],
    testimonials: [
      { name: 'Rachel K.', role: 'Regular Client', text: 'Always leave feeling amazing. The best salon in the city!' },
      { name: 'Diana M.', role: 'Bridal Client', text: 'Made me feel like a princess on my wedding day.' }
    ],
    stats: [{ value: '15k+', label: 'Happy Clients' }, { value: '10+', label: 'Award-Winning Stylists' }, { value: '100%', label: 'Satisfaction' }],
    colorSchemes: ['creative', 'elegant', 'luxury']
  },
  'construction': {
    businessNames: ['BuildRight Construction', 'Apex Builders', 'Cornerstone Construction', 'Precision Building Co', 'Summit Contractors'],
    taglines: ['Building Dreams, One Project at a Time', 'Quality Construction You Can Trust', 'From Foundation to Finish'],
    services: ['Commercial Construction', 'Residential Building', 'Renovations', 'Project Management', 'Design-Build'],
    features: ['Licensed & Insured', 'On-Time Delivery', 'Quality Materials', 'Transparent Pricing'],
    testimonials: [
      { name: 'ABC Corporation', role: 'Commercial Client', text: 'Completed our office building on time and under budget.' },
      { name: 'The Smith Family', role: 'Homeowner', text: 'Our dream home became a reality thanks to their amazing team.' }
    ],
    stats: [{ value: '500+', label: 'Projects Completed' }, { value: '30+', label: 'Years Experience' }, { value: '$100M+', label: 'In Projects' }],
    colorSchemes: ['professional', 'warm', 'nature']
  },
  'education': {
    businessNames: ['Bright Minds Academy', 'Learn & Grow Institute', 'Excellence Education', 'Future Leaders School', 'Knowledge Hub'],
    taglines: ['Empowering Tomorrow\'s Leaders', 'Where Learning Comes to Life', 'Education That Inspires'],
    services: ['K-12 Education', 'Online Courses', 'Tutoring', 'Test Preparation', 'Summer Programs'],
    features: ['Expert Instructors', 'Small Class Sizes', 'Modern Curriculum', 'Personalized Learning'],
    testimonials: [
      { name: 'Parent of Alex', role: 'Parent', text: 'My child\'s grades improved dramatically. Excellent school!' },
      { name: 'Emily T.', role: 'Graduate', text: 'The education I received here prepared me perfectly for college.' }
    ],
    stats: [{ value: '5000+', label: 'Students' }, { value: '98%', label: 'Graduation Rate' }, { value: '50+', label: 'Courses' }],
    colorSchemes: ['fresh', 'modern', 'nature']
  },
  'nonprofit': {
    businessNames: ['Hope Foundation', 'Community Care Initiative', 'Global Impact Alliance', 'Hearts United', 'Change Makers'],
    taglines: ['Making a Difference Together', 'Empowering Communities, Changing Lives', 'Hope in Action'],
    services: ['Community Programs', 'Youth Development', 'Food Security', 'Education Initiatives', 'Healthcare Access'],
    features: ['100% Transparent', 'Volunteer Opportunities', 'Tax Deductible', 'Local Impact'],
    testimonials: [
      { name: 'Volunteer Sarah', role: 'Volunteer', text: 'Being part of this organization has been incredibly rewarding.' },
      { name: 'Community Member', role: 'Beneficiary', text: 'They changed our community for the better.' }
    ],
    stats: [{ value: '100k+', label: 'Lives Impacted' }, { value: '1000+', label: 'Volunteers' }, { value: '95%', label: 'To Programs' }],
    colorSchemes: ['nature', 'warm', 'health']
  },
  'portfolio': {
    businessNames: ['Creative Studio', 'Design by Alex', 'Visual Artistry', 'The Creative Mind', 'Pixel Perfect'],
    taglines: ['Bringing Ideas to Life', 'Creative Solutions, Stunning Results', 'Design That Speaks'],
    services: ['UI/UX Design', 'Brand Identity', 'Web Development', 'Motion Graphics', 'Print Design'],
    features: ['Award-Winning Work', 'Fast Turnaround', 'Collaborative Process', 'Unlimited Revisions'],
    testimonials: [
      { name: 'Tech Startup', role: 'Client', text: 'Incredible design work that elevated our entire brand.' },
      { name: 'Agency Partner', role: 'Collaborator', text: 'A true creative genius with impeccable attention to detail.' }
    ],
    stats: [{ value: '200+', label: 'Projects' }, { value: '50+', label: 'Clients' }, { value: '15', label: 'Awards' }],
    colorSchemes: ['creative', 'modern', 'tech']
  },
  'agency': {
    businessNames: ['Catalyst Creative', 'Bold Marketing', 'Spark Digital Agency', 'Momentum Media', 'Elevate Agency'],
    taglines: ['Brands That Make an Impact', 'Strategic Creativity, Measurable Results', 'Your Growth Partners'],
    services: ['Brand Strategy', 'Digital Marketing', 'Social Media', 'Content Creation', 'Web Development'],
    features: ['Data-Driven', 'Full-Service', 'Industry Experts', 'ROI Focused'],
    testimonials: [
      { name: 'Fortune 500 Client', role: 'CMO', text: 'They transformed our digital presence and doubled our leads.' },
      { name: 'Startup Founder', role: 'CEO', text: 'The best marketing investment we ever made.' }
    ],
    stats: [{ value: '300+', label: 'Campaigns' }, { value: '150%', label: 'Avg ROI' }, { value: '10+', label: 'Years' }],
    colorSchemes: ['modern', 'creative', 'tech']
  },
  'consulting': {
    businessNames: ['Strategic Insights', 'Pinnacle Consulting', 'Visionary Advisors', 'Growth Partners', 'Executive Solutions'],
    taglines: ['Transforming Challenges into Opportunities', 'Strategic Advice, Proven Results', 'Your Success is Our Business'],
    services: ['Strategy Consulting', 'Operations', 'Financial Advisory', 'Change Management', 'Digital Transformation'],
    features: ['Industry Experts', 'Proven Methodology', 'Measurable Outcomes', 'C-Suite Experience'],
    testimonials: [
      { name: 'Global Corp CEO', role: 'Executive', text: 'Their insights helped us navigate a complex market transition.' },
      { name: 'CFO', role: 'Finance Leader', text: 'Exceptional strategic guidance that delivered real results.' }
    ],
    stats: [{ value: '200+', label: 'Clients' }, { value: '$5B+', label: 'Value Created' }, { value: '95%', label: 'Repeat Clients' }],
    colorSchemes: ['professional', 'elegant', 'modern']
  },
  'travel': {
    businessNames: ['Wanderlust Travel', 'Adventure Awaits', 'Globe Trotters', 'Escape Travel Co', 'Journey Makers'],
    taglines: ['Your Adventure Starts Here', 'Discover the World with Us', 'Travel Beyond Boundaries'],
    services: ['Vacation Packages', 'Custom Itineraries', 'Group Tours', 'Luxury Travel', 'Adventure Expeditions'],
    features: ['Expert Guides', 'Best Price Guarantee', '24/7 Support', 'Flexible Booking'],
    testimonials: [
      { name: 'The Anderson Family', role: 'Travelers', text: 'The trip of a lifetime! Everything was perfectly organized.' },
      { name: 'Adventure Couple', role: 'Explorers', text: 'They created an unforgettable experience for us.' }
    ],
    stats: [{ value: '50k+', label: 'Happy Travelers' }, { value: '100+', label: 'Destinations' }, { value: '20+', label: 'Years' }],
    colorSchemes: ['nature', 'fresh', 'modern']
  },
  'wedding': {
    businessNames: ['Enchanted Events', 'Forever Moments', 'Blissful Weddings', 'Dream Day Planners', 'Elegant Affairs'],
    taglines: ['Creating Your Perfect Day', 'Where Love Stories Come to Life', 'Making Dreams Reality'],
    services: ['Full Planning', 'Day-of Coordination', 'Venue Selection', 'Vendor Management', 'Destination Weddings'],
    features: ['Personalized Service', 'Budget Management', 'Stress-Free Planning', 'Exclusive Vendors'],
    testimonials: [
      { name: 'Emma & David', role: 'Newlyweds', text: 'Our wedding was absolutely perfect. We can\'t thank them enough!' },
      { name: 'Sarah & Michael', role: 'Couple', text: 'They made our dream wedding a reality.' }
    ],
    stats: [{ value: '500+', label: 'Weddings' }, { value: '100%', label: 'Happy Couples' }, { value: '15+', label: 'Years' }],
    colorSchemes: ['elegant', 'creative', 'luxury']
  },
  'automotive': {
    businessNames: ['Premium Auto Gallery', 'Drive Elite Motors', 'AutoMax Dealership', 'Classic Car Co', 'Speed & Style'],
    taglines: ['Drive Your Dreams', 'Where Quality Meets Performance', 'Your Journey Starts Here'],
    services: ['New Car Sales', 'Pre-Owned Vehicles', 'Financing', 'Service & Maintenance', 'Trade-Ins'],
    features: ['Certified Pre-Owned', 'Warranty Included', 'Easy Financing', 'Expert Service'],
    testimonials: [
      { name: 'Car Enthusiast', role: 'Customer', text: 'Found my dream car at the best price. Excellent experience!' },
      { name: 'First-Time Buyer', role: 'Customer', text: 'They made the car buying process easy and stress-free.' }
    ],
    stats: [{ value: '10k+', label: 'Cars Sold' }, { value: '30+', label: 'Years' }, { value: '4.9★', label: 'Rating' }],
    colorSchemes: ['professional', 'modern', 'luxury']
  },
  'pet-services': {
    businessNames: ['Happy Paws', 'Pet Paradise', 'Furry Friends Care', 'Pawfect Companions', 'Whiskers & Wags'],
    taglines: ['Where Pets Are Family', 'Love, Care, and Wagging Tails', 'Your Pet\'s Home Away From Home'],
    services: ['Pet Grooming', 'Boarding', 'Daycare', 'Veterinary Care', 'Pet Training'],
    features: ['24/7 Care', 'Certified Staff', 'Spacious Facilities', 'Live Webcams'],
    testimonials: [
      { name: 'Dog Owner', role: 'Pet Parent', text: 'My dog absolutely loves it here! Best pet care in town.' },
      { name: 'Cat Lover', role: 'Pet Parent', text: 'I can travel with peace of mind knowing my cats are well cared for.' }
    ],
    stats: [{ value: '5000+', label: 'Pets Cared For' }, { value: '15+', label: 'Years' }, { value: '100%', label: 'Love Given' }],
    colorSchemes: ['nature', 'warm', 'fresh']
  }
};

// Section generators
function generateHeroSection(niche: TemplateCategory, businessName: string, tagline: string): TemplateSection {
  return {
    id: 'hero',
    type: 'hero',
    content: {
      headline: businessName,
      subheadline: tagline,
      ctaText: 'Get Started',
      ctaSecondary: 'Learn More',
      backgroundStyle: 'gradient'
    }
  };
}

function generateFeaturesSection(niche: TemplateCategory): TemplateSection {
  const data = NICHE_DATA[niche];
  return {
    id: 'features',
    type: 'features',
    content: {
      title: 'Why Choose Us',
      features: data.features.map((feature, idx) => ({
        id: idx,
        title: feature,
        description: `Experience the best ${feature.toLowerCase()} in the industry.`,
        icon: '✓'
      }))
    }
  };
}

function generateServicesSection(niche: TemplateCategory): TemplateSection {
  const data = NICHE_DATA[niche];
  return {
    id: 'services',
    type: 'services',
    content: {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions tailored to your needs',
      services: data.services.map((service, idx) => ({
        id: idx,
        title: service,
        description: `Professional ${service.toLowerCase()} services delivered with excellence.`,
        icon: '★'
      }))
    }
  };
}

function generateAboutSection(niche: TemplateCategory, businessName: string): TemplateSection {
  const config = CATEGORY_CONFIG[niche];
  return {
    id: 'about',
    type: 'about',
    content: {
      title: `About ${businessName}`,
      description: `We are a leading ${config.displayName.toLowerCase()} business dedicated to providing exceptional service and outstanding results. Our team of experts is committed to delivering the highest quality experience for every client.`,
      mission: 'To exceed expectations and create lasting relationships through excellence in everything we do.',
      values: ['Quality', 'Integrity', 'Innovation', 'Customer Focus']
    }
  };
}

function generateTestimonialsSection(niche: TemplateCategory): TemplateSection {
  const data = NICHE_DATA[niche];
  return {
    id: 'testimonials',
    type: 'testimonials',
    content: {
      title: 'What Our Clients Say',
      testimonials: data.testimonials.map((t, idx) => ({
        id: idx,
        ...t,
        rating: 5
      }))
    }
  };
}

function generateStatsSection(niche: TemplateCategory): TemplateSection {
  const data = NICHE_DATA[niche];
  return {
    id: 'stats',
    type: 'stats',
    content: {
      title: 'Our Impact',
      stats: data.stats
    }
  };
}

function generateContactSection(businessName: string): TemplateSection {
  return {
    id: 'contact',
    type: 'contact',
    content: {
      title: 'Get in Touch',
      subtitle: `We'd love to hear from you. Contact ${businessName} today.`,
      formFields: ['name', 'email', 'phone', 'message'],
      showMap: true
    }
  };
}

function generateCTASection(niche: TemplateCategory): TemplateSection {
  const config = CATEGORY_CONFIG[niche];
  return {
    id: 'cta',
    type: 'cta',
    content: {
      title: 'Ready to Get Started?',
      subtitle: `Experience the best ${config.displayName.toLowerCase()} services today.`,
      ctaText: 'Contact Us Now',
      ctaSecondary: 'Learn More'
    }
  };
}

// Main agent class
export class TemplateAgent {
  private templates: Template[] = [];
  private templateCounter = 0;

  generateTemplate(category: TemplateCategory, variant: number = 0): Template {
    const data = NICHE_DATA[category];
    const config = CATEGORY_CONFIG[category];
    
    const businessName = data.businessNames[variant % data.businessNames.length];
    const tagline = data.taglines[variant % data.taglines.length];
    const colorSchemeName = data.colorSchemes[variant % data.colorSchemes.length];
    const colorScheme = COLOR_SCHEMES[colorSchemeName];

    this.templateCounter++;
    const templateId = `${category}-${variant + 1}`;

    const sections: TemplateSection[] = [
      generateHeroSection(category, businessName, tagline),
      generateStatsSection(category),
      generateServicesSection(category),
      generateFeaturesSection(category),
      generateAboutSection(category, businessName),
      generateTestimonialsSection(category),
      generateCTASection(category),
      generateContactSection(businessName)
    ];

    const template: Template = {
      id: templateId,
      name: `${businessName} - ${config.displayName} Template`,
      description: `A professional ${config.displayName.toLowerCase()} website template featuring ${data.services.slice(0, 3).join(', ').toLowerCase()}, and more.`,
      category,
      tags: [config.displayName, ...data.services.slice(0, 3), colorSchemeName],
      thumbnail: `/thumbnails/${templateId}.png`,
      colorScheme,
      createdAt: new Date(),
      sections,
      businessName,
      tagline,
      phone: '(555) 123-4567',
      email: `info@${businessName.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      address: '123 Business Street, City, State 12345'
    };

    this.templates.push(template);
    return template;
  }

  generateAllTemplates(): Template[] {
    const allTemplates: Template[] = [];
    const categories = Object.keys(NICHE_DATA) as TemplateCategory[];
    
    // Generate 1-2 variants per category to get 30+ templates
    categories.forEach(category => {
      const numVariants = category === 'restaurant' || category === 'saas' || category === 'ecommerce' ? 2 : 1;
      for (let i = 0; i < numVariants; i++) {
        allTemplates.push(this.generateTemplate(category, i));
      }
    });

    return allTemplates;
  }

  getTemplateById(id: string): Template | undefined {
    return this.templates.find(t => t.id === id);
  }

  getTemplatesByCategory(category: TemplateCategory): Template[] {
    return this.templates.filter(t => t.category === category);
  }

  searchTemplates(query: string): Template[] {
    const lowerQuery = query.toLowerCase();
    return this.templates.filter(t => 
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

// Singleton instance
let agentInstance: TemplateAgent | null = null;

export function getTemplateAgent(): TemplateAgent {
  if (!agentInstance) {
    agentInstance = new TemplateAgent();
    agentInstance.generateAllTemplates();
  }
  return agentInstance;
}

// Pre-generated templates export
export function getAllTemplates(): Template[] {
  return getTemplateAgent().generateAllTemplates();
}

export function getTemplateById(id: string): Template | undefined {
  const agent = getTemplateAgent();
  const allTemplates = agent.generateAllTemplates();
  return allTemplates.find(t => t.id === id);
}
