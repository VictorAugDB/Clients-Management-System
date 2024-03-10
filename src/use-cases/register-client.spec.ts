import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository'
import { CoordinatesAlreadyExistsError } from '@/use-cases/errors/coordinates-already-exists-error'
import { RegisterClientUseCase } from '@/use-cases/register-client'
import { faker } from '@faker-js/faker'

let clientsRepository: InMemoryClientsRepository
let sut: RegisterClientUseCase

describe('Register Client Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new RegisterClientUseCase(clientsRepository)
  })

  test('should be able to register client', async () => {
    const result = await sut.execute({
      coordinates: {
        x: faker.number.int({
          min: 0,
          max: 1000,
        }),
        y: faker.number.int({
          min: 0,
          max: 1000,
        }),
      },
      email: faker.internet.email(),
      name: faker.company.name(),
      phone: faker.helpers.fromRegExp(/^\d{2}\s\d{5}-\d{4}$/g),
    })

    expect(result.id).toEqual(expect.any(String))
  })

  test('should not be able to register client with the same coordinates', async () => {
    const coordinates = {
      x: faker.number.int({
        min: 0,
        max: 1000,
      }),
      y: faker.number.int({
        min: 0,
        max: 1000,
      }),
    }

    const input = {
      coordinates,
      email: faker.internet.email(),
      name: faker.company.name(),
      phone: faker.helpers.fromRegExp(/^\d{2}\s\d{5}-\d{4}$/g),
    }

    await sut.execute(input)

    expect(sut.execute(input)).rejects.toBeInstanceOf(
      CoordinatesAlreadyExistsError,
    )
  })
})
