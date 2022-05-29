import React from "react";
import { Icon, Popup } from "semantic-ui-react";

import { HealthCheckRating } from "../types";

type HealthRatingIconProps = {
  rating: HealthCheckRating;
};

const HealthRatingIcon = ({ rating }: HealthRatingIconProps) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return (
        <>
          <Popup trigger={<Icon circular name="heart" color="green" />}>
            Healthy
          </Popup>
        </>
      );
    case HealthCheckRating.LowRisk:
      return (
        <>
          <Popup trigger={<Icon circular name="heart" color="yellow" />}>
            Low Risk
          </Popup>
        </>
      );
    case HealthCheckRating.HighRisk:
      return (
        <>
          <Popup trigger={<Icon circular name="heart" color="orange" />}>
            High Risk
          </Popup>
        </>
      );
    case HealthCheckRating.CriticalRisk:
      return (
        <>
          <Popup trigger={<Icon circular name="heart" color="red" />}>
            Critical Risk
          </Popup>
        </>
      );
    default:
      return null;
  }
};

export default HealthRatingIcon;
