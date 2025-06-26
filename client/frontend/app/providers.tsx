  // providers.tsx
  "use client";

import ClientAuthWrapper from "@/components/ClientWrapper";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        <ClientAuthWrapper>
          {children}
        </ClientAuthWrapper>
      </SessionProvider>
  )
}