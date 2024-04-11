import { Cosmetic } from '@/models/cosmetic'
import { FaStar } from 'react-icons/fa'
import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import { css } from '@emotion/react'
import addDelimiter from '../../utils/addDelimiter'
import { MouseEvent, useEffect, useState } from 'react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '../../utils/formatTime'
import Tag from '../shared/Tag'
import { MdOutlineRateReview } from 'react-icons/md'
import { BiLike } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function MobileCosmeticBox({
  cosmetic,
  isLike,
  onLike,
}: {
  cosmetic: Cosmetic
  isLike: boolean
  onLike: ({
    cosmetic,
  }: {
    cosmetic: Pick<
      Cosmetic,
      | 'name'
      | 'id'
      | 'url'
      | 'price'
      | 'brand_name'
      | 'category'
      | 'comment'
      | 'volume'
      | 'salePercent'
      | 'totalSale'
    >
  }) => void
}) {
  const [remainedTime, setRemainedTime] = useState(0)
  console.log(cosmetic)
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
      <Tag
        color={tagThemeStyle.fontColor}
        backgroundColor={tagThemeStyle.backgroundColor}
      >
        {name.concat(promotionTxt)}
      </Tag>
    )
  }

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    onLike({
      cosmetic: {
        name: cosmetic.name,
        url: cosmetic.url,
        id: cosmetic.id,
        price: cosmetic.price,
        comment: cosmetic.comment,
        brand_name: cosmetic.brand_name,
        volume: cosmetic.volume,
        category: cosmetic.category,
        salePercent: cosmetic.salePercent,
        totalSale: cosmetic.totalSale,
      },
    })
  }
  return (
    <CosmeticContainer>
      <Link to={`/cosmetic/detail/${cosmetic.id}`}>
        <ImgWrapper>
          <IconWrapper>
            <img
              src={
                isLike
                  ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                  : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
              }
              alt=""
              onClick={handleLike}
            />
          </IconWrapper>
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
          <Text typography="t6" css={salePerStyle}>
            {addDelimiter(cosmetic.salePercent) + '%'}
          </Text>
          <Flex align={'flex-end'}>
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

        <Spacing size={10} />
        <Flex justify={'space-between'}>
          <Flex>
            <FaStar fill="#ffdb00" />
            <Spacing size={5} direction={'horizontal'} />
            <Text typography="t7" bold>
              {cosmetic.rating}
            </Text>
          </Flex>
          <Flex align={'center'}>
            <BiLike />
            <Spacing size={10} direction={'horizontal'} />
            <Text typography="t7">{cosmetic.like}</Text>
          </Flex>
        </Flex>
      </Link>
    </CosmeticContainer>
  )
}

const CosmeticContainer = styled.div`
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 155px;
`
const ImgWrapper = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  background-color: #f7f7f7;
  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
export default MobileCosmeticBox
