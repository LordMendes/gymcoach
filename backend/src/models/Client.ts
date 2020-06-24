import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sexo: string;

  @CreateDateColumn()
  birthdate: Date;

  @CreateDateColumn()
  applyDate: Date;

  @Column()
  cpf: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default Client;
