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
    Menu,
    MenuItem
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteCategoryDialog from './deleteCategoryDialog';
import moment from 'moment';
const CategoryTable = ({
    categoryList,
    page,
    limit,
    search,
    categoryData,
    setCategoryData,
    setAddUpdateOpen,
    categoryId,
    setCategoryId
}) => {
    const theme = useTheme();
    const [deleteOpen, setDeleteOpen] = useState(false);
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
            <DeleteCategoryDialog
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                categoryId={categoryId}
                categoryData={categoryData}
                page={page}
                limit={limit}
                search={search}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Total NFT'S</TableCell>
                        <TableCell align="center">Brand</TableCell>
                        <TableCell align="center">Created / Updated</TableCell>
                        {/* <TableCell align="center">Updated At</TableCell> */}
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoryList &&
                        categoryList.categories &&
                        categoryList.categories.length > 0 &&
                        categoryList.categories.map((row, index) => (
                            <>
                                <TableRow
                                    onClick={() => {
                                        console.log('nfts', row);
                                    }}
                                >
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Nfts && row.Nfts.length}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '0px' }}>
                                        {row.Brand.name}
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
                                                        console.log('row', row);
                                                        setCategoryData({
                                                            name: row.name,
                                                            brandId: row.BrandId
                                                        });
                                                        setCategoryId(row.id);
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
                                                        setCategoryId(row.id);
                                                        setCategoryData({
                                                            name: row.name,
                                                            brandId: row.BrandId
                                                        });
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
                                                    console.log('selectedRow', selectedRow);
                                                    setCategoryData({
                                                        name: selectedRow.name,
                                                        brandId: selectedRow.BrandId
                                                    });
                                                    setCategoryId(selectedRow.id);
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
                                                    setCategoryId(selectedRow.id);
                                                    setCategoryData({
                                                        name: selectedRow.name,
                                                        brandId: selectedRow.BrandId
                                                    });
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

export default CategoryTable;
