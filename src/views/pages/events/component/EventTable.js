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
    Button,
    Chip,
    Menu,
    MenuItem
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import TheatersIcon from '@mui/icons-material/Theaters';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteEventDialog from './DeleteEventDialog';
import moment from 'moment';
import { changeEventStatus } from 'redux/events/actions';
import AddEditEventDialog from './AddEditEventDialog';
import EventDetailDialog from './eventDetailDialog';
import TheaterManagementDialog from './TheaterManagementDialog';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import advertisement from 'assets/images/advertisement.svg';
import theatre from 'assets/images/theater.svg';
const EventTable = ({
    eventsList,
    page,
    limit,
    search,
    eventDetail,
    setEventEditOpen,
    eventEditOpen,
    setEventDetail,
    setIsUpdate,
    isUpdate,
    type,
    setType,
    loader,
    setLoader
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openEventDetail, setEventDetailOpen] = useState(false);
    const [eventId, setEventId] = useState();
    const [eventData, setEventData] = useState();
    const [theaterData, setTheaterData] = useState();
    const [openTheater, setTheaterOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleClick = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <TableContainer>
            <TheaterManagementDialog
                open={openTheater}
                setOpen={setTheaterOpen}
                eventData={eventData}
                setEventData={setEventData}
                theaterData={theaterData}
                setTheaterData={setTheaterData}
                page={page}
                limit={limit}
                search={search}
            />
            <DeleteEventDialog setOpen={setOpen} open={open} eventId={eventId} page={page} limit={limit} search={search} />
            <EventDetailDialog open={openEventDetail} setOpen={setEventDetailOpen} eventData={eventData} />
            <AddEditEventDialog
                page={page}
                limit={limit}
                search={search}
                eventDetail={eventDetail}
                setOpen={setEventEditOpen}
                open={eventEditOpen}
                setEventDetail={setEventDetail}
                eventId={eventId}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                type={type}
                setType={setType}
                loader={loader}
                setLoader={setLoader}
            />

            <Table>
                <TableHead>
                    <TableRow textAlign="center">
                        <TableCell sx={{ pl: 3 }}>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Ticket Price</TableCell>

                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>

                        <TableCell>Status</TableCell>
                        <TableCell>Attendees</TableCell>
                        <TableCell>Active Attendees</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {eventsList &&
                        eventsList.lobbies &&
                        eventsList.lobbies.length > 0 &&
                        eventsList.lobbies.map((row, index) => (
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
                                    <TableCell>{row.lobbyName}</TableCell>
                                    <TableCell>{row.Brand && row.Brand.name}</TableCell>
                                    <TableCell>{row.ticketPrice}</TableCell>

                                    <TableCell>{row.startTime && moment(row.startTime).format(' MMMM Do YYYY, h:mm a')}</TableCell>
                                    <TableCell>{row.endTime && moment(row.endTime).format(' MMMM Do YYYY, h:mm a')}</TableCell>

                                    <TableCell>
                                        {moment(row.endTime) >= moment.now() && (
                                            <Chip
                                                label="Active"
                                                size="small"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark.main
                                                            : theme.palette.success.light + 60,
                                                    color: theme.palette.success.dark
                                                }}
                                            />
                                        )}
                                        {moment(row.endTime) < moment.now() && (
                                            <Chip
                                                label="Finished"
                                                size="small"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark.main
                                                            : theme.palette.orange.light + 80,
                                                    color: theme.palette.orange.dark
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">{row?.UserEvents?.length}</TableCell>
                                    <TableCell align="center">{row?.UserEvents?.filter((e) => e.active).length}</TableCell>

                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        {/* <Stack direction="row" justifyContent="center" alignItems="center">
                                            <Tooltip placement="top" title={row.isActive ? 'Deactivate Event' : 'Active Event'}>
                                                <IconButton
                                                    disabled={!row.isEvent}
                                                    color={row.isActive ? 'primary' : 'error'}
                                                    aria-label="delete"
                                                    size="medium"
                                                    onClick={() => {
                                                        dispatch(
                                                            changeEventStatus({
                                                                id: row.id,
                                                                page: page,
                                                                limit: limit,
                                                                search: search
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <BlockIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Manage Advertisement">
                                                <img
                                                    src={advertisement}
                                                    alt="Advertisement"
                                                    width="30"
                                                    style={{ marginTop: '-8px', marginRight: '5px' }}
                                                    onClick={() => {
                                                        navigate('/events/advertisements', {
                                                            state: {
                                                                eventId: row.id,
                                                                eventName: row.lobbyName
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Manage Theater">
                                                <img
                                                    src={theatre}
                                                    alt="Theater"
                                                    width="30"
                                                    onClick={() => {
                                                        console.log('row', row);
                                                        setEventData(row);
                                                        setTheaterData(row.Theater);
                                                        setTheaterOpen(true);
                                                    }}
                                                />
                                            </Tooltip>

                                            <Tooltip placement="top" title="Event Detail">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="detail"
                                                    size="medium"
                                                    onClick={() => {
                                                        setEventData(row);
                                                        setType(row.currencyType);
                                                        setEventDetailOpen(true);
                                                    }}
                                                >
                                                    <VisibilityOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip placement="top" title="Edit">
                                                <IconButton
                                                    disabled={!row.isEvent}
                                                    color="primary"
                                                    aria-label="Edit"
                                                    size="medium"
                                                    onClick={() => {
                                                        console.log('row', row);
                                                        setLoader(false);
                                                        setEventDetail({
                                                            name: row.lobbyName,
                                                            price: row.ticketPrice,
                                                            description: row.description,
                                                            collectionAddress: row.collectionAddress,
                                                            eventImage: null,
                                                            startTime: row.startTime,
                                                            endTime: row.endTime,
                                                            brand: row.BrandId
                                                        });
                                                        setEventId(row.id);
                                                        setIsUpdate(true);
                                                        setEventEditOpen(true);
                                                    }}
                                                >
                                                    <EditOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Delete">
                                                <IconButton
                                                    // disabled={!row.isEvent}
                                                    color="primary"
                                                    sx={{
                                                        color: theme.palette.orange.dark,
                                                        borderColor: theme.palette.orange.main,
                                                        '&:hover ': { background: theme.palette.orange.light }
                                                    }}
                                                    size="medium"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setEventId(row.id);
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
                                            sx={{ padding: '0px 8px' }}
                                            className="customMenuClass"
                                        >
                                            {/* <Stack direction="column" justifyContent="center" alignItems="center">
                                                {/* <Tooltip
                                                    placement="top"
                                                    title={selectedRow?.isActive ? 'Deactivate Event' : 'Active Event'}
                                                > */}
                                            <MenuItem
                                                onClick={() => {
                                                    console.log('onClicked');
                                                    dispatch(
                                                        changeEventStatus({
                                                            id: selectedRow.id,
                                                            page: page,
                                                            limit: limit,
                                                            search: search
                                                        })
                                                    );
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton
                                                        disabled={!selectedRow?.isEvent}
                                                        color={selectedRow?.isActive ? 'primary' : 'error'}
                                                        aria-label="delete"
                                                        size="medium"
                                                    >
                                                        <BlockIcon
                                                            color={selectedRow?.isActive ? 'primary' : 'error'}
                                                            sx={{ fontSize: '1.5rem' }}
                                                        />
                                                    </IconButton>
                                                    <p>{selectedRow?.isActive ? 'Deactivate Event' : 'Activate Event'}</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Manage Advertisement"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    navigate('/events/advertisements', {
                                                        state: {
                                                            eventId: selectedRow.id,
                                                            eventName: selectedRow.lobbyName
                                                        }
                                                    });
                                                    handleClick();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton>
                                                        <FeaturedVideoIcon color="primary" />
                                                    </IconButton>
                                                    {/* <img
                                                        src={advertisement}
                                                        alt="Advertisement"
                                                        width="30"
                                                        // style={{ marginTop: '-8px', marginRight: '5px' }}
                                                        onClick={() => {
                                                            navigate('/events/advertisements', {
                                                                state: {
                                                                    eventId: selectedRow.id,
                                                                    eventName: selectedRow.lobbyName
                                                                }
                                                            });
                                                        }}
                                                    /> */}
                                                    <p>Manage Advertisement</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Manage Theater"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    console.log('selectedRow', selectedRow);
                                                    setEventData(selectedRow);
                                                    setTheaterData(selectedRow.Theater);
                                                    setTheaterOpen(true);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton>
                                                        <TheatersIcon color="primary" />
                                                    </IconButton>
                                                    {/* <img
                                                        src={theatre}
                                                        alt="Theater"
                                                        width="30"
                                                        onClick={() => {
                                                            console.log('selectedRow', selectedRow);
                                                            setEventData(selectedRow);
                                                            setTheaterData(selectedRow.Theater);
                                                            setTheaterOpen(true);
                                                        }}
                                                    /> */}
                                                    <p>Manage Theater</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Event Detail"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    setEventData(selectedRow);
                                                    setType(selectedRow.currencyType);
                                                    setEventDetailOpen(true);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton color="primary" aria-label="detail" size="medium">
                                                        <VisibilityOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Event Detail</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Edit"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    console.log('selectedRow', selectedRow);
                                                    setLoader(false);
                                                    setEventDetail({
                                                        name: selectedRow.lobbyName,
                                                        price: selectedRow.ticketPrice,
                                                        description: selectedRow.description,
                                                        collectionAddress: selectedRow.collectionAddress,
                                                        eventImage: null,
                                                        startTime: selectedRow.startTime,
                                                        endTime: selectedRow.endTime,
                                                        brand: selectedRow.BrandId
                                                    });
                                                    setEventId(selectedRow.id);
                                                    setIsUpdate(true);
                                                    setEventEditOpen(true);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton
                                                        disabled={!selectedRow?.isEvent}
                                                        color="primary"
                                                        aria-label="Edit"
                                                        size="medium"
                                                    >
                                                        <EditOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Edit</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Delete"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    setOpen(true);
                                                    setEventId(selectedRow.id);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <IconButton
                                                        // disabled={!selectedRow.isEvent}
                                                        color="primary"
                                                        sx={{
                                                            color: theme.palette.orange.dark,
                                                            borderColor: theme.palette.orange.main,
                                                            '&:hover ': { background: theme.palette.orange.light }
                                                        }}
                                                        size="medium"
                                                    >
                                                        <DeleteOutlineOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Delete</p>
                                                </div>
                                            </MenuItem>
                                            {/* </Tooltip> */}
                                            {/* </Stack> */}
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

export default EventTable;
