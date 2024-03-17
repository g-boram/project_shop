import Flex from '@shared/Flex'
import Button from '@shared/Button'
import styled from '@emotion/styled'
import Dimmed from './Dimmed'
import useUser from '@/hooks/auth/useUser'
import Spacing from './Spacing'
import Text from './Text'

import { css, keyframes } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'

const navList = [
  { to: '/my', name: '마이페이지' },
  { to: '/storeMap', name: '매장찾기' },
  { to: '/board', name: '게시판' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUser()
  const isKakao = sessionStorage.getItem('kakao')
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const setUser = useSetRecoilState(userAtom)

  // 로그아웃
  const handleLogout = useCallback(() => {
    if (isKakao !== null) {
      sessionStorage.removeItem('kakao')
      setUser(null)
    } else {
      signOut(auth)
    }
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Link to="/manager">
            <Button size="small" color="grey">
              관리자 페이지
            </Button>
          </Link>
          <Spacing size={10} direction="horizontal" />
          <Button size="small" color="pink" onClick={handleLogout}>
            로그아웃
          </Button>
          <Spacing size={10} direction="horizontal" />
          <Link to="/my">
            <img
              src={
                user.photoURL !== ''
                  ? user.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt="userImg"
              width={40}
              height={40}
              style={{ borderRadius: '100%', border: '2px solid #fff' }}
            />
          </Link>
        </>
      )
    }
    // 로그인 회원가입 화면이 아닐경우
    if (showSignButton) {
      return (
        <>
          <Link to="/manager">
            <Button size="small" color="grey">
              관리자 페이지
            </Button>
          </Link>
          <Spacing size={10} direction="horizontal" />
          <Link to="/signin">
            <Button size="small" color="pink">
              로그인/회원가입
            </Button>
          </Link>
        </>
      )
    }
    return null
  }, [user, showSignButton, handleLogout])

  const renderMobieNavButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Link to="/my">
            <img
              src={
                user.photoURL !== ''
                  ? user.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt="userImg"
              width={100}
              height={100}
              style={{ borderRadius: '100%', border: '2px solid #fff' }}
            />
          </Link>
          <Spacing size={10} />
          <Button size="small" full color="pink" onClick={handleLogout}>
            로그아웃
          </Button>
          <Spacing size={50} />
          <TodayCommentBox>
            {/* @TODO: 랜덤하게 바꾸기 */}
            <Flex direction="column" align={'center'} justify={'center'}>
              <div>{user.displayName} 님! 오늘도 좋은하루 되세요! </div>
              <Spacing size={10} />
              <div>봄느낌 가득한 이상품 어때요?</div>
              <Spacing size={20} />
              <Button full color="lightPurple">
                🌸 봄추천 상품 바로가기 !
              </Button>
            </Flex>
          </TodayCommentBox>
          <Spacing size={30} />
        </>
      )
    }
    // 로그인 회원가입 화면이 아닐경우
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button size="small" color="pink">
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
          <Flex justify={'center'} direction={'column'} align={'center'}>
            {renderMobieNavButton()}
          </Flex>
          {navList?.map((nav, i) => (
            <Link
              to={nav.to}
              key={i}
              onClick={() => setIsOpen(false)}
              css={css`
                margin: 10px;
                &:hover {
                  transition: 0.5s;
                  color: #c86b85;
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
            <Link to="/">
              <img
                src="https://cdn3.iconfinder.com/data/icons/webdesigncreative/free_icons_128x128_png/Calling.png"
                alt="Logo"
                width={30}
                height={30}
              />
              <Text typography="t7" color="fontDarkGrey">
                BR
              </Text>
            </Link>
          </NavLogo>
          <Spacing size={10} direction="horizontal" />
          <NavItem>
            {navList?.map((nav, i) => (
              <Link
                to={nav.to}
                key={i}
                css={css`
                  color: grey;
                  margin-left: 20px;
                  &:hover {
                    color: black;
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
      {isOpen ? MobileNavbar() : <></>}
    </>
  )
}

// 네비바 컨테이너
const topNavbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  height: 40px;
  top: 0;
  background-color: #fff9f9;
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
// 랜덤 한마디 영역
const TodayCommentBox = styled.div`
  height: 100px;
  width: 100%;
  font-size: 14px;
  padding: 10px;
`
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
  padding: 20px 20px;
  height: 100vh;
  width: 60%;
  background-color: #e7b3b3;
  gap: 10px;
  float: right;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  z-index: 10;
  transform: translateX(100%);
  animation: ${slideRightBox} 0.5s ease-in-out forwards;

  @media (min-width: 600px) {
    display: none;
  }
`

export default Navbar
