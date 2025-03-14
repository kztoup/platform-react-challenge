export interface IUseAsyncOutcome {
  loading: boolean
  error: boolean | string
  executePromise: (asyncFn: Promise<any>) => Promise<void>
  removeError?: () => void
}
