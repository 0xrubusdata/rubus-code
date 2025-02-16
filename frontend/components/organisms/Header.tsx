// components/Header.tsx
import { AppBar, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <AppBar 
            position="static" 
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'grey.200'
            }}
        >
            <Toolbar>
                <Typography variant="h6" color="grey.800">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
