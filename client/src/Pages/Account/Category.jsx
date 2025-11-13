import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBanner from "../../Common/PageBanner";
import AddCategoryModal from "../../Components/AddCategoryModal.jsx";
import { APIConfig } from "../../Networking/Configuration/ApiConfig.js";
import { deleteApiRequestWrapper, getApiRequestWrapper, patchApiRequestWrapper } from "../../Networking/Services/ApiCalls.js";
import CategoryCard from "../../Common/CategoryCard.jsx";
import { setCategoryDetails } from "../../Redux/Features/CategoryDetailsSlice.js";

const Category = () => {

    const dispatch = useDispatch();
    const categoryDetails = useSelector((state) => {
        return state.categoryDetails;
    })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    async function fetchCategory() {
        try {
            const CATEGORY_URL = APIConfig?.categoryApiPath?.getAllCategory;
            const response = await getApiRequestWrapper(CATEGORY_URL);

            if (response && response?.success === true && response?.error === false) {

                dispatch(setCategoryDetails(response?.categoryData));
            }

        } catch (error) {
            console.log(error.message);

        };
    };

    async function deleteCategory(id) {

        const payload = { _id: id };

        const DELETE_URL = APIConfig?.categoryApiPath?.deleteCategory;

        const response = await deleteApiRequestWrapper(DELETE_URL, payload);

        return response;
    };

    async function updateCategory(payload) {

        const UPDATE_CATEGORY_URL = APIConfig?.categoryApiPath?.updateCategory;

        const response = await patchApiRequestWrapper(UPDATE_CATEGORY_URL, payload);

        return response;
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

                    {categoryDetails?.map((categoryItem, index) => {
                        return <CategoryCard
                            {...categoryItem}
                            setIsUploaded={setIsUploaded}
                            onDelete={deleteCategory}
                            onUpdate={updateCategory}
                            key={index}
                        />
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