import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'

import { css } from '@emotion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FaMapLocationDot } from 'react-icons/fa6'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaUserCheck } from 'react-icons/fa6'
import { BsFillInfoCircleFill } from 'react-icons/bs'

const MoveLinkImg = () => {
  const navigate = useNavigate()
  const [num, setNum] = useState(0)

  const MobileText = styled.div<{ boxNum: number }>`
    position: absolute;
    margin-top: 100px;
    margin-left: 8px;
    display: ${(props) => (props.boxNum === num ? 'block' : 'none')};

    @media (min-width: 600px) {
      display: none;
    }
  `
  const WebText = styled.div`
    position: absolute;
    margin-top: 100px;
    margin-left: 10px;

    @media (max-width: 600px) {
      display: none;
    }
  `

  const ImgBox = styled.div<{ boxNum: number }>`
    flex: 1;
    overflow: hidden;
    display: flex;
    transition: 0.5s;
    margin: 0 1%;
    border-radius: 15px;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
      position: relative;
    }

    > span {
      width: 100%;
      display: inline-block;
      font-size: 36px;
      padding: 10px;
      display: block;
    }

    &:hover {
      flex: 1 1 10%;
    }
    &:hover > img {
      width: 50%;
      height: 50%;
      cursor: pointer;
    }

    @media (max-width: 600px) {
      min-height: 100px;
    }
  `

  return (
    <>
      <Flex direction="column" align={'center'} justify={'center'}>
        <Spacing size={60} />
        <Flex align={'center'} css={borderLine}>
          <Text typography="t5" bold color="fontBlack">
            브랜드 더 둘러보기
          </Text>
        </Flex>
        <Container>
          <ImgBox boxNum={1} onClick={() => setNum(1)}>
            <span>
              <Flex direction="column" align={'flex-end'}>
                <Text typography="t2" bold>
                  매장위치 찾기{' '}
                </Text>
                <Spacing size={30} />
                <Text typography="t6">오프라인 매장에서 </Text>
                <Spacing size={10} />
                <Text typography="t6">직접 제품을 경험해보세요</Text>
                <Spacing size={10} />
                <Text typography="t6">일반 / 프리미엄 매장.</Text>
                <Spacing size={50} />
                <Button color="grey" full onClick={() => navigate('/storeMap')}>
                  바로가기
                </Button>
              </Flex>
            </span>
          </ImgBox>
          <ImgBox boxNum={2} onClick={() => setNum(2)}>
            <span>
              <Flex direction="column" align={'flex-end'}>
                <Text typography="t2" bold>
                  공지사항 & 게시판 & QnA{' '}
                </Text>
                <Spacing size={30} />
                <Text typography="t6">함께 소통하는 게시판을 이용해보세요</Text>
                <Spacing size={10} />
                <Text typography="t6">
                  새로운 정보와 핫한 소식을 확인할 수 있습니다.
                </Text>
                <Spacing size={10} />
                <Text typography="t6">
                  댓글 기능과 실시간 채팅으로 더 다양해졌습니다.
                </Text>
                <Spacing size={50} />
                <Button color="purple" full onClick={() => navigate('/board')}>
                  바로가기
                </Button>
              </Flex>
            </span>
          </ImgBox>
          <ImgBox boxNum={3} onClick={() => setNum(3)}>
            <span>
              <Flex direction="column" align={'flex-end'}>
                <Text typography="t2" bold>
                  마이 페이지{' '}
                </Text>
                <Spacing size={30} />
                <Text typography="t6">마이페이지 에서는</Text>
                <Spacing size={10} />
                <Text typography="t6">내가 찜한 제품과 장바구니 내역을 등</Text>
                <Spacing size={10} />
                <Text typography="t6">나의 정보를 확인할 수 있습니다.</Text>
                <Spacing size={50} />
                <Button color="pink" full onClick={() => navigate('/my')}>
                  바로가기
                </Button>
              </Flex>
            </span>
          </ImgBox>
          <ImgBox boxNum={4} onClick={() => setNum(4)}>
            <span>
              <Flex direction="column" align={'flex-end'}>
                <Text typography="t2" bold>
                  브랜드 소개
                </Text>
                <Spacing size={30} />
                <Text typography="t6">BoRamy 브랜드가</Text>
                <Spacing size={10} />
                <Text typography="t6">
                  고객님을 생각하는 마음, 소개글, 활동내용등의
                </Text>
                <Spacing size={10} />
                <Text typography="t6"> 브랜드 정보를 확인할 수 있습니다.</Text>
                <Spacing size={50} />
                <Button color="primary" full onClick={() => navigate('/info')}>
                  바로가기
                </Button>
              </Flex>
            </span>
          </ImgBox>
        </Container>
        <MobileContainer>
          <Spacing size={20} />
          <Flex justify={'space-between'} align={'center'}>
            <FaMapLocationDot size={40} />
            <Flex direction="column" align={'flex-end'}>
              <Text typography="t4" bold>
                매장위치 찾기{' '}
              </Text>
              <Spacing size={10} />
              <Button
                color="grey"
                size="medium"
                onClick={() => navigate('/storeMap')}
              >
                바로가기
              </Button>
            </Flex>
          </Flex>
          <Spacing size={20} />
          <Flex justify={'space-between'} align={'center'}>
            <FaChalkboardTeacher size={40} />
            <Flex direction="column" align={'flex-end'}>
              <Text typography="t4" bold>
                공지사항 & 게시판 & QnA{' '}
              </Text>
              <Spacing size={10} />
              <Button
                color="purple"
                size="medium"
                onClick={() => navigate('/board')}
              >
                바로가기
              </Button>
            </Flex>
          </Flex>
          <Spacing size={20} />
          <Flex justify={'space-between'} align={'center'}>
            <FaUserCheck size={40} />
            <Flex direction="column" align={'flex-end'}>
              <Text typography="t4" bold>
                마이 페이지{' '}
              </Text>
              <Spacing size={10} />
              <Button
                color="pink"
                size="medium"
                onClick={() => navigate('/my')}
              >
                바로가기
              </Button>
            </Flex>
          </Flex>
          <Spacing size={20} />
          <Flex justify={'space-between'} align={'center'}>
            <BsFillInfoCircleFill size={40} />
            <Flex direction="column" align={'flex-end'}>
              <Text typography="t4" bold>
                브랜드 소개
              </Text>
              <Spacing size={10} />
              <Button
                color="primary"
                size="medium"
                onClick={() => navigate('/info')}
              >
                바로가기
              </Button>
            </Flex>
          </Flex>
          <Spacing size={20} />
        </MobileContainer>
      </Flex>
    </>
  )
}

const borderLine = css`
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #303030;

  @media (max-width: 600px) {
    width: 95%;
  }
`
const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0 60px 0;
  box-sizing: border-box;
  height: 250px;

  @media (max-width: 600px) {
    display: none;
  }
`
const MobileContainer = styled.div`
  width: 90vw;
  height: 400px;

  @media (min-width: 600px) {
    display: none;
  }
`

export default MoveLinkImg
