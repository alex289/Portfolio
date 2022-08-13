import { ReactNode, Suspense } from 'react';

import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAtom } from 'jotai';
import { isCommandPaletteOpenAtom } from './CommandPalette';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  blogTranslation?: string;
  tags?: string[];
};

const Layout = ({
  children,
  title,
  description,
  type,
  date,
  blogTranslation,
  tags,
}: Props): JSX.Element => {
  const [isCommandPaletteOpen] = useAtom(isCommandPaletteOpenAtom);

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <Meta
        title={title}
        type={type}
        description={description}
        date={date}
        tags={tags}
      />
      <a href="#skip" className="skip-nav">
        Skip to content
      </a>
      <header
        className={`frost-effect sticky top-0 ${
          isCommandPaletteOpen ? '' : 'z-50'
        }`}>
        <Navbar blogTranslation={blogTranslation} />
      </header>
      <main
        className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800 md:mt-6"
        id="skip">
        {children}
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
