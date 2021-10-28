import React from 'react';
import { Icon } from 'semantic-ui-react';

import { HealthCheckRating } from '../types';

type HealthIconProps = {
  rating: HealthCheckRating;
};

const HealthIcon = ({ rating }: HealthIconProps) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Icon name="heart" color="green" />;
    case HealthCheckRating.LowRisk:
      return <Icon name="heart" color="yellow" />;
    case HealthCheckRating.HighRisk:
      return <Icon name="heart" color="orange" />;
    case HealthCheckRating.CriticalRisk:
      return <Icon name="heart" color="red" />;
    default:
      return null;
  }
};

export default HealthIcon;
