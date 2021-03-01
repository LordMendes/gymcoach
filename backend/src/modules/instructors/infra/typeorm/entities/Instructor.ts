import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Record from '@modules/clients/infra/typeorm/entities/Record';

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
