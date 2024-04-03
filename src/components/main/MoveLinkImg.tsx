import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const MoveLinkImg = () => {
  return (
    <LinkContainer>
      <ImgWrapper>
        <Link to={'/board'}>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/linkImg_board.jpg`}
            alt=""
          />
        </Link>
      </ImgWrapper>
      <ImgWrapper>
        <Link to={'/storeMap'}>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/linkImg_map.jpg`}
            alt=""
          />
        </Link>
      </ImgWrapper>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  min-height: 250px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 600px) {
    min-height: 400px;
    width: 100vw;
    margin: 10px 0px;
    flex-direction: column;
    justify-content: flex-start;
  }
`
const ImgWrapper = styled.div`
  height: 230px;
  width: 49%;

  & img {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 100vw;
    height: 150px;
  }
`
export default MoveLinkImg
