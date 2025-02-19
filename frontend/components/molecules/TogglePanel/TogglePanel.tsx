// src/components/molecules/TogglePanel/TogglePanel.tsx
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TogglePanelProps } from './TogglePanel.types';

export const TogglePanel = ({ title, children }: TogglePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Typography 
        variant="h6" 
        onClick={toggleOpen} 
        sx={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {title} {isOpen ? '-' : '+'}
      </Typography>
      {isOpen && <Box sx={{ pl: 2 }}>{children}</Box>}
    </Box>
  );
};
