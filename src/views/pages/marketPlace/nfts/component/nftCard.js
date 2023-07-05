import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, CardContent, CardMedia, Grid, Stack, Typography, Tooltip, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
// project import
import MainCard from './mainCard';
// assets
import auction from 'assets/images/auction.svg';
import MintNftDialog from './mintNftDialog';
import DeleteNftDialog from './deleteNftDialog';
import NftDetailDialog from './nftDetailDialog';
import NftAuctionDialog from './nftAuctionDialog';
import { changeStatus } from '../../../../../redux/nft/actions';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHoriz';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NftCard = ({ nftData, handleCheckBox, isChecked, showCheckBox, page, limit, type, brandId, categoryId, subCategoryId }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openMint, setOpenMint] = useState(false);
    const [openNftDetail, setOpenNftDetail] = useState(false);
    const [openAuction, setOpenAuction] = useState(false);
    const [nftId, setNftId] = useState();
    const [nftDetails, setNftDetails] = useState({
        name: '',
        description: '',
        price: '',
        currencyType: ''
    });

    const handleChange = (id) => {
        dispatch(
            changeStatus({
                id: id,
                page: page,
                limit: limit,
                type: type,
                brandId: brandId,
                categoryId: categoryId,
                subCategoryId: subCategoryId
            })
        );
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const id = nftData.id;
    const nftCount = nftData.NftTokens.length;
    const asset = nftData.asset;
    const name = nftData.name;
    const description = nftData.description;
    const price = nftData.price;
    const currencyType = nftData.currencyType;
    const mintType = nftData.mintType;
    const isActive = nftData.isActive;
    const isListedOnMarketPlace = nftData.isListedOnMarketPlace;

    return (
        <>
            <NftAuctionDialog
                open={openAuction}
                setOpen={setOpenAuction}
                nftData={nftData}
                brand={brandId}
                category={categoryId}
                subCategory={subCategoryId}
                type={type}
                page={page}
                limit={limit}
            />
            <NftDetailDialog open={openNftDetail} setOpen={setOpenNftDetail} nftDetails={nftDetails} />
            <DeleteNftDialog
                open={openDelete}
                setOpen={setOpenDelete}
                nftId={nftId}
                brandId={brandId}
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                page={page}
                limit={limit}
                type={type}
            />
            <MintNftDialog
                open={openMint}
                setOpen={setOpenMint}
                page={page}
                limit={limit}
                type={type}
                brandId={brandId}
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                loader={loader}
                setLoader={setLoader}
                nftData={nftData}
            />

            <MainCard
                content={false}
                boxShadow
                sx={{
                    position: 'relative',
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                {showCheckBox && (
                    // <Checkbox
                    //     checked={isChecked}
                    //     className="customCheckBox"
                    //     style={{ position: 'absolute' }}
                    //     color='primary'
                    //     onChange={() => {
                    //         const tokenIds = nftData.NftTokens.map((item) => {
                    //             return parseInt(item.tokenId);
                    //         });

                    //         let data = {
                    //             nftId: nftData.id,
                    //             tokenIds: tokenIds
                    //         };
                    //         handleCheckBox(data);
                    //     }}
                    //     name="checked"
                    // />
                    <input
                        name="checked"
                        type="checkbox"
                        id="checkbox-1-1"
                        class="custom-checkbox"
                        checked={isChecked}
                        onChange={() => {
                            const tokenIds = nftData.NftTokens.map((item) => {
                                return parseInt(item.tokenId);
                            });

                            let data = {
                                nftId: nftData.id,
                                tokenIds: tokenIds
                            };
                            handleCheckBox(data);
                        }}
                    />
                )}
                {mintType == null && (
                    <Grid item>
                        <IconButton size="small" sx={{ mt: -0.1, mr: -1.5, right: '20px', position: 'absolute' }}>
                            <MoreHorizOutlinedIcon
                                fontSize="large"
                                color="black"
                                aria-controls="menu-friend-card"
                                aria-haspopup="true"
                                sx={{ opacity: 1.6 }}
                                onClick={handleClick}
                                className="nftCardMoreHorizIcon"
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
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    setNftId(id);
                                    setLoader(false);
                                    setOpenMint(true);
                                }}
                            >
                                Mint
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setNftId(id);
                                    setOpenDelete(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                    </Grid>
                )}

                <CardMedia sx={{ height: 220 }} image={asset} />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                {name ? name : 'Title to be added'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} textAlign="end">
                            {(isListedOnMarketPlace == true || mintType == 'lazyMint') && (
                                <Tooltip placement="top" title={isActive ? 'Hide from shop' : 'Show on shop'}>
                                    <PowerSettingsNewOutlinedIcon
                                        color={isActive ? 'primary' : 'error'}
                                        fontSize="medium"
                                        disabled={mintType !== null ? false : true}
                                        sx={{ marginTop: '-5px', cursor: 'pointer' }}
                                        onClick={() => {
                                            if (mintType !== null) {
                                                handleChange(id);
                                            } else {
                                                toast.error('Minted NFT status can be changed only');
                                            }
                                        }}
                                    />
                                </Tooltip>
                            )}
                            {/* {mintType !== null && isListedOnMarketPlace == false && (
                                <Tooltip placement="top" title="Set it on auction">
                                    <img
                                        src={auction}
                                        alt="Auction"
                                        width="30"
                                        onClick={() => {
                                            setOpenAuction(true);
                                        }}
                                    />
                                </Tooltip>
                            )} */}
                        </Grid>

                        <Grid item xs={12} mt={-1.5}>
                            <Tooltip placement="top" title={description ? description : 'Description to be added...'}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        overflow: 'hidden',
                                        height: 30
                                    }}
                                >
                                    {description
                                        ? description.length > 30
                                            ? description.slice(0, 30) + '...'
                                            : description
                                        : 'Description to be'}
                                </Typography>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    {price} {currencyType}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">{nftCount} Items</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack direction="row" justifyContent="end" alignItems="center">
                                <Button
                                    variant="text"
                                    color="primary"
                                    sx={{ marginRight: '5px' }}
                                    onClick={() => {
                                        setOpenNftDetail(true);
                                        setNftDetails(nftData);
                                    }}
                                >
                                    <Typography style={{ textDecoration: 'underline' }}> Details</Typography>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default NftCard;
