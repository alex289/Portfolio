import { getTranslations } from 'next-intl/server';
import SocialIcons from './social-icons';
import { Link } from '@/i18n/navigation';

const navLinks = [
  { href: '/privacy', label: 'privacy' },
  { href: '/imprint', label: 'imprint' },
] as const;

export async function Footer() {
  const t = await getTranslations('layout.footer');
  const year = new Date().getFullYear();
  return (
    <footer className="*:px-4 *:md:px-6">
      <div className="flex flex-col gap-6 py-6">
        <ul className="text-muted-foreground flex flex-wrap gap-4 text-sm font-medium md:gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                className="hover:text-primary transition-colors"
                href={link.href}>
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-muted-foreground mb-2 flex flex-col-reverse items-center justify-between gap-4 border-t py-4 text-sm sm:flex-row">
        <p>
          &copy; {year} Alexander Konietzko. {t('rights')}
        </p>

        <SocialIcons />
      </div>
    </footer>
  );
}
