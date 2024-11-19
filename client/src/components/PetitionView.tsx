import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { useUserAuthStateStore } from "../store";
const PetitionView = () => {
    const { id } = useParams();
    const [petition, setPetition] = React.useState<Petition>();
    const [petitionImage, setPetitionImage] = React.useState<string>("");
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        getPetition();
        getPetitionImage();
    }, [id, setPetition]);

    const getPetition = () => {
        axios.get(`http://localhost:4941/api/v1/petitions/${id}`).then(
            (response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setPetition(response.data);
                console.log(response.data);
            },
            (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            },
        );
    };

    const getPetitionImage = () => {
        axios
            .get(`http://localhost:4941/api/v1/petitions/${id}/image`, {
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
        <>
            <NavBar />
            petition details
            <div>
                {petition?.title}
                {petition?.ownerFirstName} {petition?.ownerLastName}
            </div>
        </>
    );
};

export default PetitionView;
