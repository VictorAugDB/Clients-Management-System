import { ClientModel, Coordinates } from '@/models/client'
import { Pagination } from '@/repositories/shared/pagination'

export type CreateClientInput = Omit<ClientModel, 'id'>

export type FindManyFilters = Partial<ClientModel>

export type FindManyInput = {
  filters?: FindManyFilters
  pagination?: Pagination
}

export interface ClientsRepository {
  create(data: CreateClientInput): Promise<ClientModel>
  findMany(data: FindManyInput): Promise<ClientModel[]>
  coordinatesExists(coordinates: Coordinates): Promise<boolean>
}
