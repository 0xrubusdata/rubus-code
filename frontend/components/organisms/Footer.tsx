// components/Footer.tsx
import { Box, Typography } from '@mui/material';

interface FooterProps {
    copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
    return (
        <Box 
            component="footer" 
            sx={{
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'grey.200',
                p: 2,
                textAlign: 'center'
            }}
        >
            <Typography variant="body2" color="grey.500">
                {copyrightText}
            </Typography>
        </Box>
    );
};

export default Footer;
