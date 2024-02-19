import express from 'express';
import { Card } from '../../entities/Card';

const router = express.Router();

    router.put('/updateActivity/:id', async(req,res)=>{
        try {
            const id = req.params.id;
            const {activity} = req.body;

            if(!id){
                return res.status(400).json({
                    err: "id not found"
                })
            }

            const card = await Card.findOne({where:{id:parseInt(id)}});

            if(!card){
                return res.status(400).json({
                    err:"Card not found"
                })
            }

            card.card_activity.unshift(activity);

            await Card.save(card);

            return res.status(200).json({
                msg:"Activity added successfully",
                card:card
            })

        } catch (error) {
            console.log(error);
            return res.status(404).json({
                err:"Network error"
            })
        }
    });

    export {router as cardActivityRouter};