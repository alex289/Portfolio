import { useTranslations } from 'next-intl';

export default function ReadingTime({
  readingMinutes,
}: {
  readingMinutes: number;
}) {
  const t = useTranslations('blog');
  return <>{t('reading-time', { minutes: readingMinutes })}</>;
}
