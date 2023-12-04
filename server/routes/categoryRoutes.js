import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createCategory, deleteCategory, getAllCategories, readCategoryPhoto } from "../controllers/categoryController.js"
import formidable from 'express-formidable'

const router = express.Router()

router.post("/", requireSignIn, isAdmin, formidable(), createCategory)
router.get("/photo/:cid", readCategoryPhoto)
router.get("/", getAllCategories)
router.delete("/:cid", requireSignIn, isAdmin, deleteCategory)

export default router 