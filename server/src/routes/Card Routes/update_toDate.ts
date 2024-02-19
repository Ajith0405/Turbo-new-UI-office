import express from 'express';
import {Card} from '../../entities/Card';

const router = express.Router();

router.put('/updateToDate/:id', async(req,res)=>{
    
    try {
        const id = req.params.id;
        const {toDate} = req.body;
        
        if(!id){
            return res.status(400).json({
                err:"Id not found"
            })
        }
        const card = await Card.findOne({where:{id:parseInt(id)}});
        if(!card){
            return res.status(400).json({
                err:"Card not found"
            })
        }
        card.card_to_date = toDate;
        card.save();
        
        return res.status(200).json({
            msg:"To date updated successfully",
            card:card
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err:'Network error'
        })
    }
   


});

export {router as updateToDateRouter};