// components/UploadProjectForm.tsx
import { useState } from 'react';
import { TextField, Button, Typography, Alert, Paper } from '@mui/material';

export function UploadProjectForm({ onProjectUploaded }: { onProjectUploaded: () => void }) {
    const [projectPath, setProjectPath] = useState('');
    const [error, setError] = useState('');
  
    const handleUpload = async () => {
        if (!projectPath.endsWith('.git')) {
            setError('Invalid project. A valid .git folder is required.');
            return;
        }
        setError('');
        setTimeout(() => {
            onProjectUploaded();
        }, 1000);
    };
  
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
                Upload a Git Project
            </Typography>
            <TextField 
                fullWidth 
                label="Enter project path" 
                variant="outlined"
                value={projectPath} 
                onChange={(e) => setProjectPath(e.target.value)}
                sx={{ 
                    my: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey.300',
                        },
                        '&:hover fieldset': {
                            borderColor: 'grey.400',
                        },
                    },
                }}
            />
            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
            <Button 
                onClick={handleUpload} 
                variant="contained" 
                color="primary"
                sx={{ 
                    mt: 2,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                Upload Project
            </Button>
        </Paper>
    );
}