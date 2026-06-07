import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import "../Styles/CategoryProductsPage.css";
import Divider from '@mui/material/Divider';
import ProductCard from '../Components/ProductCard';
import PaginationComponent from '../Common/PaginationComponent';
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
    const [activeSubCat, setActiveSubCat] = useState(subCategoryId);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    async function fetchData() {
        setIsLoading(true);
        const URL = APIConfig?.categoryApiPath?.getSubCategoryAndProducts;
        const FINAL_URL = `${URL}?category=${categoryId}&subCategory=${subCategoryId}`;
        const response = await getApiRequestWrapper(FINAL_URL);
        if (response?.success === true && response?.error === false) {
            setSubCategories([...response?.subCategory || []]);
            setProducts([...response?.products || []]);
            setSubCategoryName(response?.subCategoryName);
        }
        setIsLoading(false);
    }

    async function fetchProductsBySubcategory(id) {
        setIsLoading(true);
        const URL = APIConfig?.categoryApiPath?.getSubCategoryAndProducts;
        const FINAL_URL = `${URL}?subCategory=${id}`;
        const response = await getApiRequestWrapper(FINAL_URL);
        if (response?.success === true && response?.error === false) {
            setProducts([...response?.products || []]);
            setSubCategoryName(response?.subCategoryName);
        }
        setIsLoading(false);
    }

    async function handleTabChange(subCatId) {
        if (subCatId === activeSubCat) return;
        setActiveSubCat(subCatId);
        navigate(`/category/${categoryId}/sub-category/${subCatId}`);
        await fetchProductsBySubcategory(subCatId);
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
        return 0;
    });

    useEffect(() => {
        fetchData();
        setActiveSubCat(subCategoryId);
    }, [categoryId, subCategoryId]);

    return (
        <section className="cpp-root">

            {/* ── Banner ── */}
            <header className="cpp-banner">
                <div className="cpp-banner-back">
                    <BackButton />
                </div>
                <div className="cpp-banner-content">
                    <p className="cpp-banner-label">Collection</p>
                    <h1 className="cpp-banner-title">{subCategoryName || 'Swiftdrop'}</h1>
                    <p className="cpp-banner-count">
                        {products.length > 0 ? `${products.length} products` : ''}
                    </p>
                </div>
                <div className="cpp-banner-orb cpp-orb-1" />
                <div className="cpp-banner-orb cpp-orb-2" />
                <div className="cpp-banner-orb cpp-orb-3" />
            </header>

            <div className="cpp-body">

                {/* ── Sidebar ── */}
                <aside className="cpp-sidebar hide-scroll-bar">
                    <p className="cpp-sidebar-heading">Categories</p>
                    <ul className="cpp-sidebar-list">
                        {subCategories.map((subCategory) => {
                            const isActive = activeSubCat === subCategory._id;
                            return (
                                <li
                                    key={subCategory._id}
                                    className={`cpp-sidebar-item${isActive ? ' cpp-sidebar-item--active' : ''}`}
                                    onClick={() => handleTabChange(subCategory._id)}
                                >
                                    <div className="cpp-sidebar-img-wrap">
                                        <img src={subCategory.image} alt={subCategory.name} />
                                    </div>
                                    <span className="cpp-sidebar-name">{subCategory.name}</span>
                                    {isActive && <span className="cpp-sidebar-dot" />}
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* ── Main ── */}
                <main className="cpp-main">

                    {/* Toolbar */}
                    <div className="cpp-toolbar">
                        <div className="cpp-toolbar-left">
                            <span className="cpp-product-count-label">
                                {isLoading ? 'Loading…' : `${sortedProducts.length} items`}
                            </span>
                        </div>
                        <div className="cpp-toolbar-right">
                            <button
                                className={`cpp-filter-btn${filterOpen ? ' cpp-filter-btn--active' : ''}`}
                                onClick={() => setFilterOpen(v => !v)}
                                aria-expanded={filterOpen}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                                </svg>
                                Filter
                            </button>

                            <div className="cpp-sort-wrap">
                                <label className="cpp-sort-label" htmlFor="cpp-sort">Sort</label>
                                <select
                                    id="cpp-sort"
                                    className="cpp-sort-select"
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                >
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low → High</option>
                                    <option value="price-desc">Price: High → Low</option>
                                    <option value="name">Name A–Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Filter Drawer */}
                    {filterOpen && (
                        <div className="cpp-filter-drawer">
                            <p className="cpp-filter-drawer-title">Filters</p>
                            <div className="cpp-filter-chips">
                                {['In Stock', 'On Sale', 'New Arrivals', 'Top Rated'].map(tag => (
                                    <button key={tag} className="cpp-chip">{tag}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="cpp-grid hide-scroll-bar">
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : sortedProducts.length > 0 ? (
                            sortedProducts.map((product, index) => (
                                <ProductCard
                                    {...product}
                                    key={`${product._id}-${index}`}
                                />
                            ))
                        ) : (
                            <NoProductsAvailable />
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="cpp-pagination">
                        <PaginationComponent />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default CategoryProductsPage;