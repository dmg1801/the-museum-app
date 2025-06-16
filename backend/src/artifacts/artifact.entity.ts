import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artifact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  civilization?: string;

  @Column({ nullable: true })
  age?: string;

  @Column({ nullable: true })
  origin?: string;
}
