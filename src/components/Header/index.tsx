import { Container } from "./styles";

type HeaderProps = {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}