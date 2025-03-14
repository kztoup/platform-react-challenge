import { JSX } from 'react'

export interface SelectedHashProps {
  render: (imageId: string) => JSX.Element | null
}
