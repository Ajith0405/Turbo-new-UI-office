import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";
import { Card } from "./Card";

@Entity('board')
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    board_name:string;

    @CreateDateColumn()
    board_created_at:Date;

    @OneToMany(
        () => List, 
        list => list.board, 
    { cascade: true }
    )
    lists: List[];

    @OneToMany(
        ()=>Card,
        card => card.list
    )
    cards:Card[]

    
}