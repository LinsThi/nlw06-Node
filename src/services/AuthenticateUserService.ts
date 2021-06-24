import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UsersRepositories);

    const user = await userRepository.findOne({
      email
    });

    if(!user) {
      throw new Error("E-mail/Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("E-mail/Password incorrect!");
    }

    const token = sign(
      {
      email: user.email
      },
      "f45c348b8c5529e5c5858b76af621cda",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService };