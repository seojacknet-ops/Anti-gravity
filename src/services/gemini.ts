import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
// Note: In production, use environment variables for API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

if (!API_KEY) {
    console.warn('⚠️ NEXT_PUBLIC_GEMINI_API_KEY is not set. Logo generation will not work.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiService = {
    /**
     * Generate a logo using Gemini's imagen model
     * @param prompt - The description of the logo to generate
     * @param businessName - Optional business name to include in the prompt
     * @param brandAdjectives - Optional brand adjectives to enhance the prompt
     * @returns Base64 encoded image data
     */
    async generateLogo(
        prompt: string,
        businessName?: string,
        brandAdjectives?: string[]
    ): Promise<string> {
        try {
            // IMPORTANT: The @google/generative-ai SDK doesn't support image generation yet
            // This is a MOCK implementation that generates placeholder SVG logos
            // 
            // TO INTEGRATE REAL IMAGE GENERATION:
            // 1. Use OpenAI DALL-E API: https://platform.openai.com/docs/guides/images
            // 2. Use Stability AI: https://platform.stability.ai/docs/api-reference
            // 3. Use Replicate (Flux, SDXL): https://replicate.com/docs
            // 4. Use Google's Imagen via Vertex AI: https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview

            console.log('🎨 Generating mock logo for:', { prompt, businessName, brandAdjectives });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate a simple SVG logo as placeholder
            const initials = businessName
                ? businessName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
                : 'LG';

            // Color palette based on brand adjectives or random
            const colors = [
                ['#5930A3', '#8B5CF6'], // Purple (default)
                ['#3B82F6', '#60A5FA'], // Blue
                ['#10B981', '#34D399'], // Green
                ['#F59E0B', '#FBBF24'], // Orange
                ['#EF4444', '#F87171'], // Red
                ['#8B5CF6', '#A78BFA'], // Violet
            ];

            const colorPair = colors[Math.floor(Math.random() * colors.length)];

            // Create SVG logo
            const svg = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="white"/>
  <circle cx="200" cy="200" r="150" fill="url(#grad)"/>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="100" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
</svg>`.trim();

            // Convert SVG to base64
            const base64 = btoa(unescape(encodeURIComponent(svg)));

            console.log('✅ Mock logo generated successfully');

            return base64;
        } catch (error) {
            console.error('Error generating logo:', error);
            throw new Error(
                error instanceof Error
                    ? error.message
                    : 'Failed to generate logo. Please try again.'
            );
        }
    },

    /**
     * Generate multiple logo variations
     * @param prompt - The description of the logo to generate
     * @param count - Number of variations to generate (default: 3)
     * @returns Array of base64 encoded images
     */
    async generateLogoVariations(
        prompt: string,
        businessName?: string,
        brandAdjectives?: string[],
        count: number = 3
    ): Promise<string[]> {
        // Generate multiple variations with slight differences
        const variations = await Promise.all(
            Array.from({ length: count }, (_, i) => {
                // Add small delay between variations
                return new Promise<string>(resolve => {
                    setTimeout(async () => {
                        const logo = await this.generateLogo(prompt, businessName, brandAdjectives);
                        resolve(logo);
                    }, i * 500);
                });
            })
        );

        return variations;
    },

    /**
     * Convert base64 image to Blob for file upload
     * @param base64Data - Base64 encoded image data
     * @param mimeType - MIME type of the image (default: image/png)
     * @returns Blob object
     */
    base64ToBlob(base64Data: string, mimeType: string = 'image/png'): Blob {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    },

    /**
     * Convert base64 image to File object
     * @param base64Data - Base64 encoded image data
     * @param filename - Name for the file
     * @param mimeType - MIME type of the image (default: image/png)
     * @returns File object
     */
    base64ToFile(base64Data: string, filename: string, mimeType: string = 'image/png'): File {
        const blob = this.base64ToBlob(base64Data, mimeType);
        return new File([blob], filename, { type: mimeType });
    },
};
