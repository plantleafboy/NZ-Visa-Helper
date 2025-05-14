import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";

const UploadFile = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // Send to backend
        fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log('Upload success:', data);
            })
            .catch(err => {
                console.error('Upload error:', err);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Upload a Document
            </Typography>

            <input
                type="file"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                style={{ marginBottom: '1rem' }}
            />

            <Button variant="contained" type="submit">
                Submit
            </Button>
        </Box>
    );
}

export default UploadFile;