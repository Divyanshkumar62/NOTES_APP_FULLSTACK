import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
 
dotenv.config();

const app = express();

// ✅ Fix 1: Use a default port if `process.env.PORT` is undefined
const PORT = process.env.PORT || 5000;

// ✅ Fix 2: Ensure MongoDB connection is awaited
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Stop the server if DB connection fails
    }
};
connectDB();

// ✅ Fix 3: CORS should be before cookieParser()
app.use(cors({
    origin: [
        "https://notenest-frontend-g5wp.onrender.com",
        "http://localhost:5173"  // ✅ Allow local testing
    ],
    credentials: true
}));

app.use(express.json());  // Parse JSON requests
app.use(cookieParser());  // Enable cookie parsing

// ✅ Import Routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// ✅ Improved Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ API Error:", err.message);  // Log errors properly

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
