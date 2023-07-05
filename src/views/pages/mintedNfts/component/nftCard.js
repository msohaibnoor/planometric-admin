import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, CardContent, CardMedia, Grid, Tooltip, Stack, Typography, Switch } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import NftDetailDialog from '../../marketPlace/nfts/component/nftDetailDialog';
import MainCard from '../../marketPlace/nfts/component/mainCard';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { changeStatusInMarketplace } from '../../../../redux/nft/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NftCard = ({ name, asset, description, price, nftCount, nftData, page, limit, type, brandId, categoryId, subCategoryId }) => {
    const dispatch = useDispatch();
    const [openNftDetail, setOpenNftDetail] = useState(false);
    const [nftDetails, setNftDetails] = useState({});
    const handleChange = (id) => {
        dispatch(
            changeStatusInMarketplace({
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
    return (
        <>
            <NftDetailDialog open={openNftDetail} setOpen={setOpenNftDetail} nftDetails={nftDetails && nftDetails} />

            <MainCard
                content={false}
                boxShadow
                sx={{
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                <CardMedia sx={{ height: 220 }} image={asset} />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                {name ? name : 'Title to be added'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} textAlign="end">
                            {(nftData.isListedOnMarketPlace == true || nftData.mintType == 'lazyMint') && (
                                <Tooltip placement="top" title={nftData.isActive ? 'Hide from shop' : 'Show on shop'}>
                                    <PowerSettingsNewOutlinedIcon
                                        color={nftData.isActive ? 'primary' : 'error'}
                                        fontSize="medium"
                                        disabled={nftData.mintType !== null ? false : true}
                                        sx={{ marginTop: '-5px', cursor: 'pointer' }}
                                        onClick={() => {
                                            if (nftData.mintType !== null) {
                                                handleChange(nftData.id);
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
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                sx={{
                                    overflow: 'hidden',
                                    height: 45
                                }}
                            >
                                {description ? description : 'Desciption to be added...'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Grid container spacing={1} mt={-1}>
                                    <Grid item xs={4}>
                                        <Typography variant="h5">{price} matic</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h5">{nftCount} Items</Typography>
                                    </Grid>
                                    <Grid item xs={4} textAlign={'end'} mt={-1}>
                                        <Button
                                            variant="contained"
                                            sx={{ minWidth: 0, marginRight: '4px' }}
                                            onClick={() => {
                                                setOpenNftDetail(true);
                                                setNftDetails(nftData);
                                            }}
                                        >
                                            <VisibilityOutlinedIcon fontSize="small" />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default NftCard;
