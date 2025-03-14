import React, { useState, useEffect, useCallback, JSX, memo } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'

import { PageLoader } from 'components/PageLoader'
import { PageError } from 'components/PageError'
import { Image } from 'components/Image'
import { fetchImageList } from 'api/images'
import useAsync from 'hooks/useAsync'
import { Layout } from 'components/Layout'
import { SelectedImage } from './SelectedImage'
import { SelectedHash } from 'components/SelectedHash'
import { IImageListData } from 'api/types'
import { IUseAsyncOutcome } from 'hooks/types'
import { IAMGE_LIMIT, LITERALS } from '.'

const ImageList = memo((): JSX.Element => {
  const [list, setList] = useState<IImageListData[]>([])

  const { data, loading, error, executePromise }: { data: IImageListData[] } & IUseAsyncOutcome = useAsync()
  const {
    data: dataImages,
    loading: loadingImages,
    error: errorImages,
    executePromise: executePromiseImages,
    removeError,
  }: { data: IImageListData[] } & IUseAsyncOutcome = useAsync()

  useEffect(() => {
    executePromise(fetchImageList({ limit: IAMGE_LIMIT }))
  }, [executePromise])

  useEffect(() => {
    if (data) {
      setList(data)
    }
  }, [data])

  useEffect(() => {
    if (dataImages) {
      setList((list) => {
        dataImages.forEach((item: IImageListData) => {
          const found = list.find(({ id }) => id === item.id)
          if (!found) {
            list = [...list, item]
          }
        })
        return list
      })
    }
  }, [dataImages])

  const fetchMore = useCallback(async () => {
    executePromiseImages(fetchImageList({ limit: IAMGE_LIMIT }))
  }, [executePromiseImages])

  const onSelectImage = useCallback((id: string): void => {
    location.hash = id
  }, [])

  const onCloseSnackbar = useCallback(() => {
    removeError()
  }, [removeError])

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return <PageError message={error} />
  }

  return (
    <Layout title={LITERALS.layoutTitle} error={errorImages} onCloseSnackbar={onCloseSnackbar}>
      <SelectedHash render={(hashId: string) => <SelectedImage imageId={hashId} />} />
      <Grid container spacing={2}>
        {list.map(({ id, url }) => (
          <Image key={id} url={url} cursor='pointer' onClick={() => onSelectImage(id)} />
        ))}
      </Grid>
      <Box textAlign='center' marginY={8}>
        <Button variant='contained' onClick={fetchMore} loading={loadingImages} loadingPosition='end'>
          Load more
        </Button>
      </Box>
    </Layout>
  )
})

export default ImageList
