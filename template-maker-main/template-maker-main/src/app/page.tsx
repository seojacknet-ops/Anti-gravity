'use client';

import { TEMPLATES, getAllCategories } from '@/lib/templates-data';
import { CATEGORY_CONFIG } from '@/types/template';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const categories = getAllCategories();
  const templateCount = TEMPLATES.length;

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-transparent to-cyan-950/30" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SparklesIcon className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/70">AI-Powered Template Generation</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Template
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore {templateCount}+ professionally designed website templates for every business niche.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="#templates"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105"
              >
                Browse Templates
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.05] backdrop-blur-sm text-white font-semibold rounded-full border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
              >
                View Categories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
              {[
                { text: `${templateCount}+ Templates` },
                { text: `${categories.length} Categories` },
                { text: '100% Responsive' },
                { text: 'AI Generated' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Categories Section */}
      <section id="categories" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Browse by Category
              </span>
            </h2>
            <p className="text-white/50 text-lg">Find the perfect template for your industry</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, idx) => {
              const config = CATEGORY_CONFIG[category];
              const count = TEMPLATES.filter(t => t.category === category).length;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={`/category/${category}`}
                    className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    <div className="text-4xl mb-3">{config.icon}</div>
                    <div className="text-white font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                      {config.displayName}
                    </div>
                    <div className="text-white/40 text-sm">{count} templates</div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="relative z-10 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                All Templates
              </span>
            </h2>
            <p className="text-white/50 text-lg">Click any template to see the full preview</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template, idx) => {
              const config = CATEGORY_CONFIG[template.category];
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  className="w-full"
                >
                  <Link
                    href={`/template/${template.id}/preview`}
                    className="group block w-full rounded-2xl overflow-hidden bg-gradient-to-b from-black/60 via-black/50 to-black/60 border-2 border-white/20 backdrop-blur-xl hover:border-violet-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/50 hover:-translate-y-2 shadow-2xl shadow-black/70"
                  >
                  {/* Template Preview Header */}
                  <div 
                    className="h-52 min-h-[208px] relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${template.colorScheme.primary || '#8B5CF6'}, ${template.colorScheme.secondary || '#D946EF'})`
                    }}
                  >
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                        <div className="text-center text-white">
                          <div className="text-5xl mb-3 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{config.icon}</div>
                          <div className="font-bold text-xl mb-1 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{template.businessName}</div>
                          <div className="text-sm text-white/90 drop-shadow-lg">{template.tagline}</div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/90 border border-white/10">
                          {config.displayName}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/20 transition-colors duration-500 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold border border-white/20">
                          View Template →
                        </span>
                      </div>
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-6 bg-gradient-to-b from-black/60 to-black/80 border-t border-white/[0.1]">
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-violet-400 transition-colors">
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
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-fuchsia-950/20 to-cyan-950/30" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to get started?
              </span>
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Choose from {templateCount}+ premium templates and launch your website today.
            </p>
            <Link
              href="#templates"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105"
            >
              Explore All Templates
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            Generated by the Autonomous Template Agent • {templateCount}+ Premium Templates Available
          </p>
        </div>
      </footer>
    </div>
  );
}
