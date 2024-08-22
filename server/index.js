import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
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
