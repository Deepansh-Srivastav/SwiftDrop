import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";

const CategoryCard = ({ _id, name, image, setIsUploaded }) => {

    const [editCategoryModal, setEditCategoryModal] = useState(false);

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

                        <button>Delete</button>

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
        </>
    );
};

export default CategoryCard;