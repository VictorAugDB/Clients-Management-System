import { ClientModel } from '@/models/client'
import { ClientsRepository } from '@/repositories/clients-repository'
import { CoordinatesAlreadyExistsError } from '@/use-cases/errors/coordinates-already-exists-error'

type CreateClientReq = Omit<ClientModel, 'id'>

export class RegisterClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ coordinates, email, name, phone }: CreateClientReq) {
    const coordinateAlreadyExists =
      await this.clientsRepository.coordinatesExists(coordinates)

    if (coordinateAlreadyExists) {
      throw new CoordinatesAlreadyExistsError()
    }

    const client = await this.clientsRepository.create({
      coordinates,
      email,
      name,
      phone,
    })

    return client
  }
}
