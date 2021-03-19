import { MovieModel } from '../models/movie'

export interface ListMoviesModel {
  title?: string,
  genre?: string,
  diretor?: string,
  actors?: string[]
}

export interface ListMovies {
  list(listMovies: ListMoviesModel): Promise<MovieModel[]>
}
