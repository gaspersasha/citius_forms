import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '~components';
import { subSteps } from './helpers';
import { typoPropsShape } from './VehicleStatus';
import ConditionReportSubStep from './ConditionReportSubStep';

const Verify = ({ substep, typoProps }) => {
  switch (substep) {
    case subSteps.GETTING_REQUIREMENTS:
      return (
        <>
          <Typography {...typoProps.title}>Proof of address</Typography>
          <Typography {...typoProps.text}>
            You will receive an email requesting proof of address, please check
            your emails and share a copy of the requested documents.
          </Typography>
          <Typography {...typoProps.text}>
            This will usually be a drivers licence with your current address
            along with any other documentation requested by the lender, such as
            payslips or a utility bill
          </Typography>
        </>
      );

    case subSteps.LINK_SENT:
      return (
        <>
          <Typography {...typoProps.title}>Your security check</Typography>
          <Typography {...typoProps.text}>
            We&apos;ve sent you an email with a link where you can complete a
            security check.
          </Typography>
          <Typography {...typoProps.text}>
            This email will contain instructions on to complete this part of the
            process and information on the next steps required to complete your
            purchase
          </Typography>
        </>
      );

    case subSteps.DOCS_SENT:
      return (
        <>
          <Typography {...typoProps.title}>Your finance agreement</Typography>
          <Typography {...typoProps.text}>
            You will receive your finance agreement via email.
          </Typography>
          <Typography {...typoProps.text}>
            This email will contain instructions on to complete this part of the
            process and information on the next steps required to complete your
            purchase
          </Typography>
        </>
      );

    case subSteps.CONDITION_REPORT:
      return <ConditionReportSubStep typoProps={typoProps} />;

    default:
      return null;
  }
};

Verify.propTypes = {
  substep: PropTypes.oneOf([
    subSteps.GETTING_REQUIREMENTS,
    subSteps.LINK_SENT,
    subSteps.DOCS_SENT,
    subSteps.CONDITION_REPORT,
  ]).isRequired,
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

export default Verify;
