import { Typography, Paper, CircularProgress } from '@mui/material';
import { useSettings } from '@/hooks/useSettings';

export function AISettings() {
    const { settings, loading, error } = useSettings();

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

            {loading ? (
                <CircularProgress size={24} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : settings ? (
                <>
                    <Typography variant="body1" color="grey.600">
                        <strong>Model Type:</strong> {settings.model.type}
                    </Typography>
                    <Typography variant="body1" color="grey.600">
                        <strong>Model Name:</strong> {settings.model.name}
                    </Typography>
                    <Typography variant="body1" color="grey.600">
                        <strong>API URL:</strong> {settings.model.api_url || settings.model.url}
                    </Typography>
                </>
            ) : (
                <Typography color="grey.600">No settings available</Typography>
            )}
        </Paper>
    );
}
