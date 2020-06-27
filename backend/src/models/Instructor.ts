import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import Record from './Record';

@Entity('instructor')
class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: string;

  @OneToMany(() => Record, record => record.instructor_id)
  records: Record[];
}

export default Instructor;
