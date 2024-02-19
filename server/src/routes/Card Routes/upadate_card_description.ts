import express from 'express';
import { Card } from '../../entities/Card';

const router = express.Router();

router.put('/cardDescriptionUpdate/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const {description} = req.body;
        if(!id){
            return res.status(400).json({
                msg:" card id not provided"
            })
        }
        const card = await Card.findOne({where:{id:parseInt(id)}});

        if(!card){
            return res.status(400).json({
                msg:"crad not found"
            })
        }

        card.card_description = description;

        await card.save();
        return res.status(200).json({
            msg:"description updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(409).json({
            err: "Network error"
        })
    }
    
});

export {router as cardDescriptionUpdateRouter};