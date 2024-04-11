import styled from '@emotion/styled'

interface titleProps {
  title: string
  desc?: string
}
export default function HeadTitle({ title, desc }: titleProps) {
  return (
    <Containder>
      <Title>{title}</Title>
      {desc ? <Desc>{desc}</Desc> : null}
    </Containder>
  )
}

const Containder = styled.div`
  display: flex;
  padding: 20px 25px;
  align-items: flex-end;
  height: 60px;
  margin-bottom: 50px;

  @media (max-width: 600px) {
    margin-bottom: 0px;
  }
`
const Title = styled.div`
  font-size: 30px;
  margin-right: 30px;
`
const Desc = styled.div`
  font-size: 12px;
  color: ${`var(--fontGrey)`};
`
