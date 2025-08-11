const pool = require("../db");

const getAllAlumnos = async (req, res, next) => {
  try {
    const allAlumnos = await pool.query("SELECT * FROM alumno");
    res.json(allAlumnos.rows);
  } catch (error) {
    next(error);
  }
};

const getAlumno = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM alumno WHERE id = $1", [id]);
    if (result.rows.length == 0)
      return res.status(404).json({
        message: "Alumno no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createAlumno = async (req, res, next) => {
  const {
    matricula,
    password,
    nombre,
    apellidop,
    apellidom,
    unidad,
    division,
    licenciatura,
    estado,
    correoinstitucional,
    observaciones,
  } = req.body;

  const sancion = 0;

  try {
    const result = await pool.query(
      "INSERT INTO alumno (id, matricula, password, nombre, apellidopaterno, apellidomaterno, unidad, division, licenciatura, estado, sancion, correoinstitucional, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        matricula,
        matricula,
        password,
        nombre,
        apellidop,
        apellidom,
        unidad,
        division,
        licenciatura,
        estado,
        sancion,
        correoinstitucional,
        observaciones,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteAlumno = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM alumno WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Alumno not found",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateAlumno = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      matricula,
      password,
      nombre,
      apellidop,
      apellidom,
      unidad,
      division,
      licenciatura,
      estado,
      correoinstitucional,
      observaciones,
    } = req.body;

    let query;
    let values;

    if (password && password.trim() !== "") {
      query = `
        UPDATE alumno 
        SET matricula = $1, password = $2, nombre = $3, apellidopaterno = $4, 
            apellidomaterno = $5, unidad = $6, division = $7, licenciatura = $8, 
            estado = $9, correoinstitucional = $10, observaciones = $11
        WHERE id = $12 
        RETURNING *`;
      values = [
        matricula,
        password,
        nombre,
        apellidop,
        apellidom,
        unidad,
        division,
        licenciatura,
        estado,
        correoinstitucional,
        observaciones,
        id,
      ];
    } else {
      query = `
        UPDATE alumno 
        SET matricula = $1, nombre = $2, apellidopaterno = $3, 
            apellidomaterno = $4, unidad = $5, division = $6, licenciatura = $7, 
            estado = $8, correoinstitucional = $9, observaciones = $10
        WHERE id = $11 
        RETURNING *`;
      values = [
        matricula,
        nombre,
        apellidop,
        apellidom,
        unidad,
        division,
        licenciatura,
        estado,
        correoinstitucional,
        observaciones,
        id,
      ];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    next(error);
  }
};

const updatePass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${idx++}`);
        values.push(value);
      }
    }

    if (password && password.trim() !== "") {
      fields.push(`password = $${idx++}`);
      values.push(password);
    }

    values.push(id);

    const query = `
      UPDATE alumno
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    next(error);
  }
};

const getPerfil = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        a.id,
        a.matricula,
        a.password,
        a.nombre,
        a.apellidopaterno,
        a.apellidomaterno,
        a.correoinstitucional,
        u.nombre AS unidad,
        d.nombre AS division,
        l.nombre AS licenciatura,
        CASE a.estado
          WHEN 1 THEN 'Inscrito'
          WHEN 2 THEN 'No inscrito'
          ELSE 'Desconocido'
        END AS estado,
        CASE a.sancion
          WHEN '0' THEN 'Sin sanción'
          WHEN '1' THEN 'Sancionado'
          ELSE 'Desconocido'
        END AS sancion,
        a.observaciones
      FROM alumno a
      LEFT JOIN unidad u ON a.unidad = u.id
      LEFT JOIN division d ON a.division = d.id
      LEFT JOIN licenciatura l ON a.licenciatura = l.id
      WHERE a.id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length == 0)
      return res.status(404).json({
        message: "Alumno no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlumnos,
  getAlumno,
  createAlumno,
  updatePass,
  deleteAlumno,
  updateAlumno,
  getPerfil,
};
