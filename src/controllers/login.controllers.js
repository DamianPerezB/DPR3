const pool = require('../db');

const loginUsuario = async (req, res, next) => {
  try {
    const { correo, password } = req.body;

    const empleado = await pool.query(
      'SELECT * FROM empleado WHERE correoinstitucional = $1',
      [correo]
    );

    if (empleado.rows.length > 0) {
      if (empleado.rows[0].password === password) {
        return res.json({ tipo: 'empleado', datos: empleado.rows[0] });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }

    const alumno = await pool.query(
      'SELECT * FROM alumno WHERE correoinstitucional = $1',
      [correo]
    );

    if (alumno.rows.length > 0) {
      if (alumno.rows[0].password === password) {
        return res.json({ tipo: 'alumno', datos: alumno.rows[0] });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }

    return res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUsuario };