import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Client from '../models/Client';

interface Request {
  id: string;
  name: string;
  gender: string;
  birthdate: Date;
  cpf: string;
  contact: string;
  email: string;
  password: string;
}

class UpdateClientService {
  public async execute({
    id,
    name,
    gender,
    birthdate,
    cpf,
    contact,
    email,
    password,
  }: Request): Promise<Client> {
    const clientRepository = getRepository(Client);

    const checkClientExists = await clientRepository.findOne(id);

    if (!checkClientExists) {
      throw new Error("Client doesn't exists");
    }

    if (email !== checkClientExists.email) {
      const emailExists = await clientRepository.findOne({
        where: { email },
      });
      if (emailExists) {
        throw Error('Email already in use');
      }
    }

    const hashedPassword = await hash(password, 8);

    const client = clientRepository.create({
      name,
      gender,
      birthdate,
      cpf,
      contact,
      email,
      password: hashedPassword,
    });

    await clientRepository.update(id, client);

    delete client.password;

    return client;
  }
}

export default UpdateClientService;
