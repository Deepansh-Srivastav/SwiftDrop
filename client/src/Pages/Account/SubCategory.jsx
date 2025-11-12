import { useEffect, useState } from "react";
import PageBanner from "../../Common/PageBanner";
import { useDispatch, useSelector } from "react-redux";
import AddSubCategoryModal from "../../Components/AddSubCategoryModal";
import CategoryCard from "../../Common/CategoryCard";
import { APIConfig } from "../../Networking/Configuration/ApiConfig";
import { deleteApiRequestWrapper, getApiRequestWrapper } from "../../Networking/Services/ApiCalls";
import { showErrorToast } from "../../Components/CostomAlert";

const SubCategory = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUploaded, setIsUploaded] = useState(false);

    const [subCatData, setSubCatData] = useState([]);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    async function fetchSubCategory() {

        const SUB_CATEGORY_URL = APIConfig?.subCategoryApiPath?.getSubCategory;

        const response = await getApiRequestWrapper(SUB_CATEGORY_URL);

        if (response?.success === true & response?.error === false) {
            return setSubCatData(response?.data);
        }

        showErrorToast(response?.message)
    }

    async function deleteSubCategory(id) {

        const payload = { _id: id };

        const DELETE_URL = APIConfig?.subCategoryApiPath?.deleteSubCategory;

        const response = await deleteApiRequestWrapper(DELETE_URL, payload);

        return response;
    };

    useEffect(() => {
        fetchSubCategory();
    }, [])

    return (
        <>
            <section className="category-page">
                <PageBanner heading={"sub-category"} />

                <aside className="add-category-button">
                    {!isModalOpen && (

                        <button className="imageUploadButton" onClick={handleModalClose} >+ Add Category</button>

                    )}
                </aside>

                <div className="display-category-container">

                    {subCatData.length > 0 && subCatData?.map((categoryItem, index) => {
                        return (
                            <CategoryCard
                                {...categoryItem}
                                setIsUploaded={setIsUploaded}
                                onDelete={deleteSubCategory}
                                cardType={"subCategoryCard"}
                                key={index}
                            />
                        );
                    })};

                </div>

            </section>

            <div className="category-modal-container">
                {isModalOpen && <AddSubCategoryModal closeModal={handleModalClose} setIsUploaded={setIsUploaded} />}
            </div>
        </>
    );
};

export default SubCategory;