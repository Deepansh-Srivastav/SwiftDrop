import { useState } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import {
    CancelIcon,
    CloseIcon
} from "../Assets/Icons.js"
import { uploadImage } from "../Utils/uploadImage.js";
import { APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls.js";
import { showSuccessToast, showErrorToast } from "./CostomAlert.jsx";

const AddSubCategoryModal = ({ closeModal, setIsUploaded }) => {
    const [data, setData] = useState({
        name: "",
        image: "",
        category: []
    });

    const [isImageUploaded, setIsImageUploaded] = useState(null)

    function resetAll() {
        setIsImageUploaded(null);

        setData({
            name: "",
            image: ""
        });

        closeModal();

        return;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    async function handleImageUpload(e) {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setData((prev) => ({
                ...prev,
                image: reader.result,
            }));
        };
        reader.readAsDataURL(file);

        const uploadedImageData = await uploadImage(file)

        setIsImageUploaded(uploadedImageData);

    };

    const handleRemoveImage = () => {
        setIsImageUploaded(null)
    };

    async function handleCategorySubmit() {

        const imageUrl = isImageUploaded?.secure_url || data.image;

        const payload = { ...data, image: imageUrl };

        const URL = APIConfig?.categoryApiPath?.addCategory;

        const response = await postApiRequestWrapper(URL, payload);

        if (response?.success === true && response?.error === false) {
            showSuccessToast(response?.message);
            setIsUploaded((prev) => {
                return !prev;
            });
            resetAll();
            return;
        };

        showErrorToast(response?.message);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "800px",
                position: "relative",
                padding: "30px",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                zIndex: 10,
                background: "white",
                boxShadow: 5,
            }}
        >
            <CancelIcon
                sx={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                onClick={closeModal}
            />

            <Typography variant="h5" fontWeight={700} gutterBottom>
                Add Category
            </Typography>

            <Container disableGutters>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Category Name"
                    name="name"
                    placeholder="Enter name here"
                    value={data.name}
                    onChange={handleInputChange}
                />

                <Box mt={3}>
                    <Typography fontWeight={600} mb={1}>
                        Upload Image
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    {isImageUploaded && (
                        <Box
                            sx={{
                                position: "relative",
                                width: 120,
                                height: 120,
                                mt: 2,
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid #ccc",
                            }}
                        >
                            <img
                                src={isImageUploaded?.url}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <IconButton
                                size="small"
                                onClick={handleRemoveImage}
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    padding: "2px",
                                    '&:hover': {
                                        backgroundColor: "#f0f0f0",
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 4,
                        borderRadius: "8px",
                        textTransform: "none",
                        backgroundColor: "var(--purple-theme)",
                    }}
                    onClick={handleCategorySubmit}
                >
                    Submit
                </Button>
            </Container>
        </Box>
    );
};

export default AddSubCategoryModal;