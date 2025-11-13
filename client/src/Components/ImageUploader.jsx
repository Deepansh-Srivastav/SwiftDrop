import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../Utils/uploadImage.js";
import { useState } from "react";
import RotateLoader from "react-spinners/RotateLoader";


const ImageUploader = ({ setImage }) => {

    const [isLoading, setIsLoading] = useState(false);
    async function handleImageUpload(e) {

        setIsLoading(true);

        const file = e.target.files[0];

        if (!file) return setIsLoading(false);

        const response = await uploadImage(file);

        setIsLoading(false);

        console.log(response?.secure_url);

        setImage((prev) => {
            return ({
                ...prev,
                image: [...prev.image, response?.secure_url]
            });
        });

    };

    return (
        <label htmlFor="imageInput" className="image-uploader">
            <div className="image-uploader__content">

                {isLoading ? <RotateLoader speedMultiplier={0.5} size={11} /> : (
                    <>
                        <FaCloudUploadAlt size={40} className="image-uploader__icon" />
                        <p className="image-uploader__text">Upload Image</p>
                    </>
                )
                }
            </div>

            <input
                type="file"
                id="imageInput"
                className="image-uploader__input"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading ? true : false}
            />
        </label>
    );
};

export default ImageUploader;