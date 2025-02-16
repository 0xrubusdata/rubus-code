import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SettingsResponse | { error: string }>) {
    try {
        // Utilisation de process.env pour éviter une valeur hardcodée
        const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const backendUrl = `${backendBaseUrl}/rubuscodesetting`;

        const response = await fetch(backendUrl);
        if (!response.ok) throw new Error('Failed to fetch backend settings');

        const data: SettingsResponse = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ error: 'Unable to fetch settings' });
    }
}
