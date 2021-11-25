/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  NewPatientEntry,
  Gender,
  Discharge,
  NewEntry,
  Diagnosis,
  NewBaseEntry,
  SickLeave,
  HealthCheckRating,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Invalid or missing date of birth: ' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing SSN');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Invalid or missing description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Invalid or missing specialist');
  }

  return specialist;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!codes) {
    return codes;
  }

  if (!Array.isArray(codes)) {
    throw new Error('Invalid diagnosis code(s)');
  }

  if (!codes.every((code: unknown) => isString(code))) {
    throw new Error('Invalid diagnosis code(s)');
  }

  return codes;
};

const isEntryType = (entry: any): entry is NewEntry => {
  if (entry.type === 'Hospital') {
    return entry.type;
  }

  if (entry.type === 'OccupationalHealthcare') {
    return entry.type;
  }

  if (entry.type === 'HealthCheck') {
    return entry.type;
  }

  return false;
};

const parseEntryType = (type: unknown): NewEntry => {
  if (!type || !isEntryType(type)) {
    throw new Error('Invalid or missing entry type');
  }

  return type;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Invalid criteria');
  }

  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error('Invalid or missing discharge info');
  }

  if (!discharge.date) {
    throw new Error('Invalid or missing discharge date');
  }

  const date = parseDate(discharge.date);
  const criteria = parseCriteria(discharge.criteria);

  const dischargeObject = {
    date,
    criteria,
  };

  return dischargeObject;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Invalid or missing employer');
  }

  return employer;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('Invalid or missing sick leave date');
  }

  if (!sickLeave.startDate) {
    throw new Error('Invalid or missing sick leave start date');
  }

  if (!sickLeave.endDate) {
    throw new Error('Invalid or missing sick leave end date');
  }

  const startDate = parseDate(sickLeave.startDate);
  const endDate = parseDate(sickLeave.endDate);

  const sickLeaveObject = {
    startDate,
    endDate,
  };

  return sickLeaveObject;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Invalid or missing health check rating');
  }

  return rating;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newPatient;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: any): NewEntry => {
  const newEntry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  const entry = parseEntryType(object);

  switch (entry.type) {
    case 'Hospital':
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
      };
    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    default:
      return assertNever(entry);
  }
};
