import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { braintreePaymentController, braintreeToken, createNewProduct, fetchAllProducts, fetchSingleProduct, filterProducts, getProductPhoto, productCategory, productCount } from "../controllers/productController.js"
import formidable from "express-formidable"

const router = express.Router()

router.get('/', fetchAllProducts)
router.get('/:slug', fetchSingleProduct)
router.post('/', requireSignIn, isAdmin, formidable(), createNewProduct)
router.get("/photo/:pid", getProductPhoto)
router.post("/filter", filterProducts)
router.get("/count", productCount)
router.get("/category/:slug", productCategory)
router.get("/braintree/token", braintreeToken)
router.post("/braintree/payment", requireSignIn, braintreePaymentController)

export default router 