import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';

@Entity('evaluations')
class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: string;

  @CreateDateColumn()
  next_date: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client_id: string;
}

export default Evaluation;
