import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const BrandInfoPage = () => {
  return (
    <InfoWrapper>
      <HeadTitle title="회사소개" desc="Boramy 브랜드의 회사소개글 입니다." />
      <InfoContainer>
        <Flex css={imgLow1}>
          <img
            src={`${process.env.PUBLIC_URL}/images/info/infoImg-2.jpg`}
            alt=""
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/info/infoImg-1.jpg`}
            alt=""
            css={borderImg}
          />
        </Flex>

        <Flex css={imgLow2}>
          <img
            src={`${process.env.PUBLIC_URL}/images/info/infoImg-5.jpg`}
            alt=""
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/info/infoImg-6.jpg`}
            alt=""
          />
        </Flex>
      </InfoContainer>
    </InfoWrapper>
  )
}

const InfoWrapper = styled.div`
  min-height: 100vh;
`
const InfoContainer = styled.div`
  @media (max-width: 600px) {
    max-width: 100vw;
  }
  @media (min-width: 600px) {
    max-width: 1400px;
    min-width: 1200px;
  }
`

const borderImg = css`
  border-radius: 40px;
`
const imgLow1 = css`
  width: 100%;

  img {
    width: 50%;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`
const imgLow2 = css`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;

  & img {
    width: 50%;
    height: 600px;
    object-fit: contain;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`
export default BrandInfoPage
