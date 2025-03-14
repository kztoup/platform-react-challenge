import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import useAsync from 'hooks/useAsync'
import * as favouritesApi from 'api/favourites'
import { PAGE_LOADER_IDS } from 'components/PageLoader'
import { PAGE_ERROR_IDS } from 'components/PageError'
import { FavouriteList, FAVOURITE_LIST_IDS } from '.'

jest.mock('hooks/useAsync')
const mockUseAsync = jest.mocked(useAsync)

jest.mock('components/SelectedHash', () => ({
  SelectedHash: () => <div />,
}))

jest.mock('api/favourites', () => ({
  fetchFavouriteList: jest.fn(() => Promise.resolve()),
  removeFavourite: jest.fn(() => Promise.resolve()),
}))

describe('Testing <FavouriteList> View', () => {
  it('should render the PageLoader when loading is true', () => {
    mockUseAsync.mockReturnValue({
      data: null,
      loading: true,
      error: false,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<FavouriteList />)

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
    const { getByTestId } = render(<FavouriteList />)

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
    const { getByTestId } = render(<FavouriteList />)

    expect(getByTestId(FAVOURITE_LIST_IDS.favouriteListData)).toBeTruthy()
  })

  it('should call removeFavourite on click button', () => {
    const removeFavouriteeMock = jest.spyOn(favouritesApi, 'removeFavourite').mockImplementation()
    const itemId = 200
    mockUseAsync.mockReturnValue({
      data: [
        {
          image_id: '123FG',
          sub_id: 'erfd$#',
          user_id: '000-rfg',
          created_at: 'string',
          id: itemId,
          image: {
            id: 'gfg566',
            url: 'jghj767',
          },
        },
      ],
      loading: false,
      error: false,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<FavouriteList />)
    const removeFavouriteButton = getByTestId(FAVOURITE_LIST_IDS.removeFavouriteButton)

    fireEvent.click(removeFavouriteButton)

    expect(removeFavouriteeMock).toHaveBeenCalledWith({ favouriteId: itemId })
    expect(removeFavouriteeMock).toHaveBeenCalledTimes(1)
  })
})
