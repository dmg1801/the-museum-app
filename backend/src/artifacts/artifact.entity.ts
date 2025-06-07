import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artifact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}
