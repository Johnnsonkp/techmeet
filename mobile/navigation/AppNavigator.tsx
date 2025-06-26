import LoginScreen from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}