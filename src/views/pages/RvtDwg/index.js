import React from 'react';
import axios from 'axios';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { API_URL } from '../../../utils/axios';
import { toast } from 'react-toastify';
// import FileInput from "./components/FileInput";

const index = () => {
    const token = useSelector((state) => state.auth.token);
    const [file, setFile] = useState(null);
    const [dwgFile, setDwgFile] = useState(null);
    const [fileError, setFileError] = useState(false);
    const [dwgFileError, setDwgFileError] = useState(false);
    const handleFile = (e) => {
        if (e.currentTarget.files[0].name.split('.')[1] !== 'rvt') {
            return;
        }
        setFile(e.currentTarget.files[0]);
        setFileError(false);
    };
    const handleDwgFile = (e) => {
        if (e.currentTarget.files[0].name.split('.')[1] !== 'dwg') {
            return;
        }
        setDwgFile(e.currentTarget.files[0]);
        setDwgFileError(false);
    };

    const revitFileUpload = async () => {
        if (!file || file?.name.split('.')[1] !== 'rvt') {
            setFileError(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post(`${API_URL}/admin/revit-upload`, formData, {
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
    const dwgFileUpload = async () => {
        console.log()
        if (!dwgFile || dwgFile?.name.split('.')[1] !== 'dwg') {
            setDwgFileError(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', dwgFile);
            const { data } = await axios.post(`${API_URL}/admin/dwg-upload`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            toast.success(data.data.message);
            setDwgFile(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await axios.get(`${API_URL}/admin/files/download-grasshopper-script?fileToDownload=${fileName}`, {
                responseType: 'arraybuffer',
                headers: {
                    Authorization: `Bearer ${token}` // Replace YOUR_BEARER_TOKEN with the actual token
                }
            });
            console.log(response);
            const blob = new Blob([response.data], { type: 'application/octet-stream' });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a hidden anchor tag and trigger the download
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName == "revitSample" ? "planometric-revit-sample.rvt" : 'planometric-dwg-sample.dwg'; // Replace 'file.3dm' with the desired filename
            document.body.appendChild(a);
            a.click();

            // Clean up the temporary URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Couldn't find the file on server!");

            console.error('Error downloading the .3dm file:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };
    return (
        <>
            <Grid display="flex" justifyContent={'center'} alignItems={'center'} gap={'30px'}>
                <form>
                    <h1>Update Revit Sample file</h1>
                    {/* <FileInput label="Attachment" error={null} /> */}
                    <TextField
                        sx={{ marginTop: '25px' }}
                        id="walletAddress"
                        name="walletAddress"
                        label="Select file"
                        type="file"
                        // value={formik.values.walletAddress}
                        // onChange={formik.handleChange}
                        // error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                        // helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                        // fullWidth
                        autoComplete="given-name"
                        focused={true}
                        error={fileError}
                        onChange={handleFile}
                        helperText="Only .rvt files allowed"
                    />
                    <div>
                        <Button variant="contained" size="small" onClick={revitFileUpload} sx={{ marginTop: '25px' }}>
                            Update
                        </Button>
                    </div>
                </form>
                <Button variant="contained" size="large" onClick={() => handleDownload("revitSample")}>
                    Download Current File
                </Button>
            </Grid>
            <Grid display="flex" justifyContent={'center'} alignItems={'center'} gap={'30px'}>
                <form>
                    <h1>Update (.dwg) Sample file</h1>
                    {/* <FileInput label="Attachment" error={null} /> */}
                    <TextField
                        sx={{ marginTop: '25px' }}
                        id="walletAddress"
                        name="walletAddress"
                        label="Select file"
                        type="file"
                        // value={formik.values.walletAddress}
                        // onChange={formik.handleChange}
                        // error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                        // helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                        // fullWidth
                        autoComplete="given-name"
                        focused={true}
                        error={dwgFileError}
                        onChange={handleDwgFile}
                        helperText="Only .dwg files allowed"
                    />
                    <div>
                        <Button variant="contained" size="small" onClick={dwgFileUpload} sx={{ marginTop: '25px' }}>
                            Update
                        </Button>
                    </div>
                </form>
                <Button variant="contained" size="large" onClick={() => handleDownload('dwgSample')}>
                    Download Current File
                </Button>
            </Grid>
        </>
    );
};

export default index;