export interface AddMovieModel {
  title: string,
  description: string,
  published: false,
  authorName: string
}

export interface AddMovie {
  add(account: AddMovieModel): Promise<void>
}
