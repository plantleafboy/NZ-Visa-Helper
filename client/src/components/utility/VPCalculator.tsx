import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
    Alert, SelectChangeEvent
} from '@mui/material';

const VPCalculator = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [categoryPoints, setCategoryPoints] = useState(0);
    const [experiencePoints, setExperiencePoints] = useState(0);
    const [nzExperience, setNzExperience] = useState('0');

    const calculateTotalPoints = () => categoryPoints + experiencePoints;

    const handleCategoryChange = (event:  React.ChangeEvent<HTMLInputElement>,
                                  value: string) => {
        // const value = event.target.value;
        setSelectedCategory(value);
        setSelectedOption('');
        setCategoryPoints(0);
    };

    const handleOptionChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedOption(value);

        let points = 0;
        if (selectedCategory === 'income') {
            points = value === '3x' ? 6 : value === '2x' ? 4 : value === '1.5x' ? 3 : 0;
        } else if (selectedCategory === 'qualification') {
            points = value === 'level10' ? 6 : value === 'level9' ? 5 : value === 'level8' ? 4 : value === 'level7' ? 3 : 0;
        } else if (selectedCategory === 'registration') {
            points = parseInt(value, 10);
        }

        setCategoryPoints(points);
    };

    const handleExperienceChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setNzExperience(value);
        setExperiencePoints(value === '3' ? 3 : value === '2' ? 2 : value === '1' ? 1 : 0);
    };

    const meetsRequirement = calculateTotalPoints() >= 6;
    const severity: 'success' | 'error' = meetsRequirement ? 'success' : 'error';

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 8}}>
            <Card>
                <CardHeader title="Skilled Category Residence Visa Points Calculator" />
                <CardContent>
                    <FormControl component="fieldset" fullWidth margin="normal">
                        <FormLabel component="legend">Select your primary points category:</FormLabel>
                        <RadioGroup row value={selectedCategory} onChange={handleCategoryChange}>
                            <FormControlLabel value="income" control={<Radio />} label="Income" />
                            <FormControlLabel value="qualification" control={<Radio />} label="Qualification" />
                            <FormControlLabel value="registration" control={<Radio />} label="NZ Registration/Licensing" />
                        </RadioGroup>
                    </FormControl>

                    {selectedCategory && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>{`Select your ${selectedCategory} details:`}</InputLabel>
                            <Select
                                value={selectedOption}
                                label={`Select your ${selectedCategory} details:`}
                                onChange={handleOptionChange}
                            >
                                <MenuItem value="">Select option</MenuItem>
                                {selectedCategory === 'income' && [
                                    <MenuItem value="3x">At least 3x median wage ($94.83/hr)</MenuItem>,
                                    <MenuItem value="2x">At least 2x median wage ($63.22/hr)</MenuItem>,
                                    <MenuItem value="1.5x">At least 1.5x median wage ($47.41/hr)</MenuItem>,
                                ]}
                                {selectedCategory === 'qualification' && [
                                    <MenuItem value="level10">Level 10 Doctoral Degree</MenuItem>,
                                    <MenuItem value="level9">Level 9 Master's Degree</MenuItem>,
                                    <MenuItem value="level8">Level 8 Bachelor Honours/Postgrad Diploma</MenuItem>,
                                    <MenuItem value="level7">Level 7 Bachelor's Degree</MenuItem>,
                                ]}
                                {selectedCategory === 'registration' && [
                                    <MenuItem value="6">Endodontic Specialist</MenuItem>,
                                    <MenuItem value="5">Dentist</MenuItem>,
                                    <MenuItem value="4">Midwife</MenuItem>,
                                    <MenuItem value="3">Registered Nurse</MenuItem>
                                ]}
                            </Select>
                        </FormControl>
                    )}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>NZ Skilled Work Experience</InputLabel>
                        <Select
                            value={nzExperience}
                            label="NZ Skilled Work Experience"
                            onChange={handleExperienceChange}
                        >
                            <MenuItem value="0">No experience</MenuItem>
                            <MenuItem value="1">1 year</MenuItem>
                            <MenuItem value="2">2 years</MenuItem>
                            <MenuItem value="3">3 years</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ mt: 3 }}>
                        <Typography>Category Points: {categoryPoints}</Typography>
                        <Typography>Experience Points: {experiencePoints}</Typography>
                        <Typography>Total Points: {calculateTotalPoints()}</Typography>
                    </Box>


                    {(selectedCategory && selectedOption) && (
                        <Alert severity={severity} sx={{ mt: 3 }}>
                            {meetsRequirement
                                ? 'You meet the minimum requirement of 6 points.'
                                : 'You need at least 6 points to meet the requirement.'}
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default VPCalculator;