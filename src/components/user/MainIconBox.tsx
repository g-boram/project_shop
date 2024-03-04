// 아이콘 제작자: justicon - Flaticon

import { useMainCategoryIcons } from '@/hooks/data/useMainData'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Button from '../shared/Button'

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
  console.log('innerWidth', innerWidth)

  const handleIsMore = () => {
    setIsMore((prev) => !prev)
  }
  console.log('isMore', isMore)
  return (
    <>
      {/* <IconCotainer>
        {data?.map((icon, index) => {
          return (
            <IconBox>
              <img src={icon.url} alt={icon.name} />
              <span>{icon.name}</span>
            </IconBox>
          )
        })}
      </IconCotainer> */}
      {innerWidth < 600 ? (
        <>
          {isMore ? (
            <IconMoreCotainer>
              {data?.map((icon, index) => {
                return (
                  <IconBox>
                    <img src={icon.url} alt={icon.name} />
                    <span>{icon.name}</span>
                  </IconBox>
                )
              })}
            </IconMoreCotainer>
          ) : (
            <IconCotainer>
              {data?.map((icon, index) => {
                return (
                  <IconBox>
                    <img src={icon.url} alt={icon.name} />
                    <span>{icon.name}</span>
                  </IconBox>
                )
              })}
            </IconCotainer>
          )}
          <Button full onClick={handleIsMore}>
            {isMore ? '닫기' : '더보기'}
          </Button>
        </>
      ) : (
        <IconCotainer>
          {data?.map((icon, index) => {
            return (
              <IconBox>
                <img src={icon.url} alt={icon.name} />
                <span>{icon.name}</span>
              </IconBox>
            )
          })}
        </IconCotainer>
      )}
    </>
  )
}

const IconMoreCotainer = styled.div`
  display: flex;
  height: auto;
  background-color: pink;
  padding: 10px;
  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 600px) {
    overflow: scroll;
  }
`
const IconCotainer = styled.div`
  display: flex;
  height: auto;
  background-color: pink;
  padding: 10px;
  @media (max-width: 600px) {
    overflow: hidden;
  }
  @media (min-width: 600px) {
    overflow: scroll;
  }
`
// @media (max-width: 600px) {
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// }
const hiddenIcon = css`
  overflow: hidden;
`
const moreIcon = css`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px;
  height: auto;
  width: 20%;
  align-items: center;

  & span {
    margin-top: 15px;
    font-size: 0.8rem;
    width: 60px;
    text-align: center;
  }
  & img {
    height: auto;
    width: 100%;
    background-color: white;
    padding: 5px;
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    transition: 0.5s;
    width: 10%;
  }
`

export default MainIconBox
