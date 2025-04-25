import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Typography } from "@mui/material";

const AdmForm = ({ onUploadSuccess }) => {
    const [formData, setFormData] = useState({ requirementId: "", file: null });

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleUpload = async () => {
        if (!formData.requirementId || !formData.file) {
            alert("Please select a requirement and upload a file.");
            return;
        }

        const data = new FormData();
        data.append("requirementId", formData.requirementId);
        data.append("file", formData.file);

        try {
            await axios.post("http://localhost:5000/upload", data);
            alert("File uploaded successfully!");
            if (onUploadSuccess) {
                onUploadSuccess(); // Notify parent component to refresh
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        }
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 500, margin: "0 auto", backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
                Upload Documents
            </Typography>

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Requirement</InputLabel>
                <Select
                    value={formData.requirementId}
                    onChange={(e) => setFormData({ ...formData, requirementId: e.target.value })}
                    label="Requirement"
                >
                    <MenuItem value="">Select Requirement</MenuItem>
                    <MenuItem value="1">High School Report Card</MenuItem>
                    <MenuItem value="2">Certificate of Good Moral Character</MenuItem>
                    <MenuItem value="3">NSO Birth Certificate</MenuItem>
                    <MenuItem value="4">1x1 Picture (White Background)</MenuItem>
                    <MenuItem value="5">Certification from School Principal</MenuItem>
                    <MenuItem value="6">Notarized Affidavit</MenuItem>
                </Select>
            </FormControl>

            <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleFileChange}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    sx={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#1976d2" },
                    }}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
};

export default AdmForm;
