import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { classToPlain } from 'class-transformer';

class ListUserService {
  async execute(){
    const usersRepository = getCustomRepository(UsersRepositories);

    const users = await usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUserService };