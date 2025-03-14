import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import useAsync from 'hooks/useAsync'
import * as ImagesApi from 'api/images'
import SelectedBreed from './SelectedBreed'
import { BREED_LIST_IDS } from '..'

jest.mock('react-router', () => ({
  useLocation: () => ({ hash: 'hash' }),
}))

jest.mock('hooks/useAsync')
const mockUseAsync = jest.mocked(useAsync)
mockUseAsync.mockReturnValue({
  data: [],
  loading: false,
  error: false,
  executePromise: async () => {},
  removeError: () => {},
})

jest.mock('./SelectedBreedContent', () => () => <div />)

describe('Testing <SelectedBreed> View', () => {
  it('should render the SelectedBreed', () => {
    const { getByTestId } = render(<SelectedBreed breedId='35454ffdg' />)

    expect(getByTestId(BREED_LIST_IDS.selectedBreed)).toBeTruthy()
  })

  it('should call render', () => {
    const fetchBreedListMock = jest.spyOn(ImagesApi, 'fetchImageList').mockImplementation()
    render(<SelectedBreed breedId='35454ffdg' />)

    expect(fetchBreedListMock).toHaveBeenCalledTimes(1)
  })
})
