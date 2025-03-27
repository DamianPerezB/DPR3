const pool = require('../db')

const getAllMateriales = async (req, res, next) => {
    try {
        const allMateriales = await pool.query("SELECT * FROM material");
        res.json(allMateriales.rows);
    } catch (error) {
        next(error);
    }
};

const getMaterial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM material WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Material no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createMaterial = async (req, res, next) => {
    try {
        const {
            id,
            inventarioUAM,
            inventarioCoordinacion,
            marca,
            modelo,
            numeroSerie,
            estado,
            nombreMaterial,
            cantidad,
            tipo,
            descripcion
        } = req.body;

        const result = await pool.query(
            `INSERT INTO material 
            (ID, Inventario_UAM, Inventario_coordinacion, Marca, Modelo, NumeroSerie, 
             Estado, NombreMaterial, Cantidad, Tipo, Descripcion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *`,
            [
                id,
                inventarioUAM,
                inventarioCoordinacion,
                marca,
                modelo,
                numeroSerie,
                estado,
                nombreMaterial,
                cantidad,
                tipo,
                descripcion
            ]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteMaterial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM material WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Material no encontrado" });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateMaterial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            inventarioUAM,
            inventarioCoordinacion,
            marca,
            modelo,
            numeroSerie,
            estado,
            nombreMaterial,
            cantidad,
            tipo,
            descripcion
        } = req.body;

        const result = await pool.query(
            `UPDATE material 
            SET Inventario_UAM = $1, Inventario_coordinacion = $2, Marca = $3, Modelo = $4, 
                NumeroSerie = $5, Estado = $6, NombreMaterial = $7, Cantidad = $8, 
                Tipo = $9, Descripcion = $10
            WHERE ID = $11 
            RETURNING *`,
            [
                inventarioUAM,
                inventarioCoordinacion,
                marca,
                modelo,
                numeroSerie,
                estado,
                nombreMaterial,
                cantidad,
                tipo,
                descripcion,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Material no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMateriales,
    getMaterial,
    createMaterial,
    deleteMaterial,
    updateMaterial
};