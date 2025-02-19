import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_BASE_URL } from '../../utils/apiConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SettingsResponse | { error: string }>) {
    try {
        const backendUrl = `${BACKEND_BASE_URL}/getmodelsetting`;

        const response = await fetch(backendUrl);
        if (!response.ok) throw new Error('Failed to fetch backend settings');

        const data: SettingsResponse = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ error: 'Unable to fetch settings' });
    }
}
