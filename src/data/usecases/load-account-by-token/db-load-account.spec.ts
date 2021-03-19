import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account'

const makeDecryperStub = () => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new DecrypterStub()
}
const makeSut = () => {
  const decrypterStub = makeDecryperStub()
  return {
    sut: new DbLoadAccountByToken(decrypterStub),
    decrypterStub
  }
}
describe('DbLoadAccountByToken UseCase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
