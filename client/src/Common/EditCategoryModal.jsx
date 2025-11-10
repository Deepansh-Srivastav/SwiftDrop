
import { useState } from "react";
import {
    CancelIcon,
} from "../Assets/Icons.js"

import TextField from '@mui/material/TextField';

const EditCategoryModal = ({ categoryId, categoryName, categoryImage, setEditCategoryModal }) => {

    const [formData, setFormData] = useState({
        categoryName: categoryName,
        image: categoryImage
    })

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <CancelIcon onClick={() => {
                    setEditCategoryModal(false)
                }} />

                <h2>Edit Category</h2>

                <div className="modal-body">

                    <TextField id="category-name" placeholder={formData?.categoryName} variant="outlined" />

                    <div className="image-upload">
                        <p>Upload Image</p>
                        <input type="file" accept="image/*" />

                        {categoryImage && (
                            <div className="image-preview">
                                <img src={formData?.image} alt="Preview" />
                                <button >✕</button>
                            </div>
                        )}
                    </div>

                    <button className="submit-btn" >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;