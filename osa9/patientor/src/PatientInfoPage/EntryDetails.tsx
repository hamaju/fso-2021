import React from 'react';

import { Entry } from '../types';
import { useStateValue } from '../state';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) =>
          diagnoses
            .filter((diagnosis) => diagnosis.code === code)
            .map((d) => (
              <li key={d.code}>
                {d.code} {d.name}
              </li>
            ))
        )}
      </ul>
    </>
  );
};

export default EntryDetails;
