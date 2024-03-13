import Button from '@/components/shared/Button'
import HeadTitle from '@/components/shared/HeadTitle'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import ManagerHead from '@/components/shared/ManagerHead'
import { COLLECTIONS } from '@/constants'
import useCosmetics from '@/hooks/data/useCosmetics'
import { store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function SetCosmeticData() {
  const navigate = useNavigate()

  // cosmetic.forEach((item) => {
  //   const docRef = doc(collection(store, COLLECTIONS.COSMETIC))
  //   batch.set(docRef, item)
  // })
  // batch.commit()

  return (
    <ManagerPageLayout>
      <ManagerHead title={'Set Cosmetic Data'} />
      <SettingContainer>
        <Button onClick={() => navigate('/manager/cosmetic/form')}>
          화장품 등록하기
        </Button>
      </SettingContainer>
    </ManagerPageLayout>
  )
}

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 800px;
  width: 100%;
`
