import { Cosmetic } from '@/models/cosmetic'
import { FaStar } from 'react-icons/fa'
import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import { css } from '@emotion/react'
import addDelimiter from '../../utils/addDelimiter'
import { useEffect, useState } from 'react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '../../utils/formatTime'
import Tag from '../shared/Tag'
import { MdOutlineRateReview } from 'react-icons/md'
import { BiLike } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function CosmeticCategoryBox({ cosmetic }: { cosmetic: Cosmetic }) {
  const [remainedTime, setRemainedTime] = useState(0)
  // console.log(cosmetic)
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
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    if (promotionTxt === '') return

    return (
      <Tag
        color={tagThemeStyle.fontColor}
        backgroundColor={tagThemeStyle.backgroundColor}
      >
        {name.concat(promotionTxt)}
      </Tag>
    )
  }

  return (
    <Link to={`/cosmetic/detail/${cosmetic.id}`}>
      <CosmeticContainer>
        <ImgWrapper>
          {cosmetic.url ? <img src={cosmetic.url} alt={cosmetic.name} /> : null}
          <TagStyle>{tagComponent()}</TagStyle>
        </ImgWrapper>

        <Flex direction="column" css={nameStyle}>
          <Text typography="t7">{cosmetic.brand_name}</Text>
          <Spacing size={5} direction={'horizontal'} />
          <Text typography="t6" bold>
            {cosmetic.name}
          </Text>
        </Flex>
        <Spacing size={10} />

        <Flex justify={'space-between'}>
          <Flex align={'center'}>
            <BiLike />
            <Spacing size={10} direction={'horizontal'} />
            <Text typography="t7">{cosmetic.like}</Text>
          </Flex>
          <Flex align={'center'}>
            <Text typography="t7">
              {cosmetic.reviews ? cosmetic.reviews?.length : 0}
            </Text>
            <Spacing size={10} direction={'horizontal'} />
            <MdOutlineRateReview />
          </Flex>
        </Flex>
        <Spacing size={10} />

        <Flex justify={'space-between'}>
          <Flex>
            <FaStar fill="#ffdb00" />
            <Spacing size={5} direction={'horizontal'} />
            <Text typography="t7" bold>
              {cosmetic.rating}
            </Text>
          </Flex>
          <Flex align={'flex-end'}>
            <Text typography="t6" css={salePerStyle}>
              {addDelimiter(cosmetic.salePercent) + '%'}
            </Text>
            <Spacing size={5} direction={'horizontal'} />
            <Text typography="t9" css={saleTextStyle}>
              {addDelimiter(cosmetic.price)}
            </Text>
            <Spacing size={3} direction={'horizontal'} />
            <Text typography="t6" bold>
              {addDelimiter(
                Number(cosmetic.price) - Number(cosmetic.totalSale),
              )}
            </Text>
          </Flex>
        </Flex>
      </CosmeticContainer>
    </Link>
  )
}

const CosmeticContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: white;
  border: 2px solid #eee;
  padding: 10px;
  height: 360px;
  width: 210px;
  margin: 10px;
`
const ImgWrapper = styled.div`
  height: 240px;
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  & img {
    height: auto;
    width: 100%;
  }
`
const TagStyle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`
const nameStyle = css`
  height: 50px;
  margin-top: 10px;
  overflow: hidden;
`
const salePerStyle = css`
  color: red;
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default CosmeticCategoryBox
