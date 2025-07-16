import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

interface LoginScreenProps {
    onLogin: Dispatch<SetStateAction<string | null>>;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        const backendUrl = Constants.expoConfig?.extra?.backendUrl || 'http://localhost:5328';

        try {
            const response = await fetch(`${backendUrl}/api/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.token);
                Alert.alert('Success', 'Logged in successfully');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});

export default LoginScreen;