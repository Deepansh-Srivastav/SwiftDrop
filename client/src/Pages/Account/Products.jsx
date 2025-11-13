import { useState } from "react";
import PageBanner from "../../Common/PageBanner";
import ImageUploader from "../../Components/ImageUploader";
import CommonSelect from "../../Components/CommonSelect.jsx"
import { useSelector } from "react-redux";
import CommonMultiSelect from "../../Components/CommonMultiSelect.jsx";
import { CloseIcon, DeleteIcon } from "../../Assets/Icons.js";

const Products = () => {

    return (
        <section>
            <PageBanner heading={"upload product"} />
            <UploadProductForm />
        </section>
    )
}

export default Products;


function UploadProductForm() {

    const categoryDetails = useSelector((state) => {
        return state.categoryDetails;
    })

    const [formData, setFormData] = useState({
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
    })

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
        return;
    };

    function handleRemoveImage(index) {
        const newImages = formData?.image?.filter((img) => {
            return img !== formData?.image[index];
        });

        setFormData((prev) => {
            return {
                ...prev,
                image: [...newImages]
            };
        });

    };

    console.log(" PRODucT subCategory  - ", formData?.subCategory);

    return (
        <div className="edit-form">
            <form action="">

                <div className="full-sized-input">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" value={formData?.name} id="name" name={"name"} onChange={(e) => {
                        handleFormChange(e)
                    }} />
                </div>

                <div className="form-image-uploader">
                    <ImageUploader setImage={setFormData} />
                    <div className="form-image-preview-container" >

                        {formData?.image.length > 0 && formData?.image?.map((img, index) => {
                            return (
                                <div className="form-image-preview" key={index}>
                                    <img src={img} alt="Preview Image" />
                                    <span className="hover-delete-option" onClick={() => {
                                        handleRemoveImage(index);
                                    }}>
                                        <DeleteIcon />
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className="full-sized-input">
                    <CommonSelect
                        heading={"Category"}
                        options={categoryDetails}
                        setData={setFormData}
                    />
                </div>

                <div className="full-sized-input">
                    <CommonMultiSelect
                        heading={"Sub Category"}
                        options={categoryDetails}
                        setData={setFormData}
                    />

                    <div className="sub-category-preview-container">

                        {formData?.subCategory?.map((subCat, index) => {
                            return (
                                <div className="sub-category-badge-container" key={index}>
                                    <span className="sub-category-badge">
                                        {subCat?.name}
                                    </span>

                                    <span className="category-delete">
                                        <CloseIcon />
                                    </span>
                                </div>
                            )
                        })}



                    </div>
                </div>



            </form>
        </div>
    );
};