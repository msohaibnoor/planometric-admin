import { Box, Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import { gridSpacing } from 'store/constant';

// constant

// ==============================|| CUSTOM MAIN CARD ||============================== //

const HeadingCard = forwardRef(({ title, role, value, setValue, options,marginTop }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                marginBottom: theme.spacing(gridSpacing),
                border: '1px solid',
                borderColor: theme.palette.primary[200] + 75,
                background: theme.palette.background.default,
                marginTop:marginTop ?? "0px"
            }}
        >
            <Box sx={{ p: 2, pl: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue' }}>
                            {title}
                        </Typography>
                    </Grid>
                    {value !== undefined && (
                        <Grid item>
                            {options && (role == 'teacher' || role == 'super_admin') && (
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    sx={{ width: '150px' ,height:'44px'}}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Card>
    );
});

export default HeadingCard;
