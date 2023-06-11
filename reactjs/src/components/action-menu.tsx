import { Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLayoutEffect, useState } from "react";
import useProfileStore from "../store/store";
import { defaultProfile } from "../models/profile";

type ActionTypes = {
  text: "Add" | "Rename" | "Duplicate" | "Delete";
  action: (...args: any) => void;
  disableIfNotSelected: boolean;
};

const ActionMenu = () => {
  const profile = useProfileStore((state) => state.selectedProfile);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [buttonVariant, setButtonVariant] = useState<"outlined" | "text">(
    "text"
  );

  const actionButtons: ActionTypes[] = [
    {
      text: "Add",
      action: useProfileStore((state) => state.addProfile),
      disableIfNotSelected: false,
    },
    {
      text: "Rename",
      action: useProfileStore((state) => state.setIsRename),
      disableIfNotSelected: true,
    },
    {
      text: "Duplicate",
      action: useProfileStore((state) => state.duplicateProfile),
      disableIfNotSelected: true,
    },
    {
      text: "Delete",
      action: useProfileStore((state) => state.deleteProfile),
      disableIfNotSelected: true,
    },
  ];

  useLayoutEffect(() => {
    if (!open) {
      setButtonVariant("text");
    } else {
      setButtonVariant("outlined");
    }
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuAction = (action: ActionTypes) => {
    action.action(action.text === "Add" ? defaultProfile : profile);

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant={buttonVariant}
        sx={{
          background: "white",
        }}
      >
        <MoreHorizIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {actionButtons
          .filter(
            (action) => profile !== undefined || !action.disableIfNotSelected
          )
          .map((action) => (
            <MenuItem
              key={action.text}
              onClick={() => menuAction(action)}
              sx={{
                minWidth: 200,
              }}
            >
              {action.text}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
