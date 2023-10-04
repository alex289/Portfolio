import { notFound } from 'next/navigation';

// This page is necessary for the not found page to work
export default function CatchAllPage() {
  notFound();
}
