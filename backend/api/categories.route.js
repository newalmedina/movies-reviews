import express from "express"
import CategoriesController from "../controller/categories.controller.js";

const router = express.Router(); //get access to express router

//router.route("/").get((req, res) => res.send("hello world"))


//api/v1/categories/ ->url_base
router.route("/")
    .get(CategoriesController.apiGetCategories)
    .post(CategoriesController.apiPostCategory)
    .put(CategoriesController.apiUpdateCategory)
    .delete(CategoriesController.apiDeleteCategory);

export default router

