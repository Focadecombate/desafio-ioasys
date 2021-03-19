import { InvalidParamError } from '../../../presentation/errors'
import { InBetweenFieldValidation } from './in-between-field-validation'

describe('In Between Validation', () => {
  test('should return a invalidParamError if validation fails', () => {
    const sut = new InBetweenFieldValidation('field', { min: 0, max: 4 })
    const error = sut.validate({ field: 5 })
    expect(error).toEqual(new InvalidParamError('field'))
  })
  test('should return undefined if is valid', () => {
    const sut = new InBetweenFieldValidation('field', { min: 0, max: 4 })
    const error = sut.validate({ field: 4 })
    expect(error).toBeFalsy()
  })
})
