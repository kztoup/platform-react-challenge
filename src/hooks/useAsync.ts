import { useState, useCallback } from 'react'

const useAsync = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const executePromise = useCallback(async (asyncFn: Promise<any>) => {
    try {
      setLoading(true)
      const data = await asyncFn
      setData(data)
    } catch (error) {
      setError(`${error}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeError = useCallback(() => {
    setError(false)
  }, [])

  return { data, loading, error, executePromise, removeError }
}

export default useAsync
