import express from "express";
import { Board } from "../../entities/Board";

const router = express.Router();

router.put("/updateBoardName/:id", async (req, res) => {
  const boardId = req.params.id;
  const { title } = req.body;

  try {
    const board = await Board.findOne({ where: { id: parseInt(boardId) } });

    if (!board) {
      return res.status(404).json({
        msg: "Board not found",
      });
    }
    board.board_name = title;

    await board.save();

    return res.status(200).json({
      msg: "Board name updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export { router as boardNameUpdateRouter };
