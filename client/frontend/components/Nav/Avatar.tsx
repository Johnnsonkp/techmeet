export const dynamic = 'force-dynamic'

import Image from 'next/image'
import UnAuthAvatar from './UnAuthAvatar'
import { currentUser } from '../../../lib/auth/user'

const Avatar = async () => {
  const user = await currentUser()

  console.log("user", user?.image)
  return (
    <>
      {user?.name ? (
        <Image
          src={user?.image ?? ''}
          alt="User avatar"
          width={40}
          height={40}
          className="h-full w-full object-cover cursor-pointer"
        />
      ) : (
        <UnAuthAvatar />
      )}
    </>
  )
}

export default Avatar