import { AddMovieDTO } from '../../../../../presentation/controllers/movie/add/add-movie.dto'
import { RequiredFieldValidation, Validation, ValidationComposite } from '../../login/signup/protocols/signup-validation-protocol'

export const makeAddMovieValidation = (): ValidationComposite => {
  const requiredFields: (keyof AddMovieDTO)[] = ['title', 'actors', 'diretor', 'genre']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  return new ValidationComposite(validation)
}
