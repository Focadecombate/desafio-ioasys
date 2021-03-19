import { AddMovie, AddMovieModel } from '../../../domain/usecases/add-movie'
import { AddMovieRepository } from '../../protocols/db/movie/add-movie-repository'

export class DbAddMovie implements AddMovie {
  constructor (private readonly addMovieRepository: AddMovieRepository) { }
  async add (data: AddMovieModel): Promise<void> {
    await this.addMovieRepository.add(data)
    return new Promise(resolve => resolve(null))
  }
}
