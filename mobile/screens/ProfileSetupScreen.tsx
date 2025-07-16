import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

interface ProfileSetupScreenProps {
    token: string | null;
}

const ProfileSetupScreen = ({ token }: ProfileSetupScreenProps) => {
    const [jobTitle, setJobTitle] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!token) {
            Alert.alert('Error', 'Please log in first');
            return;
        }
        setLoading(true);
        const backendUrl = Constants.expoConfig?.extra?.backendUrl || 'http://localhost:5328';

        try {
            const response = await fetch(`${backendUrl}/api/v1/profiles/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    job_title: jobTitle,
                    skills: JSON.parse(skills || '[]'),
                    description,
                    personality: {},
                    tags: [],
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Profile created/updated successfully');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Failed to save profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Setup</Text>
            <TextInput
                style={styles.input}
                placeholder="Job Title"
                value={jobTitle}
                onChangeText={setJobTitle}
            />
            <TextInput
                style={styles.input}
                placeholder='Skills (JSON array, e.g., ["JavaScript", "Python"])'
                value={skills}
                onChangeText={setSkills}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title={loading ? 'Saving...' : 'Save Profile'} onPress={handleSubmit} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});

export default ProfileSetupScreen;