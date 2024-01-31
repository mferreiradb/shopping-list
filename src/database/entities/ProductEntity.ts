import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity('product')
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('numeric')
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}