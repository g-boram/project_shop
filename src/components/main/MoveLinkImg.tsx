import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

import { FaClipboardList } from 'react-icons/fa'
import Spacing from '../shared/Spacing'

const MoveLinkImg = () => {
  return (
    <LinkContainer>
      <div css={btnBox}>
        <FaClipboardList size={50} />
        <Spacing size={20} />
        <Text typography="t5" color="fontDarkGrey" bold>
          Board
        </Text>
      </div>
      <div css={btnBox}>
        <FaClipboardList size={50} />
        <Spacing size={20} />
        <Text typography="t5" color="fontDarkGrey" bold>
          Board
        </Text>
      </div>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  margin: 60px 0 30px 0;

  div:nth-of-type(1) {
    background-color: pink;
    &: hover {
      background-color: pink;
    }
  }
  div:nth-of-type(2) {
    background-color: yellow;
    &: hover {
      background-color: yellow;
    }
  }
`

const btnBox = css`
  height: 100px;
  width: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  border: 2px solid #eee;
  padding: 20px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  color: black;

  &: hover {
    transition: 0.5s;
    border: none;
    transform: scale(1.2);
  }
`

const ImgBox = styled.div`
  height: 100%;
  width: 100%;

  & img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`

export default MoveLinkImg
