import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { equals, has, ifElse, not, when } from 'ramda';
import { Container, Grid, MenuItem, IconButton, Fade } from '@material-ui/core';
import {
  AddCircle,
  CreateNewFolder,
  KeyboardArrowDown,
  Share
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  selectAllFolders,
  selectAllCvDocuments,
  selectCurrentFolder,
} from 'store/folder/selectors';
import {
  cloneCV,
  createFolder,
  fetchFolder,
  fetchRootFolder,
  moveCVDocument,
  removeCV,
  removeFolder,
  updateDocumentAccessLevel,
  updateFolder,
} from 'store/folder/thunks';
import { IURLIdParams } from 'models/urlParams';
import { DragAndDropPayload, IFolder } from 'models/folder';
import { actions } from 'store/folder/slice';
import { selectCurrentUser } from 'store/user/selectors';
import { fetchProfile } from 'store/user/thunks';
import { cvApi } from 'api/services/cv.api';
import { ICVDocument } from 'models/cv';
import Folder from 'components/Folder';
import Page from 'components/Page';
import CustomMenu from 'components/CustomMenu';
import CVDocument from 'components/CVDocument';
import withDragOrDrop from 'components/hoc/withDragOrDrop';
import PublicLinkModal from 'components/PublicLinkModal';
import { fetchCVForDownloadPDF } from 'store/template/thunks';
import CustomAlert from 'components/CustomAlert';
import theme from '../utils/theme';

const useStyles = makeStyles(() => ({
  addButton: {
    position: 'sticky',
    top: 20,
    zIndex: 5,
  },
  foldersItem: {
    position: 'relative',
  },
  foldersItemMenuIcon: {
    position: 'absolute',
    top: 0,
    left: 40,
  },
  shareIcon: {
    position: 'absolute',
    top: -8,
    left: -7,
    backgroundColor: theme.palette.primary.main,
    border: '1px solid #fff',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      transform: 'scale(1.1)'
    }
  },
  templateWrapper: {
    visibility: 'hidden',
  },
}));

const DraggableFolder = withDragOrDrop(Folder);
const DraggableCVDocument = withDragOrDrop(CVDocument);

