import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from "../redux/action";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const imageStyle = {
    width: '100px',
    height: '100px'
}

export const Home = () => {
    // const classes = useStyles();
    let dispatch = useDispatch();
    let navigate = useNavigate()
    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
            dispatch(loadUsers())
        }
    }

    return <>
        <div style={{textAlign: "center"}}>
            <Button style={{margin: "20px"}} variant='contained' color="primary" onClick={() => navigate("/addProd")}>
                Add Product
            </Button>
        </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell align="center">Image</StyledTableCell>
                        <StyledTableCell align="center">Cost&nbsp;(Rs)</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">Date Added</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((user) => (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell component="th" scope="row">
                                {user.pname}
                            </StyledTableCell>
                            <StyledTableCell align="center"><img style={imageStyle} src={user.pimage} alt="product" /></StyledTableCell>
                            <StyledTableCell align="center">{user.cost}</StyledTableCell>
                            <StyledTableCell align="center">{user.quantity}</StyledTableCell>
                            <StyledTableCell align="center">{user.date}</StyledTableCell>
                            <StyledTableCell align="center">{user.desc}</StyledTableCell>
                            <StyledTableCell align="center">
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    <Button color="info" onClick={() => navigate(`/editProd/${user.id}`)}>Edit</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </>

}

