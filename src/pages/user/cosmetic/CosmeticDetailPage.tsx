import NewUserBanner from '../../../assets/eventBanner/newUserBanner.jpg'
import TopMoveBanner from '../../../assets/moveBanner/gif_squareBanner_1.gif'

import DetailCosmeticInfo from '@/components/cosmetic/DetailCosmeticInfo'
import MobileDetailCosmeticInfo from '@/components/cosmetic/MobileDetailCosmeticInfo'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Skeleton from '@/components/shared/Skeleton'
import Spacing from '@/components/shared/Spacing'
import Tag from '@/components/shared/Tag'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'
import formatTime from '@/utils/formatTime'
import styled from '@emotion/styled'
import MobileCosmeticSwiper from '@/components/user/MobileCosmeticSwiper'

import { COLLECTIONS } from '@/constants'
import { CATEGORY } from '@/constants/cosmetic'
import { Cosmetic } from '@/models/cosmetic'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { BiLike } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

const CosmeticDetailPage = () => {
  const params = useParams()

  const [innerWidth, setInnerWidth] = useState(0)
  const [moveInfo, setMoveInfo] = useState(0)
  const [currentImg, setCurrentImg] = useState('')
  const [cosmetic, setCosmetic] = useState<Cosmetic | null>(null)

  // 게시판 데이터 가져오기
  const getDetailBoard = async (id: string) => {
    const docRef = doc(store, `${COLLECTIONS.COSMETIC}`, id)
    const docSnap = await getDoc(docRef)

    setCosmetic({ id: docSnap.id, ...(docSnap.data() as Cosmetic) })
    setCurrentImg(docSnap.data()?.url)
  }

  useEffect(() => {
    if (params?.id) getDetailBoard(params?.id)
  }, [params?.id])

  const NavItem = styled.div<{ cate: number }>`
    background-color: ${(props) =>
      props.cate === moveInfo ? '#feebeb;' : 'white'};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    width: 130px;
    margin-left: 10px;
    border: 2px solid #eee;
    border-radius: 8px 8px 0 0;
    color: #757575;
    cursor: pointer;
    border-bottom: none;

    &: hover {
      background-color: #eee;
    }
  `
  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    if (innerWidth === 0) {
      window.addEventListener('resize', handleResize)

      setInnerWidth(window.innerWidth)
      window.removeEventListener('resize', handleResize)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 태그 컴포넌트
  // const [remainedTime, setRemainedTime] = useState(0)
  // useEffect(() => {
  //   if (cosmetic?.events == null || cosmetic.events.promoEndTime == null) {
  //     return
  //   }

  //   const promoEndTime = cosmetic.events.promoEndTime

  //   const timer = setInterval(() => {
  //     const 남은초 = differenceInMilliseconds(
  //       parseISO(promoEndTime),
  //       new Date(),
  //     )
  //     if (남은초 < 0) {
  //       clearInterval(timer)
  //       return
  //     }
  //     setRemainedTime(남은초)
  //   }, 1_000)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [cosmetic?.events])
  // const tagComponent = () => {
  //   if (cosmetic?.events == null) {
  //     return null
  //   }

  //   const { name, tagThemeStyle } = cosmetic.events

  //   const promotionTxt =
  //     remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

  //   if (promotionTxt === '') return

  //   return (
  //     <Tag
  //       color={tagThemeStyle.fontColor}
  //       backgroundColor={tagThemeStyle.backgroundColor}
  //       height={'20px'}
  //       fontSize={'16px'}
  //     >
  //       {name.concat(promotionTxt)}
  //     </Tag>
  //   )
  // }

  return (
    <>
      {innerWidth > 600 ? (
        <CosmeticContainer>
          <CategoryNavBox>
            <NavEventBanner>
              <img src={TopMoveBanner} alt="" />
            </NavEventBanner>
            <Spacing size={30} />
            {CATEGORY.map((cate, idx) => (
              <Link to={`/cosmetic/${cate.value}`}>
                <Button key={idx} color="pink" size="large" full>
                  {cate.name}
                </Button>
                <Spacing size={5} />
              </Link>
            ))}
          </CategoryNavBox>
          {/* 상세내용 영역 */}
          <CosmeticDetailBox>
            <DetailBox>
              <MainImg>
                {currentImg ? (
                  <img src={currentImg} alt="" />
                ) : (
                  <Skeleton width={350} height={400} />
                )}
                <SubImg>
                  {cosmetic?.url ? (
                    <SubImgItem>
                      <img src={cosmetic.url} alt={`mainImg`} />
                    </SubImgItem>
                  ) : (
                    <>
                      <Skeleton width={80} height={80} />
                      <Spacing size={5} direction={'horizontal'} />
                    </>
                  )}
                  {cosmetic?.subUrl ? (
                    cosmetic?.subUrl.map((sub, idx) => (
                      <SubImgItem>
                        <img src={sub.url} alt={`subImg${idx}`} />
                      </SubImgItem>
                    ))
                  ) : (
                    <>
                      <Skeleton width={80} height={80} />
                      <Spacing size={5} direction={'horizontal'} />
                    </>
                  )}
                </SubImg>
              </MainImg>
              <DetailDesc>
                <DescBox>
                  <Spacing size={10} />
                  {/* 제품명/브랜드명 */}
                  {cosmetic?.brand_name && cosmetic?.name ? (
                    <Flex direction="column" css={nameStyle}>
                      <Spacing size={10} direction={'horizontal'} />
                      <Text typography="t5">{cosmetic.brand_name}</Text>
                      <Spacing size={5} direction={'horizontal'} />
                      <Flex justify={'space-between'}>
                        <Text typography="t2" bold>
                          {cosmetic.name}
                        </Text>
                        <CateTag>{cosmetic.category}</CateTag>
                      </Flex>
                    </Flex>
                  ) : (
                    <Skeleton width={300} height={40} />
                  )}
                  <Spacing size={10} />

                  {/* 한줄설명 */}
                  <Flex>
                    <Text typography="t5">" {cosmetic?.comment} "</Text>
                  </Flex>
                  <Spacing size={15} />

                  {/* 색상 */}
                  <Flex justify={'space-between'} align={'center'}>
                    <Text typography="t6">색상</Text>
                    <Text typography="t6">
                      {cosmetic?.color?.map((col, idx) => col + ', ')}
                    </Text>
                  </Flex>
                  <Spacing size={5} />

                  {/* 타입 */}
                  <Flex justify={'space-between'} align={'center'}>
                    <Text typography="t6">타입</Text>
                    <Text typography="t6">{cosmetic?.type}</Text>
                  </Flex>
                  <Spacing size={5} />

                  {/* 제품향 */}
                  <Flex justify={'space-between'} align={'center'}>
                    <Text typography="t6">제품 향</Text>
                    <Text typography="t6">{cosmetic?.scent}</Text>
                  </Flex>
                  <Spacing size={5} />

                  {/* 제품용량 */}
                  <Flex justify={'space-between'} align={'center'}>
                    <Text typography="t6">제품 용량</Text>
                    <Text typography="t6">{cosmetic?.volume}</Text>
                  </Flex>
                  <Spacing size={5} />

                  {/* 잔여수량 */}
                  <Flex justify={'space-between'} align={'center'}>
                    <Text typography="t6">잔여 수량</Text>
                    <Text typography="t6">{cosmetic?.count} 개</Text>
                  </Flex>
                  <Spacing size={40} />

                  {/* 가격 영역 */}
                  <Flex justify={'space-between'}>
                    <Flex align={'center'}>
                      <FaStar fill="#ffdb00" />
                      <Spacing size={5} direction={'horizontal'} />
                      <Text typography="t6" bold>
                        {cosmetic?.rating}
                      </Text>
                    </Flex>
                    <Flex align={'flex-end'}>
                      <Text typography="t4" css={salePerStyle}>
                        {addDelimiter(Number(cosmetic?.salePercent)) + '%'}
                      </Text>
                      <Spacing size={5} direction={'horizontal'} />
                      <Text typography="t8" css={saleTextStyle}>
                        {addDelimiter(Number(cosmetic?.price))}
                      </Text>
                      <Spacing size={3} direction={'horizontal'} />
                      <Text typography="t4" bold>
                        {addDelimiter(
                          Number(cosmetic?.price) - Number(cosmetic?.totalSale),
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                  {/* <TagStyle>{tagComponent()}</TagStyle> */}
                </DescBox>
                <DescEventBanner>
                  {NewUserBanner ? (
                    <Link to={'/signup'}>
                      <img src={NewUserBanner} alt="newUserEvent" />
                    </Link>
                  ) : (
                    <Skeleton width={450} height={80} />
                  )}
                </DescEventBanner>
              </DetailDesc>
            </DetailBox>
            {/* 하단 정보 영역 */}
            <MoveDetailContent>
              <MoveNavRow>
                <NavItem cate={0} onClick={() => setMoveInfo(0)}>
                  제품정보
                </NavItem>
                <NavItem cate={1} onClick={() => setMoveInfo(1)}>
                  상세정보
                </NavItem>
                <NavItem cate={2} onClick={() => setMoveInfo(2)}>
                  리뷰/후기
                </NavItem>
              </MoveNavRow>
              <DetailInfoBox>
                <DetailCosmeticInfo
                  data={cosmetic ? cosmetic : null}
                  moveInfo={moveInfo}
                />
              </DetailInfoBox>
            </MoveDetailContent>
          </CosmeticDetailBox>
        </CosmeticContainer>
      ) : (
        <MobileContainer>
          <MobileImgWrapper>
            {cosmetic?.url && cosmetic?.subUrl ? (
              <MobileCosmeticSwiper
                mainImg={cosmetic?.url}
                subImg={cosmetic?.subUrl}
              />
            ) : (
              <Skeleton width={'100%'} height={350} />
            )}
          </MobileImgWrapper>
          {/* <MobileTagStyle>{tagComponent()}</MobileTagStyle> */}
          <MobileDetailBox>
            <Spacing size={10} />
            {/* 제품명/브랜드명 */}
            {cosmetic?.brand_name && cosmetic?.name ? (
              <Flex direction="column" css={nameStyle}>
                <Spacing size={10} direction={'horizontal'} />
                <Text typography="t5">{cosmetic.brand_name}</Text>
                <Spacing size={5} direction={'horizontal'} />
                <Flex justify={'space-between'}>
                  <Text typography="t2" bold>
                    {cosmetic.name}
                  </Text>
                  <CateTag>{cosmetic.category}</CateTag>
                </Flex>
              </Flex>
            ) : (
              <Skeleton width={300} height={40} />
            )}
            <Spacing size={10} />

            {/* 한줄설명 */}
            <Flex>
              <Text typography="t5">" {cosmetic?.comment} "</Text>
            </Flex>
            <Spacing size={15} />

            {/* 색상 */}
            <Flex justify={'space-between'} align={'center'}>
              <Text typography="t6">색상</Text>
              <Text typography="t6">
                {cosmetic?.color?.map((col, idx) => col + ', ')}
              </Text>
            </Flex>
            <Spacing size={5} />

            {/* 가격 영역 */}
            <Flex justify={'space-between'}>
              <Flex align={'center'}>
                <FaStar fill="#ffdb00" />
                <Spacing size={5} direction={'horizontal'} />
                <Text typography="t6" bold>
                  {cosmetic?.rating}
                </Text>
              </Flex>
              <Flex align={'flex-end'}>
                <Text typography="t4" css={salePerStyle}>
                  {addDelimiter(Number(cosmetic?.salePercent)) + '%'}
                </Text>
                <Spacing size={5} direction={'horizontal'} />
                <Text typography="t8" css={saleTextStyle}>
                  {addDelimiter(Number(cosmetic?.price))}
                </Text>
                <Spacing size={3} direction={'horizontal'} />
                <Text typography="t4" bold>
                  {addDelimiter(
                    Number(cosmetic?.price) - Number(cosmetic?.totalSale),
                  )}
                </Text>
              </Flex>
            </Flex>

            <MobileNewUserBanner>
              {NewUserBanner ? (
                <Link to={'/signup'}>
                  <img src={NewUserBanner} alt="newUserEvent" />
                </Link>
              ) : (
                <Skeleton width={450} height={80} />
              )}
            </MobileNewUserBanner>
          </MobileDetailBox>
          <MobileDetailInfoBox>
            <MoveNavRow>
              <NavItem cate={0} onClick={() => setMoveInfo(0)}>
                제품정보
              </NavItem>
              <NavItem cate={1} onClick={() => setMoveInfo(1)}>
                상세정보
              </NavItem>
              <NavItem cate={2} onClick={() => setMoveInfo(2)}>
                리뷰/후기
              </NavItem>
            </MoveNavRow>
            <MobileDetailCosmeticInfo
              data={cosmetic ? cosmetic : null}
              moveInfo={moveInfo}
            />
          </MobileDetailInfoBox>
        </MobileContainer>
      )}
    </>
  )
}

// 모바일 - Mobile
const MobileContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MobileDetailBox = styled.div`
  width: 85%;
  margin-bottom: 20px;
`

const MobileImgWrapper = styled.div`
  background-color: #eee;
  width: 100%;
  height: 400px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const MobileDetailInfoBox = styled.div`
  background-color: white;
  height: 300px;
  width: 100%;
  margin-top: 20px;
`
const MobileTagStyle = styled.div`
  width: 100%;
`
const MobileNewUserBanner = styled.div`
  background-color: #fff;
  height: 80px;
  width: 100%;
  margin-top: 30px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

// 웹 - Web
const CosmeticContainer = styled.div`
  width: 1350px;
  padding-top: 10px;
  margin: 0 auto;
  display: flex;
`
const NavEventBanner = styled.div`
  background-color: white;
  height: 250px;
  width: 100%;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const DescEventBanner = styled.div`
  background-color: #fff;
  height: 80px;
  width: 100%;
  margin-top: 5px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const DetailInfoBox = styled.div`
  background-color: white;
  height: 300px;
  padding: 10px;
`
const CategoryNavBox = styled.div`
  height: auto;
  flex-basis: 200px;
`
const CosmeticDetailBox = styled.div`
  flex-basis: 1150px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
`
const MoveNavRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #eee;
`
const MoveDetailContent = styled.div`
  background-color: white;
  height: auto;
  width: 100%;
`
const DetailBox = styled.div`
  display: flex;
  justify-content: center;
  min-height: 600px;
  width: 100%;
  padding-top: 60px;
`
const TagStyle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`
const SubImg = styled.div`
  background-color: white;
  height: 100px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SubImgItem = styled.div`
  background-color: #eee;
  border: 1px solid #eee;
  height: 60px;
  width: 60px;
  padding: 5px;
  cursor: pointer;
  margin-right: 5px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const MainImg = styled.div`
  background-color: white;
  height: 400px;
  width: 350px;
  border: 1px solid #eee;

  & img {
    height: 400px;
    width: 350px;
    object-fit: contain;
  }
`
const DescBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`
const DetailDesc = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  min-height: 500px;
  margin-left: 10px;
`
const CateTag = styled.div`
  padding: 2px 8px;
  height: 20px;
  background-color: #eee;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
`
const nameStyle = css`
  height: 80px;
  margin-top: 10px;
  overflow: hidden;
`
const salePerStyle = css`
  color: red;
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default CosmeticDetailPage
