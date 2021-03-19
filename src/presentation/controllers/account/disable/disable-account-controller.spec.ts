import { DisableAccount } from '../../../../domain/usecases/disable-account'
import { HttpRequest } from '../../../protocols'
import { serverError } from '../../login/signup/signup-protocols'
import { DisableAccountController } from './disable-account-controller'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_id'
})

const makeDisableAccountStub = (): DisableAccount => {
  class DisableAccountStub implements DisableAccount {
    disable (accountId: string): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new DisableAccountStub()
}

const makeSut = () => {
  const disableAccountStub = makeDisableAccountStub()
  return {
    sut: new DisableAccountController(disableAccountStub),
    disableAccountStub
  }
}

describe('Disable Account Controller', () => {
  test('should call disableAccount with correct values', async () => {
    const { sut, disableAccountStub } = makeSut()
    const disableSpy = jest.spyOn(disableAccountStub, 'disable')
    await sut.handle(makeFakeRequest())
    expect(disableSpy).toHaveBeenCalledWith(makeFakeRequest().accountId)
  })
  test('should return 500 if disableAccount throws', async () => {
    const { sut, disableAccountStub } = makeSut()

    jest.spyOn(disableAccountStub, 'disable')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('')))
      )

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('')))
  })
})
