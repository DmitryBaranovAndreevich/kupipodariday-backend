import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Length, IsEmail, IsDate, IsFQDN } from 'class-validator';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';


@Entity()
export class User {
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
    length: 30,
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    type: 'text',
    default: 'https://i.pravatar.cc/300',
  })
  @IsFQDN()
  avatar: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'int',
    array: true,
  })
  @OneToOne(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: number[];

  @ManyToMany(() => Offer)
  @JoinColumn()
  country: Offer;
}
