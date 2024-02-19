import axios from "axios";
import { toast } from "react-toastify";
import { Id } from "../Types/types";
import { format } from "date-fns";

const currentTimeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

// Board API's

// Create Board
export const CreateBoardAPI = async (bName: string) => {
  try {
    const boardN = bName;
    const createBoard = {
      boardName: boardN,
    };
    if (bName !== "") {
      await axios
        .post("http://localhost:5050/createBoard", createBoard)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.msg);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};
// Update Board Name
export const updateBoardTitleAPI = async (
  id: Id | undefined,
  title: string |undefined
) => {
  try {
    if (title !== "") {
      await axios
        .put(`http://localhost:5050/updateBoardName/${id}`, { title })
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.msg);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete Board
export const deleteBoardAPI = async (id: Id | undefined) => {
  try {
    await axios
      .delete(`http://localhost:5050/deleteBoard/${id}`)
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

// List ApI's

// Create List
export const createListAPI = async (id: Id | undefined) => {
  try {
    const listName = `New Column`;
    const boardId = id;
    await axios
      .post("http://localhost:5050/createList", { listName, boardId })
      .then((res) => {
        // console.log(result);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

// Update List Title
export const UpdateListTitleAPI = async (id: Id, title: string) => {
  try {
    if (title !== "") {
      await axios
        .put(`http://localhost:5050/updateListTitle/${id}`, { title })
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.msg);
          // fetchList();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete List
export const deleteListAPI = async (id: Id) => {
  try {
    await axios
      .delete(`http://localhost:5050/deleteList/${id}`)
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

// Card API's
// create card
export const createCardAPI = async (
  columnId: Id,
  columnTitle: string,
  bId: Id | undefined,
  taskName:string,
  taskAvatar:string
) => {
  const listId = columnId;
  // const c_Id = columnId;
  const originListTitle = columnTitle;
  const boardId = bId;
  const cardContent: string = taskName;
  const cardActivity: string = `card created - ${currentTimeStamp}`;
  
  // console.log(c_Id);

  try {
    await axios
      .post("http://localhost:5050/createCard", {
        listId,
        boardId,
        originListTitle,
        cardContent,
        cardActivity,
        taskAvatar
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};
// card activity update
export const updateActivityAPI = async (id: Id, act: string) => {
  try {
    const activity: string = `${act} - ${currentTimeStamp}`;
    if (!id) {
      console.log("card id  on activity update not found");
    }
    if (activity === "") {
      console.log("card activity update is invalid");
      toast.error("card activity update is invalid ");
    }
    if (activity !== "") {
      await axios
        .put(`http://localhost:5050/updateActivity/${id}`, { activity })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};
// card content update
export const cardContentUpadateAPI = async (id: Id, content: string) => {
  try {
    if (content !== "") {
      await axios
        .put(`http://localhost:5050/updateCardContent/${id}`, { content })
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.msg);
          const activity: string = `card content updated `;

          updateActivityAPI(id, activity);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

// card description update
export const cardDescriptionUpdateAPI = async (id: Id, description: string) => {
  try {
    if (id && description !== "") {
      await axios
        .put(`http://localhost:5050/cardDescriptionUpdate/${id}`, {
          description,
        })
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.msg);
          const activity: string = `card description updated `;

          updateActivityAPI(id, activity);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

// card from-date update
export const cardFromDateUpdateAPI = async(id: Id, fromDate: string)=>{
  try {
    if(id && fromDate){
      await axios.put(`http://localhost:5050/updateFromDate/${id}`,{fromDate})
      .then((res)=>{
          console.log(res.data);
          toast.success(res.data.msg)
          const activity:string = `card from-date updated`;
          updateActivityAPI(id,activity);
      })
      .catch((err)=>{
        console.log(err.message)
      })
    }
} catch (error) {
    console.log(error)
}
}

//  card to-date update
export const cardToDateUpdateAPI = async(id: Id, toDate: string)=>{
  try {
    await axios.put(`http://localhost:5050/updateToDate/${id}`,{toDate})
    .then((res)=>{
      console.log(res.data);
      toast.success(res.data.msg);
      const activity:string = "card to-date updated"
      updateActivityAPI(id,activity);
    })
    .catch((err)=>{
      console.log(err);
    })
  } catch (error) { 
      console.log(error);
  }
}

// card delete
export const cardDeleteAPI = async(id:Id)=>{
  try {
    if(id){
      await axios.delete(`http://localhost:5050/deleteCard/${id}`)
      .then((res)=>{
        // console.log(res.data);
        toast.success(res.data.msg);
      })
      .catch((err)=>{
        console.log(err.messsage);
      })
    }
  } catch (error) {
    console.log(error);
  }
}
