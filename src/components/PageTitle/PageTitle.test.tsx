import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { PageTitle, PAGE_TITLE_IDS } from '.'

const title = 'a title'

describe('Testing <PageTitle> View', () => {
  it('should render the PageTitle', () => {
    const { getByTestId } = render(<PageTitle title={title} />)

    expect(getByTestId(PAGE_TITLE_IDS.title)).toBeTruthy()
  })

  it('should display the default error message', () => {
    const { getByTestId } = render(<PageTitle title={title} />)

    expect(getByTestId(PAGE_TITLE_IDS.title)).toHaveTextContent(title)
  })
})
