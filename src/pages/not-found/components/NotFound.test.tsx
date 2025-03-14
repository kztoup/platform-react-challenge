import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import NotFound from './NotFound'
import { LITERALS } from '.'

jest.mock('react-router', () => ({
  Link: () => <div />,
}))

describe('Testing <NotFound> View', () => {
  it('should render the NotFound', () => {
    const { getByText } = render(<NotFound />)

    expect(getByText(LITERALS.errorCode)).toBeTruthy()
  })
})
