import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  address: string;
  contact: string;
  contract: boolean;
  email: string;
  wage: number;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    birthDate,
    cpf,
    address,
    contact,
    contract,
    email,
    wage,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne(id);

    if (!checkUserExists) {
      throw new Error("User doesn't exists");
    }

    if (email !== checkUserExists.email) {
      const emailExists = await userRepository.findOne({
        where: { email },
      });
      if (emailExists) {
        throw Error('Email already in use');
      }
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      birthDate,
      cpf,
      address,
      contract,
      email,
      contact,
      password: hashedPassword,
      wage,
    });

    await userRepository.update(id, user);

    delete user.password;

    return user;
  }
}

export default UpdateUserService;
