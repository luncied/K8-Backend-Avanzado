const { Router } = require('express');
const { userGet, userPost, userPut, userDel } = require('../controllers/users.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');

const router = Router();

router.get("/", userGet);
router.post("/", celebrateValidator, userPost);
router.put("/:id", userPut);
router.delete("/:id", userDel);

module.exports = router;