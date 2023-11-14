const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

router.post("/category/add", categoryController.addCategory);

module.exports = router;


