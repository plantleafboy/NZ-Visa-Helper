import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface PetitionFormProps {
    categories: Category[];
    onSubmit: (formData: CreatePetition) => void;
}

const CreatePetition: React.FC<PetitionFormProps> = ({
                                                         categories,
                                                         onSubmit,
                                                     }) => {
    const [petitionForm, setPetitionForm] = useState<CreatePetition>({
        title: "",
        description: "",
        categoryId: 3,
        supportTiers: [{ title: "", description: "", cost: 0 }],
        image: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!petitionForm.title) newErrors.title = "Title is required";
        if (!petitionForm.description)
            newErrors.description = "Description is required";
        if (petitionForm.categoryId === -1)
            newErrors.categoryId = "Category is required";
        if (
            petitionForm.supportTiers.length < 1 ||
            petitionForm.supportTiers.length > 3
        )
            newErrors.supportTiers = "You must provide between 1 and 3 support tiers";
        if (!petitionForm.image) newErrors.image = "Image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTier = () => {
        setPetitionForm((prev) => ({
            ...prev,
            supportTiers: [
                ...prev.supportTiers,
                { title: "", description: "", cost: 0 },
            ],
        }));
    };

    const handleRemoveTier = (index: number) => {
        setPetitionForm((prev) => ({
            ...prev,
            supportTiers: prev.supportTiers.filter((_, i) => i !== index),
        }));
    };

    const handleTierChange = (index: number, field: string, value: any) => {
        if (field === "cost") {
            value = parseInt(value);
        }
        setPetitionForm((prev) => ({
            ...prev,
            supportTiers: prev.supportTiers.map((tier, i) =>
                i === index ? { ...tier, [field]: value } : tier,
            ),
        }));
    };

    const handleInputChange = (field: string, value: any) => {
        setPetitionForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
                setPetitionForm((prev) => ({ ...prev, image: file }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    image: "Only png, jpeg, and gif are accepted",
                }));
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            console.log(petitionForm);
            onSubmit(petitionForm);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
            maxWidth={"600px"}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        size={"small"}
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={petitionForm.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl
                        size={"small"}
                        fullWidth
                        required
                        error={!!errors.categoryId}
                    >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            size={"small"}
                            labelId="category-label"
                            id="category"
                            label="Category"
                            value={petitionForm.categoryId}
                            onChange={(e) => handleInputChange("categoryId", e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.categoryId}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size={"small"}
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        value={petitionForm.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    {petitionForm.supportTiers.map((tier, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            marginBottom={1}
                        >
                            <Grid item xs={4} sx={{ mr: 1 }}>
                                <TextField
                                    size={"small"}
                                    required
                                    fullWidth
                                    label={`Support Tier ${index + 1} Title`}
                                    value={tier.title}
                                    onChange={(e) =>
                                        handleTierChange(index, "title", e.target.value)
                                    }
                                    error={!!errors.supportTiers}
                                    helperText={
                                        index === petitionForm.supportTiers.length - 1
                                            ? errors.supportTiers
                                            : ""
                                    }
                                />
                                <TextField
                                    sx={{ mt: "16px" }}
                                    size={"small"}
                                    required
                                    fullWidth
                                    label="Cost"
                                    type="number"
                                    value={tier.cost}
                                    onChange={(e) =>
                                        handleTierChange(index, "cost", e.target.value)
                                    }
                                    error={!!errors.supportTiers}
                                    helperText={
                                        index === petitionForm.supportTiers.length - 1
                                            ? errors.supportTiers
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    // size={"small"}
                                    required
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label={"Description"}
                                    value={tier.description}
                                    onChange={(e) =>
                                        handleTierChange(index, "description", e.target.value)
                                    }
                                    error={!!errors.supportTiers}
                                    helperText={
                                        index === petitionForm.supportTiers.length - 1
                                            ? errors.supportTiers
                                            : ""
                                    }
                                />
                            </Grid>
                            <IconButton
                                onClick={() => handleRemoveTier(index)}
                                disabled={petitionForm.supportTiers.length <= 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    {petitionForm.supportTiers.length < 3 && (
                        <Button size={"small"} onClick={handleAddTier}>
                            Add Support Tier
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl required error={!!errors.image}>
                        <input
                            accept="image/png, image/jpeg, image/gif"
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="image-upload">
                            <Button size={"small"} variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                        <FormHelperText>{errors.image}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        sx={{ mt: 2, mb: 2, width: "300px" }}
                        size={"large"}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreatePetition;
