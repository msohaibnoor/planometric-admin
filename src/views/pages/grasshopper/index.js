import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem, Input, Grid } from '@mui/material';
import FileInput from './components/FileInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const index = () => {
    const token = useSelector((state) => state.auth.token);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(false);
    const handleFile = (e) => {
        if (e.currentTarget.files[0]?.name?.split('.')[1] !== 'gh') {
            return;
        }
        setFile(e.currentTarget.files[0]);
        setFileError(false);
    };

    const fileUpload = async () => {
        if (!file || file?.name.split('.')[1] !== 'gh') {
            setFileError(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post(`${API_URL}/admin/gh-upload`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            toast.success(data.data.message);
            setFile(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/files/download-grasshopper-script?fileToDownload=grasshopper`, {
                responseType: 'json',
                headers: {
                    Authorization: `Bearer ${token}` // Replace YOUR_BEARER_TOKEN with the actual token
                }
            });
           
            const byteCharacters = atob(response?.data?.data?.pdfFile);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = response.data.data.fileName; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Couldn't find the file on server!");
            console.error('Error downloading the .3dm file:', error);
        }
    };
    return (
        <Grid display="flex" justifyContent={'center'} alignItems={'center'} gap={'30px'}>
            {/* <FileInput label={'Select file'} onChange={handleFile} error={fileError} /> */}
            <form>
                <h1>Update Grasshopper script</h1>
                <TextField
                    sx={{ marginTop: '25px' }}
                    id="walletAddress"
                    name="walletAddress"
                    label="Select script"
                    type="file"
                    // value={formik.values.walletAddress}
                    // onChange={formik.handleChange}
                    // error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                    // helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                    // fullWidth
                    error={fileError}
                    autoComplete="given-name"
                    focused={true}
                    onChange={handleFile}
                    helperText="only .gh files allowed"
                />

                <div>
                    <Button
                        variant="contained"
                        size="small"
                        // onClick={() => {
                        //     formik.handleSubmit();
                        // }}
                        onClick={fileUpload}
                        sx={{ marginTop: '25px' }}
                    >
                        Update
                    </Button>
                </div>
            </form>
            <Button variant="contained" size="large" onClick={handleDownload}>
                Download Current File
            </Button>
        </Grid>
    );
};

export default index;
