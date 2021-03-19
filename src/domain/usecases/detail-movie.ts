import { DetailiedMovieModel } from '../models/movie'

export interface DetailMovieModel {
  title: string,
}

export interface DetailMovie {
  detail(listMovies: DetailMovieModel): Promise<DetailiedMovieModel>
}
