import {
  ClientsRepository,
  FindManyFilters,
} from '@/repositories/clients-repository'
import { Pagination } from '@/repositories/shared/pagination'

type ListClientsRequest = {
  filters: FindManyFilters | undefined
  pagination: Pagination | undefined
}

export class ListClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ filters, pagination }: ListClientsRequest) {
    const clients = await this.clientsRepository.findMany({
      filters,
      pagination,
    })

    return clients
  }
}
