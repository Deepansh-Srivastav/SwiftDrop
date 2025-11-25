import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryProductsPage = () => {
    const { categoryId, subCategoryId } = useParams();

    return (
        <section>
            <h1> category - {categoryId}</h1>
            <h1>sub category - {subCategoryId}</h1>
        </section>
    )
}

export default CategoryProductsPage;