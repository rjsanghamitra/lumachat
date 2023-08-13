import express from "express";
import bodyParser from "body-parser"; // a middleware library to parse incoming request bodies
import mongoose from "mongoose";
import cors from "cors"; // stands for cross origin resource sharing. a security policy that prevents malicious websites from making requests on behalf of a user.
import dotenv from "dotenv"; // used to load environment variables from a ".env" file
import multer from "multer"; // a middleware for handling file uploads
import helmet from "helmet"; // provides security related http headers for express applications
import morgan from "morgan"; // used for logging
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/authentication.js";
import authRoutes from "./routes/authentication.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verification } from "./middleware/authorization.js";
import { createPost } from "./controllers/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verification, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));