import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

const usersRouter = Router();

// Create User
usersRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      birthDate,
      cpf,
      address,
      contact,
      email,
      wage,
      password,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      birthDate,
      cpf,
      address,
      contact,
      email,
      wage,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// List users
usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  const noPasswordUser = users.map(user => {
    const newUser = user;
    delete newUser.password;
    return newUser;
  });

  return response.status(201).json(noPasswordUser);
});

// Get user
usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne({
    where: { id },
  });

  delete user.password;

  return response.status(201).json(user);
});

// Update User
usersRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      birthDate,
      cpf,
      address,
      contact,
      contract,
      email,
      wage,
      password,
    } = request.body;

    const updateUser = new UpdateUserService();

    const updatedUser = await updateUser.execute({
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
    });
    return response.status(201).json(updatedUser);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// Delete User
usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);

  const userExists = await usersRepository.findOne(id);

  if (!userExists) {
    throw Error("User doesn't exist");
  }

  usersRepository.remove(userExists);

  return response
    .status(201)
    .json({ message: `User ${userExists.id} removed` });
});

export default usersRouter;
