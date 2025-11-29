import { getTemplateById, TEMPLATES } from '@/lib/templates-data';
import { CATEGORY_CONFIG } from '@/types/template';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TemplateRenderer } from '@/components/template-renderer';

interface TemplatePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((template) => ({
    id: template.id,
  }));
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { id } = await params;
  const template = getTemplateById(id);
  
  if (!template) {
    notFound();
  }

  const config = CATEGORY_CONFIG[template.category];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Gallery
              </Link>
              <span className="text-gray-600">|</span>
              <span className="text-white font-semibold">{template.name}</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {config.icon} {config.displayName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/template/${id}/preview`}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium"
              >
                Full Screen Preview
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Template Info Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">Template Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-400">Business Name</span>
                  <p className="text-white">{template.businessName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Tagline</span>
                  <p className="text-white">{template.tagline}</p>
                </div>
                <div>
                  <span className="text-gray-400">Category</span>
                  <p className="text-white">{config.icon} {config.displayName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Sections</span>
                  <p className="text-white">{template.sections.length} sections</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">Color Scheme</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-white/20"
                    style={{ backgroundColor: template.colorScheme.primary }}
                  />
                  <span className="text-gray-400 text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-white/20"
                    style={{ backgroundColor: template.colorScheme.secondary }}
                  />
                  <span className="text-gray-400 text-sm">Secondary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-white/20"
                    style={{ backgroundColor: template.colorScheme.accent }}
                  />
                  <span className="text-gray-400 text-sm">Accent</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <TemplateRenderer template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
