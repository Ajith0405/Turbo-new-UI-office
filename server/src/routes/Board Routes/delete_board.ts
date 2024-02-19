import express from 'express';
import { Board } from '../../entities/Board';
import { List } from '../../entities/List';
import { Card } from '../../entities/Card';

const router=express.Router();

router.delete('/deleteBoard/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        if (!id) {
            return res.status(400).json({ error: "Board ID not provided" });
        }
        // Find the Board
        const board = await Board.findOne({ where: { id: parseInt(id) } });
        if (!board) {
            return res.status(404).json({ error: "List not found" });
        }
        // Delete associated 
        await Card.delete({board:board});
        await List.delete({ board: board }); 
        
        await Board.delete(parseInt(id));
        return res.json({
            msg: "Board deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Cannot delete board due to foreign key constraint violation"
        });
    }
})

export {
    router as deleteBoardRouter
}