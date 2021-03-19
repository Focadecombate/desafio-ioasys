import { MovieModel } from '../../../../domain/models/movie'
import { ListMoviesModel } from '../../../../domain/usecases/list-movies'

export interface ListMovieRepository {
  list(movieData: ListMoviesModel): Promise<MovieModel[]>
}
