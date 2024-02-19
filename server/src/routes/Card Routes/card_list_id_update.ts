import express from 'express';
import {Card} from '../../entities/Card';

const router = express.Router();

router.put('/cardListIdUpdate/:id', async(req,res)=>{
        try {
            const id = req.params.id;
            const {listId, listTitle} = req.body;

            if(!id){
                return res.status(400).json({
                    err:"Card id not found"
                })
            }
            const card = await Card.findOne({where:{id:parseInt(id)}});
            if(!card){
                return res.status(400).json({
                    err:"Card not found"
                })
            }
            card.column_id = listId;
            card.current_list_title = listTitle;

            await Card.save(card);
            return res.status(200).json({
                msg:"Card list changed"
            })
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                err:"NetWork error"
            })
        }
});

export { router as cardListIdUpdateRouter};