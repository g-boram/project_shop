import styled from '@emotion/styled'

const TitleNeon = () => {
  return (
    <Wrapper>
      <div className="neon">YOUTUBE </div>
      <div className="flux">ONAIR </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 30px 0;
  display: table;
  background-color: #181818;

  display: table-cell;
  text-align: center;
  vertical-align: middle;

  @font-face {
    font-family: neon;
    src: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/707108/neon.ttf);
  }

  .neon {
    font-family: neon;
    color: #fb4264;
    font-size: 4vw;
    line-height: 4vw;
    text-shadow: 0 0 3vw #f40a35;
    margin-bottom: 5px;

    @media (max-width: 600px) {
      font-size: 9vw;
      line-height: 9vw;
    }
  }

  .flux {
    font-family: neon;
    color: #426dfb;
    font-size: 4vw;
    line-height: 4vw;
    text-shadow: 0 0 3vw #2356ff;

    @media (max-width: 600px) {
      font-size: 9vw;
      line-height: 9vw;
    }
  }

  .neon {
    animation: neon 1s ease infinite;
    -moz-animation: neon 1s ease infinite;
    -webkit-animation: neon 1s ease infinite;
  }

  @keyframes neon {
    0%,
    100% {
      text-shadow:
        0 0 1vw #fa1c16,
        0 0 3vw #fa1c16,
        0 0 10vw #fa1c16,
        0 0 10vw #fa1c16,
        0 0 0.4vw #fed128,
        0.5vw 0.5vw 0.1vw #806914;
      color: #fed128;
    }
    50% {
      text-shadow:
        0 0 0.5vw #800e0b,
        0 0 1.5vw #800e0b,
        0 0 5vw #800e0b,
        0 0 5vw #800e0b,
        0 0 0.2vw #800e0b,
        0.5vw 0.5vw 0.1vw #40340a;
      color: #806914;
    }
  }

  .flux {
    animation: flux 2s linear infinite;
    -moz-animation: flux 2s linear infinite;
    -webkit-animation: flux 2s linear infinite;
    -o-animation: flux 2s linear infinite;
  }

  @keyframes flux {
    0%,
    100% {
      text-shadow:
        0 0 1vw #1041ff,
        0 0 3vw #1041ff,
        0 0 10vw #1041ff,
        0 0 10vw #1041ff,
        0 0 0.4vw #8bfdfe,
        0.5vw 0.5vw 0.1vw #147280;
      color: #28d7fe;
    }
    50% {
      text-shadow:
        0 0 0.5vw #082180,
        0 0 1.5vw #082180,
        0 0 5vw #082180,
        0 0 5vw #082180,
        0 0 0.2vw #082180,
        0.5vw 0.5vw 0.1vw #0a3940;
      color: #146c80;
    }
  }
`
export default TitleNeon
