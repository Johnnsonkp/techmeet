'use client';

import { LargeText } from "../ui/textDisplay/LargeText";
import React from 'react'
import { useAuthStore } from '@/store/authStore';

function LargeAuthUserName() {
  const user = useAuthStore((s) => s.user);
  
  return (
    <LargeText text={`Welcome, ${user?.name || ""}`}/>
  )
}

export default LargeAuthUserName