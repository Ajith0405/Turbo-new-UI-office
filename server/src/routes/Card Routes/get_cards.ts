import express from 'express';
import { Card } from '../../entities/Card';

const router = express.Router();

router.get('/getCards/:boardId', async (req, res)=>{

        const boardId = req.params.boardId;
        try {
            const card = await Card.find({where:{board:{id:parseInt(boardId)}},relations:{list:true, board:true}});
            return res.json(card);   
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                err:"Network error"
            })
        }
})

export { router as getCardsRouter };