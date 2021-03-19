import { InvalidParamError } from '../../../presentation/errors'
import { EmailValidator } from '../../protocols/email-validator'
import { OptionalEmailValidation } from './optional-email-validation'

interface SutReturn {
  sut: OptionalEmailValidation,
  emailValidatorStub: EmailValidator,
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorSub()
}

const makeSut = (): SutReturn => {
  const emailValidatorStub = makeEmailValidator()
  return {
    sut: new OptionalEmailValidation('email', emailValidatorStub),
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = sut.validate({ email: 'any_valid@mail.com' })

    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })
  test('should not return a error if field is undefined', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = sut.validate({})

    expect(httpResponse).toBeUndefined()
  })
  test('should pass the correct email to email validator', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'any_valid@mail.com' })

    expect(isValidSpy).toHaveBeenCalledWith('any_valid@mail.com')
  })
  test('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error('')
      })

    expect(sut.validate).toThrow()
  })
})
