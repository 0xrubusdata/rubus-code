import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_BASE_URL } from '../../utils/apiConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean; message?: string } | { error: string }>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const backendUrl = `${BACKEND_BASE_URL}/uploadProject`;

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) throw new Error('Failed to upload project');

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error uploading project:", error);
        res.status(500).json({ error: 'Unable to upload project' });
    }
}
