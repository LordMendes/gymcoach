import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
