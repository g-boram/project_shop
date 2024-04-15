import Flex from '@shared/Flex'
import Button from '@shared/Button'
import styled from '@emotion/styled'
import Dimmed from './Dimmed'
import useUser from '@/hooks/auth/useUser'
import Spacing from './Spacing'
import Text from './Text'

import { css, keyframes } from '@emotion/react'
import { FaUserCircle } from 'react-icons/fa'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'
import { IoMdSettings } from 'react-icons/io'

const navList = [
  { to: '/my', name: '• 마이 페이지' },
  { to: '/storeMap', name: '• 매장 찾기' },
  { to: '/board', name: '• 게시판' },
  { to: '/event', name: '• Event' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUser()
  const navigate = useNavigate()
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
    navigate('/')
  }, [])

  // 로그인 여부에 따른 링크
  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        // 로그인이 된 경우
        <>
          <Link to="/manager">
            <div css={fontWhiteStyle}>관리자 페이지</div>
          </Link>
          <Spacing size={10} direction="horizontal" />
          <div css={fontWhiteStyle} onClick={handleLogout}>
            로그아웃
          </div>
          <Spacing size={10} direction="horizontal" />
          <Link to="/my">
            <IoMdSettings size={25} color="#eee" />
          </Link>
          <Spacing size={10} direction="horizontal" />
          <Link to="/my">
            <img
              src={
                user.photoURL !== ''
                  ? user.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt="userImg"
              width={30}
              height={30}
              style={{
                borderRadius: '100%',
                border: '2px solid #fff',
                backgroundColor: '#fff',
              }}
            />
          </Link>
        </>
      )
    }
    // 로그인 회원가입 화면이 아닐경우
    if (showSignButton) {
      return (
        <>
          <Link to="/signin">
            <div css={fontWhiteStyle}>로그인/회원가입</div>
          </Link>
        </>
      )
    }
    return null
  }, [user, showSignButton, handleLogout])

  // 모바일 오른쪽 활성화 네비박스
  const renderMobieNavButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <UserImgBox>
            <img
              src={
                user.photoURL !== ''
                  ? user.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt=""
              width={70}
              height={70}
              style={{
                borderRadius: '100%',
                border: '2px solid #fff',
                backgroundColor: '#eee',
              }}
            />
            <Spacing size={20} direction={'horizontal'} />
            <Flex direction="column">
              <Text typography="t6" color="white">
                {user.displayName}
              </Text>
              <Spacing size={10} />
              <Text typography="t6" color="white">
                {user.email}
              </Text>
            </Flex>
          </UserImgBox>
          <Spacing size={10} />
          <Button size="small" full color="grey" onClick={handleLogout}>
            로그아웃
          </Button>
          <Spacing size={50} />
          <Flex direction="column" align={'center'} justify={'center'}>
            <Text typography="t6" color="white">
              {user.displayName} 님! 오늘도 좋은하루 되세요!{' '}
            </Text>
            <Spacing size={10} />
            <Text typography="t6" color="white">
              봄느낌 가득한 이상품 어때요?
            </Text>
            <Spacing size={20} />
          </Flex>
          <TodayCommentBox>
            <img
              src={`${process.env.PUBLIC_URL}/images/event/slideNavImg1.jpg`}
              alt=""
            />
          </TodayCommentBox>
          <Spacing size={10} />
          <Button full color="lightPurple">
            🌸 봄추천 상품 바로가기 !
          </Button>
          <Spacing size={30} />
        </>
      )
    } else {
      return (
        <>
          <Spacing size={10} />
          <Button
            size="small"
            full
            color="pink"
            onClick={() => navigate('/signin')}
          >
            로그인 하기
          </Button>
          <Spacing size={50} />
          <Flex direction="column" align={'center'} justify={'center'}>
            <Text typography="t6" color="white">
              오늘도 좋은하루 되세요!{' '}
            </Text>
            <Spacing size={10} />
            <Text typography="t6" color="white">
              봄느낌 가득한 이상품 어때요?
            </Text>
            <Spacing size={20} />
          </Flex>
          <TodayCommentBox>
            <img
              src={`${process.env.PUBLIC_URL}/images/event/slideNavImg1.jpg`}
              alt=""
            />
          </TodayCommentBox>
          <Spacing size={10} />
          <Button full color="lightPurple">
            🌸 봄추천 상품 바로가기 !
          </Button>
          <Spacing size={30} />
        </>
      )
    }
    // 로그인 회원가입 화면이 아닐경우
    // if (showSignButton) {
    //   return (
    //     <Link to="/signin">
    //       <div css={fontWhiteStyle}>로그인/회원가입</div>
    //     </Link>
    //   )
    // }
    // return null
  }, [user, showSignButton, handleLogout])

  // 오른쪽 슬라이딩 바 토글여부로 활성화
  const ToggleBtn = () => {
    return (
      <ToggleIcon onClick={() => setIsOpen((val) => !val)}>
        {isOpen ? (
          <AiOutlineClose size={'20px'} color={'#fff'} />
        ) : (
          <BiMenu size={'20px'} color={'#fff'} />
        )}
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
                color: #fff;
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
              <Text typography="t3" color="white" bold>
                BoRamy
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
                  color: #eee;
                  margin-left: 20px;
                  font-weight: bold;
                  font-size: 16px;
                  &:hover {
                    color: white;
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

const fontWhiteStyle = css`
  color: #eee;
  font-weight: bold;
  margin: 0px 10px;
  cursor: pointer;

  &: hover {
    color: white;
  }

  @media (max-width: 600px) {
    display: none;
  }
`
// 네비바 컨테이너
const topNavbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  height: 40px;
  top: 0;
  background-color: #303030;
  z-index: 10;
`
// 랜덤 한마디 영역
const TodayCommentBox = styled.div`
  min-height: 100px;
  min-width: 240px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 14px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`
const UserImgBox = styled.div`
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
// @TODO: 배경색 추후 고민해보기
const mobileNavbarContainerStyles = css`
  padding: 20px 20px;
  height: 100vh;
  width: 60%;
  background-color: #303030;
  gap: 10px;
  float: right;
  color: #eee;
  font-weight: bold;
  font-size: 18px;
  z-index: 10;
  transform: translateX(100%);
  animation: ${slideRightBox} 0.5s ease-in-out forwards;

  &: hover {
    color: white;
  }
  @media (min-width: 600px) {
    display: none;
  }
`

export default Navbar
