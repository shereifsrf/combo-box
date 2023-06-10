import { useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Menu,
  Stack,
  Box,
} from "@mui/material";

const profileList = ["profile1", "profile2", "profile3"];

const AddAction = () => {
  console.log("AddAction");
};
const RenameAction = () => {
  console.log("RenameAction");
};
const DuplicateAction = () => {
  console.log("DuplicateAction");
};
const DeleteAction = () => {
  console.log("DeleteAction");
};
// tuple with name and actions
const actionButtons: [string, () => void][] = [
  ["Add", AddAction],
  ["Rename", RenameAction],
  ["Duplicate", DuplicateAction],
  ["Delete", DeleteAction],
];

function App() {
  const [profile, setProfile] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setProfile(event.target.value as string);
  };

  return (
    <Container>
      {/* combo box with profile lise */}
      <Stack spacing={3} direction="row" mt={5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">PROFILE</Typography>
        </Box>
        <Select
          fullWidth
          value={profile}
          onChange={handleChange}
          variant="outlined"
        >
          {profileList.map((profile) => (
            <MenuItem key={profile} value={profile}>
              {profile}
            </MenuItem>
          ))}
        </Select>

        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
        >
          ...
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {actionButtons.map((action) => (
            <MenuItem key={action[0]} onClick={action[1]}>
              {action[0]}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Container>
  );
}

export default App;
