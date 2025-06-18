import { AllPosts, AllPostsCustom } from "@/app/components/Posts";

import BottomBar from "@/components/timer/bottomBar/BottomBar";
import DefaultFooter from "@/components/footer/Footer";
import GetStartedCode from "@/app/components/GetStartedCode";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import SideBySideIcons from "@/app/components/SideBySideIcons";
import { Suspense } from "react";
import { TimerDisplay } from "@/components/timer/CounterDownTimer";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="relative">
        <div className="relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
          <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
          <div className="container">
            <div className="relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-4 items-center">
                <div className="text-md leading-6 prose uppercase py-1 px-3 bg-white font-mono italic">
                  coming soon...
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black">
                  <Link
                    className="underline decoration-brand hover:text-brand underline-offset-8 hover:underline-offset-4 transition-all ease-out"
                    href="https://sanity.io/"
                  >
                    Tech
                  </Link>
                  +
                  <Link
                    className="underline decoration-black text-framework underline-offset-8 hover:underline-offset-4 transition-all ease-out"
                    href="https://nextjs.org/"
                  >
                    Events
                  </Link>
                  +
                  <Link
                    className="underline decoration-black text-framework underline-offset-8 hover:underline-offset-4 transition-all ease-out"
                    href="https://nextjs.org/"
                  >
                    Connections
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center">
          {/* <SideBySideIcons /> */}
          <TimerDisplay />
          <div className="container relative mx-auto max-w-2xl pb-20 pt-10 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center">
            <div className="prose sm:prose-lg md:prose-xl xl:prose-2xl text-gray-700 prose-a:text-gray-700 font-light text-center">
            Techmeet helps you source, book, and connect at tech meetups, hackathons, and conferences — all in one place.
              {settings?.description && (
                <PortableText value={settings.description} />
              )}
              <div className="flex items-center flex-col gap-4">
                <BottomBar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            {/* <Suspense>{await AllPosts()}</Suspense> */}
            <Suspense>{await AllPostsCustom()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
