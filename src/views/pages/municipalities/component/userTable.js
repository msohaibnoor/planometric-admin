import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Menu,
    MenuItem,
    Link
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteUserDialog from './DeleteUserDialog';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import { changeUserStatus } from 'redux/users/actions';
import { padding } from '@mui/system';
import AddRestrictedUserDialog from './AddRestrictedUserDialog';

const UserTable = ({ usersList, page, limit, search, type }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openRestricted, setRestrictedOpen] = useState(false);
    const [municipality, setMunicipality] = useState({});
    const [municipalityId, setMunicipalityId] = useState(null);
    const [userId, setUserId] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleClick = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCopyToClipboard = (address) => {
        navigator.clipboard.writeText(address);
        setCopied(true);
    };
    return (
        <TableContainer>
            <AddRestrictedUserDialog
              municipality={municipality}
              municipalityId={municipalityId}
              setOpen={setRestrictedOpen}
              open={openRestricted}
              search={search}
              page={page}
              limit={limit}
              type={type}
            />
            <DeleteUserDialog setOpen={setOpen} open={open} userId={userId} page={page} limit={limit} search={search} type={type} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>State</TableCell>
                        {/* <TableCell>Wallet Address</TableCell> */}
                        {/* <TableCell>User Type</TableCell> */}
                        {/* <TableCell>Status</TableCell> */}
                        <TableCell>Created At</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersList &&
                        usersList.municipalities &&
                        usersList.municipalities.length > 0 &&
                        usersList.municipalities.map((row, index) => (
                            <>
                                <TableRow hover key={row.id}>
                                    <TableCell
                                        sx={{ pl: 3 }}
                                        onClick={() => {
                                            console.log('row', row);
                                        }}
                                    >
                                        {index + 1}{' '}
                                    </TableCell>
                                    <TableCell>
                                        {row.name
                                         }
                                    </TableCell>
                                    <TableCell>{row.state}</TableCell>

                                    <TableCell>{moment(row.createdAt).format('DD-MM-YYYY')}</TableCell>

                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        {/* <Stack direction="row" justifyContent="center" alignItems="center">
                                            <Tooltip placement="top" title={row.isActive ? 'Block' : 'Unblock'}>
                                                <IconButton
                                                    disabled={row.isRestricted}
                                                    color={row.isActive ? 'primary' : 'error'}
                                                    aria-label="delete"
                                                    size="large"
                                                    onClick={() => {
                                                        dispatch(
                                                            changeUserStatus({
                                                                id: row.id,
                                                                page: page,
                                                                limit: limit,
                                                                search: search,
                                                                type: type
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <BlockIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Delete">
                                                <IconButton
                                                    color="primary"
                                                    sx={{
                                                        color: theme.palette.orange.dark,
                                                        borderColor: theme.palette.orange.main,
                                                        '&:hover ': { background: theme.palette.orange.light }
                                                    }}
                                                    size="large"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setUserId(row.id);
                                                    }}
                                                >
                                                    <DeleteOutlineOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack> */}
                                        <IconButton>
                                            <MoreVertIcon
                                                fontSize="large"
                                                color="black"
                                                aria-controls="menu-friend-card"
                                                aria-haspopup="true"
                                                sx={{ opacity: 1.6 }}
                                                onClick={(e) => handleClick(e, row)}
                                            />
                                        </IconButton>
                                        <Menu
                                            id="menu-simple-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'left',
                                                horizontal: 'left'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            sx={{ padding: '0px 8px', boxShadow: 'none' }}
                                            className="customMenuClass"
                                        >
                                           
                                           <MenuItem
                                                onClick={() => {
                                                    // setBrandName(selectedRow.name);
                                                    // setBrandId(selectedRow.id);
                                                    // setAddUpdateOpen(true);
                                                    setRestrictedOpen(true);
                                                    setMunicipality(selectedRow);
                                                    setMunicipalityId(selectedRow.id);
                                                    // handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton color="primary" aria-label="Edit" size="large" sx={{ padding: '0px' }}>
                                                        <EditOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Edit</p>
                                                </div>
                                            </MenuItem>   
                                            <MenuItem
                                                onClick={() => {
                                                    setOpen(true);
                                                    setUserId(selectedRow.id);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton
                                                        color="primary"
                                                        sx={{
                                                            color: theme.palette.orange.dark,
                                                            borderColor: theme.palette.orange.main,
                                                            '&:hover ': { background: theme.palette.orange.light },
                                                            padding: '0px'
                                                        }}
                                                        size="large"
                                                    >
                                                        <DeleteOutlineOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Delete</p>
                                                </div>
                                                {/* </Tooltip> */}
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
