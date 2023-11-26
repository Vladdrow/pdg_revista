import axios from "axios";
import config from "../../config";

const BASE_URL = config.baseURL;
/* const BASE_URL = `http://${myIp}:3010`; */

export const updateUserData = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/updateUser`, formData);
        return response.data;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

export const deleteUserData = async (userId, userType) => {
    try {
        const response = await axios.delete(`${BASE_URL}/user/${userId}`, { data: { userType } });
        return response.data;
    } catch (error) {
        console.error("Error deleting user data:", error);
        throw error;
    }
};
