import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { CoordinatesAlreadyExistsError } from '@/use-cases/errors/coordinates-already-exists-error'
import { makeRegisterClientUseCase } from '@/use-cases/factories/register-client'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const validateBrPhoneRegex = /^\d{2}\s\d{5}-\d{4}$/g

    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().regex(validateBrPhoneRegex),
      coordinates: z.array(z.number()).length(2),
    })

    const { name, email, phone, coordinates } = registerBodySchema.parse(
      request.body,
    )

    const registerClientUseCase = makeRegisterClientUseCase()

    await registerClientUseCase.execute({
      coordinates: {
        x: coordinates[0],
        y: coordinates[1],
      },
      email,
      name,
      phone,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err)
      console.log(validationError.toString())
      return validationError
    }

    if (err instanceof CoordinatesAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof Error) {
      if ('detail' in err) {
        reply.status(400).send({
          message: err.detail,
        })
      }
    }

    console.error(err)

    reply.status(500).send('Internal Server Error!')
  }
}
