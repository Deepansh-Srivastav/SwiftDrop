import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import DeleteModal from "../Components/DeleteModal";
import { deleteApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showSuccessToast, showErrorToast } from "../Components/CostomAlert";

const CategoryCard = ({
    _id,
    name,
    image,
    cardType = null,
    setIsUploaded,
    onDelete,
    onUpdate,
}) => {

    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);


    function handleDeleteModal() {
        setIsDeleteModalOpen((prev) => {
            return !prev;
        });
    };

    function handleEditModal() {
        setEditCategoryModal((prev) => {
            return !prev;
        });
    };

    async function handleDeleteCategory(id) {

        setLoading(true);

        const response = await onDelete(id);

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
                        <button onClick={handleEditModal}>Edit</button>
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
                        onUpdate={onUpdate}
                        setIsUploaded={setIsUploaded}
                        cardType={cardType}
                    />
                </>
            )}

            {isDeleteModalOpen && (
                <>
                    <DeleteModal
                        categoryId={_id}
                        heading={"Category"}
                        setEditCategoryModal={setIsDeleteModalOpen}
                        handleDeleteCAtegory={handleDeleteCategory}
                        isLoading={loading}
                    />

                </>
            )}

        </>
    );
};

export default CategoryCard;