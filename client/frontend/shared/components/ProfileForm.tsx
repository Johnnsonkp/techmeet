import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function useProfileForm({
    onSave
}: {
    onSave?: (data: { job_title: string; bio: string }) => void
}) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    const saveProfile = async () => {
        try {
            setLoading(true);
            const token = await SecureStore.getItemAsync('tm_jwt');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('http://backend:5328/api/v1/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ job_title: name, bio }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (onSave) {
                onSave({ job_title: name, bio });
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        bio,
        setBio,
        saveProfile,
        loading
    };
}