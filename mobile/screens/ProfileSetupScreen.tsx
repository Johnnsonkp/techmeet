import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileSetupScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Profile Setup Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
});

export default ProfileSetupScreen;