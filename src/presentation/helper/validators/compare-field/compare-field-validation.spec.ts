import { InvalidParamError } from '../../../errors'
import { CompareFieldValidation } from './compare-field-validation'

describe('Compare Field Validation', () => {
  test('should return a missingParamError if validation fails', () => {
    const sut = new CompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'another_name' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('should return undefined if is valid', () => {
    const sut = new CompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'any_name' })
    expect(error).toBeFalsy()
  })
})
