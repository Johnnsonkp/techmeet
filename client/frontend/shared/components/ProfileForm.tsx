import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useProfileForm(initialState: { name?: string; bio?: string }) {
    const [name, setName] = useState(initialState.name || '');
    const [bio, setBio] = useState(initialState.bio || '');

    const saveProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('tm_jwt');
            const response = await fetch('http://backend:5128/api/v1/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, bio }),
            });
            if (!response.ok) throw new Error('Failed to save profile');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return { name, setName, bio, setBio, saveProfile };
}