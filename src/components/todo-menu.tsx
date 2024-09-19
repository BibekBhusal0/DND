import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

type todoMenuProps = {
  handleDelete?: () => void;
  handleSort?: () => void;
  handleFilter?: () => void;
};

function TodoMenu({ handleDelete, handleSort, handleFilter }: todoMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <MenuIcon />
      </ListItemButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleSort}>Sort</MenuItem>
        <MenuItem onClick={handleFilter}>Filter</MenuItem>
      </Menu>
    </div>
  );
}

export default TodoMenu;
