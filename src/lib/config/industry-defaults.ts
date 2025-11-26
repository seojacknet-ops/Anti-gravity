// Industry-based smart defaults for onboarding
export interface IndustryConfig {
    industry: string
    icon: string
    defaultServices: string[]
    commonCertifications: string[]
    typicalCustomers: ('homeowners' | 'businesses' | 'tradespeople' | 'elderly' | 'mixed')[]
    suggestedVibe: 'clean-professional' | 'friendly-approachable' | 'bold-confident' | 'traditional-trustworthy' | 'modern-sleek'
    colorSuggestion: 'ocean' | 'forest' | 'sunset' | 'slate' | 'midnight'
    samplePubDescription: string
    competitorExamples: string[]
}

export const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
    plumber: {
        industry: 'plumber',
        icon: '🔧',
        defaultServices: [
            'Boiler Repair',
            'Emergency Callouts',
            'Bathroom Installation',
            'Central Heating',
            'Leak Repairs',
            'Drain Unblocking',
        ],
        commonCertifications: ['Gas Safe', 'CIPHE', 'City & Guilds', 'Public Liability Insurance'],
        typicalCustomers: ['homeowners'],
        suggestedVibe: 'friendly-approachable',
        colorSuggestion: 'ocean',
        samplePubDescription:
            "I'm a plumber in Manchester - been doing it 15 years. I specialise in boiler repairs and I'm the guy people call when other plumbers have given up.",
        competitorExamples: ['pimlicoplumbers.com', 'dyno.com'],
    },
    electrician: {
        industry: 'electrician',
        icon: '⚡',
        defaultServices: [
            'Rewiring',
            'Fuse Box Replacement',
            'Emergency Electrical',
            'PAT Testing',
            'EV Charger Installation',
            'Lighting Installation',
        ],
        commonCertifications: ['NICEIC', 'NAPIT', 'Part P', 'City & Guilds', 'Public Liability Insurance'],
        typicalCustomers: ['homeowners', 'businesses'],
        suggestedVibe: 'clean-professional',
        colorSuggestion: 'slate',
        samplePubDescription:
            "I'm an electrician covering the local area. I do everything from rewiring to smart home setups, and I'm fully qualified and insured.",
        competitorExamples: [],
    },
    cleaner: {
        industry: 'cleaner',
        icon: '🧹',
        defaultServices: [
            'Regular House Cleaning',
            'Deep Cleaning',
            'End of Tenancy',
            'Office Cleaning',
            'Carpet Cleaning',
            'Window Cleaning',
        ],
        commonCertifications: ['DBS Checked', 'Public Liability Insurance', 'Fully Insured'],
        typicalCustomers: ['homeowners', 'businesses'],
        suggestedVibe: 'friendly-approachable',
        colorSuggestion: 'forest',
        samplePubDescription:
            "I run a cleaning business with a small, trusted team. We're DBS checked, reliable, and we treat every home like it's our own.",
        competitorExamples: [],
    },
    builder: {
        industry: 'builder',
        icon: '🏗️',
        defaultServices: [
            'Extensions',
            'Loft Conversions',
            'Kitchen Fitting',
            'General Building',
            'Renovations',
            'Brickwork',
        ],
        commonCertifications: ['FMB Member', 'NHBC', 'City & Guilds', 'Public Liability Insurance'],
        typicalCustomers: ['homeowners'],
        suggestedVibe: 'traditional-trustworthy',
        colorSuggestion: 'slate',
        samplePubDescription:
            "I've been a builder for 20+ years. I specialise in extensions and renovations, and I take pride in quality workmanship that lasts.",
        competitorExamples: [],
    },
    landscaper: {
        industry: 'landscaper',
        icon: '🌳',
        defaultServices: [
            'Garden Design',
            'Paving & Patios',
            'Fencing',
            'Artificial Grass',
            'Decking',
            'Garden Maintenance',
        ],
        commonCertifications: ['RHS', 'BALI Member', 'Public Liability Insurance'],
        typicalCustomers: ['homeowners'],
        suggestedVibe: 'modern-sleek',
        colorSuggestion: 'forest',
        samplePubDescription:
            "I'm a landscaper who transforms outdoor spaces. From complete garden redesigns to simple patio installations, I love creating spaces people enjoy.",
        competitorExamples: [],
    },
    handyman: {
        industry: 'handyman',
        icon: '🔨',
        defaultServices: [
            'General Repairs',
            'Flat Pack Assembly',
            'Painting & Decorating',
            'Minor Plumbing',
            'Minor Electrical',
            'Odd Jobs',
        ],
        commonCertifications: ['Public Liability Insurance', 'DBS Checked'],
        typicalCustomers: ['homeowners', 'elderly'],
        suggestedVibe: 'friendly-approachable',
        colorSuggestion: 'sunset',
        samplePubDescription:
            "I'm your local handyman - if it needs fixing, I can probably help. No job too small, and I'm always on time.",
        competitorExamples: [],
    },
}

