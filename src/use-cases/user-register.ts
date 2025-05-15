import { UsersRepository } from '@/repository/users-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistsError } from './erros/user-already-exists'
import { User } from '@prisma/client'

interface userRegisterUseCaseRequest {
  name: string
  addres: string
  cep: string
  phone: string
  password: string
  city: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class UserRegisterUsecase {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    name,
    addres,
    cep,
    phone,
    password,
    city
  }: userRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSamePhone = await this.userRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new UserAlredyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      addres,
      cep,
      phone,
      password_hash,
      city
    })

    return {
      user
    }
  }
}
