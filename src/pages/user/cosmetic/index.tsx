import Button from '@/components/shared/Button'
import Spacing from '@/components/shared/Spacing'
import CosmeticList from '@/components/user/CosmeticList'
import { CATEGORY } from '@/constants/cosmetic'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// 카테고리 category
// 선물 - gift
// 세일 - sale
// 타임세일 - timesale
// 베이스 - base
// 스킨/앰플 - skin
// 미용도구 - tools
// 향수 - perfume
// 마스카라 - maskara
// 마스크/팩 - maskpack
// 파운데이션 - foundation
// 바디 - body
// 아이섀도우 - eyeshadow
// 로션/크림 - cream
// 선크림 - suncream
// 카테고리 - category

const CosmeticPage = () => {
  const params = useParams()
  const [category, setCategory] = useState<string>('shadow')

  useEffect(() => {
    if (params?.category) {
      setCategory(params?.category)
    }
  }, [params?.category])

  return (
    <CosmeticContainer>
      <CosmeticWrapper>
        <CosmeticBox>
          <CategoryNavBox>
            <EventBannerBox>EventBannerBox</EventBannerBox>
            <Spacing size={30} />
            {CATEGORY.map((cate, idx) => (
              <>
                <Button
                  key={idx}
                  color="pink"
                  size="large"
                  full
                  onClick={() => setCategory(cate.value)}
                >
                  {cate.name}
                </Button>
                <Spacing size={5} />
              </>
            ))}
          </CategoryNavBox>
          <CosmeticListBox>
            <CosmeticList category={category} />
          </CosmeticListBox>
        </CosmeticBox>
      </CosmeticWrapper>
    </CosmeticContainer>
  )
}

const CosmeticContainer = styled.div`
  min-width: 1200px;
  min-height: 1000px;
  overflow: scroll;
  margin: 0 auto;
  background-color: pink;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CosmeticWrapper = styled.div`
  background-color: white;
  width: 1400px;
`

const EventBannerBox = styled.div`
  background-color: white;
  height: 250px;
  width: 100%;
`

const CosmeticBox = styled.div`
  background-color: pink;
  display: flex;
  padding: 10px;
`
const CategoryNavBox = styled.div`
  background-color: grey;
  height: auto;
  padding: 10px;
  width: 20%;
`
const CosmeticListBox = styled.div`
  background-color: white;
  width: 80%;
  min-height: 900px;
`
export default CosmeticPage
