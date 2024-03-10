import { ClientModel } from '@/models/client'

export type KnexClientModel = {
  name: string
  id: string
  email: string
  phone: string
  coordinate_x: number
  coordinate_y: number
}

export function knexToApp({
  coordinate_x,
  coordinate_y,
  email,
  id,
  name,
  phone,
}: KnexClientModel): ClientModel {
  return {
    coordinates: {
      x: coordinate_x,
      y: coordinate_y,
    },
    email,
    id,
    name,
    phone,
  }
}
