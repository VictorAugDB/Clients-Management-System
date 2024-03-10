import { knex } from '@/database'
import { ClientModel, Coordinates } from '@/models/client'
import {
  ClientsRepository,
  CreateClientInput,
  FindManyInput,
} from '@/repositories/clients-repository'
import { KnexClientModel, knexToApp } from '@/repositories/knex/map'
import { randomUUID } from 'crypto'

export class KnexClientsRepository implements ClientsRepository {
  async create(data: CreateClientInput): Promise<ClientModel> {
    const client = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      coordinate_x: data.coordinates.x,
      coordinate_y: data.coordinates.y,
    }

    await knex('clients').insert(client)

    return {
      id: client.id,
      ...data,
    }
  }

  async findMany({
    filters,
    pagination,
  }: FindManyInput): Promise<ClientModel[]> {
    let query = knex('clients').select('*')

    if (filters) {
      const { coordinates, ...rest } = filters

      query = query.where({
        ...rest,
        coordinate_x: coordinates?.x,
        coordinate_y: coordinates?.y,
      })
    }

    if (!pagination) {
      const res = await query
      return res.map(knexToApp)
    }

    const { page, pageSize } = pagination

    const offset = (page - 1) * pageSize

    const res = await query.offset(offset).limit(pageSize)
    return res.map(knexToApp)
  }

  async coordinatesExists(coordinates: Coordinates): Promise<boolean> {
    const coordinatesFound: Array<KnexClientModel> = await knex('clients')
      .select('*')
      .where({
        coordinate_x: coordinates.x,
        coordinate_y: coordinates.y,
      })

    return !!coordinatesFound.length
  }
}
