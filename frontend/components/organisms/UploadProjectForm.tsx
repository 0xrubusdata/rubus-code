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
import { projectUpload } from '@/services/project/projectUploadService';

interface UploadProjectFormProps {
    onProjectUploaded: (data: { type: 'url' | 'local', path: string }) => void;
}

export function UploadProjectForm({ onProjectUploaded }: UploadProjectFormProps) {
    const [projectSource, setProjectSource] = useState<'url' | 'local'>('url');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateAndUpload = async () => {
        setError('');
        setIsLoading(true);
        
        const isURL = inputValue.startsWith('http://') || inputValue.startsWith('https://');
        const isGitRepo = inputValue.endsWith('.git');
    
        if (isURL) {
            if (!isGitRepo) {
                setError("A valid repository URL must end with .git");
                setIsLoading(false);
                return;
            }
        } else {
            const isAbsolutePath =
                inputValue.startsWith('/home/') ||  // Linux
                inputValue.startsWith('/Users/') || // macOS
                /^[A-Za-z]:\\/.test(inputValue);    // Windows (C:\ ou D:\)
    
            if (!isAbsolutePath) {
                setError("Please enter a valid absolute path.");
                setIsLoading(false);
                return;
            }
        }
    
        console.log("Valid input:", inputValue);
        try {
            const response = await projectUpload(isURL ? 'url' : 'local', inputValue);
            if (response) {
                setIsLoading(false);
            }
            onProjectUploaded({ type: isURL ? 'url' : 'local', path: inputValue });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars   
        } catch (err) {
            setError("Failed to upload project");
        } finally {
            setIsLoading(false);
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
                    onChange={(e) => setInputValue(e.target.value)}
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
