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
import { RxCross2 } from 'react-icons/rx'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { BiLike } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import useLike from '@/hooks/like/useLike'
import CopyToClipboard from 'react-copy-to-clipboard'
import useShare from '@/hooks/share/useShare'
import useDetailCosmetic from '@/hooks/data/useDetailCosmetic'
import { useQuery, useQueryClient } from 'react-query'
import { getDetailCosmetic } from '@/remote/cosmetic'
import Select from 'react-select'

const CosmeticDetailPage = () => {
  const params = useParams()
  const share = useShare()

  const [innerWidth, setInnerWidth] = useState(0)
  const [moveInfo, setMoveInfo] = useState(0)
  const [currentImg, setCurrentImg] = useState('')

  const [buyItem, setBuyItem] = useState<CosmeticItemOption[]>([])
  const [item, setItem] = useState<any>([])
  const [itemOptions, setItemOptions] = useState<
    CosmeticItemOption[] | undefined
  >([])

  const [cosmetic, setCosmetic] = useState<Cosmetic | null>(null)
  interface CosmeticItemOption {
    readonly id: string
    readonly label: string
    readonly value: string | null
  }

  useEffect(() => {
    if (cosmetic) {
      const arrayOpt = cosmetic.color?.map((col: any, idx: any) => ({
        id: idx,
        label: `${cosmetic?.name} ( ${col} )`,
        value: `${cosmetic?.name},${col}`,
      }))
      setItemOptions(arrayOpt)
    }
  }, [cosmetic])

  const { data: likes, mutate: like } = useLike()
  const isLike = Boolean(
    likes?.find((like) => like.cosmeticId === cosmetic?.id),
  )

  const getDetailCosmetic = async (id: string) => {
    await onSnapshot(doc(store, `${COLLECTIONS.COSMETIC}`, id), (item) => {
      const data = {
        id: item.id,
        ...item.data(),
      } as Cosmetic
      setCosmetic(data)
      setCurrentImg(item.data()?.url)
    })
  }

  useEffect(() => {
    if (params?.id) getDetailCosmetic(params?.id)
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

  // 찜하기, 공유하기 영역
  const topActionBox = () => {
    return (
      <TopIconBox>
        <Flex direction="column" align={'center'}>
          <IconWrapper>
            <img
              src={
                isLike
                  ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                  : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
              }
              alt=""
              onClick={() => {
                if (cosmetic) {
                  like({
                    cosmetic: {
                      name: cosmetic?.name,
                      url: cosmetic?.url,
                      id: cosmetic?.id,
                      price: cosmetic?.price,
                      comment: cosmetic?.comment,
                      brand_name: cosmetic?.brand_name,
                      volume: cosmetic?.volume,
                      category: cosmetic?.category,
                      salePercent: cosmetic?.salePercent,
                      totalSale: cosmetic?.totalSale,
                    },
                  })
                }
              }}
            />
          </IconWrapper>
          <Text typography="t6">찜하기</Text>
        </Flex>

        <Flex direction="column" align={'center'}>
          <IconWrapper>
            <img
              src={
                'https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png'
              }
              alt=""
              onClick={() => {
                share({
                  title: cosmetic?.name,
                  description: cosmetic?.comment,
                  imageUrl: cosmetic?.url,
                  buttonLabel: '지금 당장 쇼핑몰에서 보기 Go!',
                })
              }}
            />
          </IconWrapper>
          <Text typography="t6">카카오공유</Text>
        </Flex>

        <Flex direction="column" align={'center'}>
          <IconWrapper>
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => {
                alert('링크가 복사되었습니다.')
              }}
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-512.png"
                alt=""
              />
            </CopyToClipboard>
          </IconWrapper>
          <Text typography="t6">링크공유</Text>
        </Flex>
      </TopIconBox>
    )
  }

  // 품절갯수 계산
  const isTotalCountBadge = () => {
    const deadline =
      Number(cosmetic?.count) <= 10 && Number(cosmetic?.count) !== 0
    const soldOut = Number(cosmetic?.count) === 0
    return (
      <Flex
        justify={'space-between'}
        align={'center'}
        direction="column"
        css={css`
          width: 100%;
          margin-bottom: 20px;
        `}
      >
        {deadline === true ? (
          <Tag fontSize="16px" height="20px" backgroundColor="red">
            마감임박 현재수량 {cosmetic?.count} 개
          </Tag>
        ) : null}
        <Spacing size={10} />

        {soldOut === true ? (
          <Button color="grey" size="large" full>
            매진
          </Button>
        ) : (
          <Button color="pink" size="large" full>
            구매하기
          </Button>
        )}
      </Flex>
    )
  }

  // 선택된 아이템
  const controlItem = (newValue: any) => {
    console.log('newValue', newValue)
    if (item.length === 0) {
      setBuyItem([newValue])
    } else {
      setBuyItem((prevValue) => {
        if (Array.isArray(prevValue)) {
          // 이전 상태가 배열인 경우에만 새로운 값을 추가하여 새로운 배열을 반환합니다.
          const isId = prevValue.filter((v, i) => v.id === newValue.id)
          if (isId.length === 0) {
            return [...prevValue, newValue]
          } else {
            return [...prevValue]
          }
          // console.log('isId', isId)
        } else {
          // 이전 상태가 배열이 아닌 경우에는 새로운 배열을 반환합니다.
          console.error('prevValue is not an array')
          return [...prevValue]
        }
      })
    }
    setItem(newValue)
  }

  // 선택된 아이템 지우기
  const handleDelItem = (id: string) => {
    setBuyItem((prevItems) => prevItems.filter((item) => item.id !== id))
  }
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
                      <img
                        src={cosmetic.url}
                        alt={`mainImg`}
                        onClick={() =>
                          setCurrentImg(cosmetic.url ? cosmetic.url : '')
                        }
                      />
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
                        <img
                          src={sub.url}
                          alt={`subImg${idx}`}
                          onClick={() => setCurrentImg(sub.url ? sub.url : '')}
                        />
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
                {topActionBox()}
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
                <BuyCosmeticBox>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="cosmeticItem"
                    placeholder={'상품을 선택해주세요'}
                    options={itemOptions}
                    value={item}
                    onChange={(newValue) => controlItem(newValue)}
                    styles={{
                      container: (containerStyles) => ({
                        ...containerStyles,
                        width: '100%',
                        fontSize: '13px',
                        height: '40px',
                        borderRadius: '5px',
                      }),
                      menu: (controlStyles) => ({
                        ...controlStyles,
                        height: '150px',
                        backgroundColor: '#fff',
                        overflow: 'scroll',
                      }),
                    }}
                  />
                  {buyItem.length !== 0 ? (
                    <Flex direction="column">
                      <SelectItemBox>
                        {buyItem.map((item, idx) => {
                          return (
                            <Flex justify={'space-between'}>
                              <div>{item.label}</div>
                              <div
                                css={css`
                                  cursor: pointer;
                                `}
                                onClick={() => handleDelItem(item.id)}
                              >
                                <RxCross2 size={15} />
                              </div>
                            </Flex>
                          )
                        })}
                      </SelectItemBox>
                      <TotalCountBox>
                        <Text typography="t6" bold>
                          Total :
                        </Text>
                        <Text typography="t6">
                          {addDelimiter(
                            (Number(cosmetic?.price) -
                              Number(cosmetic?.totalSale)) *
                              buyItem.length,
                          )}{' '}
                          원
                        </Text>
                      </TotalCountBox>
                    </Flex>
                  ) : (
                    <></>
                  )}
                </BuyCosmeticBox>
                {isTotalCountBadge()}
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
            <Spacing size={20} />
            {topActionBox()}
            <Spacing size={20} />
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
            <Spacing size={20} />
            <BuyCosmeticBox>
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="cosmeticItem"
                placeholder={'상품을 선택해주세요'}
                options={itemOptions}
                value={item}
                onChange={(newValue) => controlItem(newValue)}
                styles={{
                  container: (containerStyles) => ({
                    ...containerStyles,
                    width: '100%',
                    fontSize: '13px',
                    height: '40px',
                    borderRadius: '5px',
                  }),
                  menu: (controlStyles) => ({
                    ...controlStyles,
                    height: '150px',
                    backgroundColor: '#fff',
                    overflow: 'scroll',
                  }),
                }}
              />
              {buyItem.length !== 0 ? (
                <Flex direction="column">
                  <SelectItemBox>
                    {buyItem.map((item, idx) => {
                      return (
                        <Flex justify={'space-between'}>
                          <div>{item.label}</div>
                          <div
                            css={css`
                              cursor: pointer;
                            `}
                            onClick={() => handleDelItem(item.id)}
                          >
                            <RxCross2 size={15} />
                          </div>
                        </Flex>
                      )
                    })}
                  </SelectItemBox>
                  <TotalCountBox>
                    <Text typography="t6" bold>
                      Total :
                    </Text>
                    <Text typography="t6">
                      {addDelimiter(
                        (Number(cosmetic?.price) -
                          Number(cosmetic?.totalSale)) *
                          buyItem.length,
                      )}{' '}
                      원
                    </Text>
                  </TotalCountBox>
                </Flex>
              ) : (
                <></>
              )}
            </BuyCosmeticBox>
            <Spacing size={20} />
            {isTotalCountBadge()}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const MobileDetailBox = styled.div`
  width: 90%;
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
  width: 1400px;
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
`
const SelectItemBox = styled.div`
  width: 100%;
  min-height: 150px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 5px;

  & > div {
    background-color: white;
    padding: 10px;
  }
`
const TotalCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 60px;
  margin: 10px 0;
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
const BuyCosmeticBox = styled.div`
  display: flex;
  min-height: 80px;
  width: 100%;
  flex-direction: column;
`
const DetailBox = styled.div`
  display: flex;
  justify-content: center;
  min-height: 700px;
  height: auto;
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
  min-height: 400px;
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
const IconWrapper = styled.div`
  height: 30px;
  width: 30px;
  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
`
const TopIconBox = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
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
