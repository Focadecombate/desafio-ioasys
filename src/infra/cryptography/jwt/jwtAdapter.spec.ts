import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwtAdapter'

const makeSut = () => {
  const sut = new JwtAdapter('secretKey')
  return ({ sut })
}

describe('Jwt Adapter', () => {
  test('should call generate with the correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secretKey')
  })
})
