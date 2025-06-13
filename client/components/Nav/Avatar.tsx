import UnAuthAvatar from './UnAuthAvatar'
import { currentUser } from '@/lib/auth/user'

const Avatar = async () => {
  const user = await currentUser()

  return (
    <>
      {user?.name ? (
        <img
          src={user?.image ?? ''}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <UnAuthAvatar />
      )}
    </>
  )
}

export default Avatar