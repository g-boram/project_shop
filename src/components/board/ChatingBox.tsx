import useUser from '@/hooks/auth/useUser'
import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'

import { ChatingProps } from '@/models/board'
import { addChating } from '@/remote/board'
import {
  KeyboardEventHandler,
  LegacyRef,
  ReactHTMLElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { css } from '@emotion/react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import Text from '../shared/Text'

const ChatingBox = () => {
  const user = useUser()
  const [chat, setChat] = useState<ChatingProps[]>()
  const [formValues, setFormValues] = useState<ChatingProps>({
    content: '',
  })

  // 채팅이 업데이트될 때마다 아래로 스크롤
  const chatListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight)
  }, [chat])

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(collection(store, 'CHAT'), orderBy('createAt', 'asc')),
        (snapshot) => {
          const contentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ChatingProps[]
          setChat(contentArray)
        },
      )
    }
  }, [user])

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = {
      ...formValues,
      uid: user?.uid,
      email: user?.email,
      name: user?.displayName,
      photoURL: user?.photoURL,
    }
    try {
      await addChating(formData)
      setFormValues({
        content: '',
      })
    } catch (e: any) {
      console.log('error', e)
    }
  }

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e) // Enter 입력이 되면 클릭 이벤트 실행
    }
  }

  const ChatContent = styled.div<{ uid?: string }>`
    background-color: ${(props) =>
      props.uid === user?.uid ? '#ffed28' : 'white'};
    padding: 8px 10px;
    font-size: 15px;
    border-radius: 5px;
    max-width: 50%;
    line-height: 1.3;
  `
  return (
    <ChatingWrapper>
      <ChatArea ref={chatListRef}>
        {chat
          ? chat.map((c, idx) => (
              <Flex
                direction={user?.uid === c.uid ? 'row' : 'row-reverse'}
                justify={'flex-end'}
                align={'center'}
                css={ChatBoxStyle}
                key={idx}
              >
                <Text typography={'t8'} color={'fontDarkGrey'}>
                  {c.createAt?.slice(0, 20)}
                </Text>
                <ChatContent uid={c.uid}>{c.content}</ChatContent>
                <img
                  src={
                    c.photoURL !== ''
                      ? c.photoURL
                      : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
                  }
                  alt="userImg"
                  width={40}
                  height={40}
                  style={{ borderRadius: '100%' }}
                />
              </Flex>
            ))
          : null}
      </ChatArea>
      <Flex direction="column">
        <Spacing size={10} />
        <Flex>
          <InputBox>
            <input
              name="content"
              id="content"
              onChange={handleFormValues}
              value={formValues.content}
              onKeyDown={handleOnKeyPress}
            />
          </InputBox>
          <div onClick={handleSubmit} css={sendBtnStyle}>
            <BsFillSendCheckFill size={20} fill={'#fff'} />
          </div>
        </Flex>
      </Flex>
    </ChatingWrapper>
  )
}

const ChatingWrapper = styled.div`
  height: 90%;
  margin-top: 10px;
  background-color: white;
  @media (max-width: 600px) {
    height: 80%;
  }
`

const ChatArea = styled.div`
  height: 83%;
  padding: 10px;
  overflow: scroll;
  border-radius: 5px;
  border: 2px solid #ffd6dd;
  background-color: #fff8f8;
`

const ChatBoxStyle = css`
  gap: 10px;
  margin-bottom: 5px;
`

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: 1px solid #f4aeba;
    width: 90%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 35px;
  }
`
const sendBtnStyle = css`
  display: flex;
  width: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 25px;
  background-color: #f4aeba;
`
export default ChatingBox
