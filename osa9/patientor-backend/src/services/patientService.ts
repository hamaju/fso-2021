import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry, NewEntry } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  findById,
};
