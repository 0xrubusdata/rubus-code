// components/AISettings.tsx
import { Typography, Paper } from '@mui/material';

export function AISettings() {
    return (
        <Paper 
            elevation={0}
            sx={{
                p: 3,
                mt: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2
            }}
        >
            <Typography variant="h6" color="grey.800" gutterBottom>
                AI Settings
            </Typography>
            <Typography color="grey.600">
                Configure your AI preferences here.
            </Typography>
        </Paper>
    );
}