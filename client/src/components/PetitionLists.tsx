import axios from 'axios';
import React, {useState} from "react";
import CSS from 'csstype';
import {
    Paper,
    AlertTitle,
    Alert,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    Checkbox, MenuItem, SelectChangeEvent, ListItemText, OutlinedInput, Grid
} from "@mui/material";
import PetitionListObject from "./PetitionListObject";
import NavBar from "./NavBar";
import { useUserAuthStateStore } from "../store";
import {Link} from "react-router-dom";
import Pagination from "./Pagination";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const PetitionList = () => {
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const[petitions, setPetitions] = React.useState<Array<Petition>>([])

    const [qParam, setQParam] = useState("");
    const [categoryIds, setCategoryIds] = useState<Array<string>>([])
    const [category, setCategorys] = useState<Array<Category>>([])
    const [sortBy, setSortBy] = useState("CREATED_ASC")
    const [supportCost, setSupportingCost] = useState("0")

    const [petitionsPerPage, setPostPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const lastPetitionIndex = currentPage * petitionsPerPage;
    const firstPetitionIndex = lastPetitionIndex - petitionsPerPage;
    const currentPetitions = petitions.slice(firstPetitionIndex, lastPetitionIndex);

    const getPetitions = () => {
        axios.get(process.env.APP_URL + `/api/v1/petitions`, {
            params: {
                q: qParam || undefined,
                categoryIds: categoryIds,
                sortBy: sortBy,
                supportingCost: supportCost,
            }})
            .then((response) => {
                console.log("API Response: ", response.data);
                setErrorFlag(false);
                setErrorMessage("");
                setPetitions(response.data.petitions);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            });
    }

    React.useEffect(() => {
        getPetitions();
        getCategorys();
    }, [qParam, categoryIds, sortBy, supportCost]);

    const getCategorys = () => {
        axios.get(process.env.APP_URL + `/api/v1/petitions/categories`).then(
            (response) => {
                setCategorys(response.data);
            },
            (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            },
        );
    };

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        const prevCategoryIds = [...categoryIds];
        setCategoryIds([]);
        value.forEach((v) => {
            prevCategoryIds.push(v);
        });
        setCategoryIds(prevCategoryIds);
    };

    const petition_rows = () => currentPetitions.map((petition: Petition) => <PetitionListObject key={petition.petitionId + petition.title} petition={petition} categories={category} />);

    const card: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        display: "block",
        width: "fit-content"
    };

    return (

        <React.Fragment>
            <NavBar/>
            <Paper elevation={3} style={card} sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', mt: 4 }}>
                <h1>Petitions</h1>
                <Box className="login" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4 }}>
                    <form autoComplete="off" onSubmit={getPetitions} noValidate>
                        <h2>Filter</h2>
                        <TextField
                            label="Search query"
                            onChange={(e) => setQParam(e.target.value)}
                            variant="outlined"
                            color="secondary"
                            type="q"
                            sx={{mb: 3}}
                            fullWidth
                            value={qParam}
                        />
                        <TextField
                            label="support cost"
                            onChange={(e) => setSupportingCost(e.target.value)}
                            variant="outlined"
                            color="secondary"
                            type="supportCost"
                            value={supportCost}
                            fullWidth
                            sx={{mb: 3}}
                        />
                        <FormControl>
                            <InputLabel id="select-sort-label">Sort by</InputLabel>
                            <Select
                                size="small"
                                label="Sort by"
                                labelId="select-sort-label"
                                id="select-sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="CREATED_ASC">Oldest First</MenuItem>
                                <MenuItem value="CREATED_DESC">Newest First</MenuItem>
                                <MenuItem value="ALPHABETICAL_ASC">A-Z, by title</MenuItem>
                                <MenuItem value="ALPHABETICAL_DESC">Z-A, by title</MenuItem>
                                <MenuItem value="COST_ASC">Lowest cost</MenuItem>
                                <MenuItem value="COST_DESC">Highest cost</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<span>{formError && (<div>{errorMessage}</div>)}</span>*/}
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="select-category-dropdown-label">Tag</InputLabel>
                            <Select
                                labelId="select-category-dropdown"
                                id="demo-multiple-checkbox"
                                multiple
                                value={categoryIds}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {category.map((c) => (
                                    <MenuItem key={c.categoryId} value={c.categoryId.toString()}>
                                        <Checkbox checked={categoryIds.indexOf(c.categoryId.toString()) > -1} />
                                        <ListItemText primary={c.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/*<Button variant="outlined" color="secondary" type="submit">Submit</Button>*/}
                    </form>
            </Box>
            <div style={{display: "inline-block", maxWidth: "965px", minWidth: "320px"}}>
                {errorFlag ?
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert> : ""}
                <Grid container spacing={2}>
                    {petition_rows()}
                    <Pagination totalPetitions={petitions.length} petitionsPerPage={petitionsPerPage} setCurrentPage={setCurrentPage} />
                </Grid>
                {/*{petition_rows()}*/}
            </div>
        </Paper></React.Fragment>
    )
}

export default PetitionList;
