import React from 'react'
import useAsync from 'hooks/useAsync'
import { render } from '@testing-library/react'

import * as breedsApi from 'api/breeds'
import { BreedList, BREED_LIST_IDS } from '.'

jest.mock('react-router', () => ({
  useLocation: () => ({ hash: 'hash' }),
  useNavigate: () => undefined,
}))

jest.mock('hooks/useAsync')
const mockUseAsync = jest.mocked(useAsync)

describe('Testing <BreedList> View', () => {
  it('should render BreedList', () => {
    mockUseAsync.mockReturnValue({
      data: [],
      loading: false,
      error: false,
      executePromise: async () => {},
      removeError: () => {},
    })
    const { getByTestId } = render(<BreedList />)

    expect(getByTestId(BREED_LIST_IDS.breedListData)).toBeTruthy()
  })

  it('should call render', () => {
    const fetchBreedListMock = jest.spyOn(breedsApi, 'fetchBreedList').mockImplementation()
    render(<BreedList />)

    expect(fetchBreedListMock).toHaveBeenCalledTimes(1)
  })
})
