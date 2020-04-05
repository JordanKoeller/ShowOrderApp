import React, { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Checkbox from '@material-ui/core/Checkbox';

const SortableList = ({danceNames, callback}) => {

  
  const [items, setItems] = useState(danceNames.map((name, ind) => ({id: ind.toString(), text: name})));
  const [locked, setLock] = useState([]);
  const getLockState = (locks, itemList) => {
    return itemList.map((e, ind) => {
      if (locks.includes(e.id)) {
        return {dance: e.text, ind: ind};
      } else {
        return undefined;
      }
    }).filter(e => e !== undefined);
  };
  const onDrop = ({ removedIndex, addedIndex }) => {
    const newArr = arrayMove(items, removedIndex, addedIndex);
    setItems(items => newArr);
    callback(getLockState(locked, newArr))
  };

  const onLock = id => {
    let locks = locked;
    if (locked.includes(id)) {
      locks = locked.filter(e => e !== id);
    } else {
      locks = [...locked, id]
    }
    setLock(locks);
    callback(getLockState(locks, items));
  };


  return <List dense>
      <Container dragHandleSelector=".drag-handle"
                 lockAxis="y"
                 onDrop={onDrop}
                 >
        {items.map(({ id, text }, ind) => 
          locked.includes(id) ? 
            <ListItem alignItems="flex-start">
            <ListItemText primary={ind + 1} />
            <ListItemIcon>
            <Checkbox
              checked={locked.includes(id)}
              onChange={e => onLock(id)}
              value="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            </ListItemIcon>
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
              <ListItemIcon className="drag-handle">
                <DragHandleIcon />
              </ListItemIcon>
            </ListItemSecondaryAction>
          </ListItem>
            :
          <Draggable key={id}>
            <ListItem>
            <ListItemText primary={ind + 1} />
              <ListItemIcon>
              <Checkbox
                checked={locked.includes(id)}
                onChange={e => onLock(id)}
                value="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              </ListItemIcon>
              <ListItemText primary={text} />
              <ListItemSecondaryAction>
                <ListItemIcon className="drag-handle">
                  <DragHandleIcon />
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>
        )}
      </Container>
    </List>;
};

export default SortableList;