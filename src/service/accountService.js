import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
async function checkToken() {
    const response = await instance.post(`/check-token`, {}, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function AccountLogin(data) {
    const response = await instance.post(`/admin/login`, data);
    return response.data
}
async function getAllAccount(params) {
    const response = await instance.get(`/admin/accounts`, {
        params: params,
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function createAccount(data) {
    const response = await instance.post(`/admin/accounts`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function editAccount(id,data) {
    const response = await instance.post(`/admin/accounts/edit/${id}`, data, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
async function deleteAccount(id) {
    const response = await instance.post(`/admin/accounts/del/${id}`,{}, {
        headers: {
            "accessToken": Cookies.get("accessToken"),
            "userId": Cookies.get("adminId"),
        },
    });
    return response.data
}
export { checkToken, AccountLogin, getAllAccount, createAccount, editAccount,deleteAccount }