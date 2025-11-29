# AI Logo Generator - Setup & Usage Guide

## 🎨 Overview

The AI Logo Generator is a powerful feature that uses **Google's Gemini AI** (imagen-3.0 model) to create professional, custom logos for your business in seconds. This feature is integrated into the SEOJack Client Portal to provide a seamless branding experience.

## ✨ Features

- **AI-Powered Generation**: Uses Google's latest Gemini imagen model
- **Smart Prompts**: Enhanced prompts for professional logo results
- **Multiple Variations**: Generate up to 3 variations at once
- **Instant Preview**: See your logos immediately
- **Download & Save**: Download locally or save to Media Vault
- **Context-Aware**: Uses your business name and brand adjectives
- **Prompt Suggestions**: Quick-start templates for inspiration

## 🚀 Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist):

   ```bash
   cp env.example .env.local
   ```

2. Add your Gemini API key:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:

   ```bash
   npm run dev
   ```

### 3. Verify Setup

1. Navigate to the dashboard
2. Click "AI Logo Generator" in Quick Actions
3. If you see a warning about the API key, check your `.env.local` file

## 📖 Usage Guide

### Accessing the Logo Generator

**Option 1: From Dashboard**

- Click the "AI Logo Generator" card in Quick Actions
- Features a sparkle icon with purple gradient

**Option 2: Direct URL**

- Navigate to `/logo-generator`

### Generating Your First Logo

1. **Enter a Description**
   - Be specific about shapes, styles, and themes
   - Example: "A geometric abstract symbol with clean lines and a tech feel"

2. **Use Quick Ideas** (Optional)
   - Click any suggestion to auto-fill the prompt
   - Customize as needed

3. **Generate**
   - Click "Generate Logo" for a single logo
   - Click "3 Variations" for multiple options

4. **Select & Save**
   - Click on any generated logo to select it
   - Download locally or save to Media Vault

### Tips for Best Results

✅ **Do:**

- Be specific about shapes and styles
- Mention your industry for relevance
- Use descriptive adjectives (modern, elegant, bold)
- Try multiple variations
- Keep descriptions concise but detailed

❌ **Don't:**

- Request text or words in the logo (icon/symbol only)
- Use overly complex descriptions
- Expect photorealistic images (logos are symbolic)

### Example Prompts

**Tech Company:**

```
A minimalist circuit board pattern forming an abstract shape, modern and futuristic
```

**Restaurant:**

```
An elegant fork and spoon crossed, with organic flowing lines, sophisticated
```

**Fitness Brand:**

```
A bold geometric mountain peak with strong angles, energetic and powerful
```

**Creative Agency:**

```
An abstract paint brush stroke forming a dynamic shape, artistic and vibrant
```

## 🏗️ Architecture

### File Structure

```
src/
├── lib/
│   └── services/
│       └── gemini.service.ts       # Gemini AI integration
├── components/
│   └── features/
│       └── ai/
│           └── LogoGenerator.tsx   # Main component
└── app/
    └── logo-generator/
        └── page.tsx                # Dedicated page
```

### Service Layer (`gemini.service.ts`)

**Key Functions:**

- `generateLogo()` - Generate a single logo
- `generateLogoVariations()` - Generate multiple variations
- `base64ToBlob()` - Convert AI output to Blob
- `base64ToFile()` - Convert AI output to File

**Prompt Enhancement:**
The service automatically enhances your prompt with:

- Professional logo design instructions
- Brand personality (if provided)
- Technical requirements (scalability, contrast, etc.)
- Style guidelines (minimalist, centered, etc.)

### Component (`LogoGenerator.tsx`)

**Props:**

- `businessName?: string` - Auto-populated from onboarding
- `brandAdjectives?: string[]` - Brand personality traits
- `onLogoGenerated?: (url: string) => void` - Callback when saved

**State Management:**

- Uses React hooks for local state
- Integrates with Firebase Storage for persistence
- Toast notifications for user feedback

## 🔧 Integration Points

### 1. Dashboard Quick Actions

Located in `src/components/features/dashboard/QuickActions.tsx`

- Added as first action with sparkle icon
- Purple gradient styling for prominence

### 2. Onboarding Flow (Future)

Can be integrated into Step 4 (Visual Direction):

```tsx
import { LogoGenerator } from '@/components/features/ai/LogoGenerator'

// In Step4VisualDirection.tsx
<LogoGenerator
  businessName={data.businessInfo.businessName}
  brandAdjectives={data.visualDirection.brandAdjectives}
  onLogoGenerated={(url) => updateVisualDirection({ logoUrl: url })}
/>
```

### 3. Media Vault

Generated logos are automatically:

- Uploaded to Firebase Storage
- Saved to user's Media Vault
- Available for download and reuse

## 🎯 API Details

### Gemini Model

- **Model ID**: `imagen-3.0-generate-001`
- **Type**: Text-to-image generation
- **Output**: Base64-encoded PNG images
- **Rate Limits**: Check Google AI Studio for current limits

### API Call Flow

```
User Input → Prompt Enhancement → Gemini API → Base64 Image → 
Display Preview → User Selection → Firebase Upload → Media Vault
```

## 🔒 Security & Best Practices

### API Key Security

- ✅ Use environment variables (`NEXT_PUBLIC_GEMINI_API_KEY`)
- ✅ Never commit `.env.local` to version control
- ✅ Use different keys for dev/staging/production
- ❌ Don't hardcode API keys in source code

### Error Handling

The service includes comprehensive error handling:

- API key validation
- Network error handling
- Invalid response handling
- User-friendly error messages

### Rate Limiting

Consider implementing:

- Client-side request throttling
- Usage tracking per user
- Quota warnings

## 🐛 Troubleshooting

### "API Key not set" Warning

**Problem**: Console shows API key warning
**Solution**:

1. Check `.env.local` exists
2. Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set
3. Restart dev server

### "Failed to generate logo" Error

**Possible Causes:**

1. Invalid API key → Check Google AI Studio
2. Rate limit exceeded → Wait and retry
3. Network issues → Check internet connection
4. Invalid prompt → Simplify description

### Logo Not Saving to Vault

**Check:**

1. Firebase Storage is configured
2. User is authenticated
3. Storage permissions are correct
4. Network connection is stable

## 📊 Performance Considerations

### Generation Time

- Single logo: ~5-10 seconds
- 3 variations: ~15-30 seconds
- Depends on API response time

### Optimization Tips

- Show loading states clearly
- Implement request caching (future)
- Consider background generation (future)
- Add retry logic for failed requests

## 🚀 Future Enhancements

### Planned Features

- [ ] Logo style presets (minimalist, bold, elegant)
- [ ] Color palette integration
- [ ] Logo editing tools (resize, crop, filters)
- [ ] Batch generation (10+ variations)
- [ ] Logo history and favorites
- [ ] A/B testing for logo selection
- [ ] Integration with brand guidelines
- [ ] Export in multiple formats (SVG, PNG, JPG)

### Advanced Integration

- [ ] Automatic logo application to templates
- [ ] Brand kit generation (logo + colors + fonts)
- [ ] Social media asset generation
- [ ] Business card mockups
- [ ] Website favicon generation

## 📝 Code Examples

### Basic Usage

```tsx
import { LogoGenerator } from '@/components/features/ai/LogoGenerator'

function MyPage() {
  return (
    <LogoGenerator
      businessName="Acme Corp"
      brandAdjectives={['Modern', 'Trustworthy']}
      onLogoGenerated={(url) => console.log('Logo saved:', url)}
    />
  )
}
```

### Programmatic Generation

```typescript
import { geminiService } from '@/lib/services/gemini.service'

async function generateCustomLogo() {
  try {
    const base64Image = await geminiService.generateLogo(
      'A mountain peak with sunrise',
      'Adventure Co',
      ['Bold', 'Energetic']
    )
    
    // Convert to file
    const file = geminiService.base64ToFile(
      base64Image,
      'logo.png'
    )
    
    // Upload to storage
    const url = await storageService.uploadFile(
      'media/user-id/logo.png',
      file
    )
    
    console.log('Logo URL:', url)
  } catch (error) {
    console.error('Generation failed:', error)
  }
}
```

## 📚 Resources

- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Imagen Model Guide](https://ai.google.dev/docs/imagen)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🤝 Support

If you encounter issues:

1. Check this documentation
2. Review console errors
3. Verify API key and configuration
4. Contact the development team

---

**Built with ❤️ using Google Gemini AI and Next.js**
