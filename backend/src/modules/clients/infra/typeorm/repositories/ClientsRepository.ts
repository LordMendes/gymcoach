import {getRepository, Repository} from 'typeorm';
import IClientRepository from '@modules/clients/repositories/IClientRepository'
import Client from '../entities/Client'

class ClientRepository implements IClientRepository{
  private ormRepository: Repository<Client>;

  constructor(){
    this.ormRepository = getRepository(Client);
  }
}
