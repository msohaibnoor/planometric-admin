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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteUserDialog from './DeleteUserDialog';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import { padding } from '@mui/system';

const ProjectsTable = ({ projectsList, page, limit, search, type }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
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
            <DeleteUserDialog setOpen={setOpen} open={open} userId={userId} page={page} limit={limit} search={search} type={type} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Company name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Recommended By</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectsList &&
                        projectsList.projects &&
                        projectsList.projects.length > 0 &&
                        projectsList.projects.map((row, index) => (
                            <>
                                <TableRow hover key={row.id}>
                                    <TableCell
                                        sx={{ pl: 3 }}
                                        onClick={() => {
                                            console.log('row', row);
                                        }}
                                    >
                                        {row.id}{' '}
                                    </TableCell>
                                    <TableCell>{`${row?.firstName} ${row?.lastName}`}</TableCell>
                                    <TableCell>{row.companyName}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.recommendedBy}</TableCell>

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

export default ProjectsTable;
