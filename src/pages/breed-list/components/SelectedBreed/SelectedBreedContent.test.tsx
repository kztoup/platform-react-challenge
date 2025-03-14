import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import SelectedBreedContent from './SelectedBreedContent'
import { BREED_LIST_IDS } from '..'

jest.mock('react-router', () => ({
  useNavigate: () => undefined,
}))

const data = [
  {
    height: 200,
    id: 'id',
    url: 'url',
    width: 100,
    breeds: [],
  },
]

describe('Testing <SelectedBreedContent> View', () => {
  it('should render the SelectedBreedContent', () => {
    const { getByTestId } = render(<SelectedBreedContent data={data} />)

    expect(getByTestId(BREED_LIST_IDS.selectedBreedContent)).toBeTruthy()
  })
})
