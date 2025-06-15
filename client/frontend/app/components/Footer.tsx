import Link from "next/link";
import SocialIcon_1 from "@/components/socialIcons/SocialIcon_1";
import SocialIcon_2 from "@/components/socialIcons/SocialIcon_2";
import SocialIcon_3 from "@/components/socialIcons/SocialIcon_3";
import SocialIcon_4 from "@/components/socialIcons/SocialIcon_4";

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1]"></div>
        <div className="container relative">
          <div className="flex flex-col items-center justify-between py-28 lg:flex-row">
            <div className="flex  space-x-4 sm:justify-center">
              <SocialIcon_1 />
              <SocialIcon_2 />
              <SocialIcon_3 />
              <SocialIcon_4 />
            </div>

            <div className="flex flex-col gap-3 items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
              <Link
                href="https://github.com/Johnnsonkp/techmeet"
                className="rounded-full flex gap-2 font-mono whitespace-nowrap items-center bg-black hover:bg-blue focus:bg-blue py-3 px-6 text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
              <Link
                href="https://github.com/Johnnsonkp/techmeet"
                className="mx-3 hover:underline font-mono"
              >
                Read the documentation
              </Link>
            </div>
          </div>
        </div>

      <div className="py-7 border-t border-gray-200 bg-white z-[9000] absolute w-[100%]">
       <div className="flex items-center justify-center">
         <span className="text-gray-400 ">©<Link href="/">Techmeet</Link> 2025, All rights reserved.</span>
       </div>
      </div>
    </footer>
  );
}
