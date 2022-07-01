import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, InputText, InputSelect } from '~components';
import { FORM } from '~constants';
import { fieldShape } from './Details';
import s from './styles/details.module.sass';

const { TITLES } = FORM;

const About = ({ names, fields, handleChange }) => (
  <>
    <Typography className={cn(s.subheading, s.subheadMargin)}>
      1. About you
    </Typography>
    <InputSelect
      id={names.title}
      name={names.title}
      value={fields.title.value}
      status={fields.title.status}
      options={TITLES}
      onChange={handleChange}
      className={cn(s.input, s.select)}
      placeholder="Choose from the dropdown"
      label="Title"
      required
    />
    <InputText
      id={names.firstName}
      name={names.firstName}
      status={fields.firstName.status}
      value={fields.firstName.value}
      onChange={handleChange}
      className={s.input}
      label="First name"
      placeholder="As on your driving license"
      required
    />
    <InputText
      id={names.middleName}
      name={names.middleName}
      status={fields.middleName.status}
      value={fields.middleName.value}
      onChange={handleChange}
      className={s.input}
      label="Middle name"
      placeholder="As on your driving license"
    />
    <InputText
      id={names.lastName}
      name={names.lastName}
      status={fields.lastName.status}
      value={fields.lastName.value}
      onChange={handleChange}
      className={s.input}
      label="Last name"
      placeholder="As on your driving license"
      required
    />
  </>
);

About.propTypes = {
  fields: PropTypes.shape({
    title: fieldShape,
    firstName: fieldShape,
    middleName: fieldShape,
    lastName: fieldShape,
  }).isRequired,
  names: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default About;
