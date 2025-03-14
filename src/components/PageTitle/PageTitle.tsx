import React, { JSX, memo } from 'react'
import Typography from '@mui/material/Typography'

import { PAGE_TITLE_IDS, PageTitleProps } from '.'

const PageTitle = memo(({ title }: PageTitleProps): JSX.Element => {
  return (
    <Typography data-testid={PAGE_TITLE_IDS.title} marginY={4} variant='h4' component='div' textAlign='center'>
      {title}
    </Typography>
  )
})

export default PageTitle
