import { ReactNode } from 'react'

export interface LayoutProps {
  title: string
  error: string | boolean
  onCloseSnackbar: () => void
  children: ReactNode
}
