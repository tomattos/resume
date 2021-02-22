import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { curry } from 'ramda';
import { fetchAllUsers, removeUser, updateUser } from 'store/user/thunks';
import { selectAllUsers } from 'store/user/selectors';
import { Role } from 'models/auth';
import { IUser } from 'models/user';
import CustomAlert from 'components/CustomAlert';
import CustomMenu from 'components/CustomMenu';

function Users() {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUserRoleChange = curry(
    async (user: IUser, { target }: React.ChangeEvent<{ value: Role }>) => {
      await dispatch(updateUser({ ...user, userRole: target.value }));
      setOpenSnack(true);
    }
  );

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Name</b>
              </TableCell>

              <TableCell align="left">
                <b>Email</b>
              </TableCell>

              <TableCell
                align="left"
                style={{ width: 100 }}
              >
                <b>Role</b>
              </TableCell>

              <TableCell
                align="left"
                style={{ width: 100 }}
              >
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">{user.fullName}</TableCell>

                <TableCell align="left">{user.email}</TableCell>

                <TableCell
                  align="left"
                  style={{ width: 100 }}
                >
                  <Select
                    style={{ width: '100%' }}
                    id={`user-role-${user.id}`}
                    value={user.userRole}
                    onChange={handleUserRoleChange(user)}
                  >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <CustomMenu
                    renderButton={(props) => (
                      <IconButton {...props}>
                        <MoreVert />
                      </IconButton>
                    )}
                    renderMenu={() => (
                      <div>
                        <MenuItem onClick={() => dispatch(removeUser(user.id))}>Remove</MenuItem>
                      </div>
                    )}
                    ariaControlsLabel={`actions-${user.id}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomAlert
        content="User role has been changed !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </Container>
  );
}

export default Users;
