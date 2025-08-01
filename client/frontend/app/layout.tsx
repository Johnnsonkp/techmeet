import "./globals.css";

import * as demo from "@/sanity/lib/demo";

import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { VisualEditing, toPlainText } from "next-sanity";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import {HeaderClientWrapper} from "./providers/HeaderClientWrapper";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import SectionDivider from "@/components/divider/SectionDivider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { draftMode } from "next/headers";
import { handleError } from "./client-utils";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { settingsQuery } from "@/sanity/lib/queries";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <Providers>
          {/* <section className="min-h-screen pt-20"> */}
          <section className="min-h-screen">
            <SectionDivider />
            {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
                <VisualEditing />
              </>
            )}
            {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
            <SanityLive onError={handleError} />

            <HeaderClientWrapper>
              <Header />
            </HeaderClientWrapper>
            
            <main className="">{children}</main>
            <Footer />
          </section>
        <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
