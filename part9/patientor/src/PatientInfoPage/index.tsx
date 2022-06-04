import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";

import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { useStateValue, setPatientInfo, addEntry } from "../state";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      if (!id) return;

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
    if (!id) return;

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized Axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized Axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
