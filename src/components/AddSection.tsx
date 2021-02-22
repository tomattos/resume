import React from 'react';
import { IconButton, Divider, useTheme } from '@material-ui/core';
import { AddCircleOutline, DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { equals, gt } from 'ramda';

type AddSectionProps = {
  list: any[];
  withDivider?: boolean;
  numberOfRequired?: number;
  handleAddSection: () => void;
  handleRemoveSection: (i: number) => void;
  render: (item: any, i: number) => any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
  },
  child: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  removeBtn: {
    position: 'absolute',
    right: '-58px',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      position: 'static'
    }
  }
})
);

const AddSection = React.memo<AddSectionProps>(
  ({
    handleAddSection,
    handleRemoveSection,
    withDivider = true,
    list = [],
    render,
    numberOfRequired = 1
  }) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
      <div className={classes.root}>
        {list.map((item, index) => (
          <React.Fragment key={index}>
            {withDivider && index > 0 && (
              <Divider
                light
                className={classes.divider}
              />
            )}
            <div
              className={classes.child}
              key={index}
            >
              {render(item, index)}

              {gt(list.length, numberOfRequired as number) &&
                <IconButton
                  onClick={() => handleRemoveSection(index)}
                  className={classes.removeBtn}
                >
                  <DeleteOutlined style={{ color: theme.palette.error.dark }} />
                </IconButton>}
            </div>
          </React.Fragment>
        ))}

        <div style={{ width: '100%', marginTop: '10px' }}>
          <IconButton
            color="primary"
            onClick={handleAddSection}
          >
            <AddCircleOutline />
          </IconButton>
        </div>
      </div>
    );
  },
  (prev, next) => equals(prev.list, next.list)
);

export default AddSection;
