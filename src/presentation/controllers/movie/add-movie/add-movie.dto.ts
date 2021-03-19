import { Actor } from './add-movie-controller-protocols'

export interface AddMovieDTO {
  title: string,
  genre: string,
  diretor: string,
  actors: Actor[]
}
