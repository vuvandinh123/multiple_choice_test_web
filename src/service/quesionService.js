import instance from "../api/axiosConfig";
import Cookies from "js-cookie";
function getAllQuesionsByCategory(categoryId) {
    return instance.get(`/questions/${categoryId}`, {
        headers: {
            "token": Cookies.get("token"),
        },
    });
}
async function checkQuesions(data) {
    const response = await  instance.post(`competition/result`, data, {
        headers: {
            "token": Cookies.get("token"),
            "userId": Cookies.get("userId"),
        },
    });
    return response.data
}
export { getAllQuesionsByCategory, checkQuesions }