export type Gender = 'male' | 'female';

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
