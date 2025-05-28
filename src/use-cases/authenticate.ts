import { UsersRepository } from "@/repository/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"

interface AutheticaseUseCaseRequest {
  phone: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AutheticateUseCase{
  constructor(private usersRepository: UsersRepository){}

  async execute({phone, password}: AutheticaseUseCaseRequest): Promise<AuthenticateUseCaseResponse>  {

  const user  = await this.usersRepository.findByPhone(phone)

  if (!user){
    throw new InvalidCredentialsError()
  }


  const doesPasswordMatch = await compare(password, user.password_hash)

  if(!doesPasswordMatch){
    throw new InvalidCredentialsError()
  }
  
  return {
    user, 
  }

}



}