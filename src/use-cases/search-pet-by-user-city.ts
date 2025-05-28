import { UsersRepository } from '@/repository/users-repository'
import { Pet, User } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'
import { CityDoesNotExistsError } from './erros/city-does-not-exists'


interface UserCityUseCaseRequest {
  query: string
}

export class UserCityUsecase {
  constructor(
    private userRepository: UsersRepository,
    private petDataRepository: PetDataRepository
  ) {}
  async execute({ query }: UserCityUseCaseRequest): Promise<Pet[]> {
    const usersCitys = await this.userRepository.listUserIdByCity(query)

    let petsByCity: Pet[] = []

    usersCitys.map(async city => {
      const pets = await this.petDataRepository.findManyPetsByUserId(city.id)

      pets.map((pet)=>{
        petsByCity.push(pet)
      })
    })

    if (!petsByCity) {
      throw new CityDoesNotExistsError()
    } 
    return petsByCity
  }
}
