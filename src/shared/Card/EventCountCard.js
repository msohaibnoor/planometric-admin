import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography } from '@mui/material';

// styles
const IconWrapper = styled('div')({
    position: 'absolute',
    left: '-17px',
    bottom: '-27px',
    color: '#fff',
    transform: 'rotate(25deg)',
    '&> svg': {
        width: '100px',
        height: '100px',
        opacity: '0.35'
    }
});

// =============================|| USER NUM CARD ||============================= //

const EventCountCard = ({ primary, secondary, iconPrimary, color }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card sx={{ background: color, position: 'relative', color: '#fff' }}>
            <CardContent>
                <IconWrapper>{primaryIcon}</IconWrapper>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item sm={12}>
                        <Typography variant="h3" align="center" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1" align="center" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

EventCountCard.propTypes = {
    primary: PropTypes.object,
    secondary: PropTypes.number,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default EventCountCard;
