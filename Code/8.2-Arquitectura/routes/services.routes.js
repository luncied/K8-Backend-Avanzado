const { Router } = require('express');
const { serviceGet, servicePost, servicePut, serviceDel } = require('../controllers/services.controller');

const router = Router();

router.get("/", serviceGet);
router.post("/", servicePost);
router.put("/:id", servicePut);
router.delete("/:id", serviceDel);

module.exports = router;