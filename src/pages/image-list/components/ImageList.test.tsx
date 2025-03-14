import React from 'react'
import useAsync from 'hooks/useAsync'
import { render } from '@testing-library/react'

import { ImageList } from '.'
import { PAGE_LOADER_IDS } from 'components/PageLoader'
import { PAGE_ERROR_IDS } from 'components/PageError'

jest.mock('hooks/useAsync')
const mockUseAsync = jest.mocked(useAsync)

jest.mock('components/SelectedHash', () => ({
  SelectedHash: () => <div />,
}))

const LAYOUT = 'layout'
jest.mock('components/Layout', () => ({
  Layout: () => <div data-testid={LAYOUT} />,
}))

jest.mock('./SelectedImage', () => () => <div />)

describe('Testing <ImageList> View', () => {
  it('should render the PageLoader when loading is true', () => {
    mockUseAsync.mockReturnValue({
      data: null,
      loading: true,
      error: false,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<ImageList />)

    expect(getByTestId(PAGE_LOADER_IDS.loaderWrapper)).toBeTruthy()
  })

  it('should render the PageError component when error is true', () => {
    mockUseAsync.mockReturnValue({
      data: null,
      loading: false,
      error: true,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<ImageList />)

    expect(getByTestId(PAGE_ERROR_IDS.errorWrapper)).toBeTruthy()
  })

  it('should render the Layout component when data exists', () => {
    mockUseAsync.mockReturnValue({
      data: [],
      loading: false,
      error: false,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<ImageList />)

    expect(getByTestId(LAYOUT)).toBeTruthy()
  })
})
