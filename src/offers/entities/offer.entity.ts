import { IsDate, IsFQDN } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

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

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @JoinColumn()
  item: Wish;

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

  @Column()
  user: number;

  @Column()
  name: string;
}
