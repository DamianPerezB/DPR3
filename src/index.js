const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const empleadoRoutes = require('./routes/empleado.routes');
const alumnoRoutes = require('./routes/alumno.routes');
const materialRoutes = require('./routes/material.routes');
const prestamoRoutes = require('./routes/prestamo.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(empleadoRoutes)
app.use(alumnoRoutes)
app.use(materialRoutes)
app.use(prestamoRoutes)
app.use(loginRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(4000)
console.log("Server on port 4000")