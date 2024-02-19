import React, { useState } from "react";
import "./card.css";
import { Id, Task } from "../Types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ImTree } from "react-icons/im";
import { FaPlay } from "react-icons/fa";

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Popover from "@mui/material/Popover";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { format, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";
// Members
import { members } from "../services/members";

// DND
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";

// dialouge box theme
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Props Interface
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  updateActivity: (id: Id, activity: string) => void;
  updateDescription: (id: Id, description: string) => void;
  updateToDate: (id: Id, toDate: string) => void;
  updateFromDate: (id: Id, fromDate: string) => void;
}

// Main
const Card = ({
  task,
  deleteTask,
  updateTask,
  updateActivity,
  updateDescription,
  updateToDate,
  updateFromDate,
}: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [descriptionEditMode, setDescriptionEditMode] =
    useState<boolean>(false);
  const [activityEditMode, setActivityEditMode] = useState<boolean>(false);
  const [activity, setActivity] = useState<string>("");
  const [description, setDescription] = useState<string>(task.card_description);
  const [cardContent, setCardContent] = useState<string>(task.card_content);
  const [fromDate, setFromDate] = useState<string>(task.card_from_date);
  const [toDate, settoDate] = useState<string>(task.card_to_date);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const dueDate: number | undefined = differenceInDays(
    task.card_to_date,
    task.card_from_date
  );

  function formatDateToWords(dateString: string) {
    // Parse the ISO date string into a JavaScript Date object
    const date = parseISO(dateString);

    // Format the date using 'MMMM d, yyyy' format to get the month in words
    return format(date, "dd MMMM , yyyy");
  }

  // Date Dailouge
  const [openDueDate, setOpenDueDate] = React.useState(false);

  const handleClickOpenDueDate = () => {
    setOpenDueDate(true);
  };

  const handleCloseDueDate = () => {
    setOpenDueDate(false);
  };

  // Due Date Popover
  const [anchorElDueDatePop, setAnchorElDueDatePop] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickDueDatePop = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElDueDatePop(event.currentTarget);
  };

  const handleCloseDueDatePop = () => {
    setAnchorElDueDatePop(null);
  };

  const openDueDatePop = Boolean(anchorElDueDatePop);
  const idDueDatePop = openDueDatePop ? "simple-popover" : undefined;

  // Card content update
  const handleCardContentSave = async (id: Id) => {
    if (cardContent.length !== task.card_content.length) {
      await updateTask(id, cardContent);
    }
    setEditMode(false);
    handleMoreClose();
  };

  // Activity Functions
  const handleSaveActivityButton = (id: Id) => {
    updateActivity(id, activity);
    setActivity("");
    setActivityEditMode(false);
  };

  // Description Function
  const handleDescriptionSave = (id: Id) => {
    updateDescription(id, description);
    setDescriptionEditMode(false);
  };
  // upadte from date function
  const handleUpadteFromDate = () => {
    updateFromDate(task.id, fromDate);
  };
  // update to date function
  const hanleUpdateToDate = () => {
    updateToDate(task.id, toDate);
  };

  // Card More Button Declarations
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );
  const openMore = Boolean(anchorElMore);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorElMore(null);
  };

  // Dialouge Box Declarations
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // DND
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="card_main_drag" />;
  }

  if (editMode) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="card_main_drag"
      >
        <textarea
          className="task_edit"
          value={cardContent}
          name="card_content"
          id="card_content"
          autoFocus
          placeholder="Task content here.."
          onBlur={() => handleCardContentSave(task.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => setCardContent(e.target.value)}
        ></textarea>
      </Box>
    );
  }
  return (
    <Box className="card_overall ">
      <Box
        className="card_main p-2 my-1 rounded-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <Box
          onClick={handleClickOpen}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography
            className=" card_content"
            onMouseEnter={() => {
              setMouseIsOver(true);
            }}
          >
            <CheckCircleOutlineIcon sx={{ marginRight: 1.5 }} />
            {task.card_content.length <= 20
              ? task.card_content
              : `${task.card_content.substring(0, 23)}...`}
          </Typography>
          {dueDate && dueDate <= 3 ? (
            <Box>
              <Box className="d-flex align-items-center justify-content-start gap-2 mt-1 ms-1 mb-2">
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ background: "#864AF9" }}
                >
                  High
                </Typography>
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ backgroundColor: "#FF6868" }}
                >
                  Off Track
                </Typography>
              </Box>
            </Box>
          ) : dueDate >= 10 ? (
            <Box>
              <Box className="d-flex align-items-center justify-content-start gap-2 mt-1 ms-1 mb-2">
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ background: "#37B5B6" }}
                >
                  Low
                </Typography>
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ backgroundColor: "#37B5B6" }}
                >
                  On Track
                </Typography>
              </Box>
            </Box>
          ) : dueDate >= 4 && dueDate < 10 ? (
            <Box>
              <Box className="d-flex align-items-center justify-content-start gap-2 mt-1 ms-1 mb-2">
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ background: "orange" }}
                >
                  Medium
                </Typography>
                <Typography
                  className="p-1 rounded-2 due_note"
                  style={{ backgroundColor: "yellow" }}
                >
                  At Risk
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Box
            className="d-flex align-items-center justify-content-between "
            style={{ marginTop: "15px" }}
          >
            <Box className="d-flex align-items-center gap-2">
              <Avatar sx={{ width: 25, height: 25, marginLeft: "5px" }}>
                <img src={task.card_avatar} alt="avatar" />
              </Avatar>
              <Typography style={{ fontSize: "11px", fontWeight: "600", color: "gray" }}>
                {task.card_from_date
                  ? formatDateToWords(task.card_from_date).substring(0, 2)
                  : null}
                {dueDate ? "-" : null}
                {task.card_to_date
                  ? formatDateToWords(task.card_to_date).substring(0, 2)
                  : null}{" "}
                {task.card_to_date
                  ? formatDateToWords(task.card_to_date).substring(3, 6)
                  : null}
              </Typography>
            </Box>
            <Box
              className=" d-flex align-items-center justify-content-around"
              style={{ color: "gray", fontSize: "12px", width: "45px" }}
            >
              <Typography className="mt-1" style={{ fontWeight: "600" }}>
                {dueDate ? dueDate : 0}
              </Typography>
              <ImTree />
              <FaPlay style={{ color: "gray" }} />
            </Box>
          </Box>
        </Box>

        {mouseIsOver && (
          <Box
            id="demo-positioned-button"
            className="card_menu_button"
            aria-controls={openMore ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMore ? "true" : undefined}
            onClick={handleMoreClick}
          >
            <MoreHorizIcon sx={{ padding: 0, margin: 0, borderRadius: 5 }} />
          </Box>
        )}

        {/* More Button  */}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElMore}
          open={openMore}
          onClose={handleMoreClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={toggleEditMode}>
            <EditIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <DeleteIcon />
          </MenuItem>
        </Menu>

        {/* Dailouge box  */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Box className="d-flex align-items-center">
              <CreditCardIcon />
              <Typography
                className="card_content_dailouge ms-2"
                style={{ fontWeight: "600", textTransform: "capitalize" }}
              >
                {" "}
                {task.card_content}
              </Typography>
            </Box>
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              {`origin list : `}{" "}
              <span
                style={{
                  fontWeight: "600",
                  textTransform: "capitalize",
                  color: "blue",
                }}
              >
                {task.origin_list_title}
              </span>{" "}
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              {`current list : `}{" "}
              <span
                style={{
                  fontWeight: "600",
                  textTransform: "capitalize",
                  color: "blue",
                }}
              >
                {" "}
                {task.current_list_title
                  ? task.current_list_title
                  : task.origin_list_title}{" "}
              </span>
            </Typography>
            <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
              {`create on : `}{" "}
              <span style={{ fontWeight: "500" }}>{task.card_created_at}</span>
            </Typography>
            {dueDate ? (
              <Typography style={{ fontSize: "14px" }}>Due Date : {dueDate} days</Typography>
            ) : null}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ width: "650px", height: 450 }}>
            <Box className="row">
              <Box
                className="col-9 rounded"
                style={{ borderRight: "2px solid gray" }}
              >
                <Box className="d-flex">
                  <Typography variant="h6" component="h6">
                    <SubjectIcon /> Description
                  </Typography>
                </Box>
                <Box className="ms-2 mt-2">
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onFocus={() => {
                      setDescriptionEditMode(true);
                    }}
                    placeholder="type here...."
                    className="form-control w-100 px-2 rounded bg-light"
                  />
                  {descriptionEditMode ? (
                    <Box className="d-flex align-items-center">
                      <button
                        onClick={() => handleDescriptionSave(task.id)}
                        className="description_save_button mt-2 me-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setDescriptionEditMode(false)}
                        className="description_cancel_button mt-2"
                      >
                        Cancel
                      </button>
                    </Box>
                  ) : null}
                </Box>
                <Box>
                  <Box className="d-flex mt-2 ">
                    <Typography variant="h6" component="h6">
                      <ChecklistIcon /> Activity
                    </Typography>
                  </Box>
                  <Box className="d-flex mt-2 align-items-center">
                    <Avatar
                      sx={{
                        bgcolor: deepPurple[500],
                        width: 32,
                        height: 32,
                        marginRight: 1,
                      }}
                    >
                      <Typography
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                      >
                        AS
                      </Typography>
                    </Avatar>
                    <Box className="w-100">
                      <input
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        type="text"
                        className="form-control w-100"
                        placeholder="write a comment..."
                        onFocus={() => setActivityEditMode(true)}
                      />
                    </Box>
                  </Box>
                  <Box className="ms-5">
                    {activityEditMode ? (
                      <Box className="d-flex ">
                        <button
                          onClick={() => handleSaveActivityButton(task.id)}
                          className="btn btn-success mt-2 me-3"
                        >
                          save
                        </button>
                        <button
                          onClick={() => setActivityEditMode(false)}
                          className="btn btn-warning mt-2 "
                        >
                          cancel
                        </button>
                      </Box>
                    ) : null}
                  </Box>
                  <Box className="activity_container">
                    {task.card_activity.map((act, index) => (
                      <Box
                        key={index}
                        className="d-flex mt-2 align-items-center"
                      >
                        <Avatar
                          sx={{
                            bgcolor: deepPurple[500],
                            width: 32,
                            height: 32,
                            marginRight: 1,
                          }}
                        >
                          {" "}
                          <Typography
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "12px",
                            }}
                          >
                            AS
                          </Typography>
                        </Avatar>
                        <Typography style={{ fontWeight: 400, fontSize: "14px" }}>
                          {act}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box className="col-3 rounded">
                <Typography
                  style={{
                    fontWeight: "700",
                    color: "black",
                    marginBottom: "5px",
                  }}
                >
                  Add
                </Typography>
                <Box>
                  <Box className="dropdown">
                    <Button
                      variant="contained"
                      className="add_member_button dropdown-toggle d-flex justify-content-start align-items-center"
                      sx={{
                        textTransform: "capitalize",
                        marginBottom: "10px",
                        maxWidth: "130px",
                      }}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <PersonIcon />
                      <Typography className="ms-1">members</Typography>
                    </Button>
                    <ul className="dropdown-menu">
                      {members &&
                        members.map((memb) => (
                          <li key={memb.id} className="members_list">
                            <Box className="dropdown-item d-flex align-items-center">
                              <Avatar>
                                <img
                                  src={memb.avatar_path}
                                  alt={memb.name}
                                  style={{ width: "40px", height: "40px" }}
                                />
                              </Avatar>
                              <Typography> {memb.name}</Typography>
                            </Box>
                          </li>
                        ))}
                    </ul>
                  </Box>

                  <Button
                    variant="contained"
                    className="add_member_button d-flex justify-content-start align-items-center"
                    sx={{
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      minWidth: "130px",
                    }}
                  >
                    <LocalOfferIcon />
                    <Typography className="ms-1">labels</Typography>{" "}
                  </Button>
                  <Button
                    variant="contained"
                    className="add_member_button d-flex justify-content-start align-items-center"
                    sx={{
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      minWidth: "130px",
                    }}
                  >
                    <FormatListBulletedIcon />
                    <Typography className="ms-1">checklist</Typography>{" "}
                  </Button>
                  <Button
                    variant="contained"
                    // onClick={handleClickOpenDueDate}
                    aria-describedby={idDueDatePop}
                    onClick={handleClickDueDatePop}
                    className="add_member_button d-flex justify-content-start align-items-center"
                    sx={{
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      minWidth: "130px",
                    }}
                  >
                    <AccessTimeIcon />
                    <Typography className="ms-1">Due date</Typography>{" "}
                  </Button>
                </Box>
                {/* <div>
                  <h2 style={{fontWeight:700}}>Dates</h2> <hr />
                  <label htmlFor="fromDate" className="form-lable mt-2">From Date</label>
                  <input type="date" className="form-control" id="fromDate" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} onBlur={handleUpadteFromDate}  name="fromDate"/>
                  <label htmlFor="toDate" className="form-lable mt-2">To Date</label>
                  <input type="date" className="form-control" id="toDate"  value={toDate} onChange={(e)=>settoDate(e.target.value)} onBlur={hanleUpdateToDate} name="toDate"/>
                </div> */}
              </Box>
            </Box>
          </DialogContent>
        </BootstrapDialog>
        {/* Date Dailouge */}
        <Dialog
          open={openDueDate}
          onClose={handleCloseDueDate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Select Date</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["StaticDatePicker"]}>
                  <DemoItem label="Static variant">
                    <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleCloseDueDate}>Cancel</Button>
            <Button onClick={handleCloseDueDate} autoFocus>
              Set
            </Button>
          </DialogActions> */}
        </Dialog>
        {/* Due Date PopOver */}
        <Popover
          id={idDueDatePop}
          open={openDueDatePop}
          anchorEl={anchorElDueDatePop}
          onClose={handleCloseDueDatePop}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <div style={{ padding: "10px 20px" }}>
            <div>
              <Typography style={{ fontWeight: 700 }}>Dates</Typography> <hr />
              <label htmlFor="fromDate" className="form-lable mt-2">
                From Date
              </label>
              <input
                type="date"
                className="form-control"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                onBlur={handleUpadteFromDate}
                name="fromDate"
              />
              <label htmlFor="toDate" className="form-lable mt-2">
                To Date
              </label>
              <input
                type="date"
                className="form-control"
                id="toDate"
                value={toDate}
                onChange={(e) => settoDate(e.target.value)}
                onBlur={hanleUpdateToDate}
                name="toDate"
              />
              <div className="mt-2 d-flex justify-content-around">
                <button
                  className="btn btn-primary"
                  onClick={handleCloseDueDatePop}
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </Popover>
      </Box>
    </Box>
  );
};

export default Card;
