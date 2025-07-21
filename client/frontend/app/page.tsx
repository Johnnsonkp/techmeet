import { AllPostsCustom } from "@/app/components/Posts";
import BottomBar from "@/components/timer/bottomBar/BottomBar";
import CircularControl from "@/components/control/CircularControl";
import CircularRemote2 from "@/components/hero/CircularRemote2";
import DefaultFooter from "@/components/footer/Footer";
import GetStartedCode from "@/app/components/GetStartedCode";
import { HeroSection } from "@/components/hero/HeroSection";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import RotatingWheel from "@/components/ui/rotatingWheel/RotatingWheel";
import SideBySideIcons from "@/app/components/SideBySideIcons";
import { Suspense } from "react";
import { TimerDisplay } from "@/components/timer/CounterDownTimer";
import {UpcomingEvents} from "@/components/sections/UpcomingEvents";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="relative">

        <HeroSection />
        
        <div className=" flex flex-col items-center">
          <TimerDisplay />
          {/* <CircularRemote2 /> */}
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
      

      <div className="bg-gray-50 h-full">
        <div className="container">
          <UpcomingEvents />
        </div>
      </div>

      
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPostsCustom()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
