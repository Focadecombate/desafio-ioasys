export interface Vote {
  id: string
  userId: String
  grade: number
}

export interface Actor {
  id: string
  name: String
  movieId: string
}
export interface MovieModel {
  id: string;
  title: string;
  diretor: string;
  genre: string;
  votes?: Vote[] | Vote
  actors: Actor[]
}
