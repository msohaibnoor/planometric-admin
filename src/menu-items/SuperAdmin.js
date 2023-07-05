// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconUserCheck, IconReceipt2, IconClipboardList } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconReceipt2,
    IconClipboardList
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const superAdminMenu = {
    id: 'super_admin',
    // title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'Users',
            title: <FormattedMessage id="users" />,
            type: 'item',
            url: '/users',
            icon: icons.IconUserCheck,
            breadcrumbs: false
        },
        // {
        //     id: 'Events',
        //     title: <FormattedMessage id="events" />,
        //     type: 'item',
        //     url: '/events',
        //     icon: icons.IconReceipt2,
        //     breadcrumbs: false
        // },
        {
            id: 'Municipalities',
            title: <FormattedMessage id="municipalities" />,
            type: 'item',
            url: '/municipalities',
            icon: icons.IconReceipt2,
            breadcrumbs: false
        },
        {
            id: 'Grasshopper',
            title: <FormattedMessage id="grasshopper" />,
            type: 'item',
            url: '/grasshopper',
            icon: icons.IconReceipt2,
            breadcrumbs: false
        },
        {
            id: 'Excel',
            title: <FormattedMessage id="excel" />,
            type: 'item',
            url: '/excel',
            icon: icons.IconReceipt2,
            breadcrumbs: false
        }
        // {
        //     id: 'nftManagement',
        //     title: <FormattedMessage id="nftManagement" />,
        //     type: 'collapse',

        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'nfts',
        //             title: <FormattedMessage id="nfts" />,
        //             type: 'item',
        //             url: '/marketPlace/nfts',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'Brand Management',
        //             title: <FormattedMessage id="Brand Management" />,
        //             type: 'item',
        //             url: '/marketPlace/brandManagement',
        //             breadcrumbs: false
        //         },

        //         // {
        //         //     id: 'brand',
        //         //     title: <FormattedMessage id="brand" />,
        //         //     type: 'item',
        //         //     url: '/marketPlace/brands',
        //         //     breadcrumbs: false
        //         // },
        //         // {
        //         //     id: 'category',
        //         //     title: <FormattedMessage id="category" />,
        //         //     type: 'item',
        //         //     url: '/marketPlace/categories',
        //         //     breadcrumbs: false
        //         // },
        //         // {
        //         //     id: 'subCategory',
        //         //     title: <FormattedMessage id="subCategory" />,
        //         //     type: 'item',
        //         //     url: '/marketPlace/subCategories',
        //         //     breadcrumbs: false
        //         // },

        //         {
        //             id: 'MarketPlace',
        //             title: <FormattedMessage id="marketPlace" />,
        //             type: 'item',
        //             url: '/marketPlace',

        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'soldNft',
        //             title: <FormattedMessage id="saledNFT" />,
        //             type: 'item',
        //             url: '/soldNFT',

        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default superAdminMenu;
