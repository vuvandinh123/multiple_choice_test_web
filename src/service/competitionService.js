import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
async function countCompetition() {
    const response = await instance.get(`/admin/competition/count`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getAllCompetition(params) {
    const response = await instance.get(`/admin/competition`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getAllCompetitionByUser(params) {
    const response = await instance.get(`/competition`, {
        params: params
    });
    return response.data
}
async function getCompetitionByUserId(id) {
    const response = await instance.get(`/competition/${id}`, {
    });
    return response.data
}

async function deleteCompetition(id, params = {}) {
    const response = await instance.post(`/admin/competition/del/` + id, {},{
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function editCompetition(id, data, params = {}) {
    const response = await instance.post(`/admin/competition/` + id, data, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function newCompetition(data, params = {}) {
    const response = await instance.post(`/admin/competition`, data, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getQusitionCompetition(id, params = {}) {
    const response = await instance.get(`/competition/question/${id}`, {
        params: params,
        headers: {
            "token": Cookies.get("token"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
async function getCompetitionById(id, params = {}) {
    const response = await instance.get(`/competition/${id}`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("token"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
export { countCompetition,getQusitionCompetition, getCompetitionByUserId, getAllCompetition, deleteCompetition, getAllCompetitionByUser, editCompetition, newCompetition,getCompetitionById }