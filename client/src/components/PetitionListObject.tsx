import React, {useEffect, useState} from "react";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
// import { useUserStore } from "../store";
import {
    Avatar,
    Button,
    Card, CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, Stack,
    TextField,
    Typography
} from "@mui/material";
import CSS from 'csstype';
import {Link} from "react-router-dom";
import {BASE_URL} from "../utility/config";

interface IPetitionProps {
    petition: Petition
    categories?: Array<Category>
}

const PetitionListObject = (props: IPetitionProps) => {
    const [petition] = React.useState<Petition>(props.petition);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [username, setUsername] = React.useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [ownerImage, setOwnerImage] = React.useState<string>()
    const [petitionImage, setPetitionImage] = useState<string>("")


    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };

    const petitionCardStyles: CSS.Properties = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "420px",
        width: "300px",
        margin: "10px",
        padding: "0px"
    };
    const fetchImage = () => {
        axios.get(`${BASE_URL}/api/v1/users/${petition.ownerId}/image`, {
            responseType: "arraybuffer",
        })
            .then((response) => {
                console.log("Image Response: ", response.data);
                console.log("ID from img Response: ", petition.ownerId);
                //setImageUrl(response.data); vcc

                const imageUrl = URL.createObjectURL(
                    new Blob([response.data], {
                        type: response.headers["content-type"],
                    }),
                );
                setOwnerImage(imageUrl);

                setErrorFlag(false);
                setErrorMessage("");

            }, (e) => {
                setErrorFlag(true);
                setErrorMessage(e.toString());
            });
    }

    useEffect(() => {
        getOwnerImage();
        fetchImage();
        console.log("image fetching done");

    }, [petition]);

    const getOwnerImage = () => {
        axios
            .get(`${BASE_URL}/api/v1/petitions/${petition.petitionId}/image`, {
                responseType: "arraybuffer",
            })
            .then(
                (response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    const imageUrl = URL.createObjectURL(
                        new Blob([response.data], {
                            type: response.headers["content-type"],
                        }),
                    );
                    setPetitionImage(imageUrl);
                },
                (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                },
            );
    };

    return (
        <Card sx={petitionCardStyles}>
            <CardActionArea
                component={Link}
                to={`/petitions/${petition.petitionId}`}
            >
            <CardMedia
                component="img"
                height="200"
                width="300"
                sx={{ objectFit: "cover" }}
                image={petitionImage} alt="Auction hero"
            />
            <CardContent>
                <Typography variant="h5">
                    #{petition.petitionId}: {petition.title}
                </Typography>
                <Typography variant="subtitle1">
                    {petition.creationDate}
                </Typography>
                <Typography variant="subtitle1">
                    {petition.ownerFirstName} {petition.ownerLastName}  <Stack>
                    <Avatar src={ownerImage} sx={{ width: 40, height: 40 }} />
                </Stack>
                    {petition.ownerImage}
                    Supporter count: {petition.numberOfSupporters}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => { setOpenEditDialog(true) }}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => { setOpenDeleteDialog(true) }}>
                    <Delete />
                </IconButton>
            </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default PetitionListObject;
