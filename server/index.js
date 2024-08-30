import dotenv from 'dotenv';
dotenv.config();
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
import express from 'express';
import { connectDb } from './database/db.js';
import cors from 'cors';



const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
}));

app.use('/uploads', express.static('uploads'));


// Routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

// Connect to Database and Start Server
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    connectDb();
});
