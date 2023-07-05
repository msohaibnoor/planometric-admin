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
    Typography,
    Menu,
    MenuItem
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteSubCategoryDialog from './deleteSubCategoryDialog';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import moment from 'moment';
import NftStatusDialog from './NftStatusDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { padding } from '@mui/system';
const SubCategoryTable = ({
    subCategoryList,
    page,
    limit,
    search,
    mainBrandId,
    mainCategoryId,
    setAddUpdateOpen,
    setSubCategoryData,
    setType
}) => {
    const theme = useTheme();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [subCategoryId, setSubCategoryId] = useState();
    const [changeStatusOpen, setChangeStatusOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleClick = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(subCategoryList);
    return (
        <TableContainer>
            <NftStatusDialog
                open={changeStatusOpen}
                setOpen={setChangeStatusOpen}
                page={page}
                limit={limit}
                search={search}
                subCategoryId={subCategoryId}
                mainBrandId={mainBrandId}
                mainCategoryId={mainCategoryId}
                dialogContent={dialogContent}
            />
            <DeleteSubCategoryDialog
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                subCategoryId={subCategoryId}
                mainBrandId={mainBrandId}
                mainCategoryId={mainCategoryId}
                page={page}
                limit={limit}
                search={search}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Total NFT'S</TableCell>
                        <TableCell align="center">Brand Name</TableCell>
                        <TableCell align="center">Category Name</TableCell>
                        <TableCell align="center">NFT Name</TableCell>
                        <TableCell align="center">NFT Price</TableCell>
                        <TableCell align="center">NFT Description</TableCell>
                        <TableCell align="center">Created / Updated</TableCell>
                        {/* <TableCell align="center">Updated At</TableCell> */}
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subCategoryList &&
                        subCategoryList.subCategories &&
                        subCategoryList.subCategories.length > 0 &&
                        subCategoryList.subCategories.map((row, index) => (
                            <>
                                <TableRow>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Nfts && row.Nfts.length}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Category.Brand.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Category.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        <Tooltip placement="top" title={row.nftName}>
                                            <Typography>{row.nftName.slice(0, 10) + '...'}</Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.nftPrice} {row.currencyType}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        <Tooltip placement="top" title={row.nftDescription}>
                                            <Typography>{row.nftDescription.slice(0, 15) + '...'}</Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(row.createdAt).format('DD-MM-YY')} / {moment(row.updatedAt).format('DD-MM-YY')}{' '}
                                    </TableCell>
                                    {/* <TableCell align="center">{moment(row.updatedAt).format('DD-MM-YYYY')}</TableCell> */}
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {/* <Tooltip placement="top" title="View NFT'S">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Edit"
                                                    size="large"
                                                    onClick={() => {
                                                        navigate('/editTeacher/', {
                                                            state: {
                                                                id: row.id
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <VisibilityOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                                </IconButton>
                                            </Tooltip> */}
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
                                            {/* <Tooltip
                                                    placement="top"
                                                    title={row.areNftsActive ? 'Hide All NFTS from shop' : 'Show All NFTS on shop'}
                                                > */}
                                            <MenuItem
                                                onClick={() => {
                                                    if (row.areNftsActive) {
                                                        setDialogContent(
                                                            "Are you sure you want to hide all NFT's from shop of this subcategory?"
                                                        );
                                                    } else {
                                                        setDialogContent(
                                                            "Are you sure you want to Show all NFT's on shop of this subcategory?"
                                                        );
                                                    }
                                                    setChangeStatusOpen(true);
                                                    setSubCategoryId(selectedRow.id);
                                                    handleClose();
                                                }}
                                            >
                                                <div className="actionItem">
                                                    <PowerSettingsNewOutlinedIcon
                                                        color={row.areNftsActive ? 'primary' : 'error'}
                                                        fontSize="medium"
                                                        sx={{ cursor: 'pointer' }}
                                                    />
                                                    <p>{row.areNftsActive ? 'Hide All NFTS from shop' : 'Show All NFTS on shop'}</p>
                                                </div>
                                            </MenuItem>

                                            {/* </Tooltip> */}
                                            {/* <Tooltip placement="top" title="Edit"> */}
                                            <MenuItem
                                                onClick={() => {
                                                    setSubCategoryData({
                                                        name: selectedRow.name,
                                                        nftName: selectedRow.nftName,
                                                        nftPrice: selectedRow.nftPrice,
                                                        nftDescription: selectedRow.nftDescription,
                                                        subCategoryId: selectedRow.id
                                                    });
                                                    setType(selectedRow.currencyType);
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
                                                    setSubCategoryId(selectedRow.id);
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

export default SubCategoryTable;
