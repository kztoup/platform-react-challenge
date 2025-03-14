import React, { JSX, useState, MouseEvent, memo } from 'react'
import { Link } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import { PATHS } from 'constants/paths'
import { PAGE_TITLES, HEADER_IDS } from '.'

const Header = memo((): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const onOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const onCloseNavMenu = (): void => {
    setAnchorElNav(null)
  }

  const pages: Array<Array<string>> = Object.entries(PATHS)

  return (
    <AppBar data-testid={HEADER_IDS.headerAppBar} position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={onOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={onCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(([key, value]) => (
                <Link key={key} to={value}>
                  <MenuItem onClick={onCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{PAGE_TITLES[key]}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(([key, value]) => (
              <Button
                key={key}
                component={Link}
                to={value}
                variant='contained'
                color='primary'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {PAGE_TITLES[key]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
})

export default Header
