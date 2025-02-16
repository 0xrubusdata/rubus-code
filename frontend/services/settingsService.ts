export async function fetchSettings() {
    try {
        const response = await fetch('/api/rubuscodesetting');
        if (!response.ok) throw new Error('Failed to fetch settings');

        return await response.json();
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}
