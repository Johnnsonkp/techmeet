export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch('http://localhost:5000/login', {
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
  profile_photo_url: string;
  job_title: string;
  address: string;
  is_admin: boolean;
  employment_status: string;
  technical_skills: string[];
}) => {
  const res = await fetch('http://localhost:5000/sign_up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};
