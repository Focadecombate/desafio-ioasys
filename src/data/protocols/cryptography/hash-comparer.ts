export interface HashComparer {
  compare(value: string, hash): Promise<boolean>
}
