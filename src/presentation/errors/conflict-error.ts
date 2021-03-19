export class ConflictError extends Error {
  constructor () {
    super('Conflict of accounts')
    this.name = 'Conflict Error'
  }
}
