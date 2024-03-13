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
import { useNavigate, useParams } from 'react-router-dom'

const CosmeticDetailPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [cosmetic, setCosmetic] = useState<Cosmetic | null>(null)

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
    <CosmeticContainer>
      <CosmeticWrapper>
        <CosmeticBox>
          <Flex>
            <ImgWrapper>
              <img src="" alt="" />
            </ImgWrapper>
            <TextWrapper></TextWrapper>
          </Flex>
        </CosmeticBox>
      </CosmeticWrapper>
    </CosmeticContainer>
  )
}

const CosmeticContainer = styled.div`
  width: 100%;
  min-height: 1000px;
  overflow: scroll;
  background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CosmeticWrapper = styled.div`
  background-color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
`

const CosmeticBox = styled.div`
  background-color: yellow;
  min-height: 900px;
  width: 800px;
`

const ImgWrapper = styled.div`
  height: 300px;
  width: 300px;
  background-color: grey;
  margin-right: 10px;
`
const TextWrapper = styled.div`
  height: 300px;
  width: 500px;
  background-color: grey;
`

export default CosmeticDetailPage
