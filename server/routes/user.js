import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

// Route for user registration
router.post('/user/register', register);

// Route for user verification after registration
router.post('/user/verify', verifyUser);

// Route for user login
router.post('/user/login', loginUser);

// Route for fetching the profile of the logged-in user
// Protected by isAuth middleware to ensure user is authenticated
router.get('/user/me', isAuth, myProfile);

export default router;
