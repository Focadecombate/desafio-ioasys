import { Actor, MovieModel } from '../models/movie'

export interface ListMoviesModel {
  title?: string,
  genre?: string,
  diretor?: string,
  actors?: Actor[]
}

export interface ListMovies {
  list(listMovies: ListMoviesModel): Promise<MovieModel[]>
}
