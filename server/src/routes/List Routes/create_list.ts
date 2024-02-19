import express from "express";
import { List } from "../../entities/List";
import { Board } from "../../entities/Board";

const router = express.Router();

router.post("/createList", async (req, res) => {
  const { listName, boardId } = req.body;
  try {
    const getBoard = await Board.findOne({ where: { id: boardId } });

    // console.log(getBoard);

    const list = List.create({
      list_title: listName,
      board: getBoard as Board,
    });
    await list.save();

    return res.json({
      msg:"List created successfully",
      list:list
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      err: "Network error",
    });
  }
});

export { router as createListRouter };
