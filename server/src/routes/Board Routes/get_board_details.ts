import express from "express";
import { Board } from "../../entities/Board";

const router = express.Router();

router.get("/getBoardDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        msg: "id is not provided",
      });
    }
    const board = await Board.findOne({ where: { id: parseInt(id) } });
    return res.json(board);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        err:"Network error"
    })
  }
});

export { router as getBoardDetailsRouter };
