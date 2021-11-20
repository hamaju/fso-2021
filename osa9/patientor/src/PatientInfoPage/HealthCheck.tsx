import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { HealthCheckEntry } from '../types';

import DiagnosisList from './DiagnosisList';
import HealthRatingIcon from '../components/HealthRatingIcon';

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
        <HealthRatingIcon rating={entry.healthCheckRating} />
      </Segment>
    </>
  );
};

export default HealthCheck;
