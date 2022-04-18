import type { ReactNode } from 'react';

import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: string;
  date?: string;
};

const Layout = ({
  children,
  title,
  description,
  type,
  date,
}: Props): JSX.Element => (
  <div className="bg-gray-50 dark:bg-gray-800">
    <Meta title={title} type={type} description={description} date={date} />
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
