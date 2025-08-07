const { Router } = require('express');
const {
    getAllPrestamos,
    getPrestamo,
    getPrestamosAlumno,
    createPrestamo,
    getPrestamosActivos,
    getPrestamosPorEmpleado,
    finalizarPrestamo,
} = require('../controllers/prestamo.controllers');

const router = Router();

router.get('/prestamos', getAllPrestamos);
router.get('/prestamos-alumno/:id', getPrestamosAlumno);
router.get("/activos", getPrestamosActivos);
router.get('/prestamo/:id', getPrestamo);
router.post('/prestamo', createPrestamo);
router.get('/prestamo/contador/:idEmpleado', getPrestamosPorEmpleado);
router.put("/finalizar/:id", finalizarPrestamo);

module.exports = router;