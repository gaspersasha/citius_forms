import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '~components';

const DPAModal = ({ handleClose }) => (
  <Modal onClose={handleClose} isDark>
    <div>
      <h3>Data Protection Act</h3>
      Credit reference searches will be conducted by the lenders in order to
      establish your credit worthiness. Our process involves an initial ‘soft
      search’ that should not impact your credit score; to gain a full
      acceptance some of our lenders will need to conduct a hard search which
      will be recorded on your credit file, but we will obtain your consent
      before doing so. On occasions we will have to try more than one lender
      from our panel to obtain a credit acceptance which may result in several
      credit searches being registered. Additional information may be required
      and lenders may on occasions contact employers as part of their checks.
      Alternative terms may be offered. Non payment of credit agreements and
      default will severely affect your credit rating and may result with the
      agreement vehicle being repossessed by the lender and or action being
      taken via the County Courts. The way you conduct your agreement is
      registered with all the Credit Reference Agencies and therefore any
      default could severely affect your chances of being accepted for credit in
      the future. If you are taking out a Hire Purchase, Lease Purchase or
      Personal Loan agreement with a Balloon Payment at the end, please be aware
      that the Balloon (Residual value) is NOT GUARANTEED by the lender and is
      your responsibility to pay. If you require the protection of a Minimum
      Guaranteed Future Value you will need a PCP (Personal Contract Purchase)
      agreement. Alternative (Direct) sources of finance are available to you
      i.e. Banks or via internet aggregators. By agreeing below, you acknowledge
      that as part of the process of obtaining finance for your vehicle we will
      need to pass your details on to one or more of our finance partners. A
      list of these partners together with their consumer credit licence numbers
      are available on request. You also acknowledge that any organisation
      approached for credit will need to undertake credit searches with a credit
      reference agency which may affect your credit rating.
    </div>
  </Modal>
);

DPAModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default DPAModal;
