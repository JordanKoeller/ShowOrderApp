import React from 'react';

import { Dialog, DialogTitle} from '@material-ui/core';
import SortableList from './dance-list';

function DanceListDialog({open, danceNames, callback, onClose}) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth>
      <DialogTitle id="simple-dialog-title">Dances</DialogTitle>
      <SortableList danceNames={danceNames} callback={callback} />
    </Dialog>
  );
}

export default DanceListDialog;