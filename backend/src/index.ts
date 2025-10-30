import express, { Request, Response } from "express";
import agent from "./routes/agent";

const app = express();
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});


app.use("/api/agents", agent);
