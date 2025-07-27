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

const AddCategoryModal = ({ closeModal }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageUpload = (e) => {
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
  };

  const handleRemoveImage = () => {
    setData((prev) => ({
      ...prev,
      image: "",
    }));
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

          {data.image && (
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
                src={data.image}
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
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default AddCategoryModal;