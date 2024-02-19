import express from 'express';
import { Board } from '../../entities/Board';

const router=express.Router();

router.post('/createBoard', async(req, res)=>{
    try {
        const {boardName} = req.body;

        const board = Board.create({
        board_name:boardName
    })
    await board.save();

    return res.status(200).json({
        msg:"Board successfully created",
        board:board
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:" Network error"
        })
    }
    
})

export {
    router as createBoardRouter
}