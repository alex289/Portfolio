import type { ReactNode } from 'react';

import Meta from '@/components/meta';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="bg-gray-50 dark:bg-gray-800">
    <Meta />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <div className="sticky-nav bg-gray-50 dark:bg-gray-800">
      <Navbar />
    </div>
    <main
      className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800"
      id="skip">
      {children}
    </main>
    <Footer></Footer>
  </div>
);

export default Layout;
