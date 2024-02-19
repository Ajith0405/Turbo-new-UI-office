import express from 'express';
import { Card } from '../../entities/Card';

const router = express.Router();

router.put('/updateFromDate/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const {fromDate} = req.body;

        if(!id){
            return res.status(400).json({
                err:"card id not found"
            })
        }
        if(!fromDate){
            return res.status(400).json({
                err:"from date is invalid"
            })
        }
        const card = await Card.findOne({where:{id:parseInt(id)}});

        if(!card){
            return res.status(400).json({
                err:"Card not found"
            })
        }
        card.card_from_date = fromDate

        await card.save();

        return res.status(200).json({
            msg:"from date updated sucessfully",
            card:card
        })
        
    } catch (error) {
            console.log(error);
            return res.json({
                err:"Network error"
            })        
    }
});

export {router as updateFromDateRouter}