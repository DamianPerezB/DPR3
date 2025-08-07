const pool = require("../db");

const getAllPrestamos = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*, 
        a.matricula AS alumno_matricula, 
        e.nombre AS empleado_nombre
      FROM prestamo p
      LEFT JOIN alumno a ON a.id = p.idalumno
      LEFT JOIN empleado e ON e.id = p.idempleado
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getPrestamosActivos = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*, 
        a.matricula AS alumno_matricula, 
        e.nombre AS empleado_nombre
      FROM prestamo p
      LEFT JOIN alumno a ON a.id = p.idalumno
      LEFT JOIN empleado e ON e.id = p.idempleado
      WHERE p.estadoprestamo = 0
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getPrestamosAlumno = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        p.*, 
        a.matricula AS alumno_matricula, 
        e.nombre AS empleado_nombre
      FROM prestamo p
      LEFT JOIN alumno a ON a.id = p.idalumno
      LEFT JOIN empleado e ON e.id = p.idempleado
      WHERE p.idalumno = $1
    `,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getPrestamo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const prestamoQuery = `
      SELECT 
        p.id,
        p.idalumno,
        a.matricula AS matricula_alumno,
        p.idempleado,
        e.noeconomico AS no_economico,
        p.tipoprestamo,
        p.fechaprestamo,
        p.fechadevolucion,
        p.uea,
        p.grupo,
        p.observaciones
      FROM prestamo p
      JOIN alumno a ON p.idalumno = a.id
      JOIN empleado e ON p.idempleado = e.id
      WHERE p.id = $1
    `;
    const prestamoResult = await pool.query(prestamoQuery, [id]);

    if (prestamoResult.rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    const prestamo = prestamoResult.rows[0];

    const materialesQuery = `
      SELECT 
        mp.idmaterial,
        m.nombrematerial AS nombrematerial,
        mp.cantidad
      FROM material_prestamo mp
      JOIN material m ON mp.idmaterial = m.id
      WHERE mp.idprestamo = $1
    `;
    const materialesResult = await pool.query(materialesQuery, [id]);

    res.json({
      id: prestamo.id,
      matriculaAlumno: prestamo.matricula_alumno,
      numeroEconomico: prestamo.no_economico,
      fechaPrestamo: prestamo.fechaprestamo,
      fechaDevolucion: prestamo.fechadevolucion,
      tipoPrestamo: prestamo.tipoprestamo,
      uea: prestamo.uea,
      grupo: prestamo.grupo,
      observaciones: prestamo.observaciones,
      materiales: materialesResult.rows,
    });
  } catch (error) {
    console.error("Error al obtener el préstamo:", error);
    next(error);
  }
};

const createPrestamo = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const {
      id,
      idAlumno,
      idEmpleado,
      estadoPrestamo,
      fechaPrestamo,
      fechaDevolucion,
      uea,
      grupo,
      observaciones,
      tipoPrestamo,
      materiales,
    } = req.body;

    const prestamoExistente = await pool.query(
      "SELECT 1 FROM prestamo WHERE id = $1",
      [id]
    );
    if (prestamoExistente.rows.length > 0) {
      return res.status(400).json({ message: "El ID del préstamo ya existe" });
    }

    const alumno = await pool.query("SELECT 1 FROM alumno WHERE id = $1", [
      idAlumno,
    ]);
    if (alumno.rows.length === 0) {
      return res.status(400).json({ message: "La matrícula no existe" });
    }

    const empleado = await pool.query("SELECT 1 FROM empleado WHERE id = $1", [
      idEmpleado,
    ]);
    if (empleado.rows.length === 0) {
      return res.status(400).json({ message: "El empleado no existe" });
    }

    if (new Date(fechaDevolucion) < new Date(fechaPrestamo)) {
      return res.status(400).json({
        message: "La fecha de devolución no puede ser menor que la de préstamo",
      });
    }

    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO prestamo 
        (ID, IdAlumno, IdEmpleado, EstadoPrestamo, FechaPrestamo, FechaDevolucion, 
         UEA, Grupo, Observaciones, TipoPrestamo) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [
        id,
        idAlumno,
        idEmpleado,
        estadoPrestamo,
        fechaPrestamo,
        fechaDevolucion,
        uea,
        grupo,
        observaciones,
        tipoPrestamo,
      ]
    );

    for (const material of materiales) {
      const { idMaterial, cantidad } = material;

      const materialDB = await client.query(
        "SELECT cantidad FROM material WHERE id = $1",
        [idMaterial]
      );

      if (materialDB.rows.length === 0) {
        await client.query("ROLLBACK");
        return res
          .status(400)
          .json({ message: `Material ${idMaterial} no existe` });
      }

      if (materialDB.rows[0].cantidad < cantidad) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          message: `Cantidad de ${idMaterial} solicitada mayor a la disponible`,
        });
      }

      await client.query(
        "UPDATE material SET cantidad = cantidad - $1 WHERE id = $2",
        [cantidad, idMaterial]
      );

      await client.query(
        "INSERT INTO material_prestamo (IdPrestamo, IdMaterial, Cantidad) VALUES ($1, $2, $3)",
        [id, idMaterial, cantidad]
      );
    }

    await client.query("COMMIT");
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};

const getPrestamosPorEmpleado = async (req, res, next) => {
  try {
    const { idEmpleado } = req.params;
    const result = await pool.query(
      "SELECT COUNT(*) FROM prestamo WHERE idempleado = $1",
      [idEmpleado]
    );
    const contador = parseInt(result.rows[0].count, 10);
    res.json({ contador });
  } catch (error) {
    next(error);
  }
};

const finalizarPrestamo = async (req, res, next) => {
  const { id } = req.params;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const prestamoRes = await client.query(
      "SELECT * FROM prestamo WHERE id = $1 AND estadoprestamo = 0",
      [id]
    );

    if (prestamoRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Préstamo no encontrado o ya finalizado." });
    }

    const materialesRes = await client.query(
      "SELECT idmaterial, cantidad FROM material_prestamo WHERE idprestamo = $1",
      [id]
    );

    for (const { idmaterial, cantidad } of materialesRes.rows) {
      await client.query(
        "UPDATE material SET cantidad = cantidad + $1 WHERE id = $2",
        [cantidad, idmaterial]
      );
    }

    await client.query(
      "UPDATE prestamo SET estadoprestamo = 1, fechaentregado = CURRENT_DATE WHERE id = $1",
      [id]
    );

    await client.query("COMMIT");

    res.json({ message: "Préstamo finalizado correctamente." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    next(error);
  } finally {
    client.release();
  }
};

module.exports = {
  getAllPrestamos,
  getPrestamosAlumno,
  getPrestamosActivos,
  getPrestamo,
  createPrestamo,
  getPrestamosPorEmpleado,
  finalizarPrestamo,
};
