import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '~components';
import { typoPropsShape } from './VehicleStatus';

const ConditionReportSubStep = ({ typoProps }) => (
  <>
    <Typography {...typoProps.title}>
      Your vehicle is being prepped for delivery!
    </Typography>
    <Typography {...typoProps.text}>
      We put each vehicle through rigorous checks to ensure the condition is up
      to our high standards. Once complete we will contact you to arrange
      delivery
    </Typography>
  </>
);

ConditionReportSubStep.propTypes = {
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

export default ConditionReportSubStep;
