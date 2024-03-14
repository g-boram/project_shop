import styled from '@emotion/styled'
import CreatableSelect from 'react-select/creatable'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import chroma from 'chroma-js'
import Select, { MultiValue, StylesConfig } from 'react-select'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Cosmetic } from '@/models/cosmetic'
import { FaTrashAlt } from 'react-icons/fa'
import { useAlertContext } from '@/contexts/AlertContext'
import { newImg, newSubImg } from '@/models/managerMain'
import { css } from '@emotion/react'
import {
  colourOptions,
  ColourOption,
  CosmeticCategoryOption,
  COSMETIC_CATEGORY,
} from '@/constants/cosmetic'
import {
  cosmeticImgUploadAndUrl,
  cosmeticSubImgUploadAndUrl,
} from '@/hooks/data/useStorage'

export default function CosmeticForm({
  onSubmit,
}: {
  onSubmit: (formValues: Cosmetic) => void
}) {
  const [colors, setColors] = useState<MultiValue<ColourOption | undefined>[]>()
  const [category, setCategory] = useState<CosmeticCategoryOption | null>()

  const [currentImg, setCurrentImg] = useState<newImg>()
  const [currentSubImg, setCurrentSubImg] = useState<any[]>()

  const [subImg1, setSubImg1] = useState<newSubImg>()
  const [subImg2, setSubImg2] = useState<newSubImg>()
  const [subImg3, setSubImg3] = useState<newSubImg>()

  const [newImgUrl, setNewImgUrl] = useState<string>('')
  const [formValues, setFormValues] = useState<Cosmetic>({
    name: '',
    brand_name: '',
    category: '',
    price: '',
    salePercent: '',
    desc: '',
    comment: '',
    type: '',
    volume: '',
    scent: '',
    count: '',
    totalSale: '',
    rating: 0,
    like: 0,
  })
  const { open } = useAlertContext()
  const handleFormValues = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  // 선택된 이미지 미리보기 생성 하기
  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files !== null) {
      const theFile = files[0]
      const currentImgName = files[0]?.name

      const reader = new FileReader()
      reader.onloadend = (finishedEvent) => {
        // 업로드한 이미지 URL 저장
        const result = (finishedEvent.target as FileReader).result as string
        setCurrentImg({
          name: currentImgName,
          img: result,
        })
      }
      if (!theFile) return
      reader.readAsDataURL(theFile)
    }
  }
  // (Sub) 선택된 이미지 미리보기 생성 하기
  const handleUploadSubFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files !== null) {
      const theFile = files[0]
      const currentImgName = files[0]?.name

      const reader = new FileReader()
      reader.onloadend = (finishedEvent) => {
        // 업로드한 이미지 URL 저장
        const result = (finishedEvent.target as FileReader).result as string

        if (e.target.name === 'sub1') {
          setSubImg1({
            name: currentImgName,
            img: result,
          })
        }
        if (e.target.name === 'sub2') {
          setSubImg2({
            name: currentImgName,
            img: result,
          })
        }
        if (e.target.name === 'sub3') {
          setSubImg3({
            name: currentImgName,
            img: result,
          })
        }
      }
      if (!theFile) return
      reader.readAsDataURL(theFile)
    }
  }

  useEffect(() => {
    if (newImgUrl !== '') {
      open({
        title: '신규 화장품을 등록 하시겠습니까?',
        isCancle: true,
        onCancleClick: () => {},
        onButtonClick: () => {
          submitData()
        },
      })
    }
  }, [newImgUrl])

  // 선택된 이미지 url 얻기
  const getImgUrl = async () => {
    const subUrl = []

    if (subImg1 !== undefined) {
      const getSubUrl1 = await cosmeticSubImgUploadAndUrl(subImg1)
      subUrl.push({
        name: subImg1.name,
        url: getSubUrl1,
      })
    }
    if (subImg2 !== undefined) {
      const getSubUrl2 = await cosmeticSubImgUploadAndUrl(subImg2)
      subUrl.push({
        name: subImg2.name,
        url: getSubUrl2,
      })
    }
    if (subImg3 !== undefined) {
      const getSubUrl3 = await cosmeticSubImgUploadAndUrl(subImg3)
      subUrl.push({
        name: subImg3.name,
        url: getSubUrl3,
      })
    }

    if (subUrl !== undefined) {
      setCurrentSubImg(subUrl)

      if (!currentImg) return
      const getUrl = await cosmeticImgUploadAndUrl(currentImg)
      setNewImgUrl(getUrl)
    }
  }

  // 부모 컴포넌트로 보낼 완전가공된 데이터
  const submitData = () => {
    const colorArr: any = []
    if (colors !== undefined) {
      colors[0].map((col, idx) => {
        colorArr.push(col?.value)
      })
    }
    const setValues = {
      ...formValues,
      category: category ? category.value : '',
      rating: 0,
      totalSale: Number(formValues.price) / Number(formValues.salePercent),
      color: colorArr,
      url: newImgUrl,
      subUrl: currentSubImg,
    } as Cosmetic
    onSubmit(setValues)
  }
  const colourStyles: StylesConfig<ColourOption, true> = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: '100%',
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      border: '1px solid #cdcdff',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      }
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  }

  return (
    <FormContainer>
      <Flex direction="column">
        <Flex justify={'center'}>
          <NewImgWrapper>
            {currentImg?.img !== null ? (
              <img src={currentImg?.img} alt="" />
            ) : (
              <></>
            )}
          </NewImgWrapper>
          <NewImgBtnWrapper>
            <Flex>
              <div css={currentName}>
                {currentImg?.name !== '' ? currentImg?.name : ''}
              </div>
              <label key="newImg" css={labelStyle} htmlFor={`new`}>
                메인 이미지 선택
              </label>
            </Flex>
            <input
              key="newImg"
              type="file"
              id={`new`}
              onChange={handleUploadFile}
            />
            <Spacing size={80} />
            <Flex>
              <Flex direction="column" justify={'center'} align={'center'}>
                <SubImgWrapper>
                  {subImg1?.img !== undefined ? (
                    <img src={subImg1?.img} alt="" />
                  ) : (
                    <></>
                  )}
                </SubImgWrapper>
                <Flex direction="column" align={'center'}>
                  <div css={subCurrentName}>
                    {subImg1?.name !== '' ? subImg1?.name : ''}
                  </div>
                  <Flex align={'center'}>
                    <label key="sub1" css={subLabelStyle} htmlFor={`sub1`}>
                      서브 이미지 선택1
                    </label>
                    {subImg1 !== undefined ? (
                      <>
                        <Spacing size={10} direction="horizontal" />
                        <FaTrashAlt
                          color="grey"
                          onClick={() => setSubImg1(undefined)}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
                <input
                  key="sub1"
                  type="file"
                  id={`sub1`}
                  name={`sub1`}
                  onChange={handleUploadSubFile}
                />
              </Flex>
              <Spacing size={10} direction="horizontal" />
              <Flex direction="column" justify={'center'} align={'center'}>
                <SubImgWrapper>
                  {subImg2?.img !== undefined ? (
                    <img src={subImg2?.img} alt="" />
                  ) : (
                    <></>
                  )}
                </SubImgWrapper>
                <Flex direction="column" align={'center'}>
                  <div css={subCurrentName}>
                    {subImg2?.name !== '' ? subImg2?.name : ''}
                  </div>
                  <Flex align={'center'}>
                    <label key="sub2" css={subLabelStyle} htmlFor={`sub2`}>
                      서브 이미지 선택2
                    </label>
                    {subImg2 !== undefined ? (
                      <>
                        <Spacing size={10} direction="horizontal" />
                        <FaTrashAlt
                          color="grey"
                          onClick={() => setSubImg2(undefined)}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
                <input
                  key="sub2"
                  type="file"
                  id={`sub2`}
                  name={`sub2`}
                  onChange={handleUploadSubFile}
                />
              </Flex>
              <Spacing size={10} direction="horizontal" />
              <Flex direction="column" justify={'center'} align={'center'}>
                <SubImgWrapper>
                  {subImg3?.img !== undefined ? (
                    <img src={subImg3?.img} alt="" />
                  ) : (
                    <></>
                  )}
                </SubImgWrapper>
                <Flex direction="column" align={'center'}>
                  <div css={subCurrentName}>
                    {subImg3?.name !== '' ? subImg3?.name : ''}
                  </div>
                  <Flex align={'center'}>
                    <label key="sub3" css={subLabelStyle} htmlFor={`sub3`}>
                      서브 이미지 선택3
                    </label>
                    {subImg3 !== undefined ? (
                      <>
                        <Spacing size={10} direction="horizontal" />
                        <FaTrashAlt
                          color="grey"
                          onClick={() => setSubImg3(undefined)}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
                <input
                  key="sub3"
                  type="file"
                  id={`sub3`}
                  name={`sub3`}
                  onChange={handleUploadSubFile}
                />
              </Flex>
            </Flex>
            {/* <NewImgDescBox>
              <Text
                typography="t7"
                display="block"
                style={{ marginTop: 10, marginBottom: 6 }}
              >
                * 업로드 이미지 사이즈는 450 x 300 입니다. 사이즈를 다시 한번
                확인해주세요
              </Text>
              <Text
                typography="t7"
                display="block"
                style={{ marginTop: 10, marginBottom: 6 }}
              >
                * 저장완료 된 데이터는 실시간 적용됩니다. 꼼꼼히 확인 후
                진행해주세요
              </Text>
            </NewImgDescBox> */}
          </NewImgBtnWrapper>
        </Flex>
        <Spacing size={20} />
        <Flex>
          <Label>제품명</Label>
          <InputBox>
            <input
              name="name"
              id="name"
              onChange={handleFormValues}
              value={formValues.name}
            />
          </InputBox>
          <Spacing size={20} direction="horizontal" />
          <Label>브랜드 명</Label>
          <InputBox>
            <input
              name="brand_name"
              id="brand_name"
              onChange={handleFormValues}
              value={formValues.brand_name}
            />
          </InputBox>
        </Flex>
        <Spacing size={10} />
        <Flex>
          <Label>가격</Label>
          <InputBox>
            <input
              name="price"
              id="price"
              type={'number'}
              onChange={handleFormValues}
              value={formValues.price}
            />
          </InputBox>
          <Spacing size={20} direction="horizontal" />
          <Label>할인율 %</Label>
          <InputBox>
            <input
              name="salePercent"
              id="salePercent"
              type={'number'}
              placeholder="숫자만 입력해주세요"
              onChange={handleFormValues}
              value={formValues.salePercent}
            />
          </InputBox>
          <Spacing size={20} direction="horizontal" />
          <Label>총수량</Label>
          <InputBox>
            <input
              name="count"
              id="count"
              type={'number'}
              onChange={handleFormValues}
              value={formValues.count}
            />
          </InputBox>
        </Flex>
        <Spacing size={10} />
        <Flex>
          <Label>용량</Label>
          <InputBox>
            <input
              name="volume"
              id="volume"
              placeholder="용량규격 포함 입력해주세요"
              onChange={handleFormValues}
              value={formValues.volume}
            />
          </InputBox>
          <Spacing size={20} direction="horizontal" />
          <Label>제형타입</Label>
          <InputBox>
            <input
              name="type"
              id="type"
              placeholder="ex) 젤타입, 크림타입, 액상타입..."
              onChange={handleFormValues}
              value={formValues.type}
            />
          </InputBox>
          <Spacing size={20} direction="horizontal" />
          <Label>제품향</Label>
          <InputBox>
            <input
              name="scent"
              id="scent"
              placeholder="ex) 시트러스, 장미, 우디..."
              onChange={handleFormValues}
              value={formValues.scent}
            />
          </InputBox>
        </Flex>
        <Spacing size={10} />
        <Flex>
          <Label>단축설명</Label>
          <InputBox>
            <input
              name="comment"
              id="comment"
              placeholder="한줄 설명을 입력해주세요"
              onChange={handleFormValues}
              value={formValues.comment}
            />
          </InputBox>
        </Flex>
        <Spacing size={10} />
        <Flex align={'center'}>
          <Label>색상</Label>
          <Select
            closeMenuOnSelect={false}
            defaultValue={[]}
            isMulti
            options={colourOptions}
            styles={colourStyles}
            onChange={(color) => {
              setColors([color])
            }}
          />
        </Flex>
        <Spacing size={10} />
        <Flex align={'center'}>
          <Label>카테고리</Label>
          <>
            <CreatableSelect
              placeholder="카테고리를 선택해 주세요"
              onChange={(newValue) => setCategory(newValue)}
              options={COSMETIC_CATEGORY}
              value={category}
              styles={{
                container: (containerStyles) => ({
                  ...containerStyles,
                  width: '100%',
                  fontSize: '15px',
                  borderRadius: '5px',
                }),
                control: (controlStyles) => ({
                  ...controlStyles,
                  border: '1px solid #cdcdff',
                }),
                menu: (controlStyles) => ({
                  ...controlStyles,
                  height: '350px',
                  overflow: 'scroll',
                }),
              }}
            />
          </>
        </Flex>
        <Spacing size={10} />
        <Flex>
          <Label>내용</Label>
          <TextareaBox>
            <textarea
              name="desc"
              id="desc"
              onChange={handleFormValues}
              value={formValues.desc}
            />
          </TextareaBox>
        </Flex>
      </Flex>
      <Spacing size={20} />
      <Flex justify={'center'}>
        <Button color="lightPurple" full onClick={getImgUrl}>
          게시글 등록
        </Button>
      </Flex>
      <Spacing size={20} />
    </FormContainer>
  )
}

const FormContainer = styled.div`
  height: auto;
  width: 1000px;
  padding: 10px;
  margin-top: 20px;
  border: 2px solid #ededff;
  border-radius: 5px;
`

const Label = styled.div`
  min-width: 12%;
  height: 40px;
  display: flex;
  margin-right: 5px;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 10px;
  color: #fff;
  font-weight: bold;
  background-color: #6643b5;
`
const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #cdcdff;
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    height: 300px;
  }
`
const InputBox = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: 1px solid #cdcdff;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 40px;
  }
`

const SubImgWrapper = styled.div`
  width: 130px;
  height: 130px;
  margin-bottom: 10px;
  background-color: #f8f8f8;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const NewImgWrapper = styled.div`
  width: 250px;
  height: 320px;
  margin-right: 10px;
  background-color: #f8f8f8;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const NewImgBtnWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & input {
    display: none;
  }
`

const NewImgDescBox = styled.div`
  background-color: white;
  height: 180px;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 0px 10px -2px #c0a3e3;
`

const subLabelStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  width: 100px;
  height: 30px;
  background-color: #c0a3e3;
  color: white;
  border-radius: 5px;

  font-weight: bold;
`
const labelStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 13px;
  width: 120px;
  margin-left: 10px;
  background-color: #c0a3e3;
  color: white;
  border-radius: 5px;
  font-weight: bold;
`
const subCurrentName = css`
  display: flex;
  height: 25px;
  width: 130px;
  align-items: flex-start;
  margin-bottom: 10px;
  overflow: hidden;
  background-color: white;
`
const currentName = css`
  height: 35px;
  padding: 4px;
  width: 300px;
  border-radius: 5px;
  display: flex;
  padding: 0px 10px;
  align-items: center;
  background-color: white;
  border: 1px solid #bcbcbc;
`
