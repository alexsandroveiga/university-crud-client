import { useLockedBody, useOnClickOutside } from "@/hooks";
import { Container } from "./styles";

import { useRef } from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  title: string
  children: React.ReactNode
  isVisible?: boolean
  onClose: () => void
}

export function Modal({ children, isVisible, onClose, title }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => onClose())
  const [locked] = useLockedBody(isVisible)

  return (
    <Container ref={ref} className={locked ? 'visible' : ''}>
      <div className="modal-header">
        <h1>{title}</h1>
        <button onClick={onClose}><FiX size={32} /></button>
      </div>
      {children}
    </Container>
  )
}