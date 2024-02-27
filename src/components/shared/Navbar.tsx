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
import useUser from '@/hooks/auth/useUser'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import Spacing from './Spacing'

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

  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Button size="small" color="pink" onClick={handleLogout}>
            로그아웃
          </Button>
          <Spacing size={5} direction="horizontal" />
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
              }
              alt="userImg"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </>
      )
    }
    // 로그인 회원가입 화면이 아닐경우
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button size="medium" color="pink">
            로그인/회원가입
          </Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton, handleLogout])

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
          <NavLogo>
            <Link to="/">Logo</Link>
          </NavLogo>
          <Spacing size={10} direction="horizontal" />
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
  height: 40px;
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
