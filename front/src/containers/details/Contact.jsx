import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, InputDate, InputPhone } from '~components';
import { fieldShape } from './Details';
import s from './styles/details.module.sass';

const Contact = ({ names, fields, handleChange }) => (
  <>
    <Typography className={cn(s.subheading, s.subheadMargin)}>
      2. Date of birth and contact
    </Typography>
    <InputDate
      id={names.dateOfBirth}
      name={names.dateOfBirth}
      value={fields.dateOfBirth.value}
      status={fields.dateOfBirth.status}
      onChange={handleChange}
      className={s.input}
      placeholder="DD/MM/YY"
      subTitle="You must be at least 18 to apply for finance"
      required
    />
    <InputPhone
      id={names.phone}
      name={names.phone}
      status={fields.phone.status}
      value={fields.phone.value}
      onChange={handleChange}
      className={s.input}
      label="Telephone number"
      subTitle="To keep you updated on your purchase"
      placeholder="e.g 07712345678"
      required
    />
    <InputPhone
      id={names.alternativePhone}
      name={names.alternativePhone}
      status={fields.alternativePhone.status}
      value={fields.alternativePhone.value}
      onChange={handleChange}
      className={s.input}
      label="Alternative telephone number"
      placeholder="e.g. 07898765432"
    />
  </>
);

Contact.propTypes = {
  fields: PropTypes.shape({
    dateOfBirth: fieldShape,
    phone: fieldShape,
    alternativePhone: fieldShape,
  }).isRequired,
  names: PropTypes.shape({
    dateOfBirth: PropTypes.string,
    phone: PropTypes.string,
    alternativePhone: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Contact;
