import instance from "../api/axiosConfig";
async function getAllUnion() {
    const response = await instance.get(`/unions`);
    return response.data
}
export { getAllUnion }