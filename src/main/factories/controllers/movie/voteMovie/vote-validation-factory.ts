
import {
  VoteDto,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
  InBetweenFieldValidation
} from './protocols/vote-validation-protocol'

export const makeVoteValidation = (): ValidationComposite => {
  const requiredFields: (keyof VoteDto)[] = ['title', 'grade']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  validation.push(new InBetweenFieldValidation('grade', { min: 0, max: 4 }))

  return new ValidationComposite(validation)
}
