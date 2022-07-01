import React from 'react';
import PropTypes from 'prop-types';
import { LoqateAddress } from '~containers';
import s from './employment.module.sass';

const AddressStep = ({
  address,
  selectHandler,
  changePostcodeField,
  changeAddressField,
}) => (
  <div className={s.addressFormWrapper}>
    <LoqateAddress
      key="loqate"
      selectHandler={selectHandler}
      formName="employment"
      subTitle="Please add your employment address details below"
      manualFields={[
        {
          ...address.postCode,
          label: 'Postcode',
          name: 'postCode',
          required: true,
          onChange: changePostcodeField,
          warning: '* Please type correct UK postal code',
          id: 'employmentPostcode',
        },
        {
          ...address.buildingName,
          label: 'Building name',
          name: 'buildingName',
          onChange: changeAddressField,
          id: 'buildingName',
        },
        {
          ...address.buildingNumber,
          label: 'Building number',
          name: 'buildingNumber',
          onChange: changeAddressField,
          id: 'buildingNumber',
        },
        {
          ...address.street,
          label: 'Street',
          name: 'street',
          onChange: changeAddressField,
          required: true,
          id: 'employmentStreet',
        },
        {
          ...address.district,
          label: 'District',
          name: 'district',
          onChange: changeAddressField,
          id: 'employmentDistrict',
        },
        {
          ...address.town,
          label: 'Town',
          name: 'town',
          onChange: changeAddressField,
          required: true,
          id: 'employmentTown',
        },
        {
          ...address.county,
          label: 'County',
          name: 'county',
          onChange: changeAddressField,
        },
      ]}
    />
  </div>
);

const addressType = PropTypes.shape({
  status: PropTypes.string,
  value: PropTypes.string,
});

AddressStep.propTypes = {
  selectHandler: PropTypes.func.isRequired,
  changePostcodeField: PropTypes.func.isRequired,
  changeAddressField: PropTypes.func.isRequired,
  address: PropTypes.shape({
    postCode: addressType,
    buildingName: addressType,
    buildingNumber: addressType,
    street: addressType,
    district: addressType,
    town: addressType,
    county: addressType,
  }).isRequired,
};

export default AddressStep;
