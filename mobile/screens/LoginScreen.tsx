import React from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useFlaskSync } from '../hooks/useFlaskSync';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: 'your_google_client_id.apps.googleusercontent.com',
        androidClientId: 'your_android_client_id.apps.googleusercontent.com',
        iosClientId: 'your_ios_client_id.apps.googleapis.com',
    });

    useFlaskSync(response);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login to TechMeet</Text>
            <Button title="Login with Google" onPress={() => promptAsync()} />
        </View>
    );
}