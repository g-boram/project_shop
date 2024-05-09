import styled from '@emotion/styled'
import useUser from '@/hooks/auth/useUser'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ManagerPageLayout from '../shared/Layout/ManagerPageLayout'
import ManagerHead from '../shared/ManagerHead'
import Spacing from '../shared/Spacing'
import CosmeticForm from '../cosmetic/CosmeticForm'
import { Link, useNavigate } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Cosmetic } from '@/models/cosmetic'
import { useState } from 'react'
import { addCosmetic } from '@/remote/cosmetic'

const ManagerCosmeticForm = () => {
  const user = useUser()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const handleLoading = () => setIsLoading(true)

  // 등록 버튼
  const handleSubmit = async (formValues: Cosmetic) => {
    setIsLoading(true)
    const formData = {
      ...formValues,
      uid: user?.uid,
      email: user?.email,
      managerName: user?.displayName,
    }
    try {
      await addCosmetic(formData).then(() => {
        toast.success('화장품 등록 완료!')
        navigate('/manager/data/setCosmeticData')
      })
    } catch (e: any) {
      console.log('formData Error', e)
    }
  }

  return (
    <>
      <ManagerHead title={'Set Cosmetic Data'} />
      <ManagerPageLayout>
        <SettingContainer>
          <CosmeticForm onSubmit={handleSubmit} setLoading={handleLoading} />
          {isLoading ? (
            <DimmedBox>
              {/* <PuffLoader color="#6643b5" size={'200px'} /> */}
            </DimmedBox>
          ) : (
            <></>
          )}
          <Spacing size={20} />
          <Flex justify={'center'}>
            <Link to={'/manager/data/setBoardData'}>
              <Button size="medium" color="purple">
                목록
              </Button>
            </Link>
          </Flex>
        </SettingContainer>
      </ManagerPageLayout>
    </>
  )
}

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
`
const DimmedBox = styled.div`
  position: absolute;
  bottom: 10;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export default ManagerCosmeticForm
