import { ListMovieRepository, ListMovies, ListMoviesModel, MovieModel } from './db-list-movie-protocols'

export class DbListMovie implements ListMovies {
  constructor (private readonly ListMovieRepository: ListMovieRepository) { }
  async list (data: ListMoviesModel): Promise<MovieModel[]> {
    const movieList = await this.ListMovieRepository.list(data)
    return new Promise(resolve => resolve(movieList))
  }
}
