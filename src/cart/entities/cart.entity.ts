import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    userId: number;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
    cartItems: CartItem[];
}
