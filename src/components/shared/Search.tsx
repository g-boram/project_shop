import { COLLECTIONS } from '@/constants'
import { Cosmetic } from '@/models/cosmetic'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { IoMdSearch } from 'react-icons/io'
import styled from '@emotion/styled'
import {
  collection,
  endAt,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Badge from './Badge'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

export default function Search() {
  const [post, setPost] = useState<Cosmetic[]>([])
  const [isFocus, setIsFocus] = useState(false)
  const [inputQuery, setInputQuery] = useState<string>('')

  const onChange = (e: any) => {
    setInputQuery(e?.target?.value?.trim())
    setIsFocus(true)
  }
  const onFocusHandler = () => {
    setIsFocus(true)
  }
  useEffect(() => {
    let postQuery = query(
      collection(store, COLLECTIONS.COSMETIC),
      orderBy('name'),
      startAt(inputQuery),
      endAt(inputQuery + '\uf8ff'),
    )

    onSnapshot(postQuery, (snapShot) => {
      let dataObj = snapShot?.docs?.map((doc) => ({
        ...doc?.data(),
        id: doc?.id,
      }))

      setPost(dataObj as Cosmetic[])
    })
  }, [inputQuery])

  return (
    <SearchContainer onClick={() => setIsFocus((pre) => !pre)}>
      <Flex align={'center'}>
        <input
          type="text"
          placeholder="'상품명' 으로 검색하기"
          onFocus={onFocusHandler}
          onChange={onChange}
        />
        <Spacing size={10} direction="horizontal" />
        <IoMdSearch size={28} color={'#fff'} />
      </Flex>
      {isFocus ? (
        <PostContainer>
          {post?.length > 0 ? (
            <Flex direction="column">
              {post.map((post) => (
                <>
                  <Flex align={'center'}>
                    <Flex
                      css={css`
                        min-width: 200px;
                      `}
                    >
                      <Badge label={post.brand_name} color={'#f0f0f0'} />
                    </Flex>
                    <Flex>
                      <Text typography="t7" color="fontBlack">
                        {post.name}
                      </Text>
                    </Flex>
                  </Flex>
                  <Spacing size={3} />
                </>
              ))}
            </Flex>
          ) : (
            <Text typography="t7" color="fontBlack">
              검색 결과가 없습니다.
            </Text>
          )}
        </PostContainer>
      ) : null}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 10px;
  padding: 10px 20px;

  & input {
    min-width: 250px;
    height: 35px;
    border: none;
    border-radius: 30px;
    padding: 0px 20px;
    font-size: 12px;
    transition: 1s;

    @media (min-width: 600px) {
      min-width: 500px;
      transition: 1s;
    }
  }
`
const PostContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  max-height: 200px;
  overflow: scroll;
  width: 80%;
  top: 60px;
  border-radius: 10px;
  padding: 10px 20px;
  z-index: ${`var(--searchBox-zindex)`};
`
