import { Box, Typography, Paper } from '@mui/material';
import { UploadProjectForm } from '@/components/organisms/UploadProjectForm';
import { AISettings } from '@/components/organisms/AISettings';
import { ProjectSettings } from '@/components/organisms/ProjectSettings';
import { MainBoard } from '@/components/organisms/MainBoard';
import { useProjectStore } from '@/store/useProjectStore';

export default function Home() {
  const { projectLoaded, setProjectLoaded } = useProjectStore();

  return (
    <Box display="flex" height="100vh" bgcolor="background.default">
      {/* Sidebar */}
      <Paper 
        elevation={1}
        sx={{ 
          width: '25%', 
          p: 3, 
          bgcolor: 'background.paper',
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="grey.800">Settings</Typography>
        <AISettings />
        {projectLoaded && <ProjectSettings />}
      </Paper>

      {/* Main Content */}
      <Box flex={1} p={4}>
        {!projectLoaded ? <UploadProjectForm onProjectUploaded={() => setProjectLoaded()} /> : <MainBoard />}
      </Box>
    </Box>
  );
}