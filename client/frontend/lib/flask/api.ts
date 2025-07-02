export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch('http://localhost:5328/api/v1/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  console.log(res.json());
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
  profile_photo_url: string;
}) => {
  const res = await fetch('http://localhost:5328/api/v1/users/sign_up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};
