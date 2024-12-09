import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Box,
    Card,
    CardMedia,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import PetitionListObject from "./PetitionListObject";

interface petitionInfoProps {
    petition: PetitionInfo;
    petitionImage: string;
}

const PetitionInfo = (props: petitionInfoProps) => {
    const { id } = useParams();
    const [petitionInfo] = React.useState<PetitionInfo>(props.petition);
    const [petitionImage] = React.useState<string>(props.petitionImage);
    const [ownerImage, setOwnerImage] = React.useState<string>("");

    const [petitions, setPetitions] = React.useState<Array<Petition>>([]);
    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        getOwnerImage();
        getPetitions();
        getCategories();
    }, [petitionInfo, id]);

    const getOwnerImage = () => {
        axios
            .get(
                process.env.APP_URL + `/api/v1/users/${petitionInfo.ownerId}/image`,
                {
                    responseType: "arraybuffer",
                },
            )
            .then(
                (response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    const imageUrl = URL.createObjectURL(
                        new Blob([response.data], {
                            type: response.headers["content-type"],
                        }),
                    );
                    setOwnerImage(imageUrl);
                    // setPetition({ ...petition, image: imageUrl });
                },
                (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                },
            );
    };

    const getPetitions = () => {
        axios
            .all([
                axios.get(
                    process.env.APP_URL + `/api/v1/petitions?categoryIds=${petitionInfo.categoryId}`,
                ),
                axios.get(
                    process.env.APP_URL + `/api/v1/petitions?ownerId=${petitionInfo.ownerId}`,
                ),
            ])
            .then(
                axios.spread((data1, data2) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setPetitions([...data1.data.petitions, ...data2.data.petitions]);
                }),
            );
    };

    const getCategories = () => {
        axios.get(process.env.APP_URL + `/api/v1/petitions/categories`).then(
            (response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setCategories(response.data);
            },
            (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            },
        );
    };

    const petition_rows = () =>
        petitions
            .filter((petition) => petition.petitionId !== petitionInfo.petitionId)
            .map((petition: Petition) => (
                <PetitionListObject
                    key={petition.petitionId}
                    petition={petition}
                    categories={categories}
                />
            ));

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            spacing={5}
            sx={{ mt: 3 }}
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Typography variant="h3" sx={{ pt: 5 }}>
                    {petitionInfo.title}
                </Typography>
                <Card elevation={1}>
                    <CardMedia
                        // height="400px"
                        component="img"
                        image={petitionImage}
                        sx={{ width: "400px", height: "380px", objectFit: "cover" }}
                    />
                </Card>
            </Stack>
            <Grid item xs={8} md={8}>
                <Stack spacing={2} sx={{ mt: 3 }} direction="row" alignItems="center">
                    <Stack>
                        <Avatar src={ownerImage} sx={{ width: 56, height: 56 }} />
                    </Stack>
                    <Stack sx={{ minWidth: 0 }}>
                        <Typography noWrap>
                            {petitionInfo.ownerFirstName} {petitionInfo.ownerLastName}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography paragraph align={"left"} sx={{ mt: 3 }}>
                    {petitionInfo.info}
                </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
                <h3>Number of supporters: {petitionInfo.numberOfSupporters}</h3>
                <h3>Money raised: {petitionInfo.moneyRaised}</h3>
                <h3>support tiers prop</h3>
                <h3>supporters prop</h3>
            </Grid>

            <Box minWidth={"640px"}>
                <Typography sx={{ mt: 6, mb: 2 }} variant={"h4"}>
                    Similar Petitions
                </Typography>
                {petition_rows()}
            </Box>
        </Grid>
    );
};

export default PetitionInfo;
