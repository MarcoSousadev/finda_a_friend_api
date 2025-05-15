export class UserAlredyExistsError extends Error {
  constructor() {
    super('Phone already exists')
  }
}