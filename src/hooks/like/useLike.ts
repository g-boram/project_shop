import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { getLikes, toggleLike } from '@remote/like'
import useUser from '@hooks/auth/useUser'
import { Cosmetic } from '@models/cosmetic'
import { useAlertContext } from '@contexts/AlertContext'

function useLike() {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const { mutate } = useMutation(
    ({ cosmetic }: { cosmetic: Pick<Cosmetic, 'name' | 'id' | 'url'> }) => {
      if (user == null) {
        throw new Error('로그인필요')
      }

      return toggleLike({ cosmetic, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인필요') {
          open({
            title: '로그인이 필요한 기능입니다',
            isCancle: false,
            onCancleClick: () => {},
            onButtonClick: () => {
              navigate('/signin')
            },
          })

          return
        }

        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
          isCancle: false,
          onCancleClick: () => {},
          onButtonClick: () => {
            // 다른 액션 ~
          },
        })
      },
    },
  )

  return { data, mutate }
}

export default useLike
