export class CityDoesNotExistsError extends Error {
  constructor() {
    super('This city does not exists')
  }
}