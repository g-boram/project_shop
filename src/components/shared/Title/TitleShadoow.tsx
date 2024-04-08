import styled from '@emotion/styled'

const TitleShadoow = () => {
  return <TitleWrapper>Special Items</TitleWrapper>
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 4em;
  text-align: center;
  margin-bottom: 10px;
  text-shadow:
    0 -3px 0 #333,
    0 6px 8px rgba(0, 0, 0, 0.4),
    0 9px 10px rgba(0, 0, 0, 0.15),
    0 30px 10px rgba(0, 0, 0, 0.18),
    0 15px 10px rgba(0, 0, 0, 0.21);

  @media (max-width: 600px) {
    height: 30px;
    font-size: 3em;
  }
`
export default TitleShadoow
