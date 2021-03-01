import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('stretching')
class Stretching {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  group: string;
}

export default Stretching;
