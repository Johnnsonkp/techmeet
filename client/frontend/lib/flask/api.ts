const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || 'http://localhost:5328';


export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

export const signUpUser = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bio: string;
  job_title: string;
  is_admin: boolean;
  employment_status: string;
  technical_skills: string[];
  address: string;
  profile_photo_url?: string | File | null;
}) => {
  let res;
  // If profile_photo_url is a File, use FormData
  if (data.profile_photo_url && typeof data.profile_photo_url !== 'string') {
    const form = new FormData();
    form.append('first_name', data.first_name);
    form.append('last_name', data.last_name);
    form.append('email', data.email);
    form.append('password', data.password);
    form.append('bio', data.bio);
    form.append('job_title', data.job_title);
    form.append('address', data.address);
    form.append('is_admin', String(data.is_admin));
    form.append('employment_status', data.employment_status);
    form.append('technical_skills', JSON.stringify(data.technical_skills));
    form.append('profile_photo_url', data.profile_photo_url);
    
    res = await fetch(`${BASE_URL}/api/v1/users/sign_up`, {
      method: 'POST',
      body: form,
    });
  } else {
    // JSON fallback
    res = await fetch(`${BASE_URL}/api/v1/users/sign_up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, profile_photo_url: data.profile_photo_url || '' }),
    });
  }
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};


export const GoogleOauthSignIn = async (typedSession: any) => {

  try {
    const res = await fetch(`${BASE_URL}/api/v1/oauth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: typedSession?.user?.email,
        name: typedSession?.user?.name,
        access_token: typedSession.access_token,
        refresh_token: typedSession.refresh_token,
      }),
    });

    const data = await res.json();
    return data

  } catch (err) {
    console.error('Error syncing with Flask backend:', err);
  }
}

export const GoogleOauthSignUp = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bio: string;
  job_title: string;
  is_admin: boolean;
  employment_status: string;
  technical_skills: string[];
  address: string;
  profile_photo_url?: string | File | null;
  refresh_token?: string;
  token?: string;
}) => {

  console.log('GoogleOauthSignUp data:', data);
  
  try {
    const res = await fetch(`${BASE_URL}/api/v1/oauth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, profile_photo_url: data.profile_photo_url || '', refresh_token: data?.refresh_token, access_token: data?.token }),
    });

    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  } catch (err) {
    console.error('Error syncing with Flask backend:', err);
  }
};



// export const SignUpFormData = async (form: any) => {

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/users/sign_up`, {
//       method: 'POST',
//       body: form,
//     });
//     setUploading(false);
//     if (!res.ok) {
//       const data = await res.json().catch(() => ({}));
//       setError(data.message || 'Sign up failed');
//       return;
//     }
//     const result = await res.json();
//     if (!result || !result.token) {
//       setError('Authentication failed: No token returned.');
//       return;
//     }

//   } catch (err) {
//     console.error('Error syncing with Flask backend:', err);
//   }
// }



// export const GoogleOauthSignUp = async (form: any) => {

//   try {
//     const res = await fetch(`${BASE_URL}/api/v1/oauth/google/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: form,
//     });

//     const data = await res.json();
//     return data

//   } catch (err) {
//     console.error('Error syncing with Flask backend:', err);
//   }
// }