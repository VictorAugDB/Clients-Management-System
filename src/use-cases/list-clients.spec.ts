import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository'
import { ListClientsUseCase } from '@/use-cases/list-clients'
import { RegisterClientUseCase } from '@/use-cases/register'
import { faker } from '@faker-js/faker'

let clientsRepository: InMemoryClientsRepository
let registerClientUseCase: RegisterClientUseCase
let sut: ListClientsUseCase

async function makeClient() {
  await registerClientUseCase.execute({
    coordinates: {
      x: faker.number.int({
        min: 0,
        max: 1000000000,
      }),
      y: faker.number.int({
        min: 0,
        max: 1000000000,
      }),
    },
    email: faker.internet.email(),
    name: faker.company.name(),
    phone: faker.helpers.fromRegExp(/^\d{2}\s\d{5}-\d{4}$/g),
  })
}

describe('Register Client Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    registerClientUseCase = new RegisterClientUseCase(clientsRepository)
    sut = new ListClientsUseCase(clientsRepository)
  })

  test('should be able to list clients', async () => {
    await makeClient()
    await makeClient()

    expect(
      await sut.execute({
        filters: undefined,
        pagination: undefined,
      }),
    ).toHaveLength(2)
  })

  test('should be able to call clients repository with optional values when provided', async () => {
    const params = {
      filters: {
        coordinates: {
          x: 1,
          y: 2,
        },
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.helpers.fromRegExp(/^\d{2}\s\d{5}-\d{4}$/g),
      },
      pagination: {
        page: 10,
        pageSize: 2,
      },
    }

    const sutSpy = vi.spyOn(sut, 'execute')

    await sut.execute(params)

    expect(sutSpy).toHaveBeenCalledWith(params)
  })
})
