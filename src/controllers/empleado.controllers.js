const pool = require('../db')

const getAllEmpleados = async (req, res, next) => {
    try {
        const allEmpleados = await pool.query(
            "SELECT * FROM empleado"
        )
        res.json(allEmpleados.rows);
    } catch (error) {
        next(error);
    }
}

const getEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM empleado WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createEmpleado = async (req, res, next) => {
    try {
        const {
            noEconomico,
            password,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correoInstitucional,
            estado,
            tipo,
            permisos
        } = req.body;

        const result = await pool.query(
            `INSERT INTO empleado 
            (id, NoEconomico, Password, Nombre, ApellidoPaterno, ApellidoMaterno, CorreoInstitucional, Estado, Tipo, Permisos) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`,
            [
                noEconomico,
                noEconomico,
                password,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                correoInstitucional,
                estado,
                tipo,
                permisos
            ]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM empleado WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            noEconomico,
            password,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correoInstitucional,
            estado,
            tipo,
            permisos
        } = req.body;

        const result = await pool.query(
            `UPDATE empleado 
            SET NoEconomico = $1, Password = $2, Nombre = $3, ApellidoPaterno = $4, 
                ApellidoMaterno = $5, CorreoInstitucional = $6, Estado = $7, 
                Tipo = $8, Permisos = $9
            WHERE id = $10 
            RETURNING *`,
            [
                noEconomico,
                password,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                correoInstitucional,
                estado,
                tipo,
                permisos,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports =  {
    getAllEmpleados,
    getEmpleado,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
}
