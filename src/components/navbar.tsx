'use client';

import { ModeToggle } from './mode-toggle';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageToggle } from './lang-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/guestbook', label: 'guestbook' },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          alexander<span className="text-muted-foreground">konietzko</span>
        </Link>

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ModeToggle />

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </nav>
    </header>
  );
}

const NavMenu = ({
  withSheetClose,
  orientation = 'horizontal',
  ...props
}: ComponentProps<typeof NavigationMenu> & { withSheetClose?: boolean }) => {
  const t = useTranslations('layout.navigation');

  return (
    <NavigationMenu orientation={orientation} {...props}>
      <NavigationMenuList
        className={cn(
          orientation === 'vertical' &&
            '-ms-2 flex-col items-start justify-start',
        )}>
        {navLinks.map((link) => {
          const navLink = (
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href={link.href} />}>
              {t(link.label)}
            </NavigationMenuLink>
          );

          return (
            <NavigationMenuItem key={link.href}>
              {withSheetClose ? (
                <SheetClose nativeButton={false} render={navLink} />
              ) : (
                navLink
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <SheetTrigger
        render={
          <Button
            size="icon"
            variant="outline"
            data-umami-event="mobile-menu-click">
            <Menu />
          </Button>
        }
      />
      <SheetContent className="px-6 py-3">
        <SheetClose
          nativeButton={false}
          render={
            <Link
              href="/"
              className="mt-1 text-lg font-semibold tracking-tight"
            />
          }>
          alexander<span className="text-muted-foreground">konietzko</span>
        </SheetClose>

        <NavMenu
          className="mt-6 [&>div]:h-full"
          orientation="vertical"
          withSheetClose
        />
      </SheetContent>
    </Sheet>
  );
};
