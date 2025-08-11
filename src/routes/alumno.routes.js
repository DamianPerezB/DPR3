const { Router } = require('express');
const {
    getAllAlumnos,
    getAlumno,
    createAlumno,
    updatePass,
    deleteAlumno,
    updateAlumno,
    getPerfil,
} = require('../controllers/alumno.controllers')

const router = Router();

router.get('/alumnos', getAllAlumnos);
router.get('/alumno/:id', getAlumno);
router.post('/alumno', createAlumno);
router.delete('/alumno/:id', deleteAlumno);
router.put('/alumno/:id', updateAlumno);
router.put('/pass/:id', updatePass);
router.get('/perfil/:id', getPerfil);

module.exports = router;