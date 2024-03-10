import { ClientModel, Coordinates } from '@/models/client'
import {
  ClientsRepository,
  CreateClientInput,
  FindManyInput,
} from '@/repositories/clients-repository'

import { randomUUID } from 'node:crypto'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: ClientModel[] = []

  async create(data: CreateClientInput): Promise<ClientModel> {
    const client = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      coordinates: data.coordinates,
    }

    this.items.push(client)

    return Promise.resolve(client)
  }

  async findMany({
    filters: _filters,
    pagination: _pagination,
  }: FindManyInput): Promise<ClientModel[]> {
    return Promise.resolve(this.items)
  }

  async coordinatesExists(coordinates: Coordinates): Promise<boolean> {
    return Promise.resolve(
      !!this.items.find(
        (client) =>
          client.coordinates.x === coordinates.x &&
          client.coordinates.y === coordinates.y,
      ),
    )
  }
}
