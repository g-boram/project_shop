import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import addDelimiter from '../../utils/addDelimiter'
import formatTime from '../../utils/formatTime'
import Tag from '../shared/Tag'

import { Cosmetic } from '@models/cosmetic'
import { FaStar } from 'react-icons/fa'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { differenceInMilliseconds, parseISO } from 'date-fns'

function CosmeticBox({ cosmetic }: { cosmetic: Cosmetic }) {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (cosmetic.events == null || cosmetic.events.promoEndTime == null) {
      return
    }

    const promoEndTime = cosmetic.events.promoEndTime

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )
      if (남은초 < 0) {
        clearInterval(timer)
        return
      }
      setRemainedTime(남은초)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [cosmetic.events])

  // 태그 컴포넌트
  const tagComponent = () => {
    if (cosmetic.events == null) {
      return null
    }

    const { name, tagThemeStyle } = cosmetic.events

    const promotionTxt =
      remainedTime > 0 ? `-${formatTime(remainedTime)} 남음` : ''

    if (promotionTxt === '') return

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
      </div>
    )
  }

  return (
    <CosmeticContainer>
      <ImgWrapper>
        {cosmetic.url ? <img src={cosmetic.url} alt={cosmetic.name} /> : null}
        <span css={tagStyle}>{tagComponent()}</span>
      </ImgWrapper>

      <Flex direction="column" css={nameStyle}>
        <Text typography="t8">{cosmetic.brand_name}</Text>
        <Spacing size={5} />
        <Text typography="t7" bold>
          {cosmetic.name}
        </Text>
      </Flex>
      <Flex justify={'flex-end'}>
        <FaStar fill="#ffdb00" />
        <Spacing size={5} direction={'horizontal'} />
        <Text typography="t7" bold>
          {cosmetic.rating}
        </Text>
      </Flex>
      <Flex justify={'space-between'}>
        <Text typography="t6" css={salePerStyle}>
          {addDelimiter(cosmetic.salePercent) + '%'}
        </Text>
        <Spacing size={40} direction={'horizontal'} />
        <Text typography="t9" css={saleTextStyle}>
          {addDelimiter(cosmetic.price)}
        </Text>
        <Spacing size={3} direction={'horizontal'} />
        <Text typography="t6" bold>
          {addDelimiter(Number(cosmetic.price) - Number(cosmetic.totalSale))}
        </Text>
      </Flex>
    </CosmeticContainer>
  )
}

const CosmeticContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  height: 270px;
  width: 140px;
  gap: 10px;
  margin: 5px 10px 5px 5px;
`
const ImgWrapper = styled.div`
  height: 180px;
  width: 100%;
  position: relative;
  background-color: #eee;
  & img {
    height: auto;
    width: 100%;
  }
`
const nameStyle = css`
  height: 35px;
  overflow: hidden;
`

const tagStyle = css`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`
const salePerStyle = css`
  color: red;
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default CosmeticBox
