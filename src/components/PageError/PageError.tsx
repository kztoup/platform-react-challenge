import React, { JSX, memo } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

import { PAGE_ERROR_IDS, PageErrorProps, DEFAULT_ERROR_MESSAGE } from '.'

const PageError = memo(({ message = DEFAULT_ERROR_MESSAGE }: PageErrorProps): JSX.Element => {
  return (
    <Box
      data-testid={PAGE_ERROR_IDS.errorWrapper}
      height='calc(100vh - 70px)'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Alert variant='filled' severity='error'>
        {message}
      </Alert>
    </Box>
  )
})

export default PageError
