import { useState, useEffect } from 'react';
import { fetchSettings } from '@/services/settingsService';

export function useSettings() {
    const [settings, setSettings] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await fetchSettings();
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
