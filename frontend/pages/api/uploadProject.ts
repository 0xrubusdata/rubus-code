import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_BASE_URL } from '../../utils/apiConfig';
import { TreeNode } from '@/interfaces/settings-project.interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ language: string; dependencies: JSON; tree: TreeNode } | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const backendUrl = `${BACKEND_BASE_URL}/project/upload`;

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) throw new Error('Failed to upload project');
        
        const responseApiCall = await response.json();
    
        res.status(200).json(responseApiCall.data);
    } catch (error) {
        console.error("Error uploading project:", error);
        res.status(500).json({ error: 'Unable to upload project' });
    }
}
