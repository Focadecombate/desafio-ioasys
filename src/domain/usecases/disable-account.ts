export interface DisableAccount {
  disable(accountId: string): Promise<void>
}
