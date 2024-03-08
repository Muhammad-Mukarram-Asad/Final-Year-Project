import connectDB from "./database/db.js";
import express from "express";
import router from "./router/route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://sportify-fyp.vercel.app",
  "https://sportify-fyp.netlify.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router);
connectDB();

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});
