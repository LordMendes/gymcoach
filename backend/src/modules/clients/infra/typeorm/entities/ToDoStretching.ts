import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import Record from './Record';
import Stretching from './stretching';

@Entity('to_do_stretching')
class ToDoStretching {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: number;

  @ManyToMany(() => Stretching)
  @JoinColumn({ name: 'stretching_id' })
  stretching_id: number;

  @ManyToMany(() => Record)
  @JoinColumn({ name: 'record_id' })
  record_id: string;
}

export default ToDoStretching;
