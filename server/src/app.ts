import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./app/config/index.js";
export const app: Application = express();

// Enable CORS
app.use(cors());
// Enable JSON parsing
app.use(express.json());
const test = (req: Request, res: Response) => {
  res.send("server is running");
};
app.get("/", test);
