import * as types from "./actionType"
import axios from "axios"

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
})

const userDeleted = () => ({
    type: types.DELETE_USER
})

const prodAdded = () => ({
    type: types.ADD_PRODUCT
})

const prodUpdate = () => ({
    type: types.UPDATE_PRODUCT
})

const getProd = (prod) => ({
    type: types.GET_SINGLE_PRODUCT,
    payload: prod
})

export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((res) => {
            console.log("res", res)
            dispatch(getUsers(res.data))
        })
            .catch((error) => console.log(error))
    }
}

export const deleteUser = (id) => {
    return function (dispatch) {
        axios
            .delete(`${process.env.REACT_APP_API}/${id}`)
            .then((res) => {
                console.log("res", res)
                dispatch(userDeleted())
                dispatch(loadUsers())
            })
            .catch((error) => console.log(error))
    }
}

export const addProd = (product) => {
    return function (dispatch) {
        axios
            .post(`${process.env.REACT_APP_API}`, product)
            .then((res) => {
                console.log("res", res)
                dispatch(prodAdded())
                dispatch(loadUsers())
            })
            .catch((error) => console.log(error))
    }
}

export const getSingleProd = (id) => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}/${id}`)
            .then((res) => {
                console.log("res", res)
                dispatch(getProd(res.data))
            })
            .catch((error) => console.log(error))
    }
}

export const updateProd = (user, id) => {
    return function (dispatch) {
        axios
            .put(`${process.env.REACT_APP_API}/${id}`, user)
            .then((res) => {
                console.log("res", res)
                dispatch(prodUpdate())
            })
            .catch((error) => console.log(error))
    }
}