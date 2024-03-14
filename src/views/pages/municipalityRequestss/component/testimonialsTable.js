import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
import AddUpdateTestimonialDialog from './AddUpdateTestimonial';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import { changeUserStatus } from 'redux/users/actions';
import { padding } from '@mui/system';

const UserTable = ({ testimonialsList, page, limit, search, type }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [copied, setCopied] = useState(false);
    const [testimonialId, setTestimonialId] = useState(null);
    const [testimonial, setTestimonial] = useState(null);
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

    console.log({testimonialId})
    return (
        <TableContainer>
            <AddUpdateTestimonialDialog
                setOpenFeedback={setOpenFeedback}
                openFeedback={openFeedback}
                testimonialId={testimonialId}
                testimonial={testimonial}
                page={page}
                limit={limit}
                search={search}
                type={type}
            />
            <DeleteUserDialog
                setOpen={setOpen}
                open={open}
                testimonialId={testimonialId}
                page={page}
                limit={limit}
                search={search}
                type={type}
            />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>Requested Municipality</TableCell>
                        <TableCell>Email</TableCell>
                        {/* <TableCell>Designation</TableCell> */}
                        {/* <TableCell>Image</TableCell> */}
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {testimonialsList &&
                        testimonialsList.requests &&
                        testimonialsList.requests.length > 0 &&
                        testimonialsList.requests.map((row, index) => (
                            <>
                                <TableRow hover key={row.id}>
                                    <TableCell>{row?.municipality}</TableCell>
                                    <TableCell>{row?.email}</TableCell>
                                    {/* <TableCell>{row?.clientDesignation}</TableCell> */}
                                    {/* <TableCell>{row?.clientImageUrl.slice(0, 20) + '...'}</TableCell> */}

                                    <TableCell align="center" sx={{ pr: 3 }}>
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
                                                    setTestimonialId(selectedRow.id);
                                                    setTestimonial(selectedRow);
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
