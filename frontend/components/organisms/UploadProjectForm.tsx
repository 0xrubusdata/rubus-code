// UploadProjectForm.tsx
import { useState } from 'react';

export function UploadProjectForm({ onProjectUploaded }: { onProjectUploaded: () => void }) {
    const [projectPath, setProjectPath] = useState('');
    const [error, setError] = useState('');
  
    const handleUpload = async () => {
      if (!projectPath.endsWith('.git')) {
        setError('Invalid project. A valid .git folder is required.');
        return;
      }
      setError('');
      
      // Simulate saving project logic
      setTimeout(() => {
        onProjectUploaded(); // Now correctly typed
      }, 1000);
    };
  
    return (
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold">Upload a Git Project</h2>
        <input 
          type="text" 
          placeholder="Enter project path..." 
          value={projectPath} 
          onChange={(e) => setProjectPath(e.target.value)}
          className="w-full p-2 my-2 bg-gray-700 rounded"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button 
          onClick={handleUpload} 
          className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 rounded">
          Upload Project
        </button>
      </div>
    );
}
  