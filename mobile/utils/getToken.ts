import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export async function getToken(key: string) {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await AsyncStorage.getItem(key);
  }
};