import React, { useMemo, useState } from "react";
import "./columnContainer.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import Popover from "@mui/material/Popover";

import Card from "./Card";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Column, Id, Task } from "../Types/types";

import { members } from "../services/members";

// DND
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Box, Input, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  column: Column;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
  tasks: Task[];
  createTask: (
    columnId: Id,
    columnTitle: string,
    taskName: string,
    taskAvatar: string
  ) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  updateActivity: (id: Id, activity: string) => void;
  updateDescription: (id: Id, description: string) => void;
  updateToDate: (id: Id, toDate: string) => void;
  updateFromDate: (id: Id, fromDate: string) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ColumnContainer = ({
  column,
  updateColumn,
  deleteColumn,
  tasks,
  createTask,
  deleteTask,
  updateTask,
  updateActivity,
  updateDescription,
  updateFromDate,
  updateToDate,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(column.list_title);
  const [cardName, setCardName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph"
  );

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const ariaLabel = { "aria-label": "description" };

  // Add Task Popover

  const [anchorElAddTask, setAnchorElAddTask] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickAddTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAddTask(event.currentTarget);
  };

  const handleCloseAddTask = () => {
    setAnchorElAddTask(null);
  };

  const openAddTask = Boolean(anchorElAddTask);
  const idAddTask = openAddTask ? "simple-popover" : undefined;


  // CardSubmit
  const handleCardSubmitButton = async () => {
    if(cardName !==''){
      await createTask(column.id, column.list_title, cardName, selectedAvatar);
      handleCloseAddTask();
      setCardName('');
      setSelectedAvatar(
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph"
      );
    }else{
      toast.error('Please fill card name');
    }
  };

  // Avatar Select
  const [anchorElAvatarDd, setAnchorElAvatarDd] =
    React.useState<null | HTMLElement>(null);
  const openAvatarDd = Boolean(anchorElAvatarDd);

  const handleClickAvatarDd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAvatarDd(event.currentTarget);
  };
  const handleCloseAvatarDd = () => {
    setAnchorElAvatarDd(null);
  };

  const handleSeletedAvatar = (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
    handleCloseAvatarDd();
    // console.log(avatarPath);
    // console.log(cardName)
  };

  // Column More Button
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Title update function
  const handleTitleSave = (id: Id) => {
    updateColumn(id, title);
    setEditMode(false);
  };

  // Delete Column
  function handleMoreColumnDelete(id: Id) {
    deleteColumn(id);
  }

  // DND

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="main_column_overley opacity-50"
      ></div>
    );
  }
  return (
    <div className="main_column" ref={setNodeRef} style={style}>
      {/* column Title */}
      <div
        className="column_header d-flex justify-content-between align-items-center mt-2 mb-2 "
        {...attributes}
        {...listeners}
      >
        <div
          onClick={() => {
            setEditMode(true);
          }}
          className="column_title"
        >
          {!editMode && column.list_title}
          {editMode ? (
            <Box>
              <input
                className="column_title_input"
                name="list_title"
                id="list_title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
                onBlur={() => handleTitleSave(column.id)}
              />
            </Box>
          ) : null}
        </div>
        <Box className="d-flex align-items-center">
          <AddCircleOutlineIcon className="column_title_add_btn" />
          <button
            type="button"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon
              sx={{ width: 30, height: 30 }}
              className="column_more_button"
            />
          </button>
        </Box>

        {/* column more menu model */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleMoreColumnDelete(column.id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      {/* column content */}
      <Box className="column_content ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              updateActivity={updateActivity}
              updateDescription={updateDescription}
              updateFromDate={updateFromDate}
              updateToDate={updateToDate}
            />
          ))}
        </SortableContext>
      </Box>

      {/* column footer */}
      <Box className="add_card_button ">
        <Button
          sx={{color:'black'}}
          className="add_button"
          type="button"
          aria-describedby={idAddTask}
          onClick={handleClickAddTask}
          // onClick={handleClickOpenCardAdd}
        >
          <AddCircleOutlineIcon />
          <Typography className="ps-2" style={{ fontWeight: "600" }}>
            Add Task
          </Typography>
        </Button>
      </Box>
      {/* Add Task Popover */}
      <Popover
        id={idAddTask}
        open={openAddTask}
        anchorEl={anchorElAddTask}
        onClose={handleCloseAddTask}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div>
          <DialogContent sx={{padding:'10px 30px'}}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 0 },
                padding:'0'
              }}
              noValidate
              autoComplete="off"
            >
              <Input
                className="mb-2"
                placeholder="Card Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                inputProps={ariaLabel}
              />
              {members ? (
                <div>
                  <div className="d-flex">
                    <Button
                      sx={{marginRight:'5px'}}
                      id="basic-button"
                      aria-controls={openAvatarDd ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openAvatarDd ? "true" : undefined}
                      onClick={handleClickAvatarDd}
                    >
                      Select Avatar
                    </Button>
                    <Avatar>
                      <img src={selectedAvatar} alt="defaultAvatar" width={'40px'} height={'40px'} />
                    </Avatar>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorElAvatarDd}
                    open={openAvatarDd}
                    onClose={handleCloseAvatarDd}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {members.map((memb) => (
                      <MenuItem
                        key={memb.id}
                        onClick={() => handleSeletedAvatar(memb.avatar_path)}
                      >
                        {" "}
                        <Avatar sx={{ marginRight: "5px" }}>
                          <img src={memb.avatar_path} alt={memb.name} width={'40px'} height={'40px'} />
                        </Avatar>
                        <Typography> {memb.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : null}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCardSubmitButton}>Submit</Button>
            <Button onClick={handleCloseAddTask}>Cancel</Button>
          </DialogActions>
        </div>
      </Popover>
      
    </div>
  );
};

export default ColumnContainer;
