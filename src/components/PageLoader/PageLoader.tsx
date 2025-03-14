import React, { JSX, memo } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { PAGE_LOADER_IDS } from '.'

const PageLoader = memo((): JSX.Element => {
  return (
    <Box
      data-testid={PAGE_LOADER_IDS.loaderWrapper}
      height='calc(100vh - 70px)'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress color='primary' />
    </Box>
  )
})

export default PageLoader
