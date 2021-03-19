
import {
  DetailDTO,
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from './protocols/detail-validation-protocol'

export const makeVoteValidation = (): ValidationComposite => {
  const requiredFields: (keyof DetailDTO)[] = ['title']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  return new ValidationComposite(validation)
}
