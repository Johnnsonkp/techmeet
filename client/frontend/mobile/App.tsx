import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { createClient } from '@sanity/client';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import Constants from 'expo-constants';

const client = createClient({
    projectId: Constants.expoConfig?.extra?.sanityProjectId || 'abc123',
    dataset: Constants.expoConfig?.extra?.sanityDataset || 'production',
    apiVersion: '2025-07-11',
    useCdn: true,
});

const Tab = createBottomTabNavigator();

const EventScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        client
            .fetch('*[_type == "event"]{title, _id, date}')
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setError('Failed to load events');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>TechMeet Events</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title} - {item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Events') {
                            iconName = 'calendar';
                        } else if (route.name === 'Profile') {
                            iconName = 'person';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Events" component={EventScreen} />
                <Tab.Screen name="Profile" component={ProfileSetupScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    error: { fontSize: 18, color: 'red', textAlign: 'center' },
});

export default App;