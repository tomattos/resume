import React, { ReactElement } from 'react';
import {
  Menu,
  ButtonProps,
  IconButtonProps,
  LinkProps,
} from '@material-ui/core';
import { pathEq, when } from 'ramda';

type Props = {
  renderButton: (
    props: ButtonProps & IconButtonProps & LinkProps
  ) => ReactElement;
  renderMenu: () => React.ReactNode;
  ariaControlsLabel: string;
  className?: string;
  /* we can open menu on left, right or middle mouse click */
  mouseClickType?: 1 | 2 | 3;
  [key: string]: any;
};

const CustomMenu = React.memo(
  ({
    renderButton,
    renderMenu,
    ariaControlsLabel,
    className,
    mouseClickType = 1,
    ...other
  }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<any>) {
      when(pathEq(['nativeEvent', 'which'], mouseClickType), () =>
        setAnchorEl(event.currentTarget)
      )(event);
    }

    function handleClose() {
      setAnchorEl(null);
    }

    return (
      <div className={className}>
        {renderButton({
          'aria-controls': ariaControlsLabel,
          'aria-haspopup': 'true',
          onClick: handleClick,
          underline: 'none',
        })}

        <Menu
          id={ariaControlsLabel}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          {...other}
        >
          {renderMenu()}
        </Menu>
      </div>
    );
  }
);

export default CustomMenu;
