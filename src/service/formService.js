import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
async function getFormById(id) {
    const response = await instance.get(`/form/${id}`, {});
    return response.data
}
async function getAllFormField(params = {}) {
    const response = await instance.get(`/admin/form`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getAllFormFieldActive(params = {}) {
    const response = await instance.get(`/admin/form/active`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getFieldById(id, params = {}) {
    const response = await instance.get(`/admin/form/${id}`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function editFieldById(id, data = {}, params = {}) {
    const response = await instance.post(`/admin/form/edit/${id}`, data, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function deleteFieldById(id, data = {}, params = {}) {
    const response = await instance.post(`/admin/form/del/${id}`, data, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function createField(data, params = {}) {
    const response = await instance.post(`/admin/form`, data, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
export { getFormById, getAllFormField, deleteFieldById, getFieldById, editFieldById, createField, getAllFormFieldActive }