import React from 'react'
import { render } from '@testing-library/react'

import { Layout } from '.'

const title = 'a title'
const error = false
const onCloseSnackbar = () => undefined
const children = <div data-testid='children' />

describe('Testing <Layout> View', () => {
  it('should render the Layout', () => {
    const { getByTestId } = render(
      <Layout title={title} error={error} onCloseSnackbar={onCloseSnackbar}>
        {children}
      </Layout>
    )

    expect(getByTestId(title)).toBeTruthy()
  })

  it('should render the children', () => {
    const { getByTestId } = render(
      <Layout title={title} error={error} onCloseSnackbar={onCloseSnackbar}>
        {children}
      </Layout>
    )

    expect(getByTestId('children')).toBeTruthy()
  })
})
