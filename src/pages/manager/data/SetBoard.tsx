import ManagerBoardList from '@/components/manager/ManagerBoardList'
import Flex from '@/components/shared/Flex'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import ManagerHead from '@/components/shared/ManagerHead'
import Text from '@/components/shared/Text'
import styled from '@emotion/styled'

const SetBoardData = () => {
  return (
    <ManagerPageLayout>
      <ManagerHead title={'Set Board Data'} />
      <SettingContainer>
        <NoticeBox>
          <Flex direction="column">
            <Text typography="t6">
              ⭐️ 삭제전 한번더 확인하세요 삭제된 게시물/댓글 복구되지않습니다.
            </Text>
            <Text typography="t6">
              ⭐️ 공지사항/이벤트 등록은 정해진 양식만 올려주세요
            </Text>
          </Flex>
        </NoticeBox>
        <ManagerBoardList />
      </SettingContainer>
    </ManagerPageLayout>
  )
}

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 800px;
  width: 100%;
`

const NoticeBox = styled.div`
  background-color: white;
  padding: 10px;
  width: 80%;
  border: 2px solid #f9ecec;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 50px;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 20px;
`
export default SetBoardData
