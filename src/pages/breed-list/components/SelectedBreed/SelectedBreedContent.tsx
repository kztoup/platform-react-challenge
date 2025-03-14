import React, { JSX, useCallback } from 'react'
import { useNavigate } from 'react-router'
import Grid from '@mui/material/Grid2'

import { Image } from 'components/Image'
import { PATHS } from 'constants/paths'
import { SelectedBreedContentProps } from '.'
import { BREED_LIST_IDS } from '..'

const SelectedBreedContent = ({ data }: SelectedBreedContentProps): JSX.Element => {
  const navigate = useNavigate()

  const onSelectImage = useCallback(
    (id: string): void => {
      navigate(`${PATHS.ROOT}#${id}`)
    },
    [navigate]
  )

  return (
    <Grid data-testid={BREED_LIST_IDS.selectedBreedContent} container spacing={2}>
      {data.map(({ id, url }) => (
        <Image key={id} url={url} cursor='pointer' width='100%' onClick={() => onSelectImage(id)} />
      ))}
    </Grid>
  )
}

export default SelectedBreedContent
