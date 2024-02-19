import express from "express";
import { List } from "../../entities/List";

const router = express.Router();

router.post("/getList", async (req, res) => {
  const { boardId } = req.body;
  try {
    const getLists = await List.find({
      where: { board: { id: parseInt(boardId) } },
      relations: { board: true },
    });

    // console.log("getLists ",getLists);

    return res.json(getLists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "Network error",
    });
  }
});

export { router as getListRouter };
