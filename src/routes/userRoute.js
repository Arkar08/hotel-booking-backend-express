import { deleteUser, getIdUser, getUser, loginUser, logout, patchUser, postUser, signUpUser } from '../controllers/userController.js';
import express from 'express'
import { authMiddleware, authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/",authMiddleware,authorizeAdmin,postUser)
router.get("/",authMiddleware,authorizeAdmin,getUser)
router.get("/:id",authMiddleware,getIdUser)
router.patch("/:id",authMiddleware,patchUser)
router.delete("/:id",authMiddleware,authorizeAdmin,deleteUser)
router.post("/login",loginUser)
router.post("/register",signUpUser)
router.post("/logout",logout)


export default router;