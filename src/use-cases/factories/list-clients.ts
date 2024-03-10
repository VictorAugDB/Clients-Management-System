import { KnexClientsRepository } from '@/repositories/knex/clients-repository'
import { ListClientsUseCase } from '@/use-cases/list-clients'

export function makeListClientUseCase() {
  const clientsRepository = new KnexClientsRepository()
  const listClientUseCase = new ListClientsUseCase(clientsRepository)

  return listClientUseCase
}
