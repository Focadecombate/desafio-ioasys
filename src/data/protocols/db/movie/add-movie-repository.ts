import { AddMovieModel } from '../../../../domain/usecases/add-movie'

export interface AddMovieRepository {
  add(movieData: AddMovieModel): Promise<void>
}
