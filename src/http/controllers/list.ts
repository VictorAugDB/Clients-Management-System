import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { CoordinatesAlreadyExistsError } from '@/use-cases/errors/coordinates-already-exists-error'
import { makeListClientUseCase } from '@/use-cases/factories/list-clients'

export async function listClients(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z
      .object({
        filters: z
          .object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            coordinates: z
              .object({
                x: z.coerce.number(),
                y: z.coerce.number(),
              })
              .optional(),
          })
          .optional(),
        pagination: z
          .object({
            page: z.coerce.number(),
            pageSize: z.coerce.number(),
          })
          .optional(),
      })
      .optional()

    const listClientUseCase = makeListClientUseCase()

    const query = registerBodySchema.parse(request.query)
    console.log(request.query)

    const clients = await listClientUseCase.execute({
      filters: query && query.filters,
      pagination: query && query.pagination,
    })

    return reply.status(200).send({
      data: clients,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err)
      console.log(validationError.toString())
      return validationError
    }

    if (err instanceof CoordinatesAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    console.error(err)

    reply.status(500).send('Internal Server Error!')
  }
}
