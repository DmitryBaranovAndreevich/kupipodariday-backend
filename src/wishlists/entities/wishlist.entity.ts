import { IsDate, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Entity } from 'typeorm';

@Entity()
export class Wishlist {
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

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(0, 1500)
  description: string;

  @Column({
    type:'text',
    array: true
  })
  items: string[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
