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

const MainIconBox = () => {
  const { data, isLoading = true } = useMainCategoryIcons()
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
        <PropagateLoader color="#e6a4b4" />
      </LoadingBox>
    )
  }

  return (
    <>
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
              <Spacing size={10} direction={'horizontal'} />
              <Flex align={'center'}>
                <BsInfoCircleFill size={'13px'} fillOpacity={'0.3'} />
                <Spacing size={5} direction={'horizontal'} />
                <Text typography={'t8'} color={'fontGrey'}>
                  아이콘 제작자: justicon - Flaticon
                </Text>
              </Flex>
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
          <Button full color={'pink'} onClick={handleIsMore}>
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
          <Spacing size={15} direction={'horizontal'} />
          <Flex
            align={'center'}
            justify={'center'}
            direction={'column'}
            css={css`
              text-align: center;
            `}
          >
            <BsInfoCircleFill size={'13px'} fillOpacity={'0.3'} />
            <Spacing size={5} />
            <Text typography={'t8'} color={'fontGrey'}>
              아이콘 제작자
            </Text>
            <Text typography={'t8'} color={'fontGrey'}>
              justicon
            </Text>
            <Text typography={'t8'} color={'fontGrey'}>
              -
            </Text>
            <Text typography={'t8'} color={'fontGrey'}>
              Flaticon
            </Text>
          </Flex>
        </IconCotainer>
      )}
    </>
  )
}

const IconMoreCotainer = styled.div`
  display: flex;
  height: auto;
  background-color: #fff4f5;
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
  padding: 10px;
  @media (max-width: 600px) {
    overflow: hidden;
  }
  @media (min-width: 600px) {
    overflow: scroll;
  }
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px;
  height: auto;
  width: 20%;
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
    width: 10%;
  }
`
const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
`
export default MainIconBox
