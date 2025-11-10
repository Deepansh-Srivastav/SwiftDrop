
import { useState } from "react";
import {
    CancelIcon,
} from "../Assets/Icons.js"

import TextField from '@mui/material/TextField';
import { showSuccessToast, showErrorToast } from "../Components/CostomAlert.jsx";
import { patchApiRequestWrapper } from "../Networking/Services/ApiCalls.js"
import { uploadImage, handleImageUpload } from "../Utils/uploadImage.js";
import { APIConfig } from "../Networking/Configuration/ApiConfig.js";

const EditCategoryModal = ({ categoryId, categoryName, categoryImage, setEditCategoryModal }) => {

    const [formData, setFormData] = useState({
        name: "",
        image: ""
    });


    async function imageUploader(e) {
        const IMAGE_URL = await handleImageUpload(e)

        if (IMAGE_URL) {
            setFormData((prev) => {
                return {
                    ...prev,
                    image: IMAGE_URL
                };
            })
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleCategoryUpdateRequest(payload) {

        const UPDATE_CATEGORY_URL = APIConfig?.categoryApiPath?.updateCategory;

        const response = await patchApiRequestWrapper(UPDATE_CATEGORY_URL, payload);

        if (response?.success === true && response?.error === false) {
            setEditCategoryModal(false);
            showSuccessToast(response?.message);
        }

    }

    function handleSubmit() {

        const payload = {
            _id: categoryId,
            ...(formData?.name && { name: formData?.name }),
            ...(formData?.image && { image: formData?.image }),
        };

        handleCategoryUpdateRequest(payload);
    };


    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <CancelIcon onClick={() => {
                    setEditCategoryModal(false)
                }} />

                <h2 className="text-size-1" style={{ color: 'black' }}>Edit Category</h2>

                <div className="modal-body">

                    <div className="categoryNameContainer">

                        <p className="text-size-2">Edit Category Name</p>

                        <TextField
                            id="category-name"
                            name="name"
                            placeholder={categoryName}
                            variant="outlined"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>


                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => { imageUploader(e) }}
                    />


                    <div className="image-upload">
                        <p className="text-size-2">Upload Image</p>
                        <input type="file" accept="image/*" />

                        {categoryImage && (
                            <div className="image-preview">
                                <img src={categoryImage} alt="Preview" />
                                <button >✕</button>
                            </div>
                        )}
                    </div>

                    <button className="submit-btn" onClick={handleSubmit} >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;