import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Client from '@modules/clients/infra/typeorm/entities/Client';

interface Request {
  name: string;
  gender: string;
  birthdate: Date;
  cpf: string;
  contact: string;
  email: string;
  password: string;
}

class CreateClientService {
  public async execute({
    name,
    gender,
    birthdate,
    cpf,
    contact,
    email,
    password,
  }: Request): Promise<Client> {
    const clientRepository = getRepository(Client);

    const checkClientExists = await clientRepository.findOne({
      where: [{ cpf }, { email }],
    });

    if (checkClientExists) {
      throw new Error('Client already exists');
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

    await clientRepository.save(client);

    return client;
  }
}

export default CreateClientService;
