import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import "../Styles/CategoryProductsPage.css";
import Divider from '@mui/material/Divider';
import ProductCard from '../Components/ProductCard';
import PaginationComponent from '../Common/PaginationComponent';


const CategoryProductsPage = () => {

    const { categoryId, subCategoryId } = useParams();

    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);

    async function fetchData() {
        const URL = APIConfig?.categoryApiPath?.getSubCategoryAndProducts;
        const FINAL_URL = `${URL}?category=${categoryId}&subCategory=${subCategoryId}`
        const response = await getApiRequestWrapper(FINAL_URL);

        console.log("Produts are -", response?.products);


        if (response && response?.success === true && response?.error === false) {
            setSubCategories([...response?.subCategory || []]);
            setProducts([...response?.products || []]);
            return;
        }
    }

    console.log(products);



    useEffect(() => {
        fetchData()
    }, [categoryId, subCategoryId])

    return (
        <section className='category-products-page'>

            <div className="banner-section" style={{ gridArea: "banner" }}>

            </div>

            <aside className='subcategory-side-menu' style={{ gridArea: "sideMenu" }}>
                <ul className='subcategory-side-menu-list'>
                    {subCategories?.map((subCategory) => {
                        return (
                            <>
                                <li key={subCategory?._id}>
                                    <div className='menu-list-image-container'><img src={subCategory?.image} alt="Sub-Category-Image" /></div>
                                    <div className='menu-list-name-container'> {subCategory?.name}</div>
                                </li>
                                <Divider />
                            </>
                        )
                    })}

                </ul>
            </aside>

            <div className="product-display-section" style={{ gridArea: "productDisplay" }}>


                <div className="filter-options-container">
                    <span> filter</span>
                </div>

                <div className="product-display">
                    {products?.map((product, index) => {
                        return <ProductCard {...product} key={`${product?._id}-${index}`} />
                    })}
                    {products?.map((product, index) => {
                        return <ProductCard {...product} key={`${product?._id}-${index}`} />
                    })}
                    {products?.map((product, index) => {
                        return <ProductCard {...product} key={`${product?._id}-${index}`} />
                    })}
                </div>

                <div className="pagination-container">
                    <PaginationComponent />
                </div>
            </div>

        </section>
    )
}

export default CategoryProductsPage;