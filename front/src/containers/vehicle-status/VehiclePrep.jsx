import React from 'react';
import PropTypes from 'prop-types';
import { subSteps } from '~containers/vehicle-status/helpers';
import { typoPropsShape } from './VehicleStatus';
import ConditionReportSubStep from './ConditionReportSubStep';

const VehiclePrep = ({ substep, typoProps }) => {
  switch (substep) {
    case subSteps.CONDITION_REPORT:
      return <ConditionReportSubStep typoProps={typoProps} />;

    default:
      return null;
  }
};

VehiclePrep.propTypes = {
  substep: PropTypes.string.isRequired,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

export default VehiclePrep;
