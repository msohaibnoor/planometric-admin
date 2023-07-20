import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem, Input } from '@mui/material';
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
            {/* <FileInput label={'Select file'} onChange={handleFile} error={fileError} /> */}
            <h1>Update Grasshopper script</h1>
            <form>
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
                    helperText='only .gh files allowed'
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
        </div>
    );
};

export default index;
