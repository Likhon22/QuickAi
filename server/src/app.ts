import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 3000;

const test = (req: Request, res: Response) => {
  res.send("server is running");
};
app.get("/", test);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
