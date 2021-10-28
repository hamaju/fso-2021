import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';

import DiagnosisList from './DiagnosisList';

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: OccupationalHealthcareProps) => {
  return (
    <>
      <Segment>
        <Header>
          {entry.date} <Icon name="stethoscope" />
        </Header>
        <p style={{ color: 'gray' }}>
          <em>{entry.description}</em>
        </p>
        <DiagnosisList entry={entry} />
        {entry.sickLeave && (
          <>
            <Header as="h3">Sick leave</Header>
            <p>
              From <strong>{entry.sickLeave.startDate}</strong> to{' '}
              <strong>{entry.sickLeave.endDate}</strong>
            </p>
          </>
        )}
      </Segment>
    </>
  );
};

export default OccupationalHealthcare;
