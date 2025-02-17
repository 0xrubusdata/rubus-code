import { fetchAISettings } from '@/services/models/settingsAIService';
import { useState, useEffect } from 'react';

export function useAISettings() {
    const [settings, setSettings] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await fetchAISettings();
                setSettings(data);
            } catch (err) {
                setError('Error fetching settings');
            } finally {
                setLoading(false);
            }
        }

        loadSettings();
    }, []);

    return { settings, loading, error };
}
