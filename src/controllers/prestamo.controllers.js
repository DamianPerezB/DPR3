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

        // Validación 1: ID préstamo existente
        const prestamoExistente = await pool.query("SELECT * FROM prestamo WHERE id = $1", [id]);
        if (prestamoExistente.rows.length > 0) {
            return res.status(400).json({ message: "El ID del préstamo ya existe" });
        }

        // Validación 2: Alumno existente
        const alumno = await pool.query("SELECT * FROM alumno WHERE id = $1", [idAlumno]);
        if (alumno.rows.length === 0) {
            return res.status(400).json({ message: "La matrícula no existe" });
        }

        // Validación 3: Empleado existente
        const empleado = await pool.query("SELECT * FROM empleado WHERE id = $1", [idEmpleado]);
        if (empleado.rows.length === 0) {
            return res.status(400).json({ message: "El empleado no existe" });
        }

        // Validación 4: Fecha
        if (new Date(fechaDevolucion) < new Date(fechaPrestamo)) {
            return res.status(400).json({ message: "La fecha de devolución no puede ser menor que la de préstamo" });
        }

        // Validación 5: Cantidad disponible
        const material = await pool.query("SELECT cantidad FROM material WHERE id = $1", [idMaterial]);
        if (material.rows.length === 0) {
            return res.status(400).json({ message: "El material no existe" });
        }

        if (material.rows[0].cantidad < cantidad) {
            return res.status(400).json({ message: "Cantidad solicitada mayor a la existente" });
        }

        // Descontar material del inventario
        await pool.query("UPDATE material SET cantidad = cantidad - $1 WHERE id = $2", [cantidad, idMaterial]);

        // Insertar préstamo
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

        res.status(201).json(result.rows[0]);
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