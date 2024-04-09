import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'

import { css } from '@emotion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  return (
    <Flex direction="column" align={'center'} justify={'center'}>
      <Spacing size={60} />
      <Flex align={'center'} css={borderLine}>
        <Text typography="t5" bold color="fontBlack">
          브랜드 더 둘러보기
        </Text>
      </Flex>
      <Container>
        <ImgBox onClick={() => setNum(1)}>
          <img
            src="https://cdn.pixabay.com/photo/2015/05/31/13/29/lipstick-791761_1280.jpg"
            alt=""
          />
          <MobileText boxNum={1}>
            <Button color="grey" full onClick={() => navigate('/storeMap')}>
              매장위치 찾기
            </Button>
          </MobileText>
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
              <Text typography="t6">
                프리미엄 매장에서는 메이크업 서비스가 진행됩니다.
              </Text>
              <Spacing size={50} />
              <Button color="grey" full onClick={() => navigate('/storeMap')}>
                바로가기
              </Button>
            </Flex>
          </span>
        </ImgBox>
        <ImgBox onClick={() => setNum(2)}>
          <img
            src="https://cdn.pixabay.com/photo/2016/03/27/23/11/post-it-notes-1284667_1280.jpg"
            alt=""
          />
          <MobileText boxNum={2}>
            <Button color="purple" full onClick={() => navigate('/board')}>
              게시판 이동
            </Button>
          </MobileText>
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
        <ImgBox onClick={() => setNum(3)}>
          <img
            src="https://cdn.pixabay.com/photo/2016/10/22/20/55/makeup-brushes-1761648_1280.jpg"
            alt=""
          />
          <MobileText boxNum={3}>
            <Button color="pink" full onClick={() => navigate('/my')}>
              마이페이지
            </Button>
          </MobileText>
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
        <ImgBox onClick={() => setNum(4)}>
          <img
            src="https://cdn.pixabay.com/photo/2020/02/08/10/35/soap-4829708_1280.jpg"
            alt=""
          />
          <MobileText boxNum={4}>
            <Button color="primary" full onClick={() => navigate('/info')}>
              브랜드 소개
            </Button>
          </MobileText>
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
    </Flex>
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
  height: 230px;
`

const ImgBox = styled.div`
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
    width: 80%;
    display: inline-block;
    font-size: 36px;
    padding: 10px;
    display: block;
  }

  &:hover {
    flex: 1 1 50%;
  }
  &:hover > img {
    width: 100%;
    height: 100%;
  }
`

export default MoveLinkImg
