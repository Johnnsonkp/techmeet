import React, { useEffect } from 'react'

import { useAuthStore } from '@/store/authStore'

export async function getCalendar() {
  const token = useAuthStore((state) => state.access_token);
  const refresh_token = useAuthStore((state) => state.refresh_token);
  const BASE_URL = 'http://localhost:5328';
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log("token", token)
  console.log("refresh_token", refresh_token)

  // if(loading){
  //   return
  // }

  // try {
  //   const response = await fetch(`${BASE_URL}/api/v1/google_calendar/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //         access_token: token,
  //     }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     console.log('response ok', data);
  //     setData(data);
  //     setLoading(false);
  //   } 
  //   // return data;
  // } catch (error) {
  //   console.error('Network error:', error);
  //   throw error;
  // }


   return { data };
}