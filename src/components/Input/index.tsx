import { Container } from './styles'

import { useField } from "@unform/core";
import { InputHTMLAttributes, useEffect, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
}

export function Input({ name, title, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <label htmlFor="title">{title}</label>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  )
}