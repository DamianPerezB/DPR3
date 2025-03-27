const { Router } = require('express');
const {
    getAllPrestamos,
    getPrestamo,
    createPrestamo,
    deletePrestamo,
    updatePrestamo
} = require('../controllers/prestamo.controllers');

const router = Router();

router.get('/prestamos', getAllPrestamos);
router.get('/prestamo/:id', getPrestamo);
router.post('/prestamo', createPrestamo);
router.delete('/prestamo/:id', deletePrestamo);
router.put('/prestamo/:id', updatePrestamo);

module.exports = router;