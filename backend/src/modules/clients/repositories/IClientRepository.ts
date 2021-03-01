import Client from '../infra/typeorm/entities/Client'

export default interface IClientRepository{
  create(): Client;
}
