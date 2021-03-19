import { DetailiedMovieModel } from '../../../../domain/models/movie'
import { DetailMovieModel } from '../../../../domain/usecases/detail-movie'

export interface DetailMovieRepository {
  detail(movieData: DetailMovieModel): Promise<DetailiedMovieModel>
}
