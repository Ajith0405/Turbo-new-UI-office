import express from 'express';
import { Card } from '../../entities/Card';

const router = express.Router();

router.delete('/deleteCard/:id', async (req, res)=>{
    const id = req.params.id;

    try {

        if(!id){
            return res.status(400).json({
                error:" Card id not provided"
            })
        }
        const card = await Card.findOne({where:{id:parseInt(id)}});
        if(!card){
            return res.status(400).json({
                error:"Card not found"
            })
        }
        await Card.delete(id);
        return res.json({
            msg: "Card deleted successfully"
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }

})

export { router as cardDeleteRouter}
