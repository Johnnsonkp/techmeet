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
