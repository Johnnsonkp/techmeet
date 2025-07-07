import { AllPostsCustom } from "@/app/components/Posts";
import BottomBar from "@/components/timer/bottomBar/BottomBar";
import CircularControl from "@/components/control/CircularControl";
import DefaultFooter from "@/components/footer/Footer";
import GetStartedCode from "@/app/components/GetStartedCode";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import RotatingWheel from "@/components/ui/rotatingWheel/RotatingWheel";
import SideBySideIcons from "@/app/components/SideBySideIcons";
import { Suspense } from "react";
import { TimerDisplay } from "@/components/timer/CounterDownTimer";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  // const GlassCard: React.FC<GlassCardProps> = ({item, metric, className}) => {
  //     const styles = {
  //       glassCard: {
  //         backdropFilter: "blur(12px)",
  //         background: "rgba(0, 0, 0, 0.15)",
  //       }
  //     }

  //   return <div style={styles.glassCard} className={`${className} glass-card p-0 rounded-full text-center transform hover:-translate-y-2 transition-all w-28 h-28 border-white border-4 flex-row justify-center items-center`}>
  //     <div className="text-4xl font-bold text-white">{item}</div>
  //     <div className="text-xl text-white">{metric}</div>
  //   </div>
  // }

  // const GlassCard: React.FC<GlassCardProps> = ({item, metric, className}) => {
  //   const [activeIndex, setActiveIndex] = useState(0);
  //   const wheelRef = useRef<HTMLDivElement>(null);
  //   const controls = useAnimation();

  //   return <div className="relative w-full h-screen overflow-hidden bg-black text-white">
  //     {/* Video background */}
  //     <video
  //       src={features[activeIndex].video}
  //       autoPlay
  //       muted
  //       loop
  //       className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
  //     />

  //     {/* Hero content */}
  //     <div className="relative z-10 flex flex-col items-center justify-center h-full">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
  //         {features[activeIndex].name}
  //       </h1>
  //     </div>

  //     {/* Rotating Wheel */}
  //     <div className="absolute bottom-12 right-12 z-20">
  //       <div
  //         ref={wheelRef}
  //         className="relative w-[240px] h-[240px] rounded-full border-4 border-gray-600 rotate-slow"
  //       >
  //         {features.map((feature, index) => {
  //           const angle = (index / features.length) * 360;
  //           const radius = 120;
  //           const rad = (angle * Math.PI) / 180;
  //           const x = radius * Math.cos(rad);
  //           const y = radius * Math.sin(rad);
  //           const isActive = index === activeIndex;

  //           return (
  //             <motion.div
  //               key={index}
  //               className={cn(
  //                 "absolute w-12 h-12 rounded-lg flex items-center justify-center bg-white text-black transition-all",
  //                 isActive && "scale-125 bg-purple-500 text-white"
  //               )}
  //               style={{
  //                 transform: `translate(${x + 96}px, ${y + 96}px)`
  //               }}
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //             >
  //               {feature.icon}
  //             </motion.div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // }

  const styles = {
    glassCard: {
      backdropFilter: "blur(12px)",
      background: "rgba(0, 0, 0, 0.15)",
    }
  }

  return (
    <>
      <div className="relative">
        <div className="relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
          <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
          <div style={styles.glassCard} className="border-2 border-white w-[90%] h-[95%] absolute top-0 left-20 rounded-lg"></div>
          {/* <GlassCard className="absolute bottom-0 right-8 rounded-full"/> */}
          {/* <RotatingWheel /> */}
          <CircularControl />
          <div className="container">
            <div className="relative min-h-[70vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
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
            <Suspense>{await AllPostsCustom()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
