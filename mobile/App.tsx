import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import Constants from 'expo-constants';

interface Event {
  _id: string;
  title: string;
  date: string;
}

const mockEvents: Event[] = [
  { _id: '1', title: 'Mock Event 1', date: '2025-07-15' },
  { _id: '2', title: 'Mock Event 2', date: '2025-07-20' },
];

const Tab = createBottomTabNavigator();

const EventScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const backendUrl = Constants.expoConfig?.extra?.backendUrl || 'http://localhost:5328';
    fetch(`${backendUrl}/api/v1/events`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events from backend:', error);
        setEvents(mockEvents);
        setError('Failed to load events from backend');
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
            let iconName: 'calendar' | 'person' = 'calendar';
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