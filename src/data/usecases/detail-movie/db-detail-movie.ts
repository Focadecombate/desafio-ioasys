import { DetailMovie, DetailMovieRepository, DetailiedMovieModel, DetailMovieModel } from './db-detail-movie-protocols'

export class DbDetailMovie implements DetailMovie {
  constructor (private readonly detailMovieRepository: DetailMovieRepository) { }
  async detail (data: DetailMovieModel): Promise<DetailiedMovieModel> {
    const movievote = await this.detailMovieRepository.detail(data)
    return new Promise(resolve => resolve(movievote))
  }
}
