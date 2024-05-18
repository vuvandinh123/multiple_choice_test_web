import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
async function getAllCategory(params = {}) {
    const response = await instance.get(`/admin/categories`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}

async function getAllQuesionsByCategoryAdmin(id) {
    const response = await instance.get(`/admin/categories/questions/${id}`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getAllQuesionsByCategoryForm(id) {
    const response = await instance.get(`/admin/categories/get-questions/${id}`, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function editCategory(id, data) {
    const response = await instance.post(`/admin/categories/edit/${id}`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function newCategory(data) {
    const response = await instance.post(`/admin/categories`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function getCategory(id) {
    const response = await instance.get(`/categories/item/${id}`);
    return response.data
}
async function getAllQuesionsByCategory(id) {
    const response = await instance.get(`/categories/${id}`, {
        headers: {
            "token": Cookies.get("token"),
        },
    });
    return response.data
}
async function deleteCategory(id) {
    const response = await instance.post(`/admin/categories/del/${id}`, {}, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        }
    });
    return response.data
}
async function updateAnswer(data) {
    const response = await instance.post(`competition/update/answer`, data, {
        headers: {
            "token": Cookies.get("token"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}

async function createCategory(data) {
    const response = await instance.post(`/admin/categories`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
async function updateHistory(data) {
    const response = await instance.post(`competition/update/history`, data, {
        headers: {
            "token": Cookies.get("token"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
export { getAllCategory, getCategory, getAllQuesionsByCategory, updateAnswer, updateHistory, getAllQuesionsByCategoryAdmin, editCategory, createCategory, deleteCategory, newCategory,getAllQuesionsByCategoryForm }