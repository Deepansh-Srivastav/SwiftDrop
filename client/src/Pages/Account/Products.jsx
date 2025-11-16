import { useState } from "react";
import PageBanner from "../../Common/PageBanner";
import ImageUploader from "../../Components/ImageUploader";
import CommonSelect from "../../Components/CommonSelect.jsx"
import { useSelector } from "react-redux";
import CommonMultiSelect from "../../Components/CommonMultiSelect.jsx";
import { CloseIcon, DeleteIcon } from "../../Assets/Icons.js";
import { postApiRequestWrapper } from "../../Networking/Services/ApiCalls.js";
import { APIConfig } from "../../Networking/Configuration/ApiConfig.js";
import { showSuccessToast, showErrorToast } from "../../Components/CostomAlert.jsx"

const Products = () => {

    async function handleCreateProduct(payload) {
        const CREATE_PRODUCT_URL = APIConfig?.productPath?.addProduct;

        const response = await postApiRequestWrapper(CREATE_PRODUCT_URL, payload);

        return response;
    }

    return (
        <section>
            <PageBanner heading={"upload product"} />
            <UploadProductForm onCreate={handleCreateProduct} />
        </section>
    )
}

export default Products;


function UploadProductForm({ onCreate }) {

    const categoryDetails = useSelector((state) => {
        return state.categoryDetails;
    })

    const subCategoryDetails = useSelector((state) => {
        return state.subCategoryDetails;
    });

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

    function handleRemoveSubcategory(index) {
        const newSubCategoryList = formData?.subCategory?.filter((subCat) => {
            return subCat?.id !== formData?.subCategory[index]?.id;
        });

        setFormData((prev) => {
            return ({
                ...prev,
                subCategory: [...newSubCategoryList]
            });
        })
    }

    async function handleSubmit() {

        const payload = {
            name: formData.name,
            image: formData.image,
            category: formData.category,
            subCategory: formData.subCategory?.map(subCat => subCat?.id),
            unit: formData.unit,
            stock: formData.stock,
            price: formData.price,
            discount: formData.discount,
            description: formData.description,
            more_details: formData.more_details
        };

        const response = await onCreate(payload);

        if (response?.error === false && response?.success === true) {
            return showSuccessToast(response?.message);
        };
        return showErrorToast(response?.message);



    }

    return (
        <div className="edit-form">
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                return;
            }}>

                <div className="full-sized-input">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name={"name"}
                        value={formData?.name}
                        onChange={handleFormChange}
                        className="form-input"
                        required
                    />
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
                        options={subCategoryDetails}
                        setData={setFormData}
                    />

                    <div className="sub-category-preview-container">

                        {formData?.subCategory?.map((subCat, index) => {
                            return (
                                <div className="sub-category-badge-container" key={index}>
                                    <span className="sub-category-badge">
                                        {subCat?.name}
                                    </span>

                                    <span className="category-delete" onClick={() => {
                                        handleRemoveSubcategory(index)
                                    }}>
                                        <CloseIcon />
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="full-sized-input">
                    <label htmlFor="unit">Unit</label>
                    <input
                        type="text"
                        value={formData?.unit}
                        id="unit"
                        name={"unit"}
                        required
                        onChange={(e) => {
                            handleFormChange(e)
                        }}
                        className="form-input"
                    />

                </div>

                <div className="full-sized-input">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        value={formData?.stock}
                        id="stock"
                        name={"stock"}
                        required
                        onChange={(e) => {
                            handleFormChange(e)
                        }}
                        className="form-input" />
                </div>

                <div className="full-sized-input">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        value={formData?.price}
                        id="price"
                        name={"price"}
                        required
                        onChange={(e) => {
                            handleFormChange(e)
                        }} className="form-input" />
                </div>

                <div className="full-sized-input">
                    <label htmlFor="price">Discount</label>
                    <input
                        type="number"
                        value={formData?.discount}
                        id="discount"
                        name={"discount"}
                        required
                        onChange={(e) => {
                            if (e.target.value.length > 3) return;
                            handleFormChange(e)
                        }} className="form-input" />
                </div>

                <div className="full-sized-input">
                    <label htmlFor="price">Product Description</label>
                    <textarea
                        rows={8}
                        value={formData?.description}
                        id="description"
                        name={"description"}
                        required
                        onChange={(e) => {
                            handleFormChange(e)
                        }}
                        className=" form-input no-resize-textarea"
                    />
                </div>

                <div className="form-button-container">
                    <button className="submit-btn" type="submit" onClick={handleSubmit}>
                        Add
                    </button>
                </div>

            </form>
        </div>
    );
};