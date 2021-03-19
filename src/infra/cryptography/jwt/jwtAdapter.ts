import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) { }

  async encrypt (value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secretKey)
    return token
  }

  async decrypt (value: string): Promise<string> {
    const removeBearer = value.replace('Bearer ', '')
    const payload = await jwt.verify(removeBearer, this.secretKey)

    if (typeof payload === 'string') {
      return payload
    } else if (payload && typeof payload === 'object') {
      const { id } = payload as any
      return id
    }
    return null
  }
}
