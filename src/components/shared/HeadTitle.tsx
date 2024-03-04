import styled from '@emotion/styled'

interface titleProps {
  title: string
}
export default function HeadTitle({ title }: titleProps) {
  return <Title>{title}</Title>
}

const Title = styled.div`
  display: flex;
  font-size: 30px;
  padding: 20px;
  align-items: center;
  height: 80px;
  width: 100%;
`