export const INDUSTRIES = [
    { id: 'plumber', label: 'Plumber', icon: '🔧' },
    { id: 'electrician', label: 'Electrician', icon: '⚡' },
    { id: 'cleaner', label: 'Cleaner', icon: '🧹' },
    { id: 'builder', label: 'Builder', icon: '🏗️' },
    { id: 'landscaper', label: 'Landscaper', icon: '🌳' },
    { id: 'handyman', label: 'Handyman', icon: '🔨' },
    { id: 'other', label: 'Something else...', icon: '🏢' },
]

export const COLOR_PALETTES = {
    ocean: {
        name: 'Ocean',
        emoji: '🌊',
        description: 'Professional blues',
        colors: ['#0EA5E9', '#0284C7', '#0369A1', '#075985'],
    },
    forest: {
        name: 'Forest',
        emoji: '🌲',
        description: 'Natural greens',
        colors: ['#10B981', '#059669', '#047857', '#065F46'],
    },
    sunset: {
        name: 'Sunset',
        emoji: '🌅',
        description: 'Warm oranges',
        colors: ['#F97316', '#EA580C', '#C2410C', '#9A3412'],
    },
    slate: {
        name: 'Slate',
        emoji: '🪨',
        description: 'Modern grays',
        colors: ['#64748B', '#475569', '#334155', '#1E293B'],
    },
    midnight: {
        name: 'Midnight',
        emoji: '🌙',
        description: 'Dark & dramatic',
        colors: ['#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED'],
    },
    custom: {
        name: 'Custom',
        emoji: '🎨',
        description: 'Your own colors',
        colors: [],
    },
}

export const VIBE_OPTIONS = [
    {
        id: 'clean-professional',
        name: 'Clean & Professional',
        description: 'Minimal, lots of white space, corporate feel',
        preview: 'bg-white border-2 border-gray-200',
    },
    {
        id: 'friendly-approachable',
        name: 'Friendly & Approachable',
        description: 'Warm colors, rounded corners, casual',
        preview: 'bg-orange-50 border-2 border-orange-300 rounded-xl',
    },
    {
        id: 'bold-confident',
        name: 'Bold & Confident',
        description: 'Dark backgrounds, strong typography, impactful',
        preview: 'bg-gray-900 border-2 border-purple-500 text-white',
    },
    {
        id: 'traditional-trustworthy',
        name: 'Traditional & Trustworthy',
        description: 'Classic layout, established feel',
        preview: 'bg-amber-50 border-2 border-amber-700',
    },
    {
        id: 'modern-sleek',
        name: 'Modern & Sleek',
        description: 'Cutting edge, gradients, contemporary',
        preview: 'bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-600',
    },
]

export const SECRET_SAUCE_OPTIONS = [
    { id: 'on-time', label: 'Always on time', emoji: '⏰' },
    { id: 'explains-clearly', label: 'Explains everything clearly', emoji: '💬' },
    { id: 'spotless', label: 'Leaves the place spotless', emoji: '✨' },
    { id: 'fair-prices', label: 'Fair prices, no surprises', emoji: '💷' },
    { id: 'above-beyond', label: 'Goes above and beyond', emoji: '🌟' },
    { id: 'friendly', label: 'Friendly and professional', emoji: '😊' },
]

export const PRIMARY_GOALS = [
    {
        id: 'phone-ringing',
        label: 'Get my phone ringing with enquiries',
        emoji: '📞',
        description: 'Focus on lead generation',
    },
    {
        id: 'online-booking',
        label: 'Let customers book online',
        emoji: '📅',
        description: 'Automated scheduling',
    },
    {
        id: 'look-professional',
        label: 'Look more professional than competitors',
        emoji: '🏆',
        description: 'Build credibility',
    },
    {
        id: 'google-ranking',
        label: 'Show up on Google for my area',
        emoji: '📍',
        description: 'Local SEO focus',
    },
    {
        id: 'win-bigger-jobs',
        label: 'Win bigger/better jobs',
        emoji: '💼',
        description: 'Premium positioning',
    },
]
