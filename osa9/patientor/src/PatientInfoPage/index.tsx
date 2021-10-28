import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import { Entry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import GenderIcon from '../components/GenderIcon';
import EntryDetails from './EntryDetails';
import { useStateValue, setPatientInfo } from '../state';

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient.id !== id) {
      void fetchPatientInfo();
    }
  }, [patient, id, dispatch]);

  return (
    <div className="App">
      <Container>
        <Header as="h2">
          {patient?.name}
          {patient ? <GenderIcon gender={patient?.gender} /> : null}
        </Header>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
        <h3>entries</h3>
        {patient?.entries.length !== 0 ? (
          patient?.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))
        ) : (
          <p>no entries</p>
        )}
      </Container>
    </div>
  );
};

export default PatientInfoPage;
