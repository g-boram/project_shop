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
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #ffecec;
`
const Title = styled.div`
  font-size: 30px;
  margin-right: 30px;
  margin-left: 30px;
`
const Desc = styled.div`
  font-size: 12px;
  color: ${`var(--fontGrey)`};
`
