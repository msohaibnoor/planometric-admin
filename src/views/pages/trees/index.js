import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../utils/axios';
import { toast } from 'react-toastify';
// import FileInput from "./components/FileInput";

const index = () => {
    const token = useSelector((state) => state.auth.token);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(false);
    const handleFile = (e) => {
        if (e.currentTarget.files[0].name.split('.')[1] !== 'csv') {
            return;
        }
        setFile(e.currentTarget.files[0]);
        setFileError(false);
    };

    const fileUpload = async () => {
        if (!file || file?.name.split('.')[1] !== 'csv') {
            setFileError(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post(`${API_URL}admin/fileUpload`, formData, {
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
    return (
        <div>
            <h1>Update Trees database</h1>
            <form>
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
                    helperText="Only .csv files allowed"
                />
                <div>
                    <Button variant="contained" size="small" onClick={fileUpload} sx={{ marginTop: '25px' }}>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default index;
