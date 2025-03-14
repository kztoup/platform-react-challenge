import React, { useEffect, memo, JSX, useCallback } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

import { fetchImageDetails } from 'api/images'
import useAsync from 'hooks/useAsync'
import { IUseAsyncOutcome } from 'hooks/types'
import { SelectedImageContent, SelectedImageProps, boxStyle } from '.'
import { IImageData } from 'api/types'
import { IMAGE_LIST_IDS, LITERALS } from '../'

const SelectedImage = memo(({ imageId }: SelectedImageProps): JSX.Element => {
  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, loading, error, executePromise }: { data: IImageData } & IUseAsyncOutcome = useAsync()

  useEffect(() => {
    executePromise(fetchImageDetails({ imageId }))
  }, [executePromise, imageId])

  const onClose = useCallback(() => {
    window.location.hash = ''
  }, [])

  return (
    <Modal
      data-testid={IMAGE_LIST_IDS.selectedImage}
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
        {error && (
          <Box display='flex' justifyContent='center'>
            <Alert variant='filled' severity='error'>
              {error}
            </Alert>
          </Box>
        )}
        {!loading && !error && <SelectedImageContent data={data} />}
      </Box>
    </Modal>
  )
})

export default SelectedImage
