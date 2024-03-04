import { useCallback, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useAlertContext } from '@contexts/AlertContext'
import { useMainCategoryIcons } from './data/useMainData'
import { updateOrder } from './data/useStore'
import { Icon } from '@/models/managerMain'

function useEditMainIcon() {
  const { data } = useMainCategoryIcons()
  const [updatedLikes, setUpdatedLikes] = useState<Icon[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const { open } = useAlertContext()
  const client = useQueryClient()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      newItems.forEach((like, index) => {
        like.order = index + 1
      })

      return newItems
    })
  }, [])

  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData('mainCategoryIcons', updatedLikes)
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요',
        onButtonClick: () => {
          setIsEdit(false)
        },
      })
    }
  }

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}

export default useEditMainIcon
