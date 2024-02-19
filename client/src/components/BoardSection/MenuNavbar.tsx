import React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import './menuNavbar.css'
import AddIcon from '@mui/icons-material/Add';
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

interface StyledTabProps {
  label: string;
}

const MenuNavbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box className="menu_navbar_main ">
        <Box
          className="menu_navbar_left ps-2"
        >
          <Box className="row d-flex justify-content-between">
            <AntTabs
              className="col-6"
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              <AntTab
                label="Overview"
                sx={{ color: "gray", fontWeight: "600" }}
              />
              <AntTab label="List" sx={{ color: "gray", fontWeight: "600" }} />
              <AntTab label="Board" sx={{ color: "gray", fontWeight: "600" }} />
              <AntTab
                label="Timeline"
                sx={{ color: "gray", fontWeight: "600" }}
              />
              <AntTab
                label="Calender"
                sx={{ color: "gray", fontWeight: "600" }}
              />
              <AntTab
                label="Dashboard"
                sx={{ color: "gray", fontWeight: "600" }}
              />
              <AntTab
                label="More..."
                sx={{ color: "gray", fontWeight: "600" }}
              />
            </AntTabs>
            <Box className="col-6 d-flex justify-content-end">
            <button className="btn btn-primary me-1 my-1 px-2">
                 <AddIcon/>Add Chart
            </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MenuNavbar;
