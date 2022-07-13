import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ type: 'int', nullable: false })
  postal_code: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'bigint', nullable: false })
  contact_number: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;
}
