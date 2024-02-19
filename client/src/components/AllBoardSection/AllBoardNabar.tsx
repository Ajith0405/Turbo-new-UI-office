import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Popover from "@mui/material/Popover";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { deepPurple } from "@mui/material/colors";

import "./allBoardNavbar.css";
import { useNavigate } from "react-router-dom";

import { CreateBoardAPI } from "../../services/API";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function AllBoardNavbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [boardName, setBoardName] = useState<string>("");
  const navigate = useNavigate();

  // Board create function
  const handleBoardCreateButton = async () => {
    await CreateBoardAPI(boardName);
    setBoardName("");
    navigate("/");
  };

  // Nav menu popover
  // workspace
  const [anchorElWorkspace, setAnchorElWorkspace] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickWorkspace = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElWorkspace(event.currentTarget);
  };

  const handleCloseWorkspace = () => {
    setAnchorElWorkspace(null);
  };
  const openWorkspace = Boolean(anchorElWorkspace);
  const idWorkspace = openWorkspace ? "simple-popover" : undefined;

  // recent
  const [anchorElRecent, setAnchorElRecent] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickRecent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRecent(event.currentTarget);
  };

  const handleCloseRecent = () => {
    setAnchorElRecent(null);
  };

  const openRecent = Boolean(anchorElRecent);
  const idRecent = openRecent ? "simple-popover" : undefined;

  // Starred
  const [anchorElStarred, setAnchorElStarred] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickStarred = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElStarred(event.currentTarget);
  };

  const handleCloseStarred = () => {
    setAnchorElStarred(null);
  };

  const openStarred = Boolean(anchorElStarred);
  const idStarred = openStarred ? "simple-popover" : undefined;

  // Templates
  const [anchorElTemplates, setAnchorElTemplates] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickTemplates = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTemplates(event.currentTarget);
  };

  const handleCloseTemplates = () => {
    setAnchorElTemplates(null);
  };

  const openTemplates = Boolean(anchorElTemplates);
  const idTemplates = openTemplates ? "simple-popover" : undefined;

  // Search
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
          width: "20ch",
        },
      },
    },
  }));
  // mobile view Drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box sx={{}}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          marginLeft: "15px",
          gap: "20px",
        }}
      >
        <img
          src="https://img.freepik.com/premium-photo/pieces-torn-paper-texture-background-with-copy-space-text_34155-2208.jpg?size=626&ext=jpg&ga=GA1.1.355097976.1708222726&semt=ais"
          alt="turbo logo"
          width={"25px"}
        />

        <Typography style={{ fontWeight: "700", fontSize: "25px" }}>
          Turbo
        </Typography>
      </Box>
      {/* <Divider /> */}
      <div className="">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Workspace
          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={handleDrawerToggle}>Board WorkSpace</Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Recent
          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={handleDrawerToggle}>React Board</Button>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Starred
          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={handleDrawerToggle}>Starred Board</Button>
          </AccordionDetails>
        </Accordion>
        <Box className="ms-4 mt-2">
          <Button
            sx={{ textTransform: "capitalize", }}
            variant="contained"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleDrawerToggle}
          >
            Create
          </Button>
        </Box>
      </div>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "whitesmoke" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "15px",
              gap: "10px",
              color: "black",
            }}
          >
            <img
              src="https://img.freepik.com/premium-photo/pieces-torn-paper-texture-background-with-copy-space-text_34155-2208.jpg?size=626&ext=jpg&ga=GA1.1.355097976.1708222726&semt=ais"
              alt="turbo logo"
              width={"25px"}
            />

            <Typography style={{ fontWeight: "700", fontSize: "25px" }}>
              Turbo
            </Typography>
          </Box>
          {/* Navbar menu */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "start",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <Box flexGrow="1" sx={{ display: "flex" }}>
              {/* Workspaces */}
              <Box>
                <Button
                  aria-describedby={idWorkspace}
                  onClick={handleClickWorkspace}
                  sx={{ textTransform: "capitalize", color: "black" }}
                >
                  Workspaces
                  <KeyboardArrowDownIcon />
                </Button>
                <Popover
                  id={idWorkspace}
                  open={openWorkspace}
                  anchorEl={anchorElWorkspace}
                  onClose={handleCloseWorkspace}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Board Workspace</Typography>
                </Popover>
              </Box>
              {/* Recent */}
              <Box className="d-none d-md-block d-lg-block">
                <Button
                  aria-describedby={idRecent}
                  onClick={handleClickRecent}
                  sx={{ textTransform: "capitalize", color: "black" }}
                >
                  Recent
                  <KeyboardArrowDownIcon />
                </Button>
                <Popover
                  id={idRecent}
                  open={openRecent}
                  anchorEl={anchorElRecent}
                  onClose={handleCloseRecent}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Recent Board</Typography>
                </Popover>
              </Box>
              {/* Starred */}
              <Box className="d-none d-lg-block">
                <Button
                  aria-describedby={idStarred}
                  onClick={handleClickStarred}
                  sx={{ textTransform: "capitalize", color: "black" }}
                >
                  Starred
                  <KeyboardArrowDownIcon />
                </Button>
                <Popover
                  id={idStarred}
                  open={openStarred}
                  anchorEl={anchorElStarred}
                  onClose={handleCloseStarred}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Starred Board</Typography>
                </Popover>
              </Box>
              {/* Templates */}
              <Box className="d-none  d-lg-block">
                <Button
                  aria-describedby={idTemplates}
                  onClick={handleClickTemplates}
                  sx={{ textTransform: "capitalize", color: "black" }}
                >
                  Templates
                  <KeyboardArrowDownIcon />
                </Button>
                <Popover
                  id={idTemplates}
                  open={openTemplates}
                  anchorEl={anchorElTemplates}
                  onClose={handleCloseTemplates}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Kanban Template</Typography>
                </Popover>
              </Box>
            </Box>
            {/* create Board */}
            <Box>
              <Button
                sx={{ textTransform: "capitalize" }}
                variant="contained"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create
              </Button>
            </Box>
            {/* Search */}
            <Search className="">
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "black" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "black" }}
              />
            </Search>
            {/* End Icons and avatar */}
            <Stack className="stack_navbar_right" direction="row" spacing={2}>
              {/* Notification Icon */}
              <Tooltip title="notification">
                <NotificationsNoneIcon
                  sx={{ width: 30, height: 30, color: "black" }}
                  className="notification_icon"
                />
              </Tooltip>
              {/* Helpout Icon */}
              <Tooltip title="Help">
                <HelpOutlineIcon
                  sx={{ width: 30, height: 30, color: "black" }}
                  className="helpout_icon"
                />
              </Tooltip>
              {/* User Avatar */}
              <Tooltip title="Account">
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}
                  className="user_avatar_logo"
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                      fontSize: "16px",
                    }}
                  >
                    AS
                  </p>
                </Avatar>
              </Tooltip>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{marginTop:'50px'}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Board
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="boardName" className="form-label">
                    Board Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="boardName"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    aria-describedby="boardName"
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <button
                    type="button"
                    onClick={handleBoardCreateButton}
                    data-bs-dismiss="modal"
                    className="btn btn-primary text-dark"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary text-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
