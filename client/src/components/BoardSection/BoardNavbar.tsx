import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import SearchIcon from "@mui/icons-material/Search";
import { MdInfoOutline } from "react-icons/md";
import { RxStarFilled } from "react-icons/rx";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { PiShare } from "react-icons/pi";

import './boardNavbar.css'
import { Avatar, AvatarGroup, Button, InputBase, Stack, Tooltip, alpha } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import MenuNavbar from './MenuNavbar';
import BoardSubNavbar from './BoardSubNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';


import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';

import ColumnContainer from "../ColumnContainer";
import { Board, Column, Id, Task } from '../../Types/types';

// DND
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "../Card";

import { UpdateListTitleAPI, cardContentUpadateAPI, cardDeleteAPI, cardDescriptionUpdateAPI, cardFromDateUpdateAPI, cardToDateUpdateAPI, createCardAPI, createListAPI, deleteBoardAPI, deleteListAPI, updateActivityAPI, updateBoardTitleAPI } from "../../services/API";
import { format } from "date-fns";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop:'30px',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Search = styled("div")(({ theme }) => ({

  position: "relative",
  border:'1px solid gray',
  borderRadius:'10px',
  backgroundColor: 'whitesmoke',
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "18ch",
      },
    },
  },
}));



// Main
export default function BoardNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [boardDetails, setBoardDetails] = React.useState<Board>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { id } = useParams();
  let boardId =id;
 
   
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // fetch Board details
  const getBoardDetails = async () => {
    await axios
      .get(`http://localhost:5050/getBoardDetails/${id}`)
      .then((res) => {
        console.log(res.data);
        setBoardDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  // fetch Lists
  const fetchList =async ()=>{
    await axios
      .post("http://localhost:5050/getList", { boardId })
      .then((res) => {
        // console.log(res.data)
        // const
        const collect_list_data: Column[] = [];
        res.data.forEach((data: any) => {
          collect_list_data.push({
            id: data.id,
            list_title: data.list_title,
            board_id: data.board.id,
          });
        });
        setColumns([...collect_list_data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  

  // fetch Cards
  const fetchCards =async()=>{
    await axios
      .get(`http://localhost:5050/getCards/${boardId}`)
      .then((res) => {
        const cardsDataArray:Task[]=[];
        res.data.forEach((data:any)=>{
            cardsDataArray.push({
              id: data.id,
              list_id: data.column_id,
              board_id: data.board.id,
              origin_list_title: data.list.list_title,
              current_list_title: data.current_list_title,
              card_content:data.card_content,
              card_description: data.card_description,
              card_activity: data.card_activity,
              card_from_date:data.card_from_date,
              card_to_date: data.card_to_date,
              card_due_date:data.card_due_date,
              card_created_at:data.card_created_at,
              card_updated_at: data.card_updated_at,
              card_avatar:data.card_avatar
            })
        })
        setTasks([...cardsDataArray]);
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
  useEffect(() => {
      getBoardDetails();
      fetchList();
      fetchCards();

  }, []);


  // Board 
//   const updateBoardTitle = async(id:Id|undefined, title:string|undefined)=>{
//       await updateBoardTitleAPI(id,title);
//       getBoardDetails();
//   }

//   const deleteBoard = async(id:Id | undefined)=>{
//      await deleteBoardAPI(id);
//     getBoardDetails();
//   }

  // List Functions
  const createNewColumn = async () => {
     await createListAPI(boardId)
     fetchList();
  };

  const updateColumn = async (id: Id, title: string) => {
     await UpdateListTitleAPI(id, title);
     fetchList();
  };
  const deleteColumn = async (id: Id) => {
    await deleteListAPI(id);
    fetchList()
  };

  // Card Functions
  const createTask = async (columnId: Id, columnTitle: string, taskName:string, taskAvatar:string) => {
     await createCardAPI(columnId, columnTitle , boardDetails?.id , taskName, taskAvatar)
      fetchCards();
     
  };
  const updateTask = async(id: Id, content: string)=>{
      await cardContentUpadateAPI(id,content);
      fetchCards()
  }

  const deleteTask = async (id: Id)=>{
      await cardDeleteAPI(id);  
      fetchCards();
  }
  // Activity Functions
 const updateActivity = async(id: Id, activity: string)=>{
      updateActivityAPI(id,activity);
      fetchCards()
  }

  //  Description function
  const updateDescription = async(id: Id, description: string)=>{
    await cardDescriptionUpdateAPI(id,description);
    fetchCards();
  }

  // updateFromDate function
  const updateFromDate = async (id: Id, fromDate: string)=>{
    await cardFromDateUpdateAPI(id,fromDate);
    fetchCards();
  }
  // updateToDate Function
  const updateToDate = async (id: Id, toDate: string)=>{
      await cardToDateUpdateAPI(id, toDate);
      fetchCards();
  }

  // DND Functions
  function onDragStart(event: DragStartEvent) {
    // column
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    // task
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;
    // console.log(active, "#active");
    // console.log(over, "#over");
    const activeId = active.id;
    const overId = over.id;
    // console.log(activeId);
    // console.log(overId);

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      // console.log(activeColumnIndex);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      // console.log(overColumnIndex);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  // Task 
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    // console.log(active,"#active");
    // console.log(over,"#over")

    const activeId = active.id;
    const overId = over.id;
    

    if (activeId === overId) return;
    // console.log(activeId,"#activeId")
    // console.log(overId,"#overId")

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";


    // console.log(isActiveATask, "#isActiveTask");

    // console.log(isOverATask);

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      // console.log(isActiveATask,'#isActiveTask');
      // console.log(isOverATask,'#isOverTask')
      
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        // console.log(activeIndex,"#activeIndex")
        // console.log(activeIndex,"#OverIndex")

        if (tasks[activeIndex].list_id !== tasks[overIndex].list_id) {
          
          tasks[activeIndex].list_id = tasks[overIndex].list_id;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    const isOverColumnTitle = over.data.current?.column?.title;
    // console.log(isOverColumnTitle,"#overColumn")

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
        // console.log(isActiveATask,"#activeTask");
        // console.log(isOverAColumn,"#OverColumn");
        const cardId = active.id;
        const currentListTitle = active.data.current?.task?.current_list_title
        // const activiveListTitle = active
        const listId = over.id;
        const listTitle =over.data.current?.column?.list_title;
        // console.log(cardId);
        // console.log(listId);
        if(currentListTitle !== listTitle ){
        const CardListIdUpdate = async()=>{
          try {
           await axios.put(`http://localhost:5050/cardListIdUpdate/${cardId}`,{listId, listTitle})
            .then((res)=>{
              console.log(res.data)
              fetchCards();
            })
            .catch((err)=>{
              console.log(err)
            })
          } catch (error) {
            console.log(error);
          }

        }
        CardListIdUpdate();
      }

      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks.find((t) => t.id === activeId);
        let activeTaskColumnTitle = activeTask?.origin_list_title;
        // console.log(activeTaskColumnTitle,"#active column title");
        // console.log(isOverColumnTitle,"isOver column title");
        if (activeTaskColumnTitle) {
          tasks[activeIndex].current_list_title = isOverColumnTitle;
        }

        tasks[activeIndex].list_id = overId;
        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  // ---------------------


// Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 
   // Board 
   const updateBoardTitle = async(id:Id|undefined, title:string|undefined)=>{
    await updateBoardTitleAPI(id,title);
    getBoardDetails();
}

const deleteBoard = async(id:Id | undefined)=>{
   await deleteBoardAPI(id);
  getBoardDetails();
}


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'whitesmoke'}}>
        <Toolbar className='row'>
          <Box className="col-12 col-sm-7 col-md-7 col-lg-5   text-dark d-flex align-items-center ">
                <Box sx={{minHeight:'50px', maxHeight:'50px'}}>
                  <Button 
                    variant='contained'
                   aria-label="open drawer"
                   onClick={handleDrawerOpen}
                   sx={{minHeight:'50px',maxHeight:'50px', borderRadius:'10px', minWidth:'50px', maxWidth:'50px'}}
                  
                  //  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                    <HiBars3CenterLeft  size={'45px'} />
                  </Button>
                </Box>
                <Box className="ms-3">
                  <Box className="board_head_title d-flex align-items-center justify-content-center">
                  <Typography variant='h6' style={{fontWeight:'600',fontSize:'17px'}}>Customer Stories - Q4</Typography>
                  <Box className="board_head_actions ms-3 d-flex align-items-center">
                      <KeyboardArrowDownIcon className="title_actions" style={{color:'gray',fontSize:'19px'}}/>
                      <MdInfoOutline  className="title_actions" style={{color:'gray',marginLeft:'5px'}} size={'18px'}/>
                      <RxStarFilled  className="title_actions" style={{color:'#1D24CA', marginLeft:'8px'}} size={'18px'}/>
                  </Box>
                </Box>
                <Box className="text-start d-flex align-items-center">
                  <Box className="board_head_dot"></Box>
                  <Typography component='p' style={{color:'gray',fontWeight:'600',marginLeft:'10px', fontSize:'12px'}}>On Track</Typography>
                </Box>
                </Box>
          </Box>
          <Box className='col-12 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-around align-items-center d-none d-lg-flex'>
            <AvatarGroup total={15}  >
              <Avatar className="avatar_group" alt="Remy Sharp" src="https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph" />
              <Avatar className="avatar_group" alt="Travis Howard" src="https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph" />
              <Avatar className="avatar_group" alt="Agnes Walker" src="https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph" />
              <Avatar  className="avatar_group"  alt="Trevor Henderson" src="https://img.freepik.com/premium-photo/cartoon-character-with-blue-shirt-glasses_561641-2088.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph" />
            </AvatarGroup>
            <Box>
            <Tooltip title="share">
            <Button className='d-flex share_btn' sx={{border:'1px solid gray', borderRadius:'10px'}}>
              <PiShare size={'15px'} color='black'/> <Typography sx={{textTransform:'capitalize', color:'black', fontSize:'12px',marginLeft:'5px'}}>Share</Typography>
            </Button>
            </Tooltip>
            </Box>
          </Box>
          <Box className="col-12 col-sm-4 col-md-4 col-lg-4 d-flex align-items-center justify-content-center  d-none d-sm-flex d-md-flex d-lg-flex">
            {/* Search Input */} 
            <Box>
            <Search className="">
              <SearchIconWrapper>
                <SearchIcon sx={{color:'black'}} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{color:'black'}}
              />
            </Search>
            </Box>
            <Box className="">
            <Stack className="stack_navbar_right" direction="row" spacing={2}>
              {/* Notification Icon */}
              <Tooltip title="notification">
                <NotificationsNoneIcon
                  sx={{ width: 30, height: 30, color:'black'}}
                  className="notification_icon"
                />
              </Tooltip>
              {/* Helpout Icon */}
              <Tooltip title="Help">
                <HelpOutlineIcon
                  sx={{ width: 30, height: 30, color:'black' }}
                  className="helpout_icon"
                />
              </Tooltip>
              {/* User Avatar */}
              <Tooltip title="Account">
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}
                  className="user_avatar_logo"
                >
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight:'600',
                      fontSize: "12px",
                    }}
                  >
                    AS
                  </Typography>
                </Avatar>
              </Tooltip>
            </Stack>

            </Box>
          </Box>
          <Box sx={{marginTop:'5px'}}>
          <MenuNavbar/>
          </Box>
          <Box>
            <BoardSubNavbar
              boardId={boardId}
              updateBoardTitle={updateBoardTitle}
              deleteBoard={deleteBoard}
      
            />
          </Box>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
        <div className="board_main">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="column_holder_main">
            <div className="column_holder d-flex  g-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                    tasks={tasks.filter((task) => task.list_id === col.id)}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                ))}
              </SortableContext>
              <Box className="add_column_button">
                <button
                  className="add_list_button"
                  type="button"
                  onClick={() => {
                    createNewColumn();
                  }}
                >
                  <Typography>Untitled section</Typography>
                  <AddCircleOutlineIcon/>
                </button>
                <Box className="add_task_card p-2 rounded-3">
                  <Box style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                  <AddCircleOutlineIcon/>
                    <Typography className="ps-2" style={{fontWeight:'600'}}>Add Task</Typography>
                  </Box>
                </Box>
              </Box>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <div className="drag_overley">
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    tasks={tasks}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                </div>
              )}
              {activeTask && (
                <div className="car_drag_overley">
                  <Card
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
        </Box>
      </Main>
    </Box>
  );
}
