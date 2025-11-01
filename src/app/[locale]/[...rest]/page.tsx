import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

// This page is necessary for the not found page to work
export default function CatchAllPage() {
  notFound();
}
