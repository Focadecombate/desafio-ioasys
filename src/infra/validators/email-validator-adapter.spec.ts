import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = () => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}
describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const { sut } = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
  test('should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
  test('should call emailValidator with the right email ', () => {
    const { sut } = makeSut()
    const isValidSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('any_email@mail.com')
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })
})
