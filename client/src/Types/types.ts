export type Id = string | number;

export type Board ={
    id:Id;
    board_name:string,
    board_created_at:string
}

export type Column ={
    id:Id;
    list_title:string;
    board_id:number;
}

export type Task={
    id:Id;
    list_id:Id;
    board_id:Id;
    current_list_title:string;
    origin_list_title:string;
    card_content:string;
    card_description:string;
    card_activity:string[];
    card_from_date:string;
    card_to_date:string;
    card_due_date:string;
    card_created_at:string;
    card_updated_at:string;
    card_avatar:string
}