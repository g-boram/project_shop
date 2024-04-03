import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const BeautyYoutube = () => {
  return (
    <YoutubeContainer>
      <img
        src={`${process.env.PUBLIC_URL}/images/main/YouTube_Banner.gif`}
        alt=""
      />
      <Link to={'https://www.youtube.com/'} target={'_blank'}>
        <Flex css={ImgWrapper}>
          <ImgBox>
            <img
              src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img1.jpg`}
              alt=""
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img2.jpg`}
              alt=""
            />
          </ImgBox>
          <ImgBox>
            <img
              src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img3.jpg`}
              alt=""
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img4.jpg`}
              alt=""
            />
          </ImgBox>
        </Flex>
      </Link>
    </YoutubeContainer>
  )
}

const ImgWrapper = css`
  margin-left: 20px;
  cursor: pointer;
  padding-top: 20px;
  flex-direction: column;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`

const ImgBox = styled.div`
  width: 100%;
  display: flex;

  & img {
    width: 50%;
    height: 180px;
    padding: 10px;
    border-radius: 15px;
  }
`

const YoutubeContainer = styled.div`
  height: 450px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  & img {
    border-radius: 15px;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    flex-direction: column;

    & img {
      border-radius: 0px;
    }
  }
`
export default BeautyYoutube
