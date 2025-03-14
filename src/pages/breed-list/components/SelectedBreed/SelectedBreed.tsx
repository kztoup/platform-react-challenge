import React, { JSX, useEffect, memo, useCallback } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

import { fetchImageList } from 'api/images'
import useAsync from 'hooks/useAsync'
import { SelectedBreedContent, SelectedBreedProps, boxStyle } from '.'
import { IImageListData } from 'api/types'
import { IUseAsyncOutcome } from 'hooks/types'
import { LITERALS, IAMGE_LIMIT, BREED_LIST_IDS } from '../'

const SelectedBreed = memo(({ breedId }: SelectedBreedProps): JSX.Element => {
  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, loading, error, executePromise }: { data: IImageListData[] } & IUseAsyncOutcome = useAsync()

  useEffect(() => {
    executePromise(fetchImageList({ limit: IAMGE_LIMIT, breedId }))
  }, [executePromise, breedId])

  const onClose = useCallback(() => {
    window.location.hash = ''
  }, [])

  return (
    <Modal
      data-testid={BREED_LIST_IDS.selectedBreed}
      open={true}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={boxStyle(isDownSm)}>
        <Typography textAlign='center' variant='h5' marginY={1}>
          {LITERALS.modalTitle}
        </Typography>
        {loading && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress color='primary' />
          </Box>
        )}
        {!!error && (
          <Box display='flex' justifyContent='center'>
            <Alert variant='filled' severity='error'>
              {error}
            </Alert>
          </Box>
        )}
        {!loading && !error && <SelectedBreedContent data={data} />}
      </Box>
    </Modal>
  )
})

export default SelectedBreed
