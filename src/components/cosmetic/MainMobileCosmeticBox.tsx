import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import addDelimiter from '../../utils/addDelimiter'

import { Cosmetic } from '@models/cosmetic'
import { FaStar } from 'react-icons/fa'
import { css } from '@emotion/react'
import Tag from '../shared/Tag'
import formatTime from '@/utils/formatTime'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MainMobileCosmeticBox({ cosmetic }: { cosmetic: Cosmetic }) {
  const navigete = useNavigate()
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
    <CosmeticContainer
      onClick={() => navigete(`/cosmetic/detail/${cosmetic.id}`)}
    >
      <ImgWrapper>
        {cosmetic.url ? <img src={cosmetic.url} alt={cosmetic.name} /> : null}
        {cosmetic.events?.name !== '' ? (
          <span css={tagStyle}>{tagComponent()}</span>
        ) : null}
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
        <Text typography="t7" bold>
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
  height: 230px;
  width: 120px;
  margin: 0px 5px;
  gap: 10px;
  margin: 5px 10px 5px 5px;
  border: 1px solid #eee;
`
const ImgWrapper = styled.div`
  height: 130px;
  width: 120px;
  position: relative;
  background-color: #eee;
  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
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
export default MainMobileCosmeticBox
