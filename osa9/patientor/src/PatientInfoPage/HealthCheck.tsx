import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { HealthCheckEntry } from '../types';

import DiagnosisList from './DiagnosisList';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

type HealthCheckEntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheck = ({ entry }: HealthCheckEntryProps) => {
  return (
    <>
      <Segment>
        <Header>
          {entry.date} <Icon name="doctor" />
        </Header>
        <p style={{ color: 'gray' }}>
          <em>{entry.description}</em>
        </p>
        <DiagnosisList entry={entry} />
        <HealthCheckRatingIcon rating={entry.healthCheckRating} />
      </Segment>
    </>
  );
};

export default HealthCheck;
