// components/ProjectSettings.tsx
import { Typography, Paper, Box } from '@mui/material';
import { useProjectStore } from '@/store/useProjectStore';
import { TogglePanel } from '@/components/molecules/TogglePanel/TogglePanel';
import { TreeAccordion } from '@/components/molecules/TreeAccordion/TreeAccordion';

export function ProjectSettings() {
    const { projectData } = useProjectStore();
    if (!projectData) return null;

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
                Project Settings
            </Typography>
            <Typography color="grey.600">
                <Box>
                    <Typography variant="h6">Paramètres du projet</Typography>
                    <TogglePanel title="Language">
                        <pre>{JSON.stringify(projectData.language, null, 2)}</pre>
                    </TogglePanel>
                    <TogglePanel title="Dependencies">
                        <pre>{JSON.stringify(projectData.dependencies, null, 2)}</pre>
                    </TogglePanel>
                    <TogglePanel title="Tree">
                        <TreeAccordion node={projectData.tree} />
                    </TogglePanel>
                </Box>
            </Typography>
        </Paper>
    );
}