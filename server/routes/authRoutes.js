import express from "express"
import { getUserOrders, loginUser, protectedAdminRoute, protectedRoute, registerUser, updateProfileController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import uploadProfile from "../middlewares/uploadProfile.js"

const router = express.Router()

router.post("/register", uploadProfile.array("photo"), registerUser)
router.post("/login", loginUser)
router.get("/", requireSignIn, protectedRoute)

router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ ok: true })
})

router.get("/admin-auth", requireSignIn, isAdmin, protectedAdminRoute)

router.put('/profile', requireSignIn, uploadProfile.array("photo"), updateProfileController)

router.get('/orders', requireSignIn, getUserOrders)

export default router