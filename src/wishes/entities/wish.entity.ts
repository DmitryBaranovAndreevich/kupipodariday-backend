import { IsDate, IsFQDN, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from 'typeorm';

@Entity()
export class Wish {
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
  @IsFQDN()
  link: string;

  @Column()
  @IsFQDN()
  image: string;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  price: number;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  raised: number;

  @Column()
  @OneToOne(() => User, (user) => user.id)
  owner: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column({
    type: 'int',
    array: true,
  })
  @OneToMany(() => Offer, (offer) => offer.id)
  offers: number[];

  @Column()
  cpoied: number;
}
