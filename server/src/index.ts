import { createConnection } from "typeorm";
import express from 'express'
import cors from 'cors';
import { Board } from "./entities/Board";
import { List } from "./entities/List";
import { Card } from "./entities/Card";
import { createBoardRouter } from "./routes/Board Routes/create_board";
import { deleteBoardRouter } from "./routes/Board Routes/delete_board";
import { getAllBoardsRouter } from "./routes/Board Routes/get_all_boards";
import { getBoardDetailsRouter } from "./routes/Board Routes/get_board_details";
import { createListRouter } from "./routes/List Routes/create_list";
import { getListRouter } from "./routes/List Routes/get_list";
import { updateTitleListRouter } from "./routes/List Routes/update_list_title";
import { deleteListRouter } from "./routes/List Routes/delete_list";
import { createCardRouter } from "./routes/Card Routes/create_card";
import { getCardsRouter } from "./routes/Card Routes/get_cards";
import { cardDeleteRouter } from "./routes/Card Routes/delete_card";
import { updateCardContentRouter } from "./routes/Card Routes/update_card_content";
import { boardNameUpdateRouter } from "./routes/Board Routes/update_board_name";
import { cardDescriptionUpdateRouter } from "./routes/Card Routes/upadate_card_description";
import { cardActivityRouter } from "./routes/Card Routes/update_activity";
import { updateFromDateRouter } from "./routes/Card Routes/update_fromDate";
import { updateToDateRouter } from "./routes/Card Routes/update_toDate";
import { cardListIdUpdateRouter } from "./routes/Card Routes/card_list_id_update";

const app = express();

const whiteList = ['http://127.0.0.1:5050', 'http://localhost:3000','http://127.0.0.1:5432'];

const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};


const main = async()=>{
    try {
         await createConnection({
            type:'postgres',
            host:'localhost',
            port:5432,
            username:'postgres',
            password:'123456',
            database:'TrelloDB',
            entities:[Board,List,Card],
            synchronize:true // which hepls to create table which is provided in entitiy array list

        })
        console.log('connected to postgres...');

        // Middlewares
            app.use(express.json());
            // cors middleware
            app.use(cors(corsOptions));
            // Router middleware
            app.use(createBoardRouter);
            app.use(deleteBoardRouter);
            app.use(getAllBoardsRouter);
            app.use(getBoardDetailsRouter);
            app.use(createListRouter);
            app.use(getListRouter);
            app.use(updateTitleListRouter);
            app.use(deleteListRouter);
            app.use(createCardRouter);
            app.use(getCardsRouter);
            app.use(cardDeleteRouter);
            app.use(updateCardContentRouter);
            app.use(boardNameUpdateRouter);
            app.use(cardDescriptionUpdateRouter);
            app.use(cardActivityRouter);
            app.use(updateFromDateRouter);
            app.use(updateToDateRouter);
            app.use(cardListIdUpdateRouter);
            

        app.listen(5050, ()=>{
                console.log("server Running on 5050");
        })
    } catch (error) {
        console.log(error.message);
    }
};

main();