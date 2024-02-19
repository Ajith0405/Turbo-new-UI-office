import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { List } from "./List";
import { Board } from './Board';

@Entity('card')
export class Card extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    origin_list_title:string

    @Column({
        type:'text',
        default:''
    })
    current_list_title:string

    @Column()
    card_content:string

    @Column({
        type:'text',
        default:''
    })
    card_description:string

    @Column({
        type:'simple-array',
        default:''
    })
    card_activity:string[]

    @Column({
        type:'text',
        default:''
    })
    card_from_date:string

    @Column({
        type:'text',
        default:''
    })
    card_to_date:string

    @Column({
        type:'text',
        default:''
    })
    card_due_date:string

    @CreateDateColumn()
    card_created_at:Date;

    @UpdateDateColumn()
    card_updated_at:Date;

    @Column()
    column_id:number

    @Column()
    card_avatar:string

    @ManyToOne(
        ()=>List,
        list=> list.cards
    )
    @JoinColumn({
        name:'list_id'
    })
    list:List

    @ManyToOne(
        ()=>Board,
        board=>board.cards
    )
    @JoinColumn({
        name:'board_id'
    })
    board:Board


}