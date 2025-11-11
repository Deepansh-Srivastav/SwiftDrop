import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import PageBanner from "../../Common/PageBanner";
import AddCategoryModal from "../../Components/AddCategoryModal.jsx";
import { APIConfig } from "../../Networking/Configuration/ApiConfig.js";
import { getApiRequestWrapper } from "../../Networking/Services/ApiCalls.js";
import CategoryCard from "../../Common/CategoryCard.jsx";

const Category = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryList, setCategoryList] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    async function fetchCategory() {
        try {
            const CATEGORY_URL = APIConfig?.categoryApiPath?.getAllCategory;
            const response = await getApiRequestWrapper(CATEGORY_URL);

            if (response && response?.success === true && response?.error === false) {
                setCategoryList(response?.categoryData);
            }

        } catch (error) {
            console.log(error.message);

        };
    };

    useEffect(() => {
        fetchCategory()
    }, [isUploaded])

    return (
        <>
            <section className="category-page">

                <PageBanner heading={"category"} />

                <aside className="add-category-button">
                    {!isModalOpen && (

                        <button className="imageUploadButton" onClick={handleModalClose} >+ Add Category</button>

                    )}
                </aside>

                <div className="display-category-container">

                    {categoryList?.map((categoryItem, index) => {
                        return <CategoryCard {...categoryItem} key={index} setIsUploaded={setIsUploaded} />
                    })}

                </div>

            </section>


            <div className="category-modal-container">
                {isModalOpen && <AddCategoryModal closeModal={handleModalClose} setIsUploaded={setIsUploaded} />}
            </div>



        </>
    );
};

export default Category;