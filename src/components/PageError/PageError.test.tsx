import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { PageError, DEFAULT_ERROR_MESSAGE, PAGE_ERROR_IDS } from '.'

describe('Testing <PageError> View', () => {
  it('should render the PageError', () => {
    const { getByTestId } = render(<PageError />)

    expect(getByTestId(PAGE_ERROR_IDS.errorWrapper)).toBeTruthy()
  })

  it('should display the default error message', () => {
    const { getByTestId } = render(<PageError />)

    expect(getByTestId(PAGE_ERROR_IDS.errorWrapper)).toHaveTextContent(DEFAULT_ERROR_MESSAGE)
  })
})
