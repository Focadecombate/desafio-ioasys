export interface Actor {
  name: string
}
export interface AddMovieModel {
  title: string,
  genre: string,
  diretor: string,
  actors: Actor[]
}

export interface AddMovie {
  add(account: AddMovieModel): Promise<void>
}
