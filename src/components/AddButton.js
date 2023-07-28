import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
class AddButton extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Tooltip title={"Add New Student"}>
          <IconButton disabled={false} onClick={() => this.props.handleClickOpen()}>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default AddButton;