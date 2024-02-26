import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import SuperAdminGuard from './AuthGaurd';

const SuperAdminDashboard = Loadable(lazy(() => import('views/pages/dashboard')));
const Users = Loadable(lazy(() => import('views/pages/users')));
const Municipalities = Loadable(lazy(() => import('views/pages/municipalities')));
const Projects = Loadable(lazy(() => import('views/pages/projects')));
const Rhino = Loadable(lazy(() => import('views/pages/rhino')));
const Grasshopper = Loadable(lazy(() => import('views/pages/grasshopper')));
const Plants = Loadable(lazy(() => import('views/pages/plants')));
const Testimonials = Loadable(lazy(() => import('views/pages/testimonials')));
const WebsiteData = Loadable(lazy(() => import('views/pages/websitedata')));
const Queries = Loadable(lazy(() => import('views/pages/query')));
const Trees = Loadable(lazy(() => import('views/pages/trees')));
const Excel = Loadable(lazy(() => import('views/pages/excel')));
const NFTS = Loadable(lazy(() => import('views/pages/marketPlace/nfts')));
const AddNFTS = Loadable(lazy(() => import('views/pages/marketPlace/nfts/component/addNft')));
const Brands = Loadable(lazy(() => import('views/pages/marketPlace/brands')));
const Categories = Loadable(lazy(() => import('views/pages/marketPlace/categories')));
const SubCategories = Loadable(lazy(() => import('views/pages/marketPlace/subCategories')));
const BrandManagement = Loadable(lazy(() => import('views/pages/marketPlace/brandManagement')));
const Events = Loadable(lazy(() => import('views/pages/events')));
const Advertisements = Loadable(lazy(() => import('views/pages/advertisements')));
const Theater = Loadable(lazy(() => import('views/pages/theater')));
const MintedNfts = Loadable(lazy(() => import('views/pages/mintedNfts/index')));
const SaledNfts = Loadable(lazy(() => import('views/pages/soldNfts/index')));
// ==============================|| MAIN ROUTING ||============================== //

const ProtectedRoutes = {
    path: '/',
    element: (
        <SuperAdminGuard>
            <MainLayout />
        </SuperAdminGuard>
    ),
    children: [
        {
            path: '/',
            element: <SuperAdminDashboard />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/projects',
            element: <Projects />
        },
        {
            path: '/municipalities',
            element: <Municipalities />
        },
        {
            path: '/rhino',
            element: <Rhino />
        },
        {
            path: '/grasshopper',
            element: <Grasshopper />
        },
        // {
        //     path: '/excel',
        //     element: <Excel />
        // },
        {
            path: '/plants',
            element: <Plants />
        },
        {
            path: '/testimonials',
            element: <Testimonials />
        },
        {
            path: '/website-data',
            element: <WebsiteData />
        },
        {
            path: '/trees',
            element: <Trees />
        },
        {
            path: '/events',
            element: <Events />
        },
        {
            path: '/events/advertisements',
            element: <Advertisements />
        },
        {
            path: '/events/theater',
            element: <Theater />
        },
        {
            path: '/marketPlace/nfts',
            element: <NFTS />
        },
        {
            path: '/marketPlace/addNft',
            element: <AddNFTS />
        },
        {
            path: '/marketPlace/brands',
            element: <Brands />
        },
        {
            path: '/marketPlace/categories',
            element: <Categories />
        },
        {
            path: '/marketPlace/subCategories',
            element: <SubCategories />
        },
        {
            path: '/marketPlace/brandManagement',
            element: <BrandManagement />
        },

        {
            path: '/soldNFT',
            element: <SaledNfts />
        },
        {
            path: '/marketPlace',
            element: <MintedNfts />
        },
        {
            path: '/contact-us-queries',
            element: <Queries />
        },
    ]
};

export default ProtectedRoutes;
