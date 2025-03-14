import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { PageLoader, PAGE_LOADER_IDS } from '.'

describe('Testing <PageLoader> View', () => {
  it('should render the PageLoader', () => {
    const { getByTestId } = render(<PageLoader />)

    expect(getByTestId(PAGE_LOADER_IDS.loaderWrapper)).toBeTruthy()
  })
})
