import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header title={'Rubus-Code - AI-powered development assistant.'}/>
      <main>{children}</main>
      <Footer copyrightText="© 2025 RubusLab. All rights reserved." />
    </div>
  );
};

export default Layout;