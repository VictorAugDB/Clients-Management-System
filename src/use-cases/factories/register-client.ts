import { KnexClientsRepository } from '@/repositories/knex/clients-repository'
import { RegisterClientUseCase } from '@/use-cases/register-client'

export function makeRegisterClientUseCase() {
  const clientsRepository = new KnexClientsRepository()
  const registerClientUseCase = new RegisterClientUseCase(clientsRepository)

  return registerClientUseCase
}
