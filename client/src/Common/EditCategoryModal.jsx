
import { useState } from "react";
import {
    CancelIcon,
} from "../Assets/Icons.js"
import RotateLoader from "react-spinners/RotateLoader";
import TextField from '@mui/material/TextField';
import { showSuccessToast, showErrorToast } from "../Components/CostomAlert.jsx";
import { handleImageUpload } from "../Utils/uploadImage.js";
import CommonSelect from "../Components/CommonSelect.jsx"
import { useSelector } from "react-redux";
import CommonImageUploader from "./CommonImageUploader.jsx";

const EditCategoryModal = ({
    categoryId,
    categoryName,
    categoryImage,
    setEditCategoryModal,
    setIsUploaded,
    onUpdate,
    cardType = null
}) => {

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        category: [],
    });

    const [secondaryImage, setSecondaryImage] = useState(null);

    const [banner, setBanner] = useState(null);


    const categoryDetails = useSelector((state) => {
        return state.categoryDetails;
    })

    const [isUploading, setIsUploading] = useState(false);

    async function imageUploader(e) {

        setIsUploading(true);

        const IMAGE_URL = await handleImageUpload(e)

        if (IMAGE_URL) {
            setIsUploading(false);
            setFormData((prev) => {
                return {
                    ...prev,
                    image: IMAGE_URL
                };
            });
            return;
        };


        setIsUploading(false);
    };

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    function resetForm() {
        setFormData({
            name: "",
            image: ""
        });
    };

    async function handleCategoryUpdateRequest(payload) {

        const response = await onUpdate(payload);

        if (response?.success === true && response?.error === false) {
            setEditCategoryModal(false);
            showSuccessToast(response?.message);
            resetForm();
            setIsUploaded((prev) => {
                return !prev
            })
            return;
        };

        showErrorToast(response?.message);

    };

    function handleSubmit() {

        const payload = {
            _id: categoryId,
            ...(formData?.name && { name: formData?.name }),
            ...(formData?.image && { image: formData?.image }),
            ...(secondaryImage && { secondaryImage }),
            ...(banner && { banner }),
            ...(formData?.category?.length > 0 && { category: formData?.category }),
        };

        handleCategoryUpdateRequest(payload);
    };

    function clearImage() {
        setFormData((prev) => {
            return {
                ...prev,
                image: ""
            };
        });
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

                    <div className="image-upload">
                        <p className="text-size-2">Upload Image</p>
                        <div className="image-upload-body">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => { imageUploader(e) }}
                            />

                            {categoryImage && (
                                <div className="image-preview">

                                    {isUploading
                                        ?
                                        <RotateLoader speedMultiplier={0.5} size={11} />
                                        :
                                        <>
                                            <img src={formData?.image || categoryImage} alt="Preview" />

                                            {formData?.image && <button onClick={clearImage}>✕</button>}

                                        </>
                                    }

                                </div>

                            )}
                        </div>
                    </div>

                    <CommonImageUploader setImage={setSecondaryImage} id={"secondaryImage"} title={"Secondary Image"}/>
                    {secondaryImage && (
                        <div className="image-preview">
                            <img src={secondaryImage} alt="Preview" />

                            {secondaryImage && <button onClick={clearImage}>✕</button>}

                        </div>
                    )}

                    <CommonImageUploader setImage={setBanner} id={"primaryImage"} title={"Banner"} />
                    {banner && (
                        <div className="image-preview">
                            <img src={banner} alt="Preview" />

                            {banner && <button onClick={clearImage}>✕</button>}

                        </div>
                    )}

                    {cardType && (
                        <div>
                            <CommonSelect
                                cardType={cardType}
                                categoryName={categoryName}
                                options={categoryDetails}
                                setData={setFormData}
                            />
                        </div>
                    )}

                    <button className="submit-btn" onClick={handleSubmit} >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;