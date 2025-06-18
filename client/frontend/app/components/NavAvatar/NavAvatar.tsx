import './avatarStyles.css'

// import { ChevronsUpDown } from 'lucide-react';
import Image from 'next/image'
import UnAuthAvatar from "@/components/Nav/UnAuthAvatar";
import { currentUser } from "../../../lib/auth/user";

type Props = {
  small?: boolean;
};

export default async function NavAvatar ({ small = false }: Props) {
  const fallbackSrc = "https://www.svgrepo.com/show/382106/avatar-boy.svg"
  const user = await currentUser()

  return (
    <div className="dropdown relative cursor-pointer">
      <button className="flex items-center space-x-1 focus:outline-none group cursor-pointer">
        <div className="relative">

          <div className={`${small ? "h-6 w-6 mr-2" : "h-9 w-9 mr-1"} rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden avatar-ring`}>
            {user?.name ? (
              <Image
                alt={"user avatar"}
                className="h-full rounded-full object-cover"
                height={small ? 32 : 48}
                width={small ? 32 : 48}
                src={user?.image || fallbackSrc}
              />
              ) : ( <UnAuthAvatar />)}
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-start">
          <span className="text-[13px] font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">{user?.name}</span>
          <span className="text-[11px] text-gray-500">{user?.email}</span>
        </div>
        <i className="fas fa-chevron-down text-xs text-gray-500 hidden lg:inline transition-transform duration-200 group-hover:text-blue-600"></i>
        {/* <ChevronsUpDown className="ml-auto border-2" /> */}
      </button>
    </div>
  );
}
