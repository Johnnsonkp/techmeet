import { Button, TextInput, View } from 'react-native';

// import {MultiStepAuth} from '../../shared/components/auth/MultiStepAuth';
// import useProfileForm from '../../client/frontend/shared/components/ProfileForm';

export default function ProfileSetupScreen() {
    // const { name, setName, bio, setBio, saveProfile } = useProfileForm({});

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <TextInput placeholder="Name" onChangeText={setName} value={name} /> */}
            {/* <TextInput placeholder="Bio" onChangeText={setBio} value={bio} /> */}
            {/* <Button title="Save" onPress={saveProfile} /> */}
            Profile Setup Screen
        </View>
    );
}