const express = require('express')
const router = express.Router()
const { getTareas, setTarea, updateTarea, deleteTarea } = require('../controllers/tareasControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getTareas)
router.post('/', protect, setTarea)

router.put('/:id', protect, updateTarea)
router.delete('/:id', protect, deleteTarea)

module.exports = router