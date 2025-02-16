// components/MainBoard.tsx
import { Typography, Paper } from '@mui/material';

export function MainBoard() {
    return (
        <Paper 
            elevation={0}
            sx={{
                p: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2
            }}
        >
            <Typography variant="h5" color="grey.800" gutterBottom>
                AI Chat
            </Typography>
            <Typography color="grey.600">
                Chat with the AI model about your project.
            </Typography>
            {/* Ici vous pouvez ajouter votre composant de chat */}
        </Paper>
    );
}
