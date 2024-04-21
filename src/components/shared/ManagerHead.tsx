import styled from '@emotion/styled'

interface titleProps {
  title: string
  desc?: string
}
export default function ManagerHead({ title, desc }: titleProps) {
  return (
    <Containder>
      <Title>{title}</Title>
      {desc ? <Desc>{desc}</Desc> : null}
    </Containder>
  )
}

const Containder = styled.div`
  display: flex;
  align-items: flex-end;
  height: 80px;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 25px;
  background-color: #eee;
`
const Title = styled.div`
  font-size: 30px;
  color: white;
  margin-right: 50px;
  margin-left: 30px;
  color: black;
`
const Desc = styled.div`
  font-size: 14px;
  color: black;
`
