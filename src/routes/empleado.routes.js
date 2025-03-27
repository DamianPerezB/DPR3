const {Router} = require('express');
const {
    getAllEmpleados,
    getEmpleado,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
} = require ('../controllers/empleado.controllers')

const router = Router();

router.get('/empleados', getAllEmpleados);
router.get('/empleado/:id', getEmpleado);
router.post('/empleado', createEmpleado);
router.delete('/empleado/:id', deleteEmpleado);
router.put('/empleado/:id', updateEmpleado);

module.exports = router;