import { updateUserService, removeUser } from "../services/update.service.js";

export const updateUserData = async (req, res) => {
    try {
        const updatedUser = await updateUserService(req.body);
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Error updating user data.");
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtener userId de req.params
        const { userType } = req.body; // Obtener userType de req.body
        console.log("userType en controller", userType);
        const result = await removeUser(userId, userType);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user.");
    }
};
