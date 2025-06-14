export async function verifyFlaskUser(email: string) {
  const res = await fetch('http://localhost:5000/api/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${email}`,
    },
  })

  if (!res.ok) throw new Error('Flask verification failed')
  return await res.json()
}