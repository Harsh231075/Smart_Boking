import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import slotRoutes from "./routes/slots.js";
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

connectDB();


app.use("/slots", slotRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
});
