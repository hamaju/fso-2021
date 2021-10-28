import React from 'react';
import { Icon } from 'semantic-ui-react';

import { Gender } from '../types';

type GenderProps = {
  gender: Gender;
};

const GenderIcon = ({ gender }: GenderProps) => {
  switch (gender) {
    case 'male':
      return <Icon name="mars" size="tiny" />;
    case 'female':
      return <Icon name="venus" size="tiny" />;
    case 'other':
      return <Icon name="genderless" size="tiny" />;
    default:
      return null;
  }
};

export default GenderIcon;
