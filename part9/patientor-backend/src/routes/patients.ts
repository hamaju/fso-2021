/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    const newEntry = toNewEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
