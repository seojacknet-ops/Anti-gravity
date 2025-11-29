'use client';

import { Template, CATEGORY_CONFIG, TemplateCategory } from '@/types/template';
import { TEMPLATES } from '@/lib/templates-data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryPageClientProps {
  category: TemplateCategory;
  config: typeof CATEGORY_CONFIG[TemplateCategory];
  templates: Template[];
  allCategories: TemplateCategory[];
}

export function CategoryPageClient({ category, config, templates, allCategories }: CategoryPageClientProps) {
  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-transparent to-cyan-950/30" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-16 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to All Templates
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/[0.1] flex items-center justify-center">
              <span className="text-5xl">{config.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {config.displayName} Templates
                </span>
              </h1>
              <p className="text-white/50 text-lg">{config.description}</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Templates Grid */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p 
            className="text-white/40 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {templates.length} templates available
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="w-full"
              >
                <Link
                  href={`/template/${template.id}/preview`}
                  className="group block w-full rounded-2xl overflow-hidden bg-gradient-to-b from-black/60 via-black/50 to-black/60 border-2 border-white/20 backdrop-blur-xl hover:border-violet-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/50 hover:-translate-y-2 shadow-2xl shadow-black/70"
                >
                  {/* Template Preview Header */}
                  <div 
                    className="h-56 min-h-[224px] relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${template.colorScheme.primary || '#8B5CF6'}, ${template.colorScheme.secondary || '#D946EF'})`
                    }}
                  >
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{config.icon}</div>
                        <div className="font-bold text-2xl mb-2 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{template.businessName}</div>
                        <div className="text-white/90 drop-shadow-lg">{template.tagline}</div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/20 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold border border-white/20 flex items-center gap-2">
                        View Template
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6 bg-gradient-to-b from-black/60 to-black/80 border-t border-white/[0.1]">
                    <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-violet-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span 
                          key={tagIdx}
                          className="px-3 py-1 bg-white/[0.08] rounded-lg text-xs text-white/70 border border-white/[0.1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="relative z-10 py-16 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-2xl font-bold text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Other Categories
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {allCategories
              .filter(c => c !== category)
              .map((c, idx) => {
                const catConfig = CATEGORY_CONFIG[c];
                const count = TEMPLATES.filter(t => t.category === c).length;
                return (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <Link
                      href={`/category/${c}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300"
                    >
                      <span>{catConfig.icon}</span>
                      <span className="font-medium">{catConfig.displayName}</span>
                      <span className="text-white/40">({count})</span>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

