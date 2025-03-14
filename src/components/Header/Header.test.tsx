import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Header, HEADER_IDS } from '.'

jest.mock('react-router', () => ({
  Link: () => <div />,
}))

describe('Testing <Header> View', () => {
  it('should render the Header', () => {
    const { getByTestId } = render(<Header />)
    expect(getByTestId(HEADER_IDS.headerAppBar)).toBeTruthy()
  })

  it('should render menu button', () => {
    render(<Header />)

    const items = screen.getAllByRole('button')
    expect(items).toHaveLength(1)
  })
})
