import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, CardContent, Grid, useMediaQuery, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import { gridSpacing } from 'store/constant';
import TypeFilter from './component/typeFilter';
import SelectionFilter from './component/selectionFilter';
const NftFilter = ({
    type,
    setType,
    brand,
    setBrand,
    brandArray,
    category,
    setCategory,
    categoryArray,
    subCategory,
    setSubCategory,
    subCategoryArray,
    handleType,
    handleBrandChange,
    handleCategoryChange,
    handleSubCategoryChange,
    setShowCheckBox,
    setCheckedArray,
    listNftsOnMarketplace
}) => {
    const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    let filterData = [
        {
            id: 'type',
            defaultExpand: true,
            title: 'NFT Type',
            content: <TypeFilter type={type} setType={setType} handleType={handleType} />
        },
        {
            id: 'brands',
            defaultExpand: true,
            title: 'Brands',
            content: <SelectionFilter selection={brand} selectionArray={brandArray?.brandList} handleChange={handleBrandChange} />
        },
        {
            id: 'categories',
            defaultExpand: true,
            title: 'Categories',
            content: (
                <SelectionFilter selection={category} selectionArray={categoryArray?.categoryList} handleChange={handleCategoryChange} title='Categories' />
            )
        },
        {
            id: 'subCategories',
            defaultExpand: true,
            title: 'Subcategories',
            content: (
                <SelectionFilter
                    selection={subCategory}
                    selectionArray={subCategoryArray?.subCategoriesList}
                    handleChange={handleSubCategoryChange}
                    title='Subcategories'
                />
            )
        }
    ];

    listNftsOnMarketplace ?  filterData = [

        {
            id: 'brands',
            defaultExpand: true,
            title: 'Brands',
            content: <SelectionFilter selection={brand} selectionArray={brandArray?.brandList} handleChange={handleBrandChange} />
        },
        {
            id: 'categories',
            defaultExpand: true,
            title: 'Categories',
            content: (
                <SelectionFilter selection={category} selectionArray={categoryArray?.categoryList} handleChange={handleCategoryChange} title='Categories' />
            )
        },
        {
            id: 'subCategories',
            defaultExpand: true,
            title: 'Subcategories',
            content: (
                <SelectionFilter
                    selection={subCategory}
                    selectionArray={subCategoryArray?.subCategoriesList}
                    handleChange={handleSubCategoryChange}
                    title='Subcategories'
                />
            )
        }
    ] : filterData = filterData;
console.log({listNftsOnMarketplace})
    useEffect(()=>{
        if(listNftsOnMarketplace){
            console.log('useefect')
            handleType('directMint')
        }
    },[listNftsOnMarketplace])

    return (
        <MainCard border={!matchDownLG} content={false} sx={{ overflow: 'visible' }}>
            <CardContent sx={{ p: 1, height: matchDownLG ? '100vh' : 'auto' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Accordion data={filterData} />
                    </Grid>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Button
                                variant="contained"
                                fullWidth
                                color="error"
                                onClick={() => {
                                    setType('all');
                                    setBrand(0);
                                    setCategory(0);
                                    setSubCategory(0);
                                    setShowCheckBox(false);
                                    setCheckedArray([]);
                                }}
                            >
                                Clear All
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default NftFilter;
