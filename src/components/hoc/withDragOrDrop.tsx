import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragAndDropPayload } from '../../models/folder';

type Props = {
  draggable: boolean,
  droppable: boolean,
  dragProp: any,
  dropProp: any,
  onHandleDropOutside(payload: DragAndDropPayload): void
};

const useStyles = makeStyles((theme) => ({
  drop: {
    '& svg': {
      border: `2px solid ${theme.palette.secondary.main}`
    }
  }
}));

const withDragOrDrop = (WrappedComponent: any) =>
  ({ draggable, droppable, dragProp, dropProp, onHandleDropOutside, ...props }: Props & any) => {
    const classes = useStyles();
    const [dragOverClass, setDragOverClass] = useState(false);
    const [disableSelfDrop, setDisableSelfDrop] = useState(false);

    const handleDrop = (event: any) => {
      event.preventDefault();
      if (droppable && !disableSelfDrop) {
        setDragOverClass(false);
        onHandleDropOutside({ dragProp: event.dataTransfer.getData('text/plain'), dropProp });
      }
    };

    const handleDragOver = (event: any) => {
      event.preventDefault();
      setDragOverClass(!disableSelfDrop);
      event.dataTransfer.dropEffect = 'move';
    };

    const handleDragStart = (event: any) => {
      setDisableSelfDrop(true);
      event.dataTransfer.setData('text/plain', dragProp);
      event.dataTransfer.dropEffect = 'move';
    };

    return (
      <div
        className={`${dragOverClass && droppable ? classes.drop : ''}`}
        draggable={draggable}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOverClass(false)}
        onDragStart={handleDragStart}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

export default withDragOrDrop;
