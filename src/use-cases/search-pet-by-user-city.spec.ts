import { expect, test, describe, it } from 'vitest'
import { inMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserCityUsecase } from './search-pet-by-user-city'
import { inMemoryPetDataRepository } from '@/repository/in-memory/in-memory-pet-date-repository'
import { UserRegisterUsecase } from './user-register'

describe('user register use case', () => {
  it('should find pets by city ', async () => {
    const UsersRepository = new inMemoryUsersRepository()
    const PetDataRepository = new inMemoryPetDataRepository()
    const listUserIdByCityUseCase = new UserCityUsecase(UsersRepository, PetDataRepository)

     await UsersRepository.create({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 35826606',
      password_hash: '123456',
      city: 'belo horizonte'
    })
    
     await UsersRepository.create({
      name: 'salvapet',
      addres: 'tirol',
      cep: '30662090',
      phone: '31 33826606',
      password_hash: '123456',
      city: 'belo horizonte'
    })

    const  user  =  await listUserIdByCityUseCase.execute({
      query : 'belo horizonte'
    })

     console.log(user)
     expect(user).toHaveLength(2)
     expect(user).toEqual(
      expect.objectContaining({
        city: 'belo horizonte'
      })
     )
  })

  // it('should not be able to registger with the same phone twice', async () => {
  //   const UsersRepository = new inMemoryUsersRepository()

  //   const userRegisterUseCase = new UserRegisterUsecase(UsersRepository)

  //   const phone = '31 33826606'

  //   await userRegisterUseCase.execute({
  //     name: 'salvapet',
  //     addres: 'tirol',
  //     cep: '30662090',
  //     phone,
  //     password: '123456',
  //     city: 'belo horizonte'
  //   })

  //   await expect(() =>
  //     userRegisterUseCase.execute({
  //       name: 'salvapet',
  //       addres: 'tirol',
  //       cep: '30662090',
  //       phone,
  //       password: '123456',
  //       city: 'belo horizonte'
  //     })
  //   ).rejects.toBeInstanceOf(UserAlredyExistsError)
  // })

  // it('should be able to register ', async () => {
  //   const UsersRepository = new inMemoryUsersRepository()
  //   const userRegisterUseCase = new UserRegisterUsecase(UsersRepository)

  //   const { user } = await userRegisterUseCase.execute({
  //     name: 'salvapet',
  //     addres: 'tirol',
  //     cep: '30662090',
  //     phone: '31 33826606',
  //     password: '123456',
  //     city: 'belo horizonte'
  //   })

  //   expect(user.id).toEqual(expect.any(String))
  // })
})