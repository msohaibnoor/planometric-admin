import { useState } from 'react';
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
    Link,
    Menu,
    MenuItem
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteBrandDialog from './deleteBrandDialog';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const BrandTable = ({ brandsList, page, limit, search, setOpen, setBrandName, setAddUpdateOpen, brandId, setBrandId }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleCopyToClipboard = (address) => {
        navigator.clipboard.writeText(address);
        setCopied(true);
    };

    const handleClick = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <TableContainer>
            <DeleteBrandDialog
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                brandId={brandId}
                page={page}
                limit={limit}
                search={search}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Contract Address</TableCell>
                        <TableCell align="center">Total NFT'S</TableCell>
                        <TableCell align="center">Created / Updated</TableCell>
                        {/* <TableCell align="center">Updated At</TableCell> */}
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brandsList &&
                        brandsList.brands &&
                        brandsList.brands.length > 0 &&
                        brandsList.brands.map((row, index) => (
                            <>
                                <TableRow>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {/* {row.contractAddress} */}
                                        <Link
                                            target="_blank"
                                            href={`https://polygonscan.com/address/${row.contractAddress}`}
                                            underline="none"
                                        >
                                            {row.contractAddress.slice(0, 5) + '...' + row.contractAddress.slice(37, 42)}
                                        </Link>

                                        <Tooltip placement="top" title={copied ? 'Copied' : 'Copy contract address'}>
                                            <IconButton
                                                onClick={() => handleCopyToClipboard(row.contractAddress)}
                                                onMouseLeave={() => setCopied(false)}
                                                sx={{ marginLeft: '5px' }}
                                            >
                                                <ContentCopyRoundedIcon sx={{ cursor: 'pointer', width: '0.8em', height: '0.8em' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Nfts && row.Nfts.length}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(row.createdAt).format('DD-MM-YY')} / {moment(row.updatedAt).format('DD-MM-YY')}
                                    </TableCell>
                                    {/* <TableCell align="center">{moment(row.updatedAt).format('DD-MM-YYYY')}</TableCell> */}
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {/* <Stack direction="row" justifyContent="center" alignItems="center">
                                            <Tooltip placement="top" title="Edit">
                                                <IconButton
                                                    disabled={row.Nfts && row.Nfts.length > 0 ? true : false}
                                                    color="primary"
                                                    aria-label="Edit"
                                                    size="large"
                                                    onClick={() => {
                                                        setBrandName(row.name);
                                                        setBrandId(row.id);
                                                        setAddUpdateOpen(true);
                                                    }}
                                                >
                                                    <EditOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Delete">
                                                <IconButton
                                                    disabled={row.Nfts && row.Nfts.length > 0 ? true : false}
                                                    color="primary"
                                                    sx={{
                                                        color: theme.palette.orange.dark,
                                                        borderColor: theme.palette.orange.main,
                                                        '&:hover ': { background: theme.palette.orange.light }
                                                    }}
                                                    size="large"
                                                    onClick={() => {
                                                        setDeleteOpen(true);
                                                        setBrandId(row.id);
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
                                            {/* <Stack
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                gap={'5px'}
                                                sx={{ padding: '0px 8px' }}
                                            > */}
                                            {/* <Tooltip placement="top" title="Edit"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    setBrandName(selectedRow.name);
                                                    setBrandId(selectedRow.id);
                                                    setAddUpdateOpen(true);
                                                    handleClose();
                                                }}
                                                disabled={selectedRow?.Nfts && selectedRow?.Nfts?.length > 0 ? true : false}
                                            >
                                                <div className="actionItem">
                                                    <IconButton color="primary" aria-label="Edit" size="large" sx={{ padding: '0px' }}>
                                                        <EditOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                    <p>Edit</p>
                                                </div>
                                            </MenuItem>

                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Delete"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    setDeleteOpen(true);
                                                    setBrandId(selectedRow.id);
                                                    handleClose();
                                                }}
                                                disabled={selectedRow?.Nfts && selectedRow?.Nfts?.length > 0 ? true : false}
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

export default BrandTable;
