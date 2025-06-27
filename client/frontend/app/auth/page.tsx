"use client";
import React from "react";
import { MultiStepAuth } from "../../components/auth/MultiStepAuth";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSyncFlask } from "../hooks/useSyncFlask";

const AuthPage: React.FC = () => <MultiStepAuth />;

export default AuthPage;
