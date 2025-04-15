import axios from 'axios'
import React, {ChangeEvent, useState} from "react"
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "./Pagination";
import {BASE_URL} from "../../../utility/config";

const Petitions = () => {
    const [petitions,setPetitions] = React.useState <Petition[]> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [qParam, setQParam] = useState("");
    const [categoryIds, setCategoryIds] = useState<Array<number>>([])
    const [category, setCategorys] = useState<Array<Category>>([])

    const [sortBy, setSortBy] = useState("CREATED_ASC")
    const [supportCost, setSupportingCost] = useState(0)

    const [petitionsPerPage, setPostPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const lastPetitionIndex = currentPage * petitionsPerPage;
    const firstPetitionIndex = lastPetitionIndex - petitionsPerPage;
    const currentPetitions = petitions.slice(firstPetitionIndex, lastPetitionIndex);

    type petitionResponse = {
        petitions: Petition[];
        count: number;
    };

    const getCategories = () => {
        axios.get(`${BASE_URL}/api/v1/petitions/categories`).then(
            (response) => {
                setCategorys(response.data);
            },
            (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            },
        );
    };

    const getPetitions = () => {
       axios.get(`${BASE_URL}/api/v1/petitions`, {
           params: {
               q: qParam || undefined}})
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


    // const submitForm = (event: { preventDefault: () => void; }) => {
    //     //event.preventDefault();
    //     console.log("submit form step reached")
    //
    //     axios.get<petitionResponse>('`${BASE_URL}/api/v1/petitions?' + 'q=community')
    //         .then((response) => {
    //             console.log("API Response: ", response.data);
    //             setErrorFlag(false);
    //             setErrorMessage("");
    //             setUsers(response.data.petitions);
    //         }, (error) => {
    //             setErrorFlag(true);
    //             setErrorMessage(error.toString());
    //         });
    // }

    const list_of_petitions = () => {
        return petitions.map((item: Petition) =>
            <tr key={item.petitionId}>
                <th scope="row">{item.petitionId}</th>
                <td>{item.title}</td>
                {/*<td><Link to={"/users/" + item.ownerId}>Go to user</Link></td>*/}
                <td>
                    <button type="button">Delete</button>
                    <button type="button">Edit</button>
                </td>
            </tr>
        );
    }


    React.useEffect(() => {
        getPetitions();
        getCategories();
    }, [qParam])

    if (errorFlag) {
        return (
            <div>
                <h1>Petitions</h1>
                <div style={{ color: "red" }}>
                    {errorMessage}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Petitions</h1>
                <form>
                    <label>
                        {/*<input type="text" onChange={(e) => getInput(e)} name="q" id="q"/>*/}
                        {/*<input type="text" onChange={handleParamChange("q")} name="q" id="q"/>*/}
                        <input type="text" onChange={(e) => {setQParam(e.target.value)}} id="q"/>


                    </label>
                    <button>Submit</button>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username</th>
                        <th scope="col">link</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list_of_petitions()}
                    </tbody>
                    {/*<Pagination totalPetitions={petitions.length} petitionsPerPage={petitionsPerPage} setCurrentPage={setCurrentPage}/>*/}
                </table>
            </div>
        );
    }
    //return (<h1>Users</h1>)
}

export default Petitions;