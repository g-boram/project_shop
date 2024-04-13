import { BsInfoCircleFill } from 'react-icons/bs'

import { useMainCategoryIcons } from '@/hooks/data/useMainData'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import { css } from '@emotion/react'
import { PropagateLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

const MainIconBox = () => {
  const { data, isLoading } = useMainCategoryIcons()
  const [isMore, setIsMore] = useState(false)

  const [innerWidth, setInnerWidth] = useState(0)
  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const handleIsMore = () => {
    setIsMore((prev) => !prev)
  }

  if (data == null || isLoading) {
    return (
      <LoadingBox>
        <Flex>
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
          <IconItem />
        </Flex>
        <PropagateLoader color="#e6a4b4" />
      </LoadingBox>
    )
  }
  const EventIcons = [
    {
      name: 'Time',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-shop-62c72.appspot.com/o/main%2FcategoryIcons%2FtimeSale.jpg?alt=media&token=a03cfd55-d858-4bfa-9abf-1799f3874151',
    },
    {
      name: 'Sale',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-shop-62c72.appspot.com/o/main%2FcategoryIcons%2Fsale_icon.png?alt=media&token=890d6f60-f03d-460a-b554-e78398f2d1c0',
    },
    {
      name: 'Gift',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-shop-62c72.appspot.com/o/main%2FcategoryIcons%2Ficon_giftBox.png?alt=media&token=bf12a3c2-ec05-42b1-94ba-9b674286a591',
    },
  ]
  return (
    <>
      {innerWidth < 600 ? (
        <>
          {isMore ? (
            <IconMoreCotainer>
              {/* 너비 600 이하 && 더보기 버튼 활성화 */}
              {EventIcons.map((icon, index) => {
                return (
                  <Link to={`/cosmetic`}>
                    <IconBox>
                      <img src={icon.url} alt={icon.name} />
                      <span>{icon.name}</span>
                    </IconBox>
                  </Link>
                )
              })}
              {data?.map((icon, index) => {
                return (
                  <Link to={`/cosmetic/${icon.category}`}>
                    <IconBox>
                      <img src={icon.url} alt={icon.name} />
                      <span>{icon.name}</span>
                    </IconBox>
                  </Link>
                )
              })}
            </IconMoreCotainer>
          ) : (
            <IconCotainer>
              {/* 너비 600 이하 && 더보기 버튼 비활성화 */}
              <>
                {EventIcons.map((icon, index) => {
                  return (
                    <Link to={`/cosmetic`}>
                      <IconBox>
                        <img src={icon.url} alt={icon.name} />
                        <span>{icon.name}</span>
                      </IconBox>
                    </Link>
                  )
                })}
              </>
              {data?.map((icon, index) => {
                return (
                  <Link to={`/cosmetic/${icon.category}`}>
                    <IconBox>
                      <img src={icon.url} alt={icon.name} />
                      <span>{icon.name}</span>
                    </IconBox>
                  </Link>
                )
              })}
            </IconCotainer>
          )}
          <Button full color={'grey'} onClick={handleIsMore}>
            {isMore ? '닫기' : '더보기'}
          </Button>
        </>
      ) : (
        <IconCotainer>
          {/* 너비 600 이상 */}
          {EventIcons.map((icon, index) => {
            return (
              <Link to={`/cosmetic`}>
                <IconBox>
                  <img src={icon.url} alt={icon.name} />
                  <span>{icon.name}</span>
                </IconBox>
              </Link>
            )
          })}
          {data?.map((icon, index) => {
            return (
              <Link to={`/cosmetic/${icon.category}`}>
                <IconBox>
                  <img src={icon.url} alt={icon.name} />
                  <span>{icon.name}</span>
                </IconBox>
              </Link>
            )
          })}
          <Spacing size={15} direction={'horizontal'} />
        </IconCotainer>
      )}
    </>
  )
}
const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  background-color: #eee;
`
const IconItem = styled.div`
  height: 70px;
  width: 70px;
  background-color: lightGrey;
  border-radius: 50%;
  margin: 0px 10px;
`

const IconMoreCotainer = styled.div`
  display: flex;
  height: auto;
  background-color: #fcfcfc;
  padding: 10px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`
const IconCotainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  height: auto;
  overflow: scroll;
  margin-top: 10px;
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px;
  height: auto;
  width: 60px;
  align-items: center;
  color: ${`var(--fontBlack)`};

  & span {
    margin-top: 15px;
    font-size: 0.8rem;
    width: 60px;
    text-align: center;
  }
  & img {
    border: 1px solid #f0d9da;
    height: auto;
    width: 100%;
    background-color: white;
    padding: 5px;
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    transition: 0.5s;
    width: 40px;
  }
`

export default MainIconBox
