import { IsDate, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, Entity, OneToMany, ManyToOne } from 'typeorm';

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

  @OneToMany(() => Wish, (wish) => wish.id)
  @JoinColumn()
  items: Wish

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
