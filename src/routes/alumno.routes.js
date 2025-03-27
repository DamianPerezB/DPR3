const { Router } = require('express');
const {
    getAllAlumnos,
    getAlumno,
    createAlumno,
    deleteAlumno,
    updateAlumno
} = require('../controllers/alumno.controllers')

const router = Router();

router.get('/alumnos', getAllAlumnos);
router.get('/alumno/:id', getAlumno);
router.post('/alumno', createAlumno);
router.delete('/alumno/:id', deleteAlumno);
router.put('/alumno/:id', updateAlumno);

module.exports = router;