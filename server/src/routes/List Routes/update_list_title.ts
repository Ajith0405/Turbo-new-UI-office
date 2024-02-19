import express from "express";
import { List } from "../../entities/List";

const router = express.Router();

router.put("/updateListTitle/:id", async (req, res) => {
  const listId = req.params.id;
  const { title } = req.body;
  try {
    const listToUpdate = await List.findOne({
      where: { id: parseInt(listId) },
    });

    if (!listToUpdate) {
      return res.status(404).json({ message: "List not found" });
    } 
      listToUpdate.list_title = title;
      await listToUpdate.save();
      return res.status(200).json({
        msg:"List title updated successfully",
        list:listToUpdate
      })
    

  } catch (error) {
    return res.status(500).json({
      err:"Network error"
    })
  }
});

export { router as updateTitleListRouter };
