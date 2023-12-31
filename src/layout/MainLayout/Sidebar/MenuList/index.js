// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menuItem.items.map((filteredItem, index) => {
        switch (filteredItem.type) {
            case 'group':
                return <NavGroup key={filteredItem.id} item={filteredItem} />;

            default:
                return (
                    <Typography key={filteredItem.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
