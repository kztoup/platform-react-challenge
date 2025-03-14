import React, { JSX } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Box from '@mui/material/Box'

import { PageTitle } from '../PageTitle'
import { LayoutProps } from '.'

const Layout = ({ title, error, onCloseSnackbar, children }: LayoutProps): JSX.Element => {
  return (
    <Box data-testid={title}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        onClose={onCloseSnackbar}
        autoHideDuration={4000}
        message={error}
      />
      <Box paddingX={2}>
        <PageTitle title={title} />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
