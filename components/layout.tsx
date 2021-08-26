import { ReactNode } from 'react';

import Meta from '@/components/meta';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="bg-white dark:bg-black">
    <Meta />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <Navbar />
    <main
      className="flex flex-col justify-center px-8 bg-white dark:bg-black"
      id="skip">
      {children}
      <Footer></Footer>
    </main>
  </div>
);

export default Layout;
