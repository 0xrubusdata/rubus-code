// src/pages/index.js
import { Box, Typography, Paper } from '@mui/material';
import { UploadProjectForm } from '@/components/organisms/UploadProjectForm';
import { AISettings } from '@/components/organisms/AISettings';
import { ProjectSettings } from '@/components/organisms/ProjectSettings';
import { MainBoard } from '@/components/organisms/MainBoard';
import { useProjectStore } from '@/store/useProjectStore';

export default function Home() {
  const { projectLoaded, setProjectLoaded } = useProjectStore();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        minHeight: 0, // Important so that the content can scroll
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={1}
        sx={{
          width: '25%',
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'grey.200',
          overflow: 'auto', // To allow sidebar scrolling
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="grey.800">
          Settings
        </Typography>
        <AISettings />
        {projectLoaded && <ProjectSettings />}
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          overflow: 'auto', // To allow scrolling of the main content
        }}
      >
        {!projectLoaded ? (
          <UploadProjectForm onProjectUploaded={() => setProjectLoaded()} />
        ) : (
          <MainBoard />
        )}
      </Box>
    </Box>
  );
}