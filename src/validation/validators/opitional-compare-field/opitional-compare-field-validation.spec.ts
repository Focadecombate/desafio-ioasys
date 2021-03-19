import { InvalidParamError } from '../../../presentation/errors'
import { OptionalCompareFieldValidation } from './opitional-compare-field-validation'

describe('Compare Field Validation', () => {
  test('should not return an error if both fields are null', () => {
    const sut = new OptionalCompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({})
    expect(error).toBeUndefined()
  })
  test('should return a missingParamError if validation fails', () => {
    const sut = new OptionalCompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'another_name' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('should return a missingParamError if only a field is passed', () => {
    const sut = new OptionalCompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('should return undefined if is valid', () => {
    const sut = new OptionalCompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'any_name' })
    expect(error).toBeFalsy()
  })
})
