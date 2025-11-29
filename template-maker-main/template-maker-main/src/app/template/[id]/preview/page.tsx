import { getTemplateById, TEMPLATES } from '@/lib/templates-data';
import { notFound } from 'next/navigation';
import { TemplateRenderer } from '@/components/template-renderer';

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((template) => ({
    id: template.id,
  }));
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const template = getTemplateById(id);
  
  if (!template) {
    notFound();
  }

  return <TemplateRenderer template={template} fullScreen />;
}
