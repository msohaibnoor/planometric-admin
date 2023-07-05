import { forwardRef, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loader-spinner';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { addBrand, updateBrand, checkBrandNameAvailability } from '../../../../../redux/marketPlace/actions';
import KwikTrustFactoryAbi from '../../../../../contractAbi/KwikTrustFactory.json';
import KwikTrustFactoryAddress from '../../../../../contractAbi/KwikTrustFactory-address.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddUpdateBrandDialog({ addUpdateOpen, setAddUpdateOpen, page, limit, search, brandName, setBrandName, brandId }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.auth.walletAddress);
    const [loader, setLoader] = useState(false);
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Brand Name is required!')
            .max(50, 'Brand Name can not exceed 50 characters')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Brand name')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: brandName
        },
        validationSchema,
        onSubmit: (values) => {
            setLoader(true);
            if (brandName == '') {
                dispatch(
                    checkBrandNameAvailability({
                        name: values.name,
                        setLoader: setLoader,
                        handleContractDeployment: handleContractDeployment
                    })
                );
            } else {
                dispatch(
                    updateBrand({
                        brandId: brandId,
                        name: values.name,
                        search: search,
                        page: page,
                        limit: limit,
                        handleClose: handleClose,
                        setBrandName: setBrandName,
                        setLoader: setLoader
                    })
                );
            }
        }
    });
    const handleClose = () => {
        setLoader(false);
        setAddUpdateOpen(false);
        setBrandName('');
        formik.resetForm();
    };

    const handleContractDeployment = async () => {
        const contractName = 'KwikTrust' + ' ' + formik.values.name;
        console.log('contractNamecontractName', contractName);
        const validator = '0xBF09EE4E0F90EE3081Abe249f39a24b46298EFcf';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Set signer
        const signer = provider.getSigner();
        const symbol = 'KTX';
        const factoryAddr = new ethers.Contract(KwikTrustFactoryAddress.address, KwikTrustFactoryAbi.abi, signer);
        let res;
        try {
            res = await (
                await factoryAddr.deployMintingContract(contractName, symbol, validator)).wait();
        } catch (error) {
            console.log('error.reason', error)
            if (error.reason == "execution reverted: 0x01") {
                toast.error("Unauthorized Admin");
            } else {
                toast.error(error.message);
            }
            handleClose()
        }
        let addr = res.events[3].args[0];
        console.log(res.events[3].args[0]);
        dispatch(
            addBrand({
                contractAddress: addr,
                name: formik.values.name,
                search: search,
                page: page,
                limit: limit,
                handleClose: handleClose,
                setBrandName: setBrandName
            })
        );
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={addUpdateOpen}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">{brandName == '' ? 'Add Brand' : 'Update Brand'}</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="name"
                            name="name"
                            label="Enter Brand Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    {loader ? (
                        <Button variant="contained" size="small">
                            <Oval
                                ariaLabel="loading-indicator"
                                height={20}
                                width={20}
                                strokeWidth={5}
                                strokeWidthSecondary={1}
                                color="blue"
                                secondaryColor="white"
                            />
                        </Button>
                    ) : (
                        <>
                            <Button
                                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                                onClick={() => {
                                    handleClose();
                                }}
                                color="secondary"
                            >
                                cancel
                            </Button>

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    if (walletAddress == undefined) {
                                        handleClose();
                                        toast.error('Connect Metamask');
                                    } else {
                                        formik.handleSubmit();
                                    }
                                }}
                            >
                                {brandName == '' ? 'Add' : 'Update'}
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
