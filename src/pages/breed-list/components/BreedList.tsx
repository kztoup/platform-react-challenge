import React, { useState, useEffect, useCallback, memo, useMemo } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Layout } from 'components/Layout'
import { SelectedHash } from 'components/SelectedHash'
import useAsync from 'hooks/useAsync'
import { fetchBreedList } from 'api/breeds'
import { BREED_LIMIT, BREED_LIST_IDS, LITERALS } from '.'
import { SelectedBreed } from './SelectedBreed'
import { IBreedListData } from 'api/types'
import { IUseAsyncOutcome } from 'hooks/types'

const BreedList = memo(() => {
  const [page, setPage] = useState(0)

  const { data, loading, error, executePromise, removeError }: { data: IBreedListData[] } & IUseAsyncOutcome =
    useAsync()

  useEffect(() => {
    executePromise(fetchBreedList({ limit: BREED_LIMIT, page }))
  }, [page, executePromise])

  const onClickPrevioustPage = useCallback(async () => {
    setPage((page) => page - 1)
  }, [])

  const onClickNextPage = useCallback(async () => {
    setPage((page) => page + 1)
  }, [])

  const onSelectBreed = useCallback((id: string): void => {
    location.hash = id
  }, [])

  const onCloseSnackbar = useCallback(() => {
    removeError()
  }, [removeError])

  const prevBtnDisabled = useMemo(() => loading || page === 0, [loading, page])
  const nextBtnDisabled = useMemo(() => loading || data?.length < parseInt(BREED_LIMIT), [loading, data])

  return (
    <Layout title={LITERALS.layoutTitle} error={error} onCloseSnackbar={onCloseSnackbar}>
      <SelectedHash render={(hashId: string) => <SelectedBreed breedId={hashId} />} />
      <Grid data-testid={BREED_LIST_IDS.breedListData} container spacing={2}>
        {data?.map(({ id, name, origin, description }) => (
          <Grid key={id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant='outlined' key={id}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {origin}
                </Typography>
                <Typography variant='h5' component='div'>
                  {name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant='body2'>{description}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small' onClick={() => onSelectBreed(id)}>
                  {LITERALS.btnSelectBreedTitle}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display='flex' justifyContent='center' marginY={8}>
        <IconButton onClick={onClickPrevioustPage} disabled={prevBtnDisabled}>
          <NavigateBeforeIcon />
        </IconButton>

        <Box marginX={4}>{loading ? <CircularProgress color='primary' /> : <Avatar>{page}</Avatar>}</Box>
        <IconButton onClick={onClickNextPage} disabled={nextBtnDisabled}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Layout>
  )
})

export default BreedList
