import { Box, Container, Typography } from "@mui/material"
import { useState } from "react"
import PageBanner from "../../Common/PageBanner"
import AddCategoryModal from "../../Components/AddCategoryModal.jsx"

const Category = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalClose() {
        return setIsModalOpen(!isModalOpen);
    }; 

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
    )
}

export default Category
