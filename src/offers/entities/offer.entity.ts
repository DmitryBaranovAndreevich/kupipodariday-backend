import { IsDate, IsFQDN } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, Entity } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'int',
    array: true,
  })
  @ManyToMany(() => User, (user) => user.id)
  user: User[];

  @Column()
  @IsFQDN()
  item: string;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  amount: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  hidden: boolean;
}
