import React from 'react';

import { List, ListItem, ListItemText, Dialog, DialogTitle} from '@material-ui/core';


function DancersListDialog({open, dancers, onClose}) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Dancers</DialogTitle>
      <List dense>
        {dancers.map((dancer) => (
          <ListItem key={dancer}>
            <ListItemText primary={dancer} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default DancersListDialog;