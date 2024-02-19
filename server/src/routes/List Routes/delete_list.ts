import express from 'express';
import { List } from '../../entities/List';
import { Card } from '../../entities/Card'

const router = express.Router();

router.delete('/deleteList/:id', async (req, res)=>{
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ error: "List ID not provided" });
        }

        // Find the list
        const list = await List.findOne({ where: { id: parseInt(id) } });
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }

        // Delete associated cards first
        await Card.delete({ list: list }); // Assuming 'list' is the property name in the Card entity that references the list

        // Now delete the list
        await List.delete(id);
        
        return res.json({ msg: "List deleted successfully" });
    } catch (error) {
        console.error("Error deleting list:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

export {
    router as deleteListRouter
}