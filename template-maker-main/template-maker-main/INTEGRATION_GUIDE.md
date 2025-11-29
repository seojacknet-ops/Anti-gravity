# Template Gallery Integration Guide

This guide explains how to integrate the Template Gallery system into an existing Next.js project.

---

## Prerequisites

Your target project must have:
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS

---

## Quick Start (5 Minutes)

### Step 1: Copy Core Files

Copy these folders/files from `template-agent/src/` to your project's `src/` directory:

```
src/
├── types/
│   └── template.ts              # Copy this file
├── lib/
│   ├── template-agent.ts        # Copy this file
│   └── templates-data.ts        # Copy this file
└── components/
    └── template-renderer.tsx    # Copy this file
```

**PowerShell Commands:**
```powershell
# Adjust paths as needed for your project
$source = "c:\Dev\Notes\template-agent\src"
$destination = "c:\Path\To\YourProject\src"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "$destination\types"
New-Item -ItemType Directory -Force -Path "$destination\lib"
New-Item -ItemType Directory -Force -Path "$destination\components"

# Copy files
Copy-Item "$source\types\template.ts" "$destination\types\"
Copy-Item "$source\lib\template-agent.ts" "$destination\lib\"
Copy-Item "$source\lib\templates-data.ts" "$destination\lib\"
Copy-Item "$source\components\template-renderer.tsx" "$destination\components\"
```

### Step 2: Copy Page Routes

Copy the page routes to your app directory:

```
src/app/
├── template/
│   └── [id]/
│       ├── page.tsx             # Template detail page
│       └── preview/
│           └── page.tsx         # Fullscreen preview
└── category/
    └── [slug]/
        └── page.tsx             # Category filter page
```

**PowerShell Commands:**
```powershell
$source = "c:\Dev\Notes\template-agent\src\app"
$destination = "c:\Path\To\YourProject\src\app"

# Copy template routes
Copy-Item -Recurse "$source\template" "$destination\"

# Copy category routes
Copy-Item -Recurse "$source\category" "$destination\"
```

### Step 3: Add Gallery Component to Your App

You have two options:

#### Option A: Dedicated Page
Copy the main gallery page:
```powershell
Copy-Item "$source\page.tsx" "$destination\templates\page.tsx"
```

#### Option B: Embed as Component
Create a gallery component that can be embedded anywhere:

```tsx
// src/components/TemplateGallery.tsx
'use client';

import { TEMPLATES, getAllCategories } from '@/lib/templates-data';
import { CATEGORY_CONFIG } from '@/types/template';
import Link from 'next/link';

interface TemplateGalleryProps {
  showCategories?: boolean;
  limit?: number;
  category?: string;
}

export function TemplateGallery({ 
  showCategories = true, 
  limit,
  category 
}: TemplateGalleryProps) {
  const categories = getAllCategories();
  let templates = category 
    ? TEMPLATES.filter(t => t.category === category)
    : TEMPLATES;
  
  if (limit) {
    templates = templates.slice(0, limit);
  }

  return (
    <div className="py-12">
      {showCategories && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            return (
              <Link
                key={cat}
                href={`/category/${cat}`}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {config.icon} {config.displayName}
              </Link>
            );
          })}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const config = CATEGORY_CONFIG[template.category];
          return (
            <Link
              key={template.id}
              href={`/template/${template.id}`}
              className="group rounded-xl overflow-hidden border hover:shadow-lg transition-all"
            >
              <div 
                className="h-40 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${template.colorScheme.primary}, ${template.colorScheme.secondary})`
                }}
              >
                <div className="text-center text-white">
                  <span className="text-3xl">{config.icon}</span>
                  <p className="font-bold mt-2">{template.businessName}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

Usage:
```tsx
import { TemplateGallery } from '@/components/TemplateGallery';

// Full gallery
<TemplateGallery />

// Limited to 6 templates, no category filter
<TemplateGallery limit={6} showCategories={false} />

// Only restaurant templates
<TemplateGallery category="restaurant" />
```

---

## Integration Patterns

### Pattern 1: Standalone Section

Add templates as a standalone section in your app:

```
your-project/
├── src/app/
│   ├── page.tsx                 # Your homepage
│   ├── templates/               # NEW: Gallery section
│   │   └── page.tsx
│   ├── template/[id]/           # NEW: Template preview
│   │   └── page.tsx
│   └── ... your other routes
```

### Pattern 2: Dashboard Integration

If you have a dashboard with sidebar navigation:

```tsx
// In your dashboard layout or navigation
const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Templates', href: '/dashboard/templates' },  // Add this
  // ... other items
];
```

Then create `/dashboard/templates/page.tsx`:
```tsx
import { TemplateGallery } from '@/components/TemplateGallery';

export default function DashboardTemplates() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Website Templates</h1>
      <TemplateGallery />
    </div>
  );
}
```

### Pattern 3: Modal/Drawer Preview

For previewing templates in a modal without navigation:

```tsx
'use client';

import { useState } from 'react';
import { TemplateRenderer } from '@/components/template-renderer';
import { getTemplateById } from '@/lib/templates-data';

export function TemplatePreviewModal({ 
  templateId, 
  onClose 
}: { 
  templateId: string; 
  onClose: () => void;
}) {
  const template = getTemplateById(templateId);
  
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full"
        >
          ✕
        </button>
        <div className="h-full overflow-auto">
          <TemplateRenderer template={template} />
        </div>
      </div>
    </div>
  );
}
```

---

## Customization

### Changing the Base URL

If your templates should be at a different URL (e.g., `/demos` instead of `/template`):

1. Rename/move the `template` folder in `src/app/`
2. Update links in the gallery components:

```tsx
// Change this:
href={`/template/${template.id}`}

// To this:
href={`/demos/${template.id}`}
```

### Adding Custom Templates

Edit `src/lib/templates-data.ts`:

```tsx
export const TEMPLATES: Template[] = [
  // ... existing templates
  
  // Add your custom template
  {
    id: 'custom-1',
    name: 'My Custom Template',
    description: 'A custom template for my business',
    category: 'agency', // Use existing category or add new one
    tags: ['Custom', 'Agency'],
    thumbnail: '/thumbnails/custom-1.png',
    colorScheme: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      background: '#ffffff',
      text: '#1a1a1a'
    },
    createdAt: new Date(),
    businessName: 'Your Business',
    tagline: 'Your Tagline',
    phone: '(555) 123-4567',
    email: 'hello@example.com',
    address: '123 Street, City, ST 12345',
    sections: [
      // Define your sections
    ]
  }
];
```

### Adding New Categories

Edit `src/types/template.ts`:

```tsx
// Add to TemplateCategory type
export type TemplateCategory =
  | 'restaurant'
  | 'law-firm'
  // ... existing categories
  | 'your-new-category';  // Add here

// Add to CATEGORY_CONFIG
export const CATEGORY_CONFIG = {
  // ... existing configs
  'your-new-category': {
    displayName: 'Your Category',
    icon: '🆕',
    description: 'Description of your category'
  }
};
```

### Styling Adjustments

The template renderer uses inline styles based on `colorScheme`. To adjust the overall look:

1. **Gallery Dark Theme → Light Theme:**
   Edit gallery page, change `bg-gradient-to-br from-slate-900...` to light colors

2. **Template Renderer:**
   Edit `src/components/template-renderer.tsx` to adjust section layouts, spacing, etc.

---

## API Integration (Optional)

If you want templates to be fetched from an API instead of static data:

### Step 1: Create API Route

```tsx
// src/app/api/templates/route.ts
import { TEMPLATES } from '@/lib/templates-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let templates = TEMPLATES;
  
  if (category) {
    templates = templates.filter(t => t.category === category);
  }
  
  if (search) {
    const query = search.toLowerCase();
    templates = templates.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  }
  
  return NextResponse.json(templates);
}
```

### Step 2: Create API Route for Single Template

```tsx
// src/app/api/templates/[id]/route.ts
import { getTemplateById } from '@/lib/templates-data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const template = getTemplateById(params.id);
  
  if (!template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(template);
}
```

### Step 3: Use with React Query or SWR

```tsx
// With SWR
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function useTemplates(category?: string) {
  const url = category 
    ? `/api/templates?category=${category}`
    : '/api/templates';
  
  return useSWR(url, fetcher);
}
```

---

## Troubleshooting

### "Module not found" Errors

Ensure your `tsconfig.json` has the `@/` path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Styling Conflicts

If your project's Tailwind classes conflict:

1. Check for conflicting CSS in `globals.css`
2. The template renderer uses inline styles for colors, so Tailwind conflicts are minimal
3. If needed, wrap the gallery in a CSS reset container

### TypeScript Errors

Ensure you copied `src/types/template.ts` and it's being imported correctly.

### Images Not Loading

The templates use placeholder gradients instead of images. If you add image support:

1. Place images in `public/thumbnails/`
2. Update template data with correct paths
3. Use Next.js `<Image>` component

---

## File Checklist

After integration, you should have:

```
your-project/src/
├── types/
│   └── template.ts              ✓
├── lib/
│   ├── template-agent.ts        ✓
│   └── templates-data.ts        ✓
├── components/
│   ├── template-renderer.tsx    ✓
│   └── TemplateGallery.tsx      ✓ (optional)
└── app/
    ├── templates/               ✓ (or your chosen path)
    │   └── page.tsx
    ├── template/
    │   └── [id]/
    │       ├── page.tsx         ✓
    │       └── preview/
    │           └── page.tsx     ✓
    └── category/
        └── [slug]/
            └── page.tsx         ✓
```

---

## Quick Copy Script

Save this as `copy-templates.ps1` and run it:

```powershell
param(
    [Parameter(Mandatory=$true)]
    [string]$DestinationProject
)

$source = "c:\Dev\Notes\template-agent\src"
$dest = "$DestinationProject\src"

# Create directories
$dirs = @("types", "lib", "components", "app\template\[id]\preview", "app\category\[slug]")
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path "$dest\$dir" | Out-Null
}

# Copy core files
Copy-Item "$source\types\template.ts" "$dest\types\"
Copy-Item "$source\lib\template-agent.ts" "$dest\lib\"
Copy-Item "$source\lib\templates-data.ts" "$dest\lib\"
Copy-Item "$source\components\template-renderer.tsx" "$dest\components\"

# Copy pages
Copy-Item "$source\app\template\[id]\page.tsx" "$dest\app\template\[id]\"
Copy-Item "$source\app\template\[id]\preview\page.tsx" "$dest\app\template\[id]\preview\"
Copy-Item "$source\app\category\[slug]\page.tsx" "$dest\app\category\[slug]\"

Write-Host "✓ Template Gallery files copied successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Create a gallery page at src/app/templates/page.tsx"
Write-Host "  2. Run 'npm run build' to verify no errors"
Write-Host "  3. Customize as needed"
```

**Usage:**
```powershell
.\copy-templates.ps1 -DestinationProject "c:\Path\To\YourProject"
```

---

*Happy Integrating! 🚀*
