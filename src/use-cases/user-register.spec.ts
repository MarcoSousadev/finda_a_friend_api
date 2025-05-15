import { expect, test, describe, it } from 'vitest'
import { UserRegisterUsecase } from './user-register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './erros/user-already-exists'
import { string } from 'zod'

describe('user register use case', ()=>{
  it('should hash the user password upon registration ', async ()=> {
    const UsersRepository = new InMemoryUsersRepository()
    const userRegisterUseCase = new UserRegisterUsecase(UsersRepository)

    const { user } = await userRegisterUseCase.execute({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password: '123456',
      city: 'belo horizonte'
    })

     const isPasswordHashed = await compare(
      '123456',
      user.password_hash
     )
     expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to registger with the same phone twice', async ()=> {
    const UsersRepository = new InMemoryUsersRepository()
    
    const userRegisterUseCase = new UserRegisterUsecase(UsersRepository)

    const phone = '31 33826606'

     await userRegisterUseCase.execute({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone,
      password: '123456',
      city: 'belo horizonte'
    })

    await expect(()=>
      userRegisterUseCase.execute({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone,
      password: '123456',
      city: 'belo horizonte'
    })

  ).rejects.toBeInstanceOf(UserAlredyExistsError)
}) 

it('should be able to register ', async ()=> {
    const UsersRepository = new InMemoryUsersRepository()
    const userRegisterUseCase = new UserRegisterUsecase(UsersRepository)

    const { user } = await userRegisterUseCase.execute({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password: '123456',
      city: 'belo horizonte'
    })

     
     expect(user.id).toEqual(expect.any(String))
  })


})