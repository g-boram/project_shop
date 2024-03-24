import useLike from '@/hooks/like/useLike'

const MyLikes = () => {
  const { data } = useLike()
  console.log('like data', data)

  return <>MyLikes</>
}

export default MyLikes
