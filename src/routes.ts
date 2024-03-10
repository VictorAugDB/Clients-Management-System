import { FastifyInstance } from 'fastify'
import { register } from './http/controllers/register'
import { listClients } from '@/http/controllers/list'

export async function appRoutes(app: FastifyInstance) {
  app.post('/clients', register)
  app.get('/clients', listClients)
}
