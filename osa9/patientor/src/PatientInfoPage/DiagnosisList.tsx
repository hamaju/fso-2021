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
          .map((diagnosis) => (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </li>
          ))
      )}
    </ul>
  );
};

export default DiagnosisList;
