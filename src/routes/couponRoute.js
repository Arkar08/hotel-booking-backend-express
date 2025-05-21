import express from 'express'
import { deleteCoupon, getCoupon, getIdCoupon, patchCoupon, postCoupon } from '../controllers/couponController.js';
import { authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/",authorizeAdmin,postCoupon)
router.get("/",getCoupon)
router.get("/:id",getIdCoupon)
router.patch("/:id",authorizeAdmin,patchCoupon)
router.delete("/:id",authorizeAdmin,deleteCoupon)

export default router;