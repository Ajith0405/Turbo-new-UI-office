import express from 'express';
import { Board } from '../../entities/Board';

const router=express.Router();

router.get('/getAllBoards', async(req, res)=>{
    try {
        const board = await Board.find();
        return res.json(board);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: "Network error"
        })
    }

    
})

export {
    router as getAllBoardsRouter
}