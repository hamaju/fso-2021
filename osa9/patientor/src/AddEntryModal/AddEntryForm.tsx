import React from 'react';
import { Grid, Button, Divider } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  NumberField,
  DiagnosisSelection,
  EntryTypeOption,
  EntryTypeSelection,
} from '../AddPatientModal/FormField';

import { EntryType, Entry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, 'id' | 'type'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Default, label: 'Select an entry type...' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: EntryType.HealthCheck, label: 'Health Check' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: { date: '', criteria: '' },
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = 'Rating must be between 0 and 3';
        }
        if (
          (values.discharge.date && !values.discharge.criteria) ||
          (!values.discharge.date && values.discharge.criteria)
        ) {
          errors.discharge = requiredError;
        }
        if (
          (values.sickLeave.startDate && !values.sickLeave.endDate) ||
          (!values.sickLeave.startDate && values.sickLeave.endDate)
        ) {
          errors.sickLeave = requiredError;
        }
        if (values.employerName && !values.sickLeave.startDate) {
          errors.sickLeave = requiredError;
        }
        if (values.employerName && !values.sickLeave.endDate) {
          errors.sickLeave = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          // dependent fields would make more sense here
          <Form className="form ui">
            <EntryTypeSelection
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Divider hidden />
            <p>
              Only fill for <strong>Hospital</strong> entries:
            </p>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Description"
              name="discharge.criteria"
              component={TextField}
            />
            <Divider hidden />
            <p>
              Only fill for <strong>Occupational Healthcare</strong> entries:
            </p>
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Divider hidden />
            <p>
              Only fill for <strong>Health Check</strong> entries:
            </p>
            <Field
              label="Health Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
