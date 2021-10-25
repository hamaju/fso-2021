import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

type GenderProps = {
  gender: Gender;
};

const GenderIcon = ({ gender }: GenderProps) => {
  switch (gender) {
    case 'male':
      return <Icon name="mars" />;
    case 'female':
      return <Icon name="venus" />;
    case 'other':
      return <Icon name="genderless" />;
    default:
      return null;
  }
};

export default GenderIcon;
