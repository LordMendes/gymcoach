import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User'

interface Request {
  name: string;
  birthDate: string;
  cpf: string;
  address: string;
  contact: string;
  email: string;
  wage: number;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    birthDate,
    cpf,
    address,
    contact,
    email,
    wage,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: [{ cpf }],
    });

    if (checkUserExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      birthDate,
      cpf,
      address,
      contract: true,
      email,
      contact,
      password: hashedPassword,
      wage,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
