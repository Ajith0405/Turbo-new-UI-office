import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GroupIcon from "@mui/icons-material/Group";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./boardSubNavbar.css";

import { Board, Id } from "../../Types/types";
import axios from "axios";

interface Props {
  boardId: Id | undefined;
  updateBoardTitle: (id: Id | undefined, title: string | undefined) => void;
  deleteBoard: (id: Id | undefined) => void;
}

const SubNavbar = ({ boardId, deleteBoard, updateBoardTitle }: Props) => {
  const [boardInitalName, setBoardInitialName] = useState("");
  const [boardDetails, setBoardDetails] = useState<Board>();
  const [boardTitle, setBoardTitle] = useState<string>(boardInitalName);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [anchorElBoardMenu, setAnchorElBoardMenu] =
    React.useState<null | HTMLElement>(null);
  const openBoardMenu = Boolean(anchorElBoardMenu);
  const navigate = useNavigate();

  const handleClickBoardMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBoardMenu(event.currentTarget);
  };
  const handleCloseBoardMenu = () => {
    setAnchorElBoardMenu(null);
  };

  const getBoardDetails = async () => {
    try {
      await axios
        .get(`http://localhost:5050/getBoardDetails/${boardId}`)
        .then((res) => {
          // console.log(res.data);
          setBoardDetails(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletBoard = async () => {
    const id: Id | undefined = boardId;
    await deleteBoard(id);
    handleCloseBoardMenu();
    navigate("/");
  };

  const handleBoardNameUpdate = async () => {
    setEditMode(false);
    const id = boardId;
    const title = boardTitle;
    console.log(boardDetails?.board_name.length);
    console.log(boardTitle?.length);
    if (boardDetails?.board_name.length !== boardTitle?.length) {
      await updateBoardTitle(id, title);
      getBoardDetails();
    }
  };

  useEffect(() => {
    const getBoardDetail = async () => {
      await getBoardDetails();
      if (boardDetails?.board_name !== undefined)
        setBoardInitialName(boardDetails.board_name);
    };
    getBoardDetail();
  }, []);

  return (
    <div style={{backgroundColor:'whitesmoke', width:'100%'}}>
      <Box >
          <Toolbar className="row">
            <div className="col-6 col-md-6 col-lg-6 d-flex align-items-center">
              <div className="row ">
                <div className="col-6 col-md-6 col-lg-6 d-flex align-items-center ">
                  <Link to={"/"}>
                    <Button
                      className="back_button"
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        padding: "5px 5px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        minWidth: 0,
                      }}
                    >
                      <ArrowBackIcon
                        sx={{ color: "white" }}
                        className="back_button_arrow"
                      />
                    </Button>
                  </Link>
                  {/* Board Name */}
                  <div onClick={() => setEditMode(true)}>
                    {!editMode ? (
                      <Typography
                        className="board_title"
                        style={{ fontWeight: "700", color: "black" }}
                      >
                        {" "}
                        {boardDetails?.board_name}
                      </Typography>
                    ) : null}
                    {editMode ? (
                      <div>
                        <input
                          type="text"
                          value={boardTitle}
                          className="w-100 bg-light px-1 py-1 board_title_edit"
                          onBlur={handleBoardNameUpdate}
                          onChange={(e) => setBoardTitle(e.target.value)}
                          autoFocus
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <Box className="col-6 col-md-6 col-lg-6 ">
                  {/* Left side icons */}
                  <Box >
                    <Stack
                      direction="row"
                      style={{ display: "flex", alignItems: "center" }}
                      spacing={2}
                    >
                      <StarBorderIcon
                        sx={{ height: 25, width: 25, color: "black" }}
                        className="start_bord_icon"
                      />
                      <Tooltip title="Change visibility">
                        <GroupIcon
                          sx={{ height: 25, width: 25, color: "black" }}
                          className="group_icon"
                        />
                      </Tooltip>
                      <Tooltip title="Board">
                        <Button
                          className="board_icon_name"
                          sx={{
                            textTransform:'capitalize',
                            backgroundColor:'lightgray',
                            color:'black',
                            padding:'5px 40px'
                          }}
                        >
                        <LeaderboardIcon className="board_icon" />
                          <Typography>Board</Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Board Options">
                        <Button
                          sx={{
                            margin: 0,
                            padding: 0,
                            minWidth: 30,
                            backgroundColor: "lightgray",
                          }}
                          className="downArrow_icon"
                          variant="contained"
                          id="basic-button"
                          aria-controls={
                            openBoardMenu ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openBoardMenu ? "true" : undefined}
                          onClick={handleClickBoardMenu}
                        >
                          <KeyboardArrowDownIcon
                            sx={{ height: 30, width: 30, color: "black" }}
                          />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Box>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-6 d-none d-md-block ">
              <div className="d-flex align-items-center justify-content-end">
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title="Power-Ups">
                      <RocketLaunchIcon
                        style={{ width: 25, height: 25, color: "black" }}
                        className="rocket_icon"
                      />
                    </Tooltip>
                    <Tooltip title="Automation">
                      <BoltIcon
                        style={{ width: 25, height: 25, color: "black" }}
                        className="thunder_icon"
                      />
                    </Tooltip>
                    <Tooltip title="Filter Card">
                      <div className="d-flex filter_btn">
                        <FilterListIcon
                          style={{ marginRight: 5, color: "black" }}
                        />
                        <Typography style={{ color: "black", fontWeight: "600" }}>
                          Filters
                        </Typography>
                      </div>
                    </Tooltip>
                  </Stack>
                </Box>
                <div className="partation"></div>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    
                    <Tooltip title="Share board">
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          background: "white",
                          color: "black",
                        }}
                        className="share_icon"
                        startIcon={<PersonAddAltIcon />}
                      >
                        <Typography style={{ color: "black", fontWeight: "600" }}>
                          Share
                        </Typography>
                      </Button>
                    </Tooltip>
                    <div className="more_button_div">
                      <MoreHorizIcon
                        sx={{
                          marginLeft: 1,
                          width: 30,
                          height: 30,
                          color: "black",
                        }}
                        className="more_button"
                      />
                    </div>
                  </Stack>
                </Box>
              </div>
            </div>
          </Toolbar>
      </Box>

      {/* Board Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorElBoardMenu}
        open={openBoardMenu}
        onClose={handleCloseBoardMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDeletBoard}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default SubNavbar;
