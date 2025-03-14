import React from 'react'
import { render } from '@testing-library/react'

import { SelectedHash } from '.'

jest.mock('react-router', () => ({
  useLocation: () => ({ hash: 'hash' }),
}))

const renderFn = jest.fn()

describe('Testing <SelectedHash> View', () => {
  it('should call render function', () => {
    render(<SelectedHash render={renderFn} />)

    expect(renderFn).toHaveBeenCalledTimes(1)
  })
})
