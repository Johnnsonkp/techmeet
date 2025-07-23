"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AuthImageSection } from "../../../components/auth/AuthImageSection";
import { AuthStep1 } from "../../../components/auth/AuthStep1";
import { Loader2Icon } from "lucide-react";
import { loginUser } from "@/lib/flask/api";
import { syncAuthToLocal } from "@/lib/auth/syncAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    mode: "signin",
    email: "",
    password: "",
  });
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const authUser = useAuthStore((s) => s.user);
  // const onboardingRequired = localStorage.getItem('tm_onboarding_required') || null;
   const [error, setError] = useState<string | null>(null);

  const updateFormData = (updates: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const handleSignIn = async () => {
  
    setLoading(true);
    setError(null);

    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
        toast.error(`Login failed: ${result.error}`);
        return;
      }

      console.log('result', result);

      syncAuthToLocal(
        {
          token: result.token,
          user: result.user,
          provider: result?.provider || "credentials",
        },
        setAuth
      );

      // localStorage.setItem('tm_onboarding_required', 'false');
      
      toast.success("Login successful");
      return router.push("/dashboard");
    } catch (err) {
      toast.error(`Login failed ${err}` );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onboardingRequired = localStorage.getItem('tm_onboarding_required')

    if (
      authUser &&
      authUser.id && onboardingRequired === 'false' &&
      (pathname === "/auth/signin" || pathname === "/auth/signup")
    ) {
      console.log('User already authenticated, redirecting to dashboard', authUser);
      router.push('/dashboard');
    }
  }, [authUser, pathname, router])

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex min-h-screen">
        {/* Left Image Section */}
        <AuthImageSection />
        
         {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
              <AuthStep1
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleSignIn}
                loading={loading}
                setLoading={setLoading}
              />
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;