function FoldersContent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<IURLIdParams>();
  const [publicLink, setPublicLink] = useState({
    link: '',
    open: false,
  });
  const [openSnack, setOpenSnack] = useState(false);
  const folders = useSelector(selectAllFolders);
  const cvDocuments = useSelector(selectAllCvDocuments);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(equals(id, 'root') ? fetchRootFolder() : fetchFolder(Number(id)));
  }, [id, dispatch]);

  function handleFolderDoubleClick(folderId: number) {
    history.push(`/folders/${folderId}`);
  }

  function handleEditCVDocument(cvId: number) {
    history.push(`/edit/${cvId}`);
  }

  function handleCloneCVDocument(cvId: number) {
    dispatch(cloneCV(cvId));
  }

  function handleRemoveFolder(folderId: number) {
    dispatch(removeFolder(folderId));
  }

  function handleUpdateFolder(folder: IFolder) {
    return (changes: Partial<IFolder>) => {
      dispatch(
        updateFolder({
          ...folder,
          ...changes,
          parentId: currentFolder?.id,
        })
      );
    };
  }

  function handlePreviewCVDocument(cvId: number) {
    history.push(`/preview/${cvId}`);
  }

  async function handleOpenPublicLinkModal(cvId: number | undefined, openModal = false) {
    const hasId = not(equals(cvId, undefined));
    const link = await (hasId ? cvApi.fetchPublicLink(cvId as number) : '');

    ifElse(
      equals(true),
      () => {
        setPublicLink({ link, open: hasId });
      },
      async () => {
        await navigator.clipboard.writeText(link);
        setOpenSnack(true);
      }
    )(openModal);
  }

  function handleChangeDocumentAccess(cvDocument: ICVDocument) {
    dispatch(updateDocumentAccessLevel(cvDocument));
  }

  /**
   * @description after removing CV document we need to check if the deleted document was for the current user,
   * if it's true -> fetch current user profile to update navigation (change "Edit CV" -> "Create CV")
   * */
  const handleRemoveCVDocument = async (cvId: number, userId: number) => {
    await dispatch(removeCV(cvId));
    when(equals(currentUser?.id), () => dispatch(fetchProfile()))(userId);
  };

  const handleFolderDropOutside = ({
    dragProp,
    dropProp,
  }: DragAndDropPayload) => {
    const draggedObject = JSON.parse(dragProp);

    // we handle two cases
    // first one if user try to move folder to another folder
    // second case if user try to move document into folder
    ifElse(
      has('name'),
      () => {
        dispatch(updateFolder({ ...draggedObject, parentId: dropProp }));
        dispatch(actions.folderMoved({ id: draggedObject.id }));
      },
      () => {
        dispatch(
          moveCVDocument({
            id: draggedObject.id,
            folderId: dropProp,
          })
        );
      }
    )(draggedObject);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
      >
        {/* render folders */}
        {folders.map((folder) => (
          <Fade
            key={folder.id}
            in={Boolean(folder.id)}
          >
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={2}
            >
              <div className={classes.foldersItem}>
                <DraggableFolder
                  draggable={true}
                  droppable={true}
                  dragProp={JSON.stringify(folder)}
                  dropProp={folder.id}
                  folderId={folder.id}
                  onHandleDropOutside={handleFolderDropOutside}
                  name={folder.name}
                  updateHandler={handleUpdateFolder(folder)}
                  dbClickHandler={() => handleFolderDoubleClick(folder.id)}
                />

                <CustomMenu
                  className={classes.foldersItemMenuIcon}
                  renderButton={(props) => (
                    <IconButton
                      size="small"
                      {...props}
                    >
                      <KeyboardArrowDown fontSize="small" />
                    </IconButton>
                  )}
                  renderMenu={() => (
                    <div>
                      <MenuItem onClick={() => handleRemoveFolder(folder.id)}>
                        Remove
                      </MenuItem>
                    </div>
                  )}
                  ariaControlsLabel={`folder-${folder.id}`}
                />
              </div>
            </Grid>
          </Fade>
        ))}

        {/* rendering cv documents */}
        {cvDocuments.map((cvDocument) => (
          <Fade
            key={cvDocument.id}
            in={Boolean(cvDocument.id)}
          >
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={2}
            >
              <div className={classes.foldersItem}>
                <DraggableCVDocument
                  draggable={equals(cvDocument.original, false)}
                  dragProp={JSON.stringify({ id: cvDocument.id })}
                  dbClickHandler={() => handleEditCVDocument(cvDocument.id)}
                  cvDocumentData={cvDocument}
                />

                <CustomMenu
                  renderButton={(props) => (
                    <IconButton
                      size="small"
                      className={classes.foldersItemMenuIcon}
                      {...props}
                    >
                      <KeyboardArrowDown fontSize="small" />
                    </IconButton>
                  )}
                  renderMenu={() => (
                    <div>
                      <MenuItem
                        onClick={() => handleEditCVDocument(cvDocument.id)}
                      >
                        Edit
                      </MenuItem>

                      <MenuItem
                        onClick={() => handleCloneCVDocument(cvDocument.id)}
                      >
                        Clone
                      </MenuItem>

                      <MenuItem
                        onClick={() =>
                          handleRemoveCVDocument(
                            cvDocument.id,
                            cvDocument.userId
                          )}
                      >
                        Remove
                      </MenuItem>

                      <MenuItem
                        onClick={() => handlePreviewCVDocument(cvDocument.id)}
                      >
                        Preview
                      </MenuItem>

                      <MenuItem onClick={() => dispatch(fetchCVForDownloadPDF(cvDocument.id))}>
                        Download PDF
                      </MenuItem>

                      {/* you can share public link only if document has PUBLIC access level */}
                      {equals(cvDocument.accessLevel, 'PUBLIC') && (
                        <MenuItem
                          onClick={() =>
                            handleOpenPublicLinkModal(cvDocument.id)}
                        >
                          Get public link
                        </MenuItem>
                      )}

                      {equals(cvDocument.accessLevel, 'PUBLIC') ? (
                        <MenuItem
                          onClick={() =>
                            handleChangeDocumentAccess({
                              ...cvDocument,
                              accessLevel: 'PRIVATE',
                            })}
                        >
                          To Private
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() =>
                            handleChangeDocumentAccess({
                              ...cvDocument,
                              accessLevel: 'PUBLIC',
                            })}
                        >
                          To Public
                        </MenuItem>
                      )}
                    </div>
                  )}
                  ariaControlsLabel={`cv-${cvDocument.id}`}
                />

                {/* share button, visible only if document has public access */}

                {equals(cvDocument.accessLevel, 'PUBLIC') && (
                  <IconButton
                    className={classes.shareIcon}
                    size="small"
                    onClick={() => handleOpenPublicLinkModal(cvDocument.id)}
                  >
                    <Share style={{ fontSize: '1rem', color: '#fff' }} />
                  </IconButton>)}
              </div>
            </Grid>
          </Fade>
        ))}
      </Grid>

      {/* modal for showing public link for cv */}
      <PublicLinkModal
        link={publicLink.link}
        open={publicLink.open}
        closeHandler={handleOpenPublicLinkModal}
      />

      <CustomAlert
        content="Link has been copied !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </Container>
  );
}

function Folders() {
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleCreateFolder() {
    dispatch(createFolder());
  }

  return (
    <Page
      component={<FoldersContent />}
      title="Folders"
      renderTitleTools={() => (
        <CustomMenu
          className={classes.addButton}
          renderButton={(props) => (
            <IconButton
              color="primary"
              {...props}
            >
              <AddCircle fontSize="large" />
            </IconButton>
          )}
          renderMenu={() => (
            <div>
              <MenuItem onClick={handleCreateFolder}>
                <CreateNewFolder style={{ marginRight: '10px' }} />
                Add folder
              </MenuItem>
            </div>
          )}
          ariaControlsLabel="add-new-folder"
        />
      )}
    />
  );
}

export default Folders;
