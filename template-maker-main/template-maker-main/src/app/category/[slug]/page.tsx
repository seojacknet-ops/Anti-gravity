import { getTemplatesByCategory, getAllCategories, TEMPLATES } from '@/lib/templates-data';
import { CATEGORY_CONFIG, TemplateCategory } from '@/types/template';
import { notFound } from 'next/navigation';
import { CategoryPageClient } from './CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = slug as TemplateCategory;
  
  if (!CATEGORY_CONFIG[category]) {
    notFound();
  }

  const config = CATEGORY_CONFIG[category];
  const templates = getTemplatesByCategory(category);
  const allCategories = getAllCategories();

  return (
    <CategoryPageClient 
      category={category}
      config={config}
      templates={templates}
      allCategories={allCategories}
    />
  );
}
