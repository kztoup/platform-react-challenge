import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { PATHS } from 'constants/paths'
import { PageLoader } from 'components/PageLoader'
import ImageList from 'pages/image-list/components/Lazy'
import BreedList from 'pages/breed-list/components/Lazy'
import FavouriteList from 'pages/favourite-list/components/Lazy'
import NotFound from 'pages/not-found/components/Lazy'
import { Header } from 'components/Header'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {[
          { path: PATHS.ROOT, page: <ImageList /> },
          { path: PATHS.BREED_LIST, page: <BreedList /> },
          { path: PATHS.FAVOURITE_LIST, page: <FavouriteList /> },
        ].map(({ path, page }) => (
          <Route key={path} path={path} element={<Suspense fallback={<PageLoader />}>{page}</Suspense>} />
        ))}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
