import express from "express";
import ViteExpress from "vite-express";

// import router
import { apiRouter } from "./routes/api.js";

const app = express();
const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define route handlers
app.use("/", apiRouter);

// app.use((req, res) =>
//   res.status(404).send("This is not the page you're looking for...")
// );

//error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);

export default app;
