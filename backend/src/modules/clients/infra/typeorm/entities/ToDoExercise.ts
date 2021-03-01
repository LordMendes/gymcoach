import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Column,
  JoinColumn,
} from 'typeorm';

import Record from './Record';
import Exercise from './Exercise';

@Entity('to_do_exercise')
class ToDoExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  load: number;

  @Column()
  repetitions: number;

  @Column()
  note: string;

  @ManyToMany(() => Record)
  @JoinColumn({ name: 'record_id' })
  record_id: string;

  @ManyToMany(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise_id: number;
}

export default ToDoExercise;
