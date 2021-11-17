import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';

import { Entry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import GenderIcon from '../components/GenderIcon';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { useStateValue, setPatientInfo, addEntry } from '../state';

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown Error');
    }
  };

  return (
    <div className="App">
      <Container>
        <Header as="h2">
          {patient?.name}
          {patient ? <GenderIcon gender={patient?.gender} /> : null}
        </Header>
        <div>
          <strong>SSN:</strong> {patient?.ssn}
        </div>
        <div>
          <strong>Occupation:</strong> {patient?.occupation}
        </div>
        <Header as="h3">Entries</Header>
        {patient?.entries.length !== 0 ? (
          patient?.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))
        ) : (
          <p>No entries yet.</p>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientInfoPage;
