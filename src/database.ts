import { env } from '@/env'
import { Knex, knex as setupKnex } from 'knex'

export const config: Knex.Config = {
  client: 'pg',
  connection:
    env.PG_CONNECTION_STRING ?? 'postgresql://admin:root@localhost:5432',
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
