import React from 'react'
import { Box, Button } from '@mui/material';
interface IPaginationProps {
    totalPetitions: number
    petitionsPerPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = (props: IPaginationProps) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(props.totalPetitions/props.petitionsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                {
                    pages.map((page, index) => {
                        return <button key={index} onClick={() => props.setCurrentPage(page)}>{page}</button>
                    })
                }
            </Box>
        </div>
    )
}

export default Pagination