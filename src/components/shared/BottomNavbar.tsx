import styled from '@emotion/styled'
import Flex from './Flex'
import Text from './Text'

import { IoHome } from 'react-icons/io5'
import { FaFaceSmile, FaPencil } from 'react-icons/fa6'
import { GiLipstick } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Spacing from './Spacing'

export default function BottomNavbar() {
  return (
    <BottomNavContainer>
      <Flex justify={'space-around'} align={'center'}>
        <Link to={'/'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <IoHome size={'25px'} color={'grey'} />
            <Spacing size={5} />
            <Text typography="t7" color={'fontGrey'}>
              Home
            </Text>
          </Flex>
        </Link>

        <Link to={'/cosmetic'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <GiLipstick size={'25px'} color={'grey'} />
            <Spacing size={5} />
            <Text typography="t7" color={'fontGrey'}>
              Cosmetic
            </Text>
          </Flex>
        </Link>

        <Link to={'/board'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <FaPencil size={'25px'} color={'grey'} />
            <Spacing size={5} />
            <Text typography="t7" color={'fontGrey'}>
              Board
            </Text>
          </Flex>
        </Link>

        <Link to={'/my'}>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <FaFaceSmile size={'25px'} color={'grey'} />
            <Spacing size={5} />
            <Text typography="t7" color={'fontGrey'}>
              My
            </Text>
          </Flex>
        </Link>
      </Flex>
    </BottomNavContainer>
  )
}

const BottomNavContainer = styled.div`
  position: absolute;
  background-color: white;
  padding-top: 10px;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 55px;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: ${`var(--bottomNavbar-zindex)`};
  @media (min-width: 600px) {
    display: none;
  }
`
