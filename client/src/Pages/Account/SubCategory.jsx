import { useState } from "react";
import PageBanner from "../../Common/PageBanner";
import AddSubCategoryModal from "../../Components/AddSubCategoryModal";

const SubCategory = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUploaded, setIsUploaded] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <section className="category-page">
                <PageBanner heading={"sub-category"} />

                <aside className="add-category-button">
                    {!isModalOpen && (

                        <button className="imageUploadButton" onClick={handleModalClose} >+ Add Category</button>

                    )}
                </aside>
            </section>

            <div className="category-modal-container">
                {isModalOpen && <AddSubCategoryModal closeModal={handleModalClose} setIsUploaded={setIsUploaded} />}
            </div>
        </>
    );
};

export default SubCategory;