import { useState, useEffect, JSX } from 'react'
import { useLocation } from 'react-router'
import { SelectedHashProps } from '.'

const SelectedHash = ({ render }: SelectedHashProps): JSX.Element | null => {
  const [id, setId] = useState('')
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash.substring(1)
    setId(id)
  }, [hash])

  if (!id) {
    return null
  }

  return render(id)
}

export default SelectedHash
