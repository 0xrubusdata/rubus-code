export const projectUpload = async (type: 'url' | 'local', path: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch('/api/uploadProject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, path })
        });
        
        if (!response.ok) {
            throw new Error('Failed to upload project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading project:', error);
        throw error;
    }
};
