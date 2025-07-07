// import { getToken } from '../utils/getToken';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState } from 'react';

// export default function useProfileForm({ onSave }: { onSave?: (data: { job_title: string; bio: string }) => void }) {
//     const [name, setName] = useState('');
//     const [bio, setBio] = useState('');

//     const saveProfile = async () => {
//         const token = await AsyncStorage.getItem('tm_jwt');
//         await fetch('http://backend:5328/api/v1/profile', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ job_title: name, bio }),
//         });
//         if (onSave) onSave({ job_title: name, bio });
//     };

//     return { name, setName, bio, setBio, saveProfile };
// }