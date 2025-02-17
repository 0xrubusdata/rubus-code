import { useState } from 'react';
import { 
    TextField, 
    Button, 
    Typography, 
    Alert, 
    Paper, 
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from '@mui/material';

interface UploadProjectFormProps {
    onProjectUploaded: (data: { type: 'url' | 'local', path: string }) => void;
}

export function UploadProjectForm({ onProjectUploaded }: UploadProjectFormProps) {
    const [projectSource, setProjectSource] = useState<'url' | 'local'>('url');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDirectory, setSelectedDirectory] = useState<FileSystemDirectoryHandle | null>(null);

    const validateAndUpload = async () => {
        setError('');
        setIsLoading(true);

        try {
            if (projectSource === 'local') {
                if (!selectedDirectory) {
                    throw new Error('Please select a directory');
                }

                try {
                    const gitDir = await selectedDirectory.getDirectoryHandle('.git', { create: false });
                    if (!gitDir) {
                        throw new Error('No .git directory found');
                    }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars    
                } catch (err) {
                    throw new Error('This directory is not a Git repository. Please select a directory containing a .git folder.');
                }
            } else {
                // Validation basique d'URL pour les projets distants
                if (!inputValue.startsWith('http://') && !inputValue.startsWith('https://') && !inputValue.endsWith('.git')) {
                    throw new Error('Please enter a valid URL starting with http:// or https://');
                }
            }

            // Ici, vous pouvez appeler votre API backend
            // await api.uploadProject({ type: projectSource, path: inputValue });
            
            onProjectUploaded({ type: projectSource, path: inputValue });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDirectorySelect = async () => {
        try {
            // @ts-expect-error - L'API showDirectoryPicker n'est pas encore dans les types TypeScript
            const dirHandle = await window.showDirectoryPicker();
            setSelectedDirectory(dirHandle);
            setInputValue(dirHandle.name);
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                // L'utilisateur a annulé la sélection
                return;
            }
            setError('Failed to select directory');
            setSelectedDirectory(null);
            setInputValue('');
        }
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

            <RadioGroup
                value={projectSource}
                onChange={(e) => {
                    setProjectSource(e.target.value as 'url' | 'local');
                    setInputValue('');
                    setError('');
                    setSelectedDirectory(null);
                }}
                sx={{ mb: 2 }}
            >
                <FormControlLabel value="url" control={<Radio />} label="Repository URL" />
                <FormControlLabel value="local" control={<Radio />} label="Local Directory" />
            </RadioGroup>

            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField 
                    fullWidth 
                    label={projectSource === 'url' ? "Enter repository URL" : "Local directory path"}
                    variant="outlined"
                    value={inputValue} 
                    onChange={(e) => {
                        if (projectSource === 'url') {
                            setInputValue(e.target.value);
                        }
                    }}
                    InputProps={{
                        readOnly: projectSource === 'local'
                    }}
                    sx={{ 
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
                {projectSource === 'local' && (
                    <Button 
                        variant="outlined"
                        onClick={handleDirectorySelect}
                        sx={{ minWidth: '120px' }}
                    >
                        Browse
                    </Button>
                )}
            </Box>

            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
            
            <Button 
                onClick={validateAndUpload} 
                variant="contained" 
                color="primary"
                disabled={isLoading || !inputValue}
                sx={{ 
                    mt: 2,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Upload Project'}
            </Button>
        </Paper>
    );
}
