import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwtAdapter'

const makeSut = () => {
  const sut = new JwtAdapter('secretKey')
  return ({ sut })
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise((resolve) => resolve('any_id'))
  }
}))

describe('Jwt Adapter', () => {
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
