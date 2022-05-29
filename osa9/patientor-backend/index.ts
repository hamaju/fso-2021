import express from "express";
import cors from "cors";

import patientRouter from "./src/routes/patients";
import diagnosisRouter from "./src/routes/diagnoses";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  // console.log('ping');
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnosis", diagnosisRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
