import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
async function AddUser(data) {
    const response = await instance.post(`/users`, data);
    return response.data
}
async function getAllUser(filter) {
    const response = await instance.get(`/admin/users`, {
        params: filter,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function countUser() {
    const response = await instance.get(`/admin/users/count`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function deleteUserMultiple(data) {
    const response = await instance.post(`/admin/users/del/multi`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data

}
async function deleteUser(id) {
    const response = await instance.post(`/admin/users/del/` + id, {}, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function countUserIsQuiz() {
    const response = await instance.get(`/admin/users/count/is-quiz`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}

async function userCount() {
    const response = await instance.get(`/admin/count`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getChart() {
    const response = await instance.get(`/chart`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
async function getUserById(id) {
    const response = await instance.get(`/admin/users/${id}`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function deleteUserById(id) {
    const response = await instance.post(`/admin/users/del/${id}`, {}, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
export { AddUser, getAllUser, getChart, getUserById, userCount, deleteUserById, countUser, countUserIsQuiz, deleteUser, deleteUserMultiple }