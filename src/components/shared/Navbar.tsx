import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'

import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

import { Link, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import styled from '@emotion/styled'

const navItem = [
  { to: '/', name: 'Home1' },
  { to: '/', name: 'Home2' },
  { to: '/', name: 'Home3' },
]

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <>
      <Flex justify="space-between" align="center" css={topNavbarStyles}>
        <Flex justify="left" align="center">
          <NavLogo>Logo</NavLogo>
          <NavItem>
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
          <ToggleIcon onClick={() => setIsOpen((val) => !val)}>
            {isOpen ? (
              <AiOutlineClose size={'20px'} />
            ) : (
              <BiMenu size={'20px'} />
            )}
          </ToggleIcon>
        </Flex>
      </Flex>
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
// 하단 링크박스 활성화 토글 아이콘
const ToggleIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;
  @media (min-width: 600px) {
    display: none;
  }
`

// 하단링크 아이템 너비 600px 이하일때 토글여부로 활성화
const MobileNavbar = () => {
  return (
    <Flex direction="column" align="left" css={mobileNavbarContainerStyles}>
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
  )
}

// 모바일용 네비바 컨테이너
const mobileNavbarContainerStyles = css`
  padding: 10px 24px;
  height: auto;
  position: sticky;
  top: 50px;
  background-color: ${colors.green};
  gap: 20px;
  color: ${colors.white};
  font-size: 18px;
  z-index: 10;

  @media (min-width: 600px) {
    display: none;
  }
`

export default Navbar
