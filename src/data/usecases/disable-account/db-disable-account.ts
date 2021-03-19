import { DisableAccount, DisableAccountRepository } from './db-disable-account-protocols'

export class DbDisableAccount implements DisableAccount {
  constructor (
    private readonly disableAccountRepository: DisableAccountRepository
  ) { }

  async disable (accountId: string): Promise<void> {
    await this.disableAccountRepository.disable(accountId)
  }
}
