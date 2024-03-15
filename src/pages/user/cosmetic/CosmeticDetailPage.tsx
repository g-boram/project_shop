import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { COLLECTIONS } from '@/constants'
import { CATEGORY } from '@/constants/cosmetic'
import { Cosmetic } from '@/models/cosmetic'
import { store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CosmeticDetailPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [innerWidth, setInnerWidth] = useState(0)

  const [cosmetic, setCosmetic] = useState<Cosmetic | null>(null)

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

  // 게시판 데이터 가져오기
  const getDetailBoard = async (id: string) => {
    const docRef = doc(store, `${COLLECTIONS.COSMETIC}`, id)
    const docSnap = await getDoc(docRef)

    setCosmetic({ id: docSnap.id, ...(docSnap.data() as Cosmetic) })
  }
  console.log('cosmetic', cosmetic)
  useEffect(() => {
    if (params?.id) getDetailBoard(params?.id)
  }, [params?.id])

  return (
    <>
      {innerWidth > 600 ? (
        <CosmeticContainer>
          <CategoryNavBox>
            <EventBannerBox>EventBannerBox</EventBannerBox>
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
                <img src="" alt="" />
              </MainImg>
              <DetailDesc>DetailDesc</DetailDesc>
            </DetailBox>
            <MoveDetailContent>
              <MoveNavRow>
                <NavItem>제품정보</NavItem>
                <NavItem>상세정보</NavItem>
                <NavItem>리뷰/후기</NavItem>
              </MoveNavRow>
            </MoveDetailContent>
          </CosmeticDetailBox>
        </CosmeticContainer>
      ) : (
        <MobileContainer></MobileContainer>
      )}
    </>
  )
}

const MobileContainer = styled.div`
  background-color: pink;
  height: auto;
  padding: 10px;
`
const CosmeticContainer = styled.div`
  width: 1350px;
  padding-top: 10px;
  margin: 0 auto;
  background-color: pink;
  display: flex;
`

const EventBannerBox = styled.div`
  background-color: white;
  height: 250px;
  width: 100%;
`

const CategoryNavBox = styled.div`
  background-color: grey;
  height: auto;
  flex-basis: 200px;
`
const CosmeticDetailBox = styled.div`
  flex-basis: 1150px;
  display: flex;
  flex-direction: column;
  background-color: grey;
  padding: 10px;
  overflow: scroll;
`
const NavItem = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  font-size: 16px;
  font-weight: bold;
  width: 130px;
  margin-right: 10px;
  border: 2px solid #ddd;
  border-radius: 8px 8px 0 0;
`
const MoveNavRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #000;
`
const MoveDetailContent = styled.div`
  background-color: white;
  height: auto;
  width: 100%;
`
const DetailBox = styled.div`
  background-color: pink;
  display: flex;
  justify-content: center;
  min-height: 600px;
  width: 100%;
  padding-top: 60px;
`
const MainImg = styled.div`
  background-color: white;
  height: 400px;
  width: 350px;
  & img {
    height: 400px;
    width: 350px;
    object-fit: contain;
  }
`
const DetailDesc = styled.div`
  background-color: yellow;
  height: 400px;
  width: 500px;
`
export default CosmeticDetailPage
