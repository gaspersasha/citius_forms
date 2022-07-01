import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, InputText, InputPostcode } from '~components';
import { fieldShape } from './Details';
import s from './styles/details.module.sass';

const Address = ({ names, fields, handleChange }) => (
  <>
    <Typography className={cn(s.subheading, s.subheadMargin)}>
      3. Address details
    </Typography>
    <InputPostcode
      id={names.postcode}
      name={names.postcode}
      value={fields.postcode.value}
      status={fields.postcode.status}
      onChange={handleChange}
      className={s.input}
      required
    />
    <InputText
      id={names.houseName}
      name={names.houseName}
      label="House name"
      value={fields.houseName.value}
      placeholder="e.g. house name"
      status={fields.houseName.status}
      onChange={handleChange}
      className={s.input}
    />
    <InputText
      id={names.houseNumber}
      name={names.houseNumber}
      label="House number"
      value={fields.houseNumber.value}
      placeholder="e.g. 11"
      status={fields.houseNumber.status}
      onChange={handleChange}
      className={s.input}
    />
    <InputText
      id={names.street}
      name={names.street}
      label="Street"
      value={fields.street.value}
      placeholder="e.g. Rover street"
      status={fields.street.status}
      onChange={handleChange}
      className={s.input}
    />
    <InputText
      id={names.district}
      name={names.district}
      label="District"
      value={fields.district.value}
      placeholder="e.g. Hackney"
      status={fields.district.status}
      onChange={handleChange}
      className={s.input}
    />
    <InputText
      id={names.town}
      name={names.town}
      label="Town"
      value={fields.town.value}
      placeholder="e.g. London"
      status={fields.town.status}
      onChange={handleChange}
      className={s.input}
    />
    <InputText
      id={names.county}
      name={names.county}
      label="Сounty"
      value={fields.county.value}
      placeholder="e.g. Middlesex"
      status={fields.county.status}
      onChange={handleChange}
      className={s.input}
    />
  </>
);

Address.propTypes = {
  fields: PropTypes.shape({
    postcode: fieldShape,
    houseName: fieldShape,
    houseNumber: fieldShape,
    street: fieldShape,
    district: fieldShape,
    town: fieldShape,
    county: fieldShape,
  }).isRequired,
  names: PropTypes.shape({
    postcode: PropTypes.string,
    houseName: PropTypes.string,
    houseNumber: PropTypes.string,
    street: PropTypes.string,
    district: PropTypes.string,
    town: PropTypes.string,
    county: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Address;
