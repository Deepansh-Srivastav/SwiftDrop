import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import DeleteModal from "../Components/DeleteModal";
import { deleteApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showSuccessToast, showErrorToast } from "../Components/CostomAlert";

const CategoryCard = ({ _id, name, image, setIsUploaded }) => {

    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);


    function handleDeleteModal() {
        setIsDeleteModalOpen((prev) => {
            return !prev;
        });
    };

    function handleModal() {
        setEditCategoryModal((prev) => {
            return !prev;
        });
    };


    async function handleDeleteCAtegory(id) {

        setLoading(true);

        const payload = { _id: id };

        console.log("DELETE PAYLOAD - ", payload);

        const DELETE_URL = APIConfig?.categoryApiPath?.deleteCategory;

        const response = await deleteApiRequestWrapper(DELETE_URL, payload);

        if (response?.error === false && response?.success === true) {
            showSuccessToast(response?.message);
            setIsUploaded((prev) => {
                return !prev;
            });
            setLoading(false);
            setIsDeleteModalOpen(false);
            return;

        };
        showErrorToast(response?.message);
        setIsDeleteModalOpen(false);
        setLoading(false);
    };

    return (
        <>
            <div className="category-card-container">
                <div className="category-card-image-container">
                    <img src={image} alt="Category Image" loading="lazy" />
                </div>

                <div className="category-card-info-container">
                    <div className="category-card-name-container">
                        <h3 className='smallest-heading'>
                            {name}
                        </h3>
                    </div>

                    <div className="category-card-action-container">

                        <button onClick={handleModal}>Edit</button>

                        <button onClick={handleDeleteModal}>Delete</button>

                    </div >
                </div>
            </div >

            {editCategoryModal && (
                <>
                    <EditCategoryModal
                        categoryId={_id}
                        categoryName={name}
                        categoryImage={image}
                        setEditCategoryModal={setEditCategoryModal}
                        setIsUploaded={setIsUploaded}
                    />
                </>
            )}

            {isDeleteModalOpen && (
                <>
                    <DeleteModal
                        categoryId={_id}
                        heading={"Category"}
                        setEditCategoryModal={setIsDeleteModalOpen}
                        handleDeleteCAtegory={handleDeleteCAtegory}
                    />

                </>
            )}

        </>
    );
};

export default CategoryCard;