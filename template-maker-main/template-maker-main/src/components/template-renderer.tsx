'use client';

import { Template, CATEGORY_CONFIG } from '@/types/template';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PhoneIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  StarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Premium components
import { 
  GlassCard, 
  PremiumButton, 
  FloatingOrbs, 
  GradientText,
  AnimatedSection,
  AnimatedItem 
} from './ui';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { fadeInUp, staggerContainer, staggerItem, cardHover3D } from '@/lib/premium-effects';

interface TemplateRendererProps {
  template: Template;
  fullScreen?: boolean;
}

export function TemplateRenderer({ template, fullScreen = false }: TemplateRendererProps) {
  const { colorScheme, sections, businessName, tagline, phone, email, address } = template;
  const config = CATEGORY_CONFIG[template.category];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse numeric values from stats for AnimatedCounter
  const parseStatValue = (value: string): { number: number; suffix: string; prefix: string } => {
    const match = value.match(/([^0-9.]*)([0-9.]+)([^0-9.]*)/);
    if (match) {
      return {
        prefix: match[1] || '',
        number: parseFloat(match[2]),
        suffix: match[3] || ''
      };
    }
    return { prefix: '', number: 0, suffix: value };
  };

  return (
    <div className="bg-base text-white font-body">
      {/* ========================================
          PREMIUM NAVIGATION
          ======================================== */}
      <motion.nav
        className="fixed top-0 w-full z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glassmorphic background */}
        <div 
          className={`
            absolute inset-0 transition-all duration-500
            ${scrolled 
              ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.08]' 
              : 'bg-transparent'
            }
          `}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo with glow effect */}
            <motion.a 
              href="#"
              className="group flex items-center gap-3 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/20 to-accent-fuchsia/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-3xl relative z-10">{config.icon}</span>
              <span className="font-display font-bold text-xl text-white relative z-10 tracking-tight">
                {businessName}
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Services', 'About', 'Contact'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {/* Active indicator */}
                  {idx === 0 && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* CTA Section */}
            <div className="hidden md:flex items-center gap-4">
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05, x: 2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline">{phone}</span>
                </motion.a>
              )}
              
              <PremiumButton variant="primary" size="sm">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </PremiumButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Premium Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden mt-4 pb-4 overflow-hidden"
              >
                <div className="p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                  {['Home', 'Services', 'About', 'Contact'].map((item, idx) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="flex items-center justify-between p-4 text-white/80 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="font-medium">{item}</span>
                      <ArrowRightIcon className="w-4 h-4 text-white/40" />
                    </motion.a>
                  ))}
                </div>
                
                {phone && (
                  <motion.a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 p-4 mt-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-accent-violet/20 flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-accent-violet" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Call us now</div>
                      <div className="font-semibold">{phone}</div>
                    </div>
                  </motion.a>
                )}
                
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <PremiumButton variant="primary" size="lg" className="w-full">
                    Get Started
                    <ArrowRightIcon className="w-4 h-4" />
                  </PremiumButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ========================================
          PREMIUM HERO SECTION
          ======================================== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000000 50%, #001a1a 75%, #000000 100%)',
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(217, 70, 239, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(34, 211, 238, 0.15) 0px, transparent 50%)',
        }} />
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-noise opacity-5" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Floating badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm cursor-pointer group"
                whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)' }}
              >
                <SparklesIcon className="w-4 h-4 text-accent-violet animate-pulse" />
                <span className="text-sm text-white/60 font-medium">
                  Trusted by <span className="text-white">10,000+</span> businesses worldwide
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRightIcon className="w-4 h-4 text-white/40 group-hover:text-white/60" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Main headline */}
            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold tracking-tighter mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05 }}
            >
              <GradientText variant="white">
                {businessName}
              </GradientText>
              <br />
              <GradientText variant="animated">
                {tagline}
              </GradientText>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Premium templates designed to convert visitors into customers. 
              Launch your stunning website in minutes, not months.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <PremiumButton variant="primary" size="lg" glow>
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </PremiumButton>
              
              <PremiumButton variant="secondary" size="lg">
                <PlayIcon className="w-5 h-5" />
                Watch Demo
              </PremiumButton>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/40"
            >
              {[
                { icon: CheckCircleIcon, text: 'No credit card required' },
                { icon: CheckCircleIcon, text: '14-day free trial' },
                { icon: CheckCircleIcon, text: 'Cancel anytime' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-2 rounded-full bg-white/40"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================
          PREMIUM STATS SECTION
          ======================================== */}
      {sections.find(s => s.type === 'stats') && (
        <section className="relative py-24 bg-base overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-dots opacity-20" />
          <FloatingOrbs variant="subtle" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <AnimatedSection stagger className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(sections.find(s => s.type === 'stats')?.content as { stats: { value: string; label: string }[] })?.stats?.map((stat, idx) => {
                  const { prefix, number, suffix } = parseStatValue(stat.value);
                  const icons = [SparklesIcon, ShieldCheckIcon, BoltIcon];
                  const colors = ['text-accent-violet', 'text-accent-fuchsia', 'text-accent-cyan'];
                  const Icon = icons[idx % icons.length];
                  
                  return (
                    <motion.div key={idx} variants={staggerItem}>
                      <GlassCard variant="gradient" className="group">
                        {/* Icon */}
                        <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className={`w-7 h-7 ${colors[idx % colors.length]}`} />
                        </div>
                        
                        {/* Number */}
                        <div className="mb-2">
                          <span className="font-display font-bold text-5xl tracking-tighter">
                            <GradientText variant="white">
                              {prefix}
                              <AnimatedCounter end={number} duration={2500} />
                              {suffix}
                            </GradientText>
                          </span>
                        </div>
                        
                        {/* Label */}
                        <p className="text-white/50 font-medium">{stat.label}</p>
                        
                        {/* Hover sparkle */}
                        <motion.div
                          className="absolute top-6 right-6 text-accent-violet opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                          <SparklesIcon className="w-5 h-5" />
                        </motion.div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========================================
          PREMIUM SERVICES SECTION
          ======================================== */}
      {sections.find(s => s.type === 'services') && (
        <div className="relative py-32 overflow-hidden" style={{
          background: 'linear-gradient(180deg, #0a0015 0%, #1a0033 50%, #000000 100%)',
        }}>
          <AnimatedSection stagger className="relative">
            <div className="max-w-7xl mx-auto px-6">
            {/* Section header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                <GradientText variant="white">Our Services</GradientText>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Everything you need to succeed, beautifully crafted.
              </p>
            </motion.div>
            
            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(sections.find(s => s.type === 'services')?.content as { services: { id: number; title: string; description?: string }[] })?.services?.map((service, idx) => (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <GlassCard variant="gradient" className="h-full">
                    {/* Service icon */}
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-violet/20 to-accent-fuchsia/20 flex items-center justify-center border border-white/[0.08] group-hover:scale-110 transition-transform">
                      <span className="text-3xl">
                        {idx === 0 ? '🚀' : idx === 1 ? '⭐' : '🎯'}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent-violet transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/60 mb-6 leading-relaxed">
                      {service.description || `Professional ${service.title.toLowerCase()} services delivered with excellence and care.`}
                    </p>
                    
                    {/* Learn more link */}
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-accent-violet font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      <span>Learn more</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.a>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
          </AnimatedSection>
        </div>
      )}

      {/* ========================================
          PREMIUM TESTIMONIALS SECTION
          ======================================== */}
      {sections.find(s => s.type === 'testimonials') && (
        <div className="relative py-32 overflow-hidden" style={{
          background: 'linear-gradient(135deg, #000000 0%, #001a1a 25%, #1a0033 50%, #000000 100%)',
        }}>
          {/* Background gradient orbs */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-accent-fuchsia/10 rounded-full blur-3xl" />
          
          <AnimatedSection className="relative z-10">
            <div className="max-w-7xl mx-auto px-6">
            {/* Section header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                <GradientText variant="white">Loved by thousands</GradientText>
              </h2>
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid key={i} className="w-6 h-6 fill-current" />
                ))}
                <span className="ml-2 text-white/60 font-medium">4.9/5 from 500+ reviews</span>
              </div>
            </motion.div>
            
            {/* Testimonials grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(sections.find(s => s.type === 'testimonials')?.content as { testimonials: { id: number; name: string; role?: string; text: string; rating?: number }[] })?.testimonials?.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeInUp}
                  custom={idx}
                >
                  <GlassCard>
                    {/* Quote icon */}
                    <div className="mb-4 text-accent-violet/40">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <StarIconSolid key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-white/80 mb-6 leading-relaxed text-lg">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-violet/20 to-accent-fuchsia/20 flex items-center justify-center border border-white/[0.08]">
                        <span className="text-xl font-bold text-white">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/50">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
          </AnimatedSection>
        </div>
      )}

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a0033 0%, #000000 25%, #0a0a2e 50%, #000000 75%, #1a0033 100%)',
      }}>
        {/* Gradient background */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)',
        }} />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -600],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <GradientText variant="animated">Ready to transform?</GradientText>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/60 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of businesses already using our premium templates
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PremiumButton variant="primary" size="lg" glow>
              Get Started Now
              <ArrowRightIcon className="w-5 h-5" />
            </PremiumButton>
            
            <PremiumButton variant="secondary" size="lg">
              Schedule Demo
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          CONTACT SECTION
          ======================================== */}
      <section id="contact" className="relative py-20 border-t border-white/[0.08]" style={{
        background: 'linear-gradient(180deg, #0a0015 0%, #000000 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                <GradientText variant="white">Get in Touch</GradientText>
              </h2>
              <p className="text-white/60 mb-8">
                We'd love to hear from you. Reach out to us and we'll respond as soon as possible.
              </p>
              <div className="space-y-4">
                {phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-accent-violet" />
                    </div>
                    <span className="text-white/70">{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white/70">{email}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-white/70">{address}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-2xl p-8 bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-accent-violet/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-accent-violet/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-accent-violet/50 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <PremiumButton variant="primary" size="lg" className="w-full">
                  Send Message
                </PremiumButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer className="border-t border-white/[0.08] py-12 backdrop-blur-sm" style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, #000000 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{config.icon}</span>
                <span className="font-bold text-xl text-white">{businessName}</span>
              </div>
              <p className="text-white/60">
                {tagline}. We are committed to providing exceptional service and exceeding your expectations.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                {phone && <li>{phone}</li>}
                {email && <li>{email}</li>}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
