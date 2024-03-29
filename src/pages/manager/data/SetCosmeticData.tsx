import Button from '@/components/shared/Button'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import ManagerHead from '@/components/shared/ManagerHead'
import Spacing from '@/components/shared/Spacing'
import styled from '@emotion/styled'

import { useNavigate } from 'react-router-dom'

export default function SetCosmeticData() {
  const navigate = useNavigate()

  return (
    <>
      <ManagerHead title={'Set Cosmetic Data'} />
      <ManagerPageLayout>
        <SettingContainer>
          <>
            <CosmeticDataBox>
              <ImgBox>Cosmetic</ImgBox>
              <Spacing size={5} />
              <Skeleton />
              <Skeleton />
            </CosmeticDataBox>
            <Button
              size="large"
              color="purple"
              onClick={() => navigate('/manager/cosmetic/form')}
            >
              화장품 등록하기
            </Button>
          </>
        </SettingContainer>
      </ManagerPageLayout>
    </>
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
const CosmeticDataBox = styled.div`
  height: 300px;
  width: 200px;
  background-color: grey;
  margin: 20px 10px;
`
const Skeleton = styled.div`
  height: 15px;
  width: 170px;
  margin: 10px 15px;
  background-color: #eee;
`
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 190px;
  width: 170px;
  margin: 15px;
  background-color: #eee;
`
