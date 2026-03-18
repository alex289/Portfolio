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
import { ComponentProps, Fragment } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
  ...props
}: ComponentProps<typeof NavigationMenu> & { withSheetClose?: boolean }) => {
  const t = useTranslations('layout.navigation');

  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [Fragment, {}];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <SheetCloseWrapper {...sheetCloseWrapperProps}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}>
                <Link href={link.href}>{t(link.label)}</Link>
              </NavigationMenuLink>
            </SheetCloseWrapper>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          data-umami-event="mobile-menu-click">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <SheetClose asChild>
          <Link href="/" className="mt-1 text-lg font-semibold tracking-tight">
            alexander<span className="text-muted-foreground">konietzko</span>
          </Link>
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
