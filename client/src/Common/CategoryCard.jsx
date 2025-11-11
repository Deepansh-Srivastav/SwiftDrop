import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import DeleteModal from "../Components/DeleteModal";

const CategoryCard = ({ _id, name, image, setIsUploaded }) => {

    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


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
                        heading={"Category"}
                    setEditCategoryModal={setIsDeleteModalOpen} />
                </>
            )}

        </>
    );
};

export default CategoryCard;