import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getRepository } from 'typeorm';

import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';

import Client from '../models/Client';

const clientRouter = Router();
// Create Client
clientRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      gender,
      birthdate,
      cpf,
      contact,
      email,
      password,
    } = request.body;

    const createClient = new CreateClientService();

    const formatedDate = parseISO(birthdate);

    const client = await createClient.execute({
      name,
      gender,
      birthdate: formatedDate,
      cpf,
      contact,
      email,
      password,
    });

    delete client.password;

    return response.status(201).json(client);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// List Clients
clientRouter.get('/', async (request, response) => {
  const clientsRepository = getRepository(Client);
  const clients = await clientsRepository.find();

  const noPasswordClients = clients.map(client => {
    delete client.password;
    return client;
  });

  return response.status(201).json(noPasswordClients);
});

// Get Client
clientRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const clientsRepository = getRepository(Client);

  const client = await clientsRepository.findOne({
    where: { id },
  });

  delete client.password;

  return response.status(201).json(client);
});

// Update Client
clientRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      gender,
      birthdate,
      cpf,
      contact,
      email,
      password,
    } = request.body;

    const updateClient = new UpdateClientService();

    const updatedClient = await updateClient.execute({
      id,
      name,
      gender,
      birthdate,
      cpf,
      contact,
      email,
      password,
    });
    return response.status(201).json(updatedClient);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// Delete Client
clientRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const clientsRepository = getRepository(Client);

  const clientExists = await clientsRepository.findOne(id);

  if (!clientExists) {
    throw Error("Client doesn't exist");
  }

  clientsRepository.remove(clientExists);

  return response
    .status(201)
    .json({ message: `User ${clientExists.id} removed` });
});

export default clientRouter;
