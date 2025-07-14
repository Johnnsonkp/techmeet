import HeaderUnderline from "./HeaderUnderline";
import Link from "next/link";
import NavAvatar from "./NavAvatar/NavAvatar";
import NavDropDown from "./NavAvatar/NavDropDown";
import SearchBar from "@/components/search/SearchBar";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    // <header className={`fixed z-50 h-19 inset-0 bg-white/80 flex items-center backdrop-blur-lg `}>
    <div className="w-full">
      {/* <div className="flex-col justify-between align-middle w-full mt-3"> */}
      <div className="flex-col justify-between align-middle w-full">
      <div className="custom-nav-container py-6 px-2 sm:px-6 h-[90%]">
        <div className="flex items-center justify-between gap-5">
          
          <div className="flex">
            <Link className="flex items-center gap-2 mr-0" href="/">
              <span className="text-xl sm:text-2xl pl-2 font-semibold">
                {settings?.title || "techmeet."}
              </span>
            </Link>

            <SearchBar />
          </div>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono"
            >
              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <Link href="/events" className="hover:underline">
                  Events
                </Link>
              </li>
              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>

              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <Link href="/blog" className="hover:underline py-2 px-4 ">
                  Blog
                </Link>
              </li>
              
              <li className="cursor-pointer sm:before:w-[1px] sm:before:bg-gray-200 before:block sm:gap-4 md:gap-6">
                <NavAvatar />
              </li>

            </ul>
          </nav>
        </div>
      </div>
      <HeaderUnderline />
      </div>
      </div>
    // </header>
  );
}
