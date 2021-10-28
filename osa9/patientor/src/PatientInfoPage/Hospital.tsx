import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { HospitalEntry } from '../types';

import DiagnosisList from './DiagnosisList';

type HospitalProps = {
  entry: HospitalEntry;
};

const Hospital = ({ entry }: HospitalProps) => {
  return (
    <>
      <Segment>
        <Header>
          {entry.date} <Icon name="hospital" />
        </Header>
        <p style={{ color: 'gray' }}>
          <em>{entry.description}</em>
        </p>
        <DiagnosisList entry={entry} />
        {entry.discharge && (
          <>
            <Header as="h3">Discharge</Header>
            <Header as="h4">
              <strong>{entry.discharge.date}</strong>
            </Header>
            <p style={{ color: 'gray' }}>
              <em>{entry.discharge.criteria}</em>
            </p>
          </>
        )}
      </Segment>
    </>
  );
};

export default Hospital;
