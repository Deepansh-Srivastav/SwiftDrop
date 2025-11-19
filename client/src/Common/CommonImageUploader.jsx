import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../Utils/uploadImage.js";
import { useState } from "react";
import RotateLoader from "react-spinners/RotateLoader";

const CommonImageUploader = ({ setImage, id, title = "image" }) => {

    const inputId = id || "imageInput";

    const [isLoading, setIsLoading] = useState(false);
    async function handleImageUpload(e) {

        setIsLoading(true);

        const file = e.target.files[0];

        if (!file) return setIsLoading(false);

        const response = await uploadImage(file);

        setImage(response?.secure_url);
        setIsLoading(false);

    };

    return (
        <label htmlFor={inputId} className="image-uploader">
            <div className="image-uploader__content">

                {isLoading ? <RotateLoader speedMultiplier={0.5} size={11} /> : (
                    <>
                        <FaCloudUploadAlt size={40} className="image-uploader__icon" />
                        <p className="image-uploader__text">Upload {title}</p>
                    </>
                )
                }
            </div>

            <input
                type="file"
                id={inputId}
                className="image-uploader__input"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading ? true : false}
            />
        </label>
    );
};

export default CommonImageUploader;