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
  gender: string;

  @CreateDateColumn()
  birthdate: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

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
