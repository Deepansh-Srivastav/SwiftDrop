import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import "../Styles/CategoryProductsPage.css";
import Divider from '@mui/material/Divider';
import ProductCard from '../Components/ProductCard';
import PaginationComponent from '../Common/PaginationComponent';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../Common/SkeletonLoader';
import NoProductsAvailable from '../Common/NoProductsAvailable';
import BackButton from '../Common/BackButton';


const CategoryProductsPage = () => {

    const navigate = useNavigate();

    const { categoryId, subCategoryId } = useParams();

    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const URL = APIConfig?.categoryApiPath?.getSubCategoryAndProducts;
        const FINAL_URL = `${URL}?category=${categoryId}&subCategory=${subCategoryId}`
        const response = await getApiRequestWrapper(FINAL_URL);

        if (response && response?.success === true && response?.error === false) {
            setSubCategories([...response?.subCategory || []]);
            setProducts([...response?.products || []]);
            setSubCategoryName(response?.subCategoryName)
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
    }

    async function fetchProductsBySubcategory(id) {
        setIsLoading(true);
        const URL = APIConfig?.categoryApiPath?.getSubCategoryAndProducts;
        const FINAL_URL = `${URL}?subCategory=${id}`;
        const response = await getApiRequestWrapper(FINAL_URL);

        if (response && response?.success === true && response?.error === false) {
            setProducts([...response?.products || []]);
            setSubCategoryName(response?.subCategoryName)
            setIsLoading(false);
            return
        };
        setIsLoading(false);
    };

    async function handleTabChange(subCatId) {

        if (subCatId === subCategoryId) {
            return;
        }
        navigate(`/category/${categoryId}/sub-category/${subCatId}`);
        await fetchProductsBySubcategory(subCatId);

    };



    useEffect(() => {
        fetchData()
    }, [categoryId, subCategoryId])

    return (
        <section className='category-products-page'>

            <BackButton/>

            <div className="banner-section" style={{ gridArea: "banner" }}>
                <p className="text-size-1">
                    {subCategoryName || "Swiftdrop"}
                </p>
            </div>


            <aside className='subcategory-side-menu hide-scroll-bar' style={{ gridArea: "sideMenu" }}>

                <ul className='subcategory-side-menu-list'>
                    {subCategories?.map((subCategory) => {
                        return (
                            <>
                                <li key={subCategory?._id} onClick={() => {
                                    handleTabChange(subCategory?._id);
                                }}>
                                    <div className='menu-list-image-container'><img src={subCategory?.image} alt="Sub-Category-Image" /></div>
                                    <div className='menu-list-name-container'> {subCategory?.name}</div>
                                </li>
                                <Divider />
                            </>
                        )
                    })}

                </ul>
            </aside>


            <div className="product-display-section " style={{ gridArea: "productDisplay" }}>


                <div className="filter-options-container">
                    <span> filter</span>
                </div>

                <div className="product-display hide-scroll-bar">
                    {isLoading && <SkeletonLoader />}
                    {products.length > 0
                        ?
                        (
                            products?.map((product, index) => {
                                return <ProductCard {...product} key={`${product?._id}-${index}`} />
                            })
                        )
                        :
                        (
                            <NoProductsAvailable />
                        )
                    }
                </div>

                <div className="pagination-container">
                    <PaginationComponent />
                </div>
            </div>

        </section>
    )
}

export default CategoryProductsPage;