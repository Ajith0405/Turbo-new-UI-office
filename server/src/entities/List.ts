import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from './Board';
import { Card } from "./Card";

@Entity('list')
export class List extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number


    @Column()
    list_title:string

    @ManyToOne(
        ()=>Board,
        board =>board.lists
    )
    @JoinColumn({
        name:'board_id'
    })
    board:Board

    @OneToMany(
        ()=>Card,
        card => card.list
    )
    cards:Card[]


}