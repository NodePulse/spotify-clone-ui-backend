import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import songRouter from "./src/routes/songRoutes.js";
import connectDB from "./src/config/connectDB.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(
  cors({
    origin: "https://spotify-clone-ui-admin.vercel.app/",
    methods: ["GET", "POST"],
    preflightContinue: false,
    credentials: true,
  })
);

app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
