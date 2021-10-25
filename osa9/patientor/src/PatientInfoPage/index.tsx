import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import GenderIcon from '../components/GenderIcon';
import { useStateValue, setPatientInfo } from '../state';

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatientInfo = async () => {
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
      void getPatientInfo();
    }
  }, [patient, id]);

  return (
    <div className="App">
      <Container>
        <Header as="h2">
          {patient?.name}
          {patient ? <GenderIcon gender={patient?.gender} /> : null}
        </Header>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
      </Container>
    </div>
  );
};

export default PatientInfoPage;
