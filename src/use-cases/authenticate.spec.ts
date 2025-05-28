import { expect, test, describe, it } from 'vitest'
import { UserRegisterUsecase } from './user-register'
import { compare, hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './erros/user-already-exists'
import { AutheticateUseCase } from './authenticate'
import { error } from 'console'
import { any } from 'zod'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('user authenticate use case', () => {

  it('should be able to authenticate', async ()=> {
     const usersRepository = new inMemoryUsersRepository()
     const autheticateUseCase = new AutheticateUseCase(usersRepository)

     await usersRepository.create({
       name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password_hash: await hash('123456', 6),
      city: 'belo horizonte'
    })

    const { user } = await autheticateUseCase.execute({
      password:'123456',
      phone: '31 33826606', 
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able to login with wrong password  ', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const autheticateUseCase = new AutheticateUseCase(usersRepository)

      await usersRepository.create({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password_hash: await hash('123456', 6),
      city: 'belo horizonte'

    })

    await expect(()=>  autheticateUseCase.execute({
      password: '1234ds56',
      phone: '31 33826606', 
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

    
  })

  it('should not be able to login the user with wrong phone  ', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const autheticateUseCase = new AutheticateUseCase(usersRepository)

      await usersRepository.create({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password_hash: await hash('123456', 6),
      city: 'belo horizonte'

    })

    await expect(()=>  autheticateUseCase.execute({
      password: '123456',
      phone: '3102 33826606', 
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

    
  })

  
})