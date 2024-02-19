import express from "express";
import { Card } from "../../entities/Card";

const router = express.Router();

router.put("/updateCardContent/:id", async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    if (!id) {
      return res.status(300).json({
        msg: "Id not available",
      });
    }
    const card = await Card.findOne({ where: { id: parseInt(id) } });
    if (!card) {
      return res.status(300).json({
        msg: "card not available",
      });
    } else {
      card.card_content = content;
    }
  
    await card.save();
    return res.json({
      msg: "Card content updated successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err:"Network error"
    })
  }

 
});

export { router as updateCardContentRouter };
