import { useEffect, useState } from "react";
import PageBanner from "../../Common/PageBanner";
import { useDispatch, useSelector } from "react-redux";
import AddSubCategoryModal from "../../Components/AddSubCategoryModal";
import CategoryCard from "../../Common/CategoryCard";
import { APIConfig } from "../../Networking/Configuration/ApiConfig";
import { deleteApiRequestWrapper, getApiRequestWrapper, patchApiRequestWrapper } from "../../Networking/Services/ApiCalls";
import { showErrorToast } from "../../Components/CostomAlert";
import { setSubCategoryDetails } from "../../Redux/Features/SubCategoryDetailsSlice";

const SubCategory = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const subCategoryDetails = useSelector((state) => {
        return state.subCategoryDetails;
    });

    const [isUploaded, setIsUploaded] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    async function fetchSubCategory() {

        const SUB_CATEGORY_URL = APIConfig?.subCategoryApiPath?.getSubCategory;

        const response = await getApiRequestWrapper(SUB_CATEGORY_URL);

        if (response?.success === true & response?.error === false) {
            return dispatch(setSubCategoryDetails(response?.data));
        }

        showErrorToast(response?.message)
    };

    async function updateSubCategory(payload) {

        const UPDATE_URL = APIConfig?.subCategoryApiPath?.updateSubCategory;
        const response = await patchApiRequestWrapper(UPDATE_URL, payload);
        return response;

    };

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

                    {subCategoryDetails.length > 0 && subCategoryDetails?.map((categoryItem, index) => {
                        return (
                            <CategoryCard
                                {...categoryItem}
                                setIsUploaded={setIsUploaded}
                                onUpdate={updateSubCategory}
                                onDelete={deleteSubCategory}
                                cardType={"subCategoryCard"}
                                key={index}
                            />
                        );
                    })}

                </div>
            </section>

            <div className="category-modal-container">
                {isModalOpen && (
                    <AddSubCategoryModal
                        closeModal={handleModalClose}
                        setIsUploaded={setIsUploaded} />
                )}
            </div>
        </>
    );
};

export default SubCategory;