const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

router.post("/add", categoryController.createCategory);
router.get("/all", categoryController.fetchAllCategory);
router.get("/fetch/:id", categoryController.fetchCategoryById);
router.delete("/remove/:id", categoryController.removeCategory);
router.patch("/update/:id", categoryController.updateCategory);

module.exports = router;
