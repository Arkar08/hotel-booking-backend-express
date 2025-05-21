import express from 'express'
import { createInvoice, getBooking, getIdBooking, getUserBooking, patchBooking, postBooking } from '../controllers/bookingController.js';
import { authorizeAdmin, authorizeCustomer } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/",authorizeCustomer,postBooking)
router.get("/",authorizeAdmin,getBooking)
router.get("/:id",getIdBooking)
router.patch("/:id",patchBooking)
router.post("/download",authorizeAdmin,createInvoice)
router.get("/find/:userId",getUserBooking)


export default router;