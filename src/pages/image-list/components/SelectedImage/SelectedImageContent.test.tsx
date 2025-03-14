import React from 'react'
import { render } from '@testing-library/react'

import useAsync from 'hooks/useAsync'
import { SelectedImageContent } from '.'
import { IMAGE_LIST_IDS } from '../'

jest.mock('hooks/useAsync')
const mockUseAsync = jest.mocked(useAsync)

mockUseAsync.mockReturnValue({
  data: [],
  loading: false,
  error: false,
  executePromise: async () => {},
  removeError: () => {},
})

jest.mock('react-router', () => ({
  Link: () => <div />,
}))

const imageId = 'gffdfg546'
const data = {
  id: imageId,
  width: '200',
  height: '200',
  url: 'sdffggh',
  breeds: [],
}

describe('Testing <SelectedImageContent> View', () => {
  it('should render the SelectedImageContent', () => {
    const { getByTestId } = render(<SelectedImageContent data={data} />)

    expect(getByTestId(IMAGE_LIST_IDS.breedsData)).toBeTruthy()
  })
})
