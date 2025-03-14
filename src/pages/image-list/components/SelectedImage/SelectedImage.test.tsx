import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import useAsync from 'hooks/useAsync'
import * as ImagesApi from 'api/images'
import SelectedImage from './SelectedImage'
import { IMAGE_LIST_IDS } from '..'

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

jest.mock('./SelectedImageContent', () => () => <div />)

describe('Testing <SelectedImage> View', () => {
  it('should render the SelectedImage', () => {
    const { getByTestId } = render(<SelectedImage imageId='8776ytvg' />)

    expect(getByTestId(IMAGE_LIST_IDS.selectedImage)).toBeTruthy()
  })

  it('should call render', () => {
    const fetchBreedListMock = jest.spyOn(ImagesApi, 'fetchImageDetails').mockImplementation()
    render(<SelectedImage imageId='8776ytvg' />)

    expect(fetchBreedListMock).toHaveBeenCalledTimes(1)
  })
})
