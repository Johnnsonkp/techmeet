import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken() {
    return await AsyncStorage.getItem('tm_jwt');
}