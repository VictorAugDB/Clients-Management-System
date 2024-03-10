import { appRoutes } from '@/routes'
import fastify from 'fastify'
import qs from 'qs'

export const app = fastify({
  querystringParser: qs.parse,
})

app.register(appRoutes)
