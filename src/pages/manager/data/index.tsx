import styled from '@emotion/styled'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { LuClipboardEdit } from 'react-icons/lu'
import { FaBottleDroplet } from 'react-icons/fa6'

export default function SettingDataPage() {
  return (
    <DataContainer>
      {/* 코스메틱 데이터 관리로 이동 */}
      <Link to={'/manager/data/setCosmeticData'} css={linkStyle}>
        <Flex align={'center'} css={titleStyle}>
          <FaBottleDroplet size={20} />
          <Spacing size={10} direction="horizontal" />
          <Text typography="t4" bold>
            화장품 데이터 관리
          </Text>
        </Flex>
        <DescBox>
          <Text typography="t5">- 신규 화장품 정보 등록</Text>
          <Spacing size={10} />
          <Text typography="t5">- 기존 화장품 데이터 삭제</Text>
          <Spacing size={10} />
          <Text typography="t5">- 기존 화장품 데이터 수정</Text>
        </DescBox>
      </Link>
      {/* 게시판 데이터 관리로 이동 */}
      <Link to={'/manager/data/setBoardData'} css={linkStyle}>
        <Flex align={'center'} css={titleStyle}>
          <LuClipboardEdit size={20} />
          <Spacing size={10} direction="horizontal" />
          <Text typography="t4" bold>
            게시판 데이터 관리
          </Text>
        </Flex>
        <DescBox>
          <Text typography="t5">- 공지사항 게시글 등록</Text>
          <Spacing size={10} />
          <Text typography="t5">- 안내사항 등록</Text>
          <Spacing size={10} />
          <Text typography="t5">- 기존 게시글 삭제</Text>
          <Spacing size={10} />
          <Text typography="t5">- 게시글 댓글 삭제 및 숨기기</Text>
        </DescBox>
      </Link>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
`

const DescBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px 10px;
  border-radius: 5px;
  height: auto;
  width: 97%;
  margin-top: 20px;
`

const titleStyle = css`
  padding: 10px 0px;
`
const linkStyle = css`
  min-height: 80px;
  width: 800px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: #ddd;
`
