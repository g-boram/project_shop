import Button from '@/components/shared/Button'
import HeadTitle from '@/components/shared/HeadTitle'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import { COLLECTIONS } from '@/constants'
import useCosmetics from '@/hooks/data/useCosmetics'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

export default function SetCosmeticData() {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    const cosmetic = [
      {
        name: '피치 블러쉬',
        brand_name: '루미너스',
        price: 25000,
        salePercent: 20,
        desc: '자연스러운 피치 컬러로 얼굴에 생기를 더해줍니다.',
        comment: '피치 블러쉬',
        promoEndTime: '2024-03-15',
        color: ['피치', '코랄'],
        type: '파우더',
        volume: '10g',
        scent: '프루티',
        rating: 4.5,
        like: 1200,
        count: 100,
        reviews: [
          {
            작성자: '화장품매니아',
            내용: '피치 블러쉬는 정말 자연스럽고 예뻐요. 강추합니다.',
          },
          {
            작성자: '메이크업러버',
            내용: '색상이 너무 예뻐서 자주 사용하게 되는 제품이에요.',
          },
        ],
        totalSale: 5000,
        category: 'shadow',
      },
      {
        name: '스모키 아이섀도우 팔레트',
        brand_name: '글램코스',
        price: 35000,
        salePercent: 10,
        desc: '다양한 컬러의 스모키 아이섀도우를 한 팔레트에 모았습니다.',
        comment: '스모키 팔레트',
        promoEndTime: '2024-03-20',
        color: ['블랙', '그레이', '실버'],
        type: '파우더',
        volume: '12g',
        scent: '없음',
        rating: 4.2,
        like: 800,
        count: 200,
        reviews: [
          {
            작성자: '아이메이크업',
            내용: '다양한 컬러가 있어서 아이 메이크업에 너무 좋아요.',
          },
          {
            작성자: '뷰티전문가',
            내용: '블랙 스모키가 정말 고급스러워 보여요.',
          },
        ],
        totalSale: 3500,
        category: 'shadow',
      },
      {
        name: '선크림 SPF50+',
        brand_name: '선선한',
        price: 24000,
        salePercent: 15,
        desc: '자외선으로부터 피부를 보호하는 선크림입니다.',
        comment: '선크림',
        promoEndTime: '2024-03-25',
        color: ['화이트'],
        type: '크림',
        volume: '50ml',
        scent: '라벤더',
        rating: 4.6,
        like: 1200,
        count: 300,
        reviews: [
          {
            작성자: '선물같은선크림',
            내용: '향기도 좋고 발림성도 좋아서 자주 사용합니다.',
          },
          {
            작성자: '보습효과있어요',
            내용: '건조한 피부에도 충분한 보습 효과가 있어요.',
          },
        ],
        totalSale: 8500,
        category: 'sunCare',
      },
      {
        name: '모이스처라이징 크림',
        brand_name: '물꼬기',
        price: 28000,
        salePercent: 20,
        desc: '피부에 수분을 공급하고 보습을 유지해주는 모이스처라이징 크림입니다.',
        comment: '보습 크림',
        promoEndTime: '2024-03-18',
        color: ['화이트'],
        type: '크림',
        volume: '50ml',
        scent: '로즈',
        rating: 4.8,
        like: 1500,
        count: 400,
        reviews: [
          {
            작성자: '보습지존',
            내용: '한 겨울에도 건조하지 않은 피부를 유지할 수 있어요.',
          },
          {
            작성자: '로즈향이 좋아',
            내용: '로즈 향이 너무 좋아서 사용하기가 즐거워요.',
          },
        ],
        totalSale: 6500,
        category: 'cream',
      },
      {
        name: '글리터 아이섀도우',
        brand_name: '샤이닝스타',
        price: 29000,
        salePercent: 10,
        desc: '반짝이는 글리터가 포함된 아이섀도우입니다.',
        comment: '글리터 아이섀도우',
        promoEndTime: '2024-03-22',
        color: ['실버', '골드', '로즈골드'],
        type: '크림',
        volume: '8g',
        scent: '플로럴',
        rating: 4.3,
        like: 900,
        count: 150,
        reviews: [
          {
            작성자: '글리터매니아',
            내용: '반짝임이 정말 아름답습니다. 눈에 띄어요.',
          },
          {
            작성자: '플로럴향이 좋아',
            내용: '향기도 좋고 발림성도 좋아서 너무 좋아요.',
          },
        ],
        totalSale: 4500,
        category: 'shadow',
      },
      {
        name: '자외선 차단 로션 SPF30',
        brand_name: '선바람',
        price: 21000,
        salePercent: 20,
        desc: '자외선으로부터 피부를 보호하는 로션입니다.',
        comment: '자외선 차단 로션',
        promoEndTime: '2024-03-20',
        color: ['화이트'],
        type: '로션',
        volume: '100ml',
        scent: '시트러스',
        rating: 4.5,
        like: 1100,
        count: 250,
        reviews: [
          {
            작성자: '선크림중엔단연최고',
            내용: '가볍게 발리고 자외선 차단 효과도 좋아서 최고에요.',
          },
          {
            작성자: '시트러스향이 좋아',
            내용: '시트러스 향이 너무 상쾌해서 마음에 들어요.',
          },
        ],
        totalSale: 7000,
        category: 'sunCare',
      },
      {
        name: '수분 크림',
        brand_name: '모이스처리치',
        price: 32000,
        salePercent: 15,
        desc: '피부에 수분을 공급하고 보습을 유지해주는 수분 크림입니다.',
        comment: '수분 크림',
        promoEndTime: '2024-03-25',
        color: ['화이트'],
        type: '크림',
        volume: '50ml',
        scent: '자스민',
        rating: 4.7,
        like: 1300,
        count: 300,
        reviews: [
          {
            작성자: '수분강화',
            내용: '건조한 피부에 정말 좋습니다. 보습력이 훌륭합니다.',
          },
          {
            작성자: '자스민향이 좋아',
            내용: '자스민 향이 너무 좋아서 자꾸 냄새를 맡게 돼요.',
          },
        ],
        totalSale: 9000,
        category: 'cream',
      },
    ]

    // const data = cosmetic.map((val, i) => {
    //   return { ...val }
    // })
    cosmetic.forEach((item) => {
      const docRef = doc(collection(store, COLLECTIONS.COSMETIC))
      batch.set(docRef, item)
    })
    batch.commit()
  }
  const { data: cosmetic } = useCosmetics()

  console.log('cosmetic', cosmetic)
  return (
    <ManagerPageLayout>
      <HeadTitle title={'Set Cosmetic Data'} />

      <Button onClick={handleButtonClick}>화장품 데이터 추가하기</Button>
    </ManagerPageLayout>
  )
}
