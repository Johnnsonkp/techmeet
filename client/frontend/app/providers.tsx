  // providers.tsx
  "use client";

import { AuthHydrator } from "./providers/AuthHydrator";
import ClientAuthWrapper from "@/components/ClientWrapper";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        {/* <ClientAuthWrapper> */}
          <AuthHydrator />
            {children}
        {/* </ClientAuthWrapper> */}
      </SessionProvider>
  )
}