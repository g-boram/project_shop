import Button from '@/components/shared/Button'
import HeadTitle from '@/components/shared/HeadTitle'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import useEditMainIcon from '@/hooks/useEditMainIcon'
import styled from '@emotion/styled'
import Flex from '@/components/shared/Flex'

export default function SetCategoryIcons() {
  const { data, isEdit, reorder, save } = useEditMainIcon()

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return
    }

    const from = result.source.index
    const to = result.destination?.index

    reorder(from, to)
  }
  return (
    <ManagerPageLayout>
      <HeadTitle title={'Main Category Icon'} />

      <DragContainer>
        <DragDropContext onDragEnd={handleDragEndDrop}>
          <StrictModeDroppable droppableId="likes">
            {(droppableProps) => (
              <ul
                ref={droppableProps.innerRef}
                {...droppableProps.droppableProps}
              >
                <Flex>
                  {data?.map((icon, index) => {
                    return (
                      <Draggable
                        key={icon.id}
                        draggableId={icon.id}
                        index={index}
                      >
                        {(draggableProps) => (
                          <li
                            ref={draggableProps.innerRef}
                            {...draggableProps.draggableProps}
                            {...draggableProps.dragHandleProps}
                          >
                            <IconBox>
                              <IconWrapper>
                                <img src={icon.url} alt={icon.name} />
                                <span>{icon.name}</span>
                              </IconWrapper>
                              <OrderBadge>{icon.order}</OrderBadge>
                            </IconBox>
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                </Flex>
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
        {/* {isEdit ? <FixedBottomButton label="저장하기" onClick={save} /> : null} */}
      </DragContainer>
      <Flex justify={'center'}>
        <Button disabled={!isEdit} onClick={save}>
          저장하기
        </Button>
      </Flex>
    </ManagerPageLayout>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return (
    <Droppable direction="horizontal" {...props}>
      {children}
    </Droppable>
  )
}

const DragContainer = styled.div`
  display: flex;
  background-color: pink;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  height: 300px;
`

const IconBox = styled.div`
  margin: 5px;
  height: 100px;
  width: 70px;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const OrderBadge = styled.div`
  background-color: red;
  color: white;
  font-weight: bold;
  height: 15px;
  width: 15px;
  text-align: center;
  padding: 8px;
  border-radius: 50%;
`
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  & img {
    height: 60px;
  }
  & span {
    font-size: 13px;
    padding-top: 10px;
  }
`
