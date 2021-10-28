import React from 'react';

import { Entry } from '../types';
import { useStateValue } from '../state';

type DiagnosisListProps = {
  entry: Entry;
};

const DiagnosisList = ({ entry }: DiagnosisListProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
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
  );
};

export default DiagnosisList;
