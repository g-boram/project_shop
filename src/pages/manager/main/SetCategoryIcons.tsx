import Button from '@/components/shared/Button'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import useEditMainIcon from '@/hooks/useEditMainIcon'
import styled from '@emotion/styled'
import Flex from '@/components/shared/Flex'
import ManagerHead from '@/components/shared/ManagerHead'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import { useEffect, useState } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd'

export default function SetCategoryIcons() {
  const { open } = useAlertContext()
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
      <ManagerHead
        title={'Main Category Icon'}
        desc={'메인 페이지 카테고리 아이콘 영역 이미지 순서변경'}
      />
      <SettingContainer>
        <DescBox>
          <Flex direction="column">
            <Text typography="t5">
              * 아이콘을 클릭 하여 희망순서로 드래그 해주세요
            </Text>
            <Text typography="t5">
              * 카테고리 이미지/이름 변경은 개발자에게 문의 해주세요
            </Text>
            <Text typography="t5">
              * 순서변경은 실시간으로 반영되니 신중히 정한 후 저장 해주세요
            </Text>
          </Flex>
        </DescBox>
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
        </DragContainer>
        <Spacing size={30} />
        <Flex justify={'center'}>
          <Button
            disabled={!isEdit}
            size={'large'}
            color="pink"
            full
            onClick={() =>
              open({
                title: '변경된 순서를 저장 하시겠습니까?',
                isCancle: true,
                onCancleClick: () => {},
                onButtonClick: () => {
                  save()
                },
              })
            }
          >
            저장하기
          </Button>
        </Flex>
      </SettingContainer>
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
  height: 400px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  overflow: scroll;
`
const DescBox = styled.div`
  height: auto;
  padding: 10px;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
`
const SettingContainer = styled.div`
  padding: 20px;
  height: 800px;
`
const IconBox = styled.div`
  height: 100px;
  width: 70px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const OrderBadge = styled.div`
  background-color: pink;
  color: white;
  font-weight: bold;
  height: 15px;
  margin-top: 15px;
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
