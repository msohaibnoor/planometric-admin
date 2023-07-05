import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem } from '@mui/material';
// import FileInput from "./components/FileInput";

const index = () => {
  return (
    <div>
      <h1>Update Excel File</h1>
      <form>
      {/* <FileInput label="Attachment" error={null} /> */}
      <TextField
        sx={{ marginTop: '25px' }}
        id="walletAddress"
        name="walletAddress"
        label="Select file"
        type='file'
        
                            // value={formik.values.walletAddress}
                            // onChange={formik.handleChange}
                            // error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                            // helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                            // fullWidth
                            autoComplete="given-name"
      />
      <div>

       <Button
          variant="contained"
          size="small"
          onClick={() => {
                            formik.handleSubmit();
          }}
        sx={{ marginTop: '25px' }}

        >
          Update
        </Button>
      </div>

      </form>
    </div>
  )
}

export default index