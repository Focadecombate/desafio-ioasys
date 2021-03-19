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
  votes?: Vote[]
  actors: Actor[]
}
export interface DetailiedMovieModel {
  id: string;
  title: string;
  diretor: string;
  genre: string;
  votes: Vote[]
  actors: Actor[]
  averageGrade:number
}
