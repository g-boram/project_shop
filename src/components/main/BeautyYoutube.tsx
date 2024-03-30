import styled from '@emotion/styled'

const BeautyYoutube = () => {
  return <YoutubeContainer>beautyYoutube</YoutubeContainer>
}

const YoutubeContainer = styled.div`
  height: 200px;
  background-color: grey;
  margin-top: 10px;

  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
  }
`
export default BeautyYoutube
