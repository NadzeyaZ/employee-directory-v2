import express from "express";
import employeesRouter from "#api/employees";
const app = express();
export default app;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

//body parser
app.use(express.json());

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});
