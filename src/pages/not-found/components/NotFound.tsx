import React, { JSX, memo } from 'react'
import { Link } from 'react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { PATHS } from 'constants/paths'
import { LITERALS } from '.'

const NotFound = memo((): JSX.Element => {
  return (
    <Box textAlign='center' paddingX={2}>
      <Typography
        color='primary'
        sx={(theme) => ({
          marginBottom: 3,
          [theme.breakpoints.up('md')]: { fontSize: 150 },
          [theme.breakpoints.down('md')]: { fontSize: 80 },
        })}
      >
        {LITERALS.errorCode}
      </Typography>
      <Typography variant='h4' color='black.secondary' sx={{ marginBottom: 1 }}>
        {LITERALS.pageUnavailable}
      </Typography>
      {LITERALS.backTo} <Link to={PATHS.ROOT}>{LITERALS.homepage}</Link>
    </Box>
  )
})

export default NotFound
