export interface DisableAccountRepository {
  disable(accountId: string): Promise<void>
}
