export class CoordinatesAlreadyExistsError extends Error {
  constructor() {
    super('The coordinates provided already exists.')
  }
}
