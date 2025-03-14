import React, { JSX, useCallback, useMemo } from 'react'
import { Link } from 'react-router'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoritetIcon from '@mui/icons-material/Favorite'
import Snackbar from '@mui/material/Snackbar'

import { addFavourite } from 'api/favourites'
import { Image } from 'components/Image'
import { PATHS } from 'constants/paths'
import useAsync from 'hooks/useAsync'
import { IAddFavouriteData } from 'api/types'
import { IUseAsyncOutcome } from 'hooks/types'
import { SelectedImageContentProps } from '.'
import { IMAGE_LIST_IDS, LITERALS } from '../'

const SelectedImageContent = ({ data }: SelectedImageContentProps): JSX.Element => {
  const { id, url, breeds = [] } = data
  const {
    data: dataFavourite,
    loading: loadingFavourite,
    error,
    executePromise,
    removeError,
  }: { data: IAddFavouriteData } & IUseAsyncOutcome = useAsync()

  const onCloseSnackbar = useCallback(() => {
    removeError()
  }, [removeError])

  const onClickFavourite = useCallback(() => {
    executePromise(addFavourite({ imageId: id }))
  }, [executePromise, id])

  const disabledFavouriteButton = useMemo(() => !!dataFavourite, [dataFavourite])

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        onClose={onCloseSnackbar}
        autoHideDuration={4000}
        message={error}
      />
      <Box textAlign='center'>
        <Box position='relative'>
          <Image url={url} width='100%' />
          <Box position='absolute' bottom='0' right='0'>
            <IconButton
              data-testid={IMAGE_LIST_IDS.addFavouriteButton}
              onClick={onClickFavourite}
              loading={loadingFavourite}
              disabled={disabledFavouriteButton}
            >
              {!loadingFavourite && (
                <FavoritetIcon fontSize='large' style={{ color: dataFavourite ? 'red' : 'grey' }} />
              )}
            </IconButton>
          </Box>
        </Box>
        <Typography variant='h5' marginY={1}>
          {LITERALS.breedsInfo}
        </Typography>
      </Box>
      <Grid data-testid={IMAGE_LIST_IDS.breedsData} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {breeds.map(({ id, name, origin, life_span, wikipedia_url }) => (
          <Grid key={id} size={{ xs: 12, sm: 6 }}>
            <Box>
              {LITERALS.name}: {name}
            </Box>
            <Box>
              {LITERALS.origin}: {origin}
            </Box>
            <Box>
              {LITERALS.lifeSpan}: {life_span}
            </Box>
            <Box>
              <Link to={wikipedia_url} target='blank'>
                {LITERALS.wikipedia}
              </Link>
            </Box>
            <Box>
              <Link to={`${PATHS.BREED_LIST}#${id}`}>{LITERALS.moreBreedImges}</Link>
            </Box>
          </Grid>
        ))}
        {breeds.length === 0 && <Typography variant='body1'>{LITERALS.noInfo}</Typography>}
      </Grid>
    </>
  )
}

export default SelectedImageContent
