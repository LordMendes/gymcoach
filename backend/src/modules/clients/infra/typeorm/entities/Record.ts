import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import Instructor from '@modules/instructors/infra/typeorm/entities//Instructor';
import Client from '@modules/clients/infra/typeorm/entities/Client';

@Entity('records')
class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: boolean;

  @Column()
  cicle: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  next_date: Date;

  @Column()
  goal: string;

  @ManyToMany(() => Client)
  @JoinColumn({ name: 'client_id' })
  clients_id: string;

  @ManyToOne(() => Instructor, instructor => instructor.records)
  @JoinColumn({ name: 'instructor_id' })
  instructor_id: string;
}

export default Record;
