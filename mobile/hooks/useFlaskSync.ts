import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export function useFlaskSync(response: any) {
    useEffect(() => {
        const sync = async () => {
            if (response?.type === 'success') {
                const { access_token } = response.authentication;
                const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${access_token}` },
                }).then(res => res.json());

                const flaskRes = await fetch('http://backend:5328/api/v1/oauth_connection/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: userInfo.email,
                        access_token,
                    }),
                });
                const data = await flaskRes.json();
                if (data.token) await AsyncStorage.setItem('tm_jwt', data.token);
            }
        };
        sync();
    }, [response]);
}