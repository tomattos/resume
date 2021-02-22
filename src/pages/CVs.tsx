import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Paper,
  IconButton,
  MenuItem,
} from '@material-ui/core';
import { Edit, MoreVert, Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCV, fetchAllCVs } from 'store/cv/thunks';
import { selectAllCVs } from 'store/cv/selectors';
import { ICV } from 'models/cv';
import CustomMenu from 'components/CustomMenu';

/* TODO: this page doesn't use */
const CVs = () => {
  const dispatch = useDispatch();
  const cvs = useSelector(selectAllCVs);

  useEffect(() => {
    dispatch(fetchAllCVs());
  }, [dispatch]);

  /**
   * @description remove CV and fetch the list
   * */
  const handleRemoveCV = (id: number) => {
    dispatch(deleteCV(id));
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{ width: '10px' }}
              >
                <b>Id</b>
              </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Create date</TableCell>
              <TableCell
                align="right"
                style={{ width: '50px' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cvs.map(({ id, jsonData }) => (
              <TableRow key={id}>
                <TableCell align="left">{id}</TableCell>
                <TableCell align="left">{(jsonData as ICV).cvName}</TableCell>
                <TableCell align="left">
                  {(jsonData as ICV).creationDate}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ width: '50px' }}
                >
                  <CustomMenu
                    renderButton={(props) => (
                      <IconButton {...props}>
                        <MoreVert />
                      </IconButton>
                    )}
                    renderMenu={() => (
                      <div>
                        <MenuItem
                          component={Link}
                          to={`/edit/${id}`}
                        >
                          <Edit
                            style={{ marginRight: 10 }}
                            fontSize="small"
                          />
                          Edit
                        </MenuItem>

                        <MenuItem onClick={() => handleRemoveCV(id)}>
                          <Delete
                            style={{ marginRight: 10 }}
                            fontSize="small"
                          />
                          Delete
                        </MenuItem>
                      </div>
                    )}
                    ariaControlsLabel={`action-menu-${id}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CVs;
