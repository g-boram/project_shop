import styled from '@emotion/styled'

const TitleJumping = () => {
  return (
    <Wrapper>
      <h1>
        <span>S</span>
        <span>P</span>
        <span>E</span>
        <span>C</span>
        <span>I</span>
        <span>A</span>
        <span>L</span>

        <span>I</span>
        <span>T</span>
        <span>E</span>
        <span>M</span>
      </h1>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    height: 100px;

    @media (max-width: 600px) {
      height: 30px;
    }
  }

  h1 span {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: bounce 1s ease infinite alternate;
    font-family: 'Titan One', cursive;
    font-size: 80px;
    color: #fff;
    text-shadow:
      0 1px 0 #ccc,
      0 2px 0 #ccc,
      0 3px 0 #ccc,
      0 4px 0 #ccc,
      0 5px 0 #ccc,
      0 6px 0 transparent,
      0 7px 0 transparent,
      0 8px 0 transparent,
      0 9px 0 transparent,
      0 10px 10px rgba(0, 0, 0, 0.4);

    @media (max-width: 600px) {
      font-size: 40px;
      color: #fff;
      top: 0px;
    }
  }

  h1 span:nth-child(2) {
    animation-delay: 0.1s;
  }
  h1 span:nth-child(3) {
    animation-delay: 0.2s;
  }
  h1 span:nth-child(4) {
    animation-delay: 0.3s;
  }
  h1 span:nth-child(5) {
    animation-delay: 0.4s;
  }
  h1 span:nth-child(6) {
    animation-delay: 0.5s;
  }
  h1 span:nth-child(7) {
    animation-delay: 0.6s;
  }

  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow:
        0 1px 0 #ccc,
        0 2px 0 #ccc,
        0 3px 0 #ccc,
        0 4px 0 #ccc,
        0 5px 0 #ccc,
        0 6px 0 #ccc,
        0 7px 0 #ccc,
        0 8px 0 #ccc,
        0 9px 0 #ccc,
        0 50px 25px rgba(0, 0, 0, 0.2);
    }
  }
`
export default TitleJumping
