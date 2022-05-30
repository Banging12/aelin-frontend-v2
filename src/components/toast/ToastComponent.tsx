import { ReactNode } from 'react'
import styled from 'styled-components'

import { Toast, toast } from 'react-hot-toast'

import { Close } from '@/src/components/assets/Close'

const Wapper = styled.div`
  background-color: ${({ theme: { toast } }) => toast.backgroundColor};
  border-radius: 8px;
  border-style: solid;
  border-width: 0.5px;
  box-shadow: ${({ theme: { toast } }) => toast.boxShadow};
  display: grid;
  grid-template-columns: 50px 200px;
  height: 70px;
  padding: 10px;
`

const IconContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: center;
`

const InnerWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const TextContainer = styled.div`
  padding: 5px;
`

const ButtonClose = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  outline: none;
  padding: 0;
`

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 2px;
`

const Link = styled.a`
  color: ${({ theme: { colors } }) => colors.textColorLight};
  font-size: 1.2rem;
`

const Text = styled.p`
  color: ${({ theme: { colors } }) => colors.textColorLight};
  font-size: 1.2rem;
`

export const ToastComponent = ({
  icon,
  link,
  message,
  t,
  title,
}: {
  icon: ReactNode
  link?: {
    url: string
    text: string
  }
  message?: string
  t: Toast
  title: string
}) => (
  <Wapper>
    <IconContainer>{icon}</IconContainer>
    <InnerWrapper>
      <TextContainer>
        <Title>{title}</Title>
        {link && (
          <Link href={link.url} rel="noreferrer" target="_blank">
            {link.text}
          </Link>
        )}
        {message && <Text>{message}</Text>}
      </TextContainer>
      <ButtonClose onClick={() => toast.dismiss(t.id)}>
        <Close />
      </ButtonClose>
    </InnerWrapper>
  </Wapper>
)
