import React from 'react'
import { Box, Button } from '@mui/material';
interface IPaginationProps {
    totalPetitions: number
    petitionsPerPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

// .pagination {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     margin-top: 1rem;
// }
//
// .pagination button {
//     width: 40px;
//     height: 40px;
//     font-family: inherit;
//     font-weight: 600;
//     font-size: 16px;
//     margin: 0 10px;
//     border-radius: 6px;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     background: transparent;
//     color: #eee;
//     border-color: #eee;
// }
//
// .pagination button.active {
//     font-weight: 900;
//     border-color: #101010;
//     background: #ffe400;
//     color: #101010;
// }

const Pagination = (props: IPaginationProps) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(props.totalPetitions/props.petitionsPerPage); i++) {
        pages.push(i)
    }

    // return (
    //     <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
    //         {
    //             pages.map((page, index) => (
    //                 <Button
    //                     key={index}
    //                     onClick={() => props.setCurrentPage(page)}
    //                     sx={{
    //                         width: '40px',
    //                         height: '40px',
    //                         fontFamily: 'inherit',
    //                         fontWeight: 600,
    //                         fontSize: '16px',
    //                         margin: '0 10px',
    //                         borderRadius: '6px',
    //                         cursor: 'pointer',
    //                         transition: 'all 0.3s ease',
    //                         backgroundColor: 'transparent',
    //                         color: '#eee',
    //                         borderColor: '#eee',
    //                         '&:hover': {
    //                             backgroundColor: '#ffe400',
    //                             color: '#101010',
    //                         },
    //                         '&.active': {
    //                             fontWeight: 900,
    //                             borderColor: '#101010',
    //                             backgroundColor: '#ffe400',
    //                             color: '#101010',
    //                         }
    //                     }}
    //                 >
    //                     {page}
    //                 </Button>
    //             ))
    //         }
    //     </Box>
    // );
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