import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwtAdapter'

const makeSut = () => {
  const secretKey = 'secretKey'
  const sut = new JwtAdapter(secretKey)
  return ({ sut, secretKey })
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise((resolve) => resolve('any_id'))
  },
  async verify (): Promise<string> {
    return new Promise((resolve) => resolve('any_id'))
  }
}))

describe('Jwt Adapter', () => {
  describe('Sign()', () => {
    test('should call generate with the correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secretKey')
    })
    test('should return a token in success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_id')
    })
    test('compare should pass the exception to caller', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign')
        .mockImplementationOnce(() => new Promise((resolve, reject) => {
          reject(new Error())
        }))
      const tokenGeneratePromise = sut.encrypt('any_value')
      expect(tokenGeneratePromise).rejects.toThrow()
    })
  })
  describe('Verify()', () => {
    test('should call verify with the right values', async () => {
      const { sut, secretKey } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', secretKey)
    })
    test('should return right value', async () => {
      const { sut } = makeSut()
      const token = await sut.decrypt('any_token')
      expect(token).toBe('any_id')
    })
    test('should return null if verify returns null', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify')
        .mockImplementationOnce(() =>
          new Promise(resolve => resolve(null))
        )
      const token = await sut.decrypt('any_token')
      expect(token).toBeNull()
    })
    test('should throw if verify throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify')
        .mockImplementationOnce(() =>
          new Promise((resolve, reject) => reject(new Error(''))))
      const token = sut.decrypt('any_token')
      expect(token).rejects.toThrow()
    })
  })
})
