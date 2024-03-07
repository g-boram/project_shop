import styled from '@emotion/styled'
import Flex from './Flex'

import { IoHome, IoHeart, IoCart } from 'react-icons/io5'
import { FaFaceSmile } from 'react-icons/fa6'
import Text from './Text'
import { Link } from 'react-router-dom'

export default function BottomNavbar() {
  return (
    <BottomNavContainer>
      <Flex justify={'space-around'} align={'center'}>
        <Link to={'/'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <IoHome size={'25px'} color={'grey'} />
            <Text typography="t7" color={'fontGrey'}>
              Home
            </Text>
          </Flex>
        </Link>

        <Link to={'/my'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <IoHeart size={'25px'} color={'grey'} />
            <Text typography="t7" color={'fontGrey'}>
              Like
            </Text>
          </Flex>
        </Link>

        <Link to={'/cart'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <IoCart size={'25px'} color={'grey'} />
            <Text typography="t7" color={'fontGrey'}>
              Cart
            </Text>
          </Flex>
        </Link>

        <Link to={'/my'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <FaFaceSmile size={'25px'} color={'grey'} />
            <Text typography="t7" color={'fontGrey'}>
              My
            </Text>
          </Flex>
        </Link>
        {/* <div>알림</div> */}
      </Flex>
    </BottomNavContainer>
  )
}

const BottomNavContainer = styled.div`
  position: fixed;
  background-color: white;
  padding-top: 10px;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 50px;
  width: 100%;
  display: sticky;
  bottom: 0;
  @media (min-width: 600px) {
    display: none;
  }
`
