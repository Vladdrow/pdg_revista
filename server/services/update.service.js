import { updateUserInDb, deleteUserFromDB } from "../data/update.data.js";

export const updateUserService = async (formData) => {
    return await updateUserInDb(formData);
};

export const removeUser = async (userId, userType) => {
    console.log(userId,userType);
    userType = userType === "Administrativo" ? "1" : userType;
    console.log(userType);
    return await deleteUserFromDB(userId, userType);
};
