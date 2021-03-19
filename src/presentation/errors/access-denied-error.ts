export class AccessDenied extends Error {
  constructor () {
    super('Access Denied to resource')
    this.name = 'AccessDenied'
  }
}
