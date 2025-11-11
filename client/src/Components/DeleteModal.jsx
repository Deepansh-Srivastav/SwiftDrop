import { useState } from "react";
import {
    CancelIcon,
} from "../Assets/Icons.js"
import { showSuccessToast, showErrorToast } from "../Components/CostomAlert.jsx";
import { patchApiRequestWrapper } from "../Networking/Services/ApiCalls.js"
import { handleImageUpload } from "../Utils/uploadImage.js";
import { APIConfig } from "../Networking/Configuration/ApiConfig.js";

const DeleteModal = ({ heading, categoryId, categoryName, categoryImage, setEditCategoryModal, setIsUploaded }) => {



    return (
        <div className="modal-overlay">
            <div className="modal-container" style={{ backgroundColor: "" }}>
                <CancelIcon onClick={() => {
                    setEditCategoryModal(false)
                }} />

                <h2 className="text-size-1" style={{ color: 'black' }}>Delete {heading}</h2>

                <div className="modal-body">

                    <div className="categoryNameContainer">

                        <p className="text-size-3">Are You sure you want to delete this {heading}?</p>
                        <p className="text-size-3" style={{ color: "var(--btn-delete-active)" }}><b>Note : </b> This action can't be reversed later. </p>

                    </div>

                    <button className=" success-btn"  >
                        Cancel
                    </button>

                    <button className="cancel-btn"  >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;