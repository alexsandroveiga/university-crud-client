import { useEffect, useLayoutEffect, useState } from 'react'

type ReturnType = [boolean, (locked: boolean) => void]

export function useLockedBody (initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked)

  useLayoutEffect(() => {
    if (!locked) {
      return
    }

    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.body.classList.add('fixed')

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.classList.remove('fixed')
    }
  }, [locked])

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
  }, [initialLocked, locked])

  return [locked, setLocked]
}