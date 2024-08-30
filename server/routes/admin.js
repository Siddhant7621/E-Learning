import express from 'express';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllStats } from '../controllers/admin.js';
import { uploadFiles } from '../middlewares/multer.js';

const router = express.Router();

// Route for creating a new course
// Protected by isAuth and isAdmin middleware
// Handles file uploads with uploadFiles middleware
router.post('/course/new', isAuth, isAdmin, uploadFiles, createCourse);

// Route for adding a lecture to an existing course
// Protected by isAuth and isAdmin middleware
// Handles file uploads with uploadFiles middleware
router.post('/course/:id', isAuth, isAdmin, uploadFiles, addLectures);

router.delete('/course/:id', isAuth, isAdmin, deleteCourse);
router.delete('/lecture/:id', isAuth, isAdmin, deleteLecture);

router.get("/stats", isAuth, isAdmin, getAllStats);


export default router;
