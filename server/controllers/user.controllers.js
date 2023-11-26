import pool from "../db.js";
export const showHomePage = (req, res) => {
    const {title, description } = req.body;
    /* pool.query */
    res.send("Obteniendo Tareas");
};

export const registerUser = (req, res) => {
    const {name, lastName1, lastName2, email, password} = req.body;
    pool.query();

    res.send("Registrando usuario");
}

/*     try {
        const [result] = await pool.query(
            "SELECT * FROM task ORDER BY createAt ASC"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } */
