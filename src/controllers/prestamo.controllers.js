const pool = require('../db');

const getAllPrestamos = async (req, res, next) => {
    try {
        const allPrestamos = await pool.query("SELECT * FROM prestamo");
        res.json(allPrestamos.rows);
    } catch (error) {
        next(error);
    }
};

const getPrestamo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM prestamo WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createPrestamo = async (req, res, next) => {
    try {
        const {
            id,
            idAlumno,
            idEmpleado,
            estadoPrestamo,
            fechaPrestamo,
            fechaDevolucion,
            idMaterial,
            cantidad,
            uea,
            grupo,
            observaciones,
            tipoPrestamo
        } = req.body;

        const result = await pool.query(
            `INSERT INTO prestamo 
            (ID, IdAlumno, IdEmpleado, EstadoPrestamo, FechaPrestamo, FechaDevolucion, 
             IdMaterial, Cantidad, UEA, Grupo, Observaciones, TipoPrestamo) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
            RETURNING *`,
            [
                id,
            idAlumno,
            idEmpleado,
            estadoPrestamo,
            fechaPrestamo,
            fechaDevolucion,
            idMaterial,
            cantidad,
            uea,
            grupo,
            observaciones,
            tipoPrestamo
            ]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deletePrestamo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM prestamo WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updatePrestamo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            idAlumno,
            idEmpleado,
            estadoPrestamo,
            fechaPrestamo,
            fechaDevolucion,
            idMaterial,
            cantidad,
            uea,
            grupo,
            observaciones,
            tipoPrestamo
        } = req.body;

        const result = await pool.query(
            `UPDATE prestamo 
            SET IdAlumno = $1, IdEmpleado = $2, EstadoPrestamo = $3, FechaPrestamo = $4, 
                FechaDevolucion = $5, IdMaterial = $6, Cantidad = $7, UEA = $8, 
                Grupo = $9, Observaciones = $10, TipoPrestamo = $11
            WHERE ID = $12 
            RETURNING *`,
            [
                idAlumno,
                idEmpleado,
                estadoPrestamo,
                fechaPrestamo,
                fechaDevolucion,
                idMaterial,
                cantidad,
                uea,
                grupo,
                observaciones,
                tipoPrestamo,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPrestamos,
    getPrestamo,
    createPrestamo,
    deletePrestamo,
    updatePrestamo
};