import bcrypt from 'bcrypt'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer'

export class BcryptAdapter implements Encrypter, HashComparer {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt)
    return hashedPassword
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
