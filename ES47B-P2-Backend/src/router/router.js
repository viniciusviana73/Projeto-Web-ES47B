const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { jwtAuth } = require("../middlewares/jwtAuth");

    console.log(req.body);
    return res.json(req.body);
});

// Auth API
router.get("/api/auth", jwtAuth, UserController.checkAuth);
router.post("/api/auth", UserController.login);

// User 
router.get("/api/user", UserController.getUser);
router.post("/api/user", UserController.createUser);

module.exports = router;