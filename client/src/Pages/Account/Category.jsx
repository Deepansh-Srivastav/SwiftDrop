import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import PageBanner from "../../Common/PageBanner";
import AddCategoryModal from "../../Components/AddCategoryModal.jsx";
import { APIConfig } from "../../Networking/Configuration/ApiConfig.js";
import { getApiRequestWrapper } from "../../Networking/Services/ApiCalls.js";

const Category = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    };

    async function fetchCategory() {
        const CATEGORY_URL = APIConfig?.categoryApiPath?.getAllCategory;
        const response = await getApiRequestWrapper(CATEGORY_URL);

        console.log(response);

    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <Box sx={{
            position: "relative"
        }}>

            <PageBanner heading={"category"} closeModal={handleModalClose} isModalOpen={isModalOpen} />

            <Container
                disableGutters
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    backdropFilter: isModalOpen ? "blur(5px)" : "none",
                    transition: "backdrop-filter 0.3s ease",
                    position: "absolute",
                }}
            >
                {isModalOpen && <AddCategoryModal closeModal={handleModalClose} />}
            </Container>

        </Box>
    );
};

export default Category;