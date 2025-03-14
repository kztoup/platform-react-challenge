import React, { JSX, useState, useEffect, useCallback, memo } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid2'
import FavoritetIcon from '@mui/icons-material/Favorite'

import { PageLoader } from 'components/PageLoader'
import { PageError } from 'components/PageError'
import useAsync from 'hooks/useAsync'
import { Layout } from 'components/Layout'
import { Image } from 'components/Image'
import { fetchFavouriteList, removeFavourite } from 'api/favourites'
import { IFavouriteListData, IRemoveFavouriteData } from 'api/types'
import { IUseAsyncOutcome } from 'hooks/types'
import { FAVOURITE_LIST_IDS, LITERALS } from '.'

const FavouriteList = memo((): JSX.Element => {
  const [favouriteId, setFavouriteId] = useState<null | number>(null)

  const {
    data,
    loading,
    error,
    executePromise: fetchFavourites,
  }: { data: IFavouriteListData[] } & IUseAsyncOutcome = useAsync()

  const {
    loading: loadingFavourite,
    error: errorFavourite,
    executePromise: callingRemoveFavourite,
    removeError,
  }: { data: IRemoveFavouriteData } & IUseAsyncOutcome = useAsync()

  useEffect(() => {
    fetchFavourites(fetchFavouriteList())
  }, [fetchFavourites])

  useEffect(() => {
    const removeFromFavourites = async () => {
      await callingRemoveFavourite(removeFavourite({ favouriteId }))
      await fetchFavourites(fetchFavouriteList())
    }

    if (favouriteId) {
      removeFromFavourites()
    }
  }, [favouriteId, callingRemoveFavourite, fetchFavourites])

  const onClickFavourite = useCallback((id: number) => {
    setFavouriteId(id)
  }, [])

  const onCloseSnackbar = useCallback(() => {
    removeError()
  }, [removeError])

  if (loading || loadingFavourite) {
    return <PageLoader />
  }

  if (error) {
    return <PageError message={error} />
  }

  return (
    <Layout title={LITERALS.layoutTitle} error={errorFavourite} onCloseSnackbar={onCloseSnackbar}>
      <Grid data-testid={FAVOURITE_LIST_IDS.favouriteListData} container spacing={2}>
        {data?.map(({ id, image }) => (
          <Box key={id} position='relative'>
            <Image url={image.url} />
            <Box position='absolute' bottom='0' right='0'>
              <IconButton
                data-testid={FAVOURITE_LIST_IDS.removeFavouriteButton}
                onClick={() => onClickFavourite(id)}
                loading={loadingFavourite}
              >
                <FavoritetIcon fontSize='large' style={{ color: 'red' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Grid>
    </Layout>
  )
})

export default FavouriteList
