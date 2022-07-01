import React from 'react';
import PropTypes from 'prop-types';
import { LoqateAddress } from '~containers';
import s from './address.module.sass';

const PostCodeStep = ({
  changeAddressField,
  changePostcodeField,
  selectAddressHandler,
  postCode,
  houseName,
  houseNumber,
  street,
  district,
  town,
  county,
}) => (
  <div className={s.addressFormWrapper}>
    <LoqateAddress
      selectHandler={selectAddressHandler}
      formName="address"
      subTitle="Start typing your address and select the relevant option when it appears in the list below. If it is not found then click on the 'Enter address manually' link"
      manualFields={[
        {
          ...postCode,
          label: 'Postcode',
          name: 'postCode',
          required: true,
          onChange: changePostcodeField,
          warning: '* Please type correct UK postal code',
        },
        {
          ...houseName,
          label: 'House name',
          name: 'houseName',
          onChange: changeAddressField,
        },
        {
          ...houseNumber,
          label: 'House number',
          name: 'houseNumber',
          onChange: changeAddressField,
        },
        {
          ...street,
          label: 'Street',
          name: 'street',
          onChange: changeAddressField,
          required: true,
        },
        {
          ...district,
          label: 'District',
          name: 'district',
          onChange: changeAddressField,
        },
        {
          ...town,
          label: 'Town',
          name: 'town',
          onChange: changeAddressField,
          required: true,
        },
        {
          ...county,
          label: 'County',
          name: 'county',
          onChange: changeAddressField,
        },
      ]}
    />
  </div>
);

const addressType = {
  value: PropTypes.string,
  status: PropTypes.string,
};

PostCodeStep.propTypes = {
  selectAddressHandler: PropTypes.func.isRequired,
  changePostcodeField: PropTypes.func.isRequired,
  changeAddressField: PropTypes.func.isRequired,
  postCode: PropTypes.shape(addressType).isRequired,
  houseName: PropTypes.shape(addressType).isRequired,
  houseNumber: PropTypes.shape(addressType).isRequired,
  street: PropTypes.shape(addressType).isRequired,
  district: PropTypes.shape(addressType).isRequired,
  town: PropTypes.shape(addressType).isRequired,
  county: PropTypes.shape(addressType).isRequired,
};

export default PostCodeStep;
