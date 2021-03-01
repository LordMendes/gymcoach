import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exercises')
class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  muscular_group: string;

  @Column()
  equipment: string;

  @Column()
  description: string;
}

export default Exercise;
