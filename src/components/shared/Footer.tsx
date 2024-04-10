import styled from '@emotion/styled'
import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

import { FaPeopleCarryBox } from 'react-icons/fa6'
import { IoGiftSharp } from 'react-icons/io5'
import { HiOutlineTicket } from 'react-icons/hi2'
import { PiUserListFill } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const showFooter = location.pathname === '/' ? true : false
  return (
    <>
      {showFooter ? (
        <Container>
          <IconBox>
            <Flex direction="column" align="center" justify="center">
              <FaPeopleCarryBox size={30} color={'#888'} />
              <Spacing size={10} />
              <Text typography="t5" color="fontGrey" bold>
                회원 무료배송
              </Text>
            </Flex>

            <Flex direction="column" align="center" justify="center">
              <IoGiftSharp size={30} color={'#888'} />
              <Spacing size={10} />
              <Text typography="t5" color="fontGrey" bold>
                무료 선물포장
              </Text>
            </Flex>

            <Flex direction="column" align="center" justify="center">
              <HiOutlineTicket size={30} color={'#888'} />
              <Spacing size={10} />
              <Text typography="t5" color="fontGrey" bold>
                회원 전용할인
              </Text>
            </Flex>

            <Flex direction="column" align="center" justify="center">
              <PiUserListFill size={30} color={'#888'} />
              <Spacing size={10} />
              <Text typography="t5" color="fontGrey" bold>
                회원 단독 구매 혜택
              </Text>
            </Flex>
          </IconBox>
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 60px;
  position: absolute;
  padding-top: 30px;
  background-color: #303030;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    display: none;
  }
`
const IconBox = styled.div`
  display: flex;
  max-width: 1400px;
  justify-content: space-evenly;
`

export default Footer
