import { RefObject, useEffect } from 'react'

export function useOnClickOutside (ref: RefObject<HTMLDivElement>, handler: any): void {
  useEffect(
    () => {
      const listener = (event: any): void => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    [ref, handler]
  )
}