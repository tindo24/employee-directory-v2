import express from "express";
import employeesRouter from "#routes/employees";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

// Error handler to catch bad JSON and send 400 instead of 500
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send("Invalid JSON");
  }
  next(err);
});

export default app;
