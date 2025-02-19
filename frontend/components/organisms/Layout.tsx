import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header title={'Rubus-Code - AI-powered development assistant.'} />
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Footer copyrightText={`© ${currentYear} RubusLab. All rights reserved.`} />
      </Box>
    </Box>
  );
};

export default Layout;