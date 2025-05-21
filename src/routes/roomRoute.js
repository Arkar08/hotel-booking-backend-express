import express from 'express'
import { deleteRoom, getIdRoom, getRoom, patchRoom, postRoom } from '../controllers/roomController.js';
import { authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/",authorizeAdmin,postRoom)
router.get("/",getRoom)
router.get("/:id",getIdRoom)
router.patch("/:id",authorizeAdmin,patchRoom)
router.delete("/:id",authorizeAdmin,deleteRoom)


export default router;