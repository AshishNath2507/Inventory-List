import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getSingleProd, updateProd } from '../redux/action';

export const EditProd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    const [state, setState] = useState({
        pname: "",
        pimage: "",
        quantity: 0,
        cost: 0,
        desc: "",
        date: new Date()
    })
    const { pname, pimage, quantity, cost, desc, date } = state;
    let { id } = useParams();
    const { user } = useSelector(state => state.data)

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pname || !pimage || !quantity || !cost || !desc) {
            setError("Please input all the input fields")
        } else {
            dispatch(updateProd(state, id))
            navigate("/")
            setError("")
        }
    }

    useEffect(() => {
        dispatch(getSingleProd(id))
    }, [])

    useEffect(() => {
        if (user) {
            setState({ ...user })
        }
    }, [user])

    const errorHandling = {
        margin: "0",
        padding: "0"
    }

    return <>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '45ch' },
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            border="3px solid green"
            noValidate
            autoComplete="off"
        >
            <Button style={{ width: "100px" }} variant="outlined" color="secondary" onClick={() => navigate("/")} >Go Back</Button>
            <div>
                <h2>Edit Products</h2>
            </div>
            {error && <div style={errorHandling}><h3 style={{ color: "red" }}>{error}</h3></div>}
            <TextField
                id="standard-basic"
                label="Product Name"
                variant="standard"
                value={pname || ""}
                name="pname"
                type="text"
                onChange={handleInputChange} />
            <TextField
                id="standard-basic"
                label="Product Image"
                variant="standard"
                type="text"
                name="pimage"
                value={pimage || ""}
                onChange={handleInputChange} />
            <TextField
                id="standard-number"
                label="Quantity (ton)"
                type="number"
                variant="standard"
                name="quantity"
                value={quantity || ""}
                onChange={handleInputChange}
            />
            <TextField
                id="standard-number"
                label="Cost (g)"
                type="number"
                variant="standard"
                name="cost"
                value={cost || ""}
                onChange={handleInputChange}
            />
            <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                type="text"
                name="desc"
                value={desc || ""}
                onChange={handleInputChange} />
            <TextField
                id="standard-basic"
                label=""
                variant="standard"
                type="date"
                name="date"
                value={date || ""}
                onChange={handleInputChange} />
            <Button style={{ width: "100px" }} variant="outlined" color="primary" type="submit" onClick={handleSubmit} >Update</Button>
        </Box>
    </>
}
