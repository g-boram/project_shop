import { css, keyframes } from '@emotion/react'
import { colors } from '@styles/colorPalette'

import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

import { Link, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import styled from '@emotion/styled'
import Dimmed from './Dimmed'

const navItem = [
  { to: '/', name: 'Home1' },
  { to: '/', name: 'Home2' },
  { to: '/', name: 'Home3' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(0)

  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  // @TODO
  const user = null

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <img src="" alt="" />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  // 오른쪽 슬라이딩 바 토글여부로 활성화
  const ToggleBtn = () => {
    return (
      <ToggleIcon onClick={() => setIsOpen((val) => !val)}>
        {isOpen ? <AiOutlineClose size={'20px'} /> : <BiMenu size={'20px'} />}
      </ToggleIcon>
    )
  }

  // 오른쪽 슬라이딩 바 - 모바일 너비 600px 이하
  const MobileNavbar = () => {
    return (
      <Dimmed>
        <Flex direction="column" align="left" css={mobileNavbarContainerStyles}>
          <Flex justify="right">{ToggleBtn()}</Flex>
          {navItem?.map((nav, i) => (
            <Link
              to={nav.to}
              key={i}
              css={css`
                &:hover {
                  color: blue;
                }
              `}
            >
              {nav.name}
            </Link>
          ))}
        </Flex>
      </Dimmed>
    )
  }

  return (
    <>
      <Flex justify="space-between" align="center" css={topNavbarStyles}>
        <Flex justify="left" align="center">
          <NavLogo>Logo</NavLogo>
          <NavItem
            onMouseOver={() => setIsHovering(1)}
            // onMouseOut={() => setIsHovering(0)}
          >
            {navItem?.map((nav, i) => (
              <Link
                to={nav.to}
                key={i}
                css={css`
                  &:hover {
                    color: blue;
                  }
                `}
              >
                {nav.name}
              </Link>
            ))}
          </NavItem>
        </Flex>
        <Flex justify="right" align="center">
          {renderButton()}
          {ToggleBtn()}
        </Flex>
      </Flex>
      {isHovering ? (
        <NavItemBottomBox
          onMouseOver={() => setIsHovering(1)}
          onMouseOut={() => setIsHovering(0)}
        >
          <Flex direction="column">
            {navItem?.map((nav, i) => (
              <Link
                to={nav.to}
                key={i}
                css={css`
                  &:hover {
                    color: blue;
                  }
                `}
              >
                {nav.name}
              </Link>
            ))}
          </Flex>
        </NavItemBottomBox>
      ) : null}
      {isOpen && <MobileNavbar />}
    </>
  )
}

// 네비바 컨테이너
const topNavbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  height: 30px;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
// 네비바 로고
const NavLogo = styled.div`
  margin-right: 10px;
  cursor: pointer;
`
// 상단링크 아이템 너비 600px 이상일때 활성화
const NavItem = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;

  @media (max-width: 600px) {
    display: none;
  }
`
// 상단 네비바 박스
const NavItemBottomBox = styled.div`
  padding: 10px 24px;
  height: auto;
  width: 100%;
  background-color: #401b28;
  gap: 20px;
  color: ${colors.white};
  font-size: 18px;
  z-index: 10;

  @media (max-width: 600px) {
    display: none;
  }
`

// 모바일용 우측 네비바 컨테이너
// 활성화 토글 아이콘
const ToggleIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;

  @media (min-width: 600px) {
    display: none;
  }
`
const slideRightBox = keyframes`
  to {
    transform: translateX(0);
  } 
`
const mobileNavbarContainerStyles = css`
  padding: 10px 24px;
  height: 100vh;
  width: 60%;
  background-color: #401b28;
  gap: 20px;
  float: right;
  color: ${colors.white};
  font-size: 18px;
  z-index: 10;
  transform: translateX(100%);
  animation: ${slideRightBox} 0.5s ease-in-out forwards;

  @media (min-width: 600px) {
    display: none;
  }
`

export default Navbar
