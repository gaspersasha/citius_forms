import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Typography,
  InputText,
  InputNumber,
  InputSelect,
  InputCheckbox,
} from '~components';
import { FORM, URL } from '~constants';
import { fieldShape } from './Details';
import s from './styles/details.module.sass';

const { MARITAL_STATUSES, DRIVING_LICENCES } = FORM;

const Additional = ({ names, fields, handleChange }) => (
  <>
    <Typography className={cn(s.subheading, s.subheadMargin)}>
      4. Additional details
    </Typography>
    <InputText
      id={names.company}
      name={names.company}
      status={fields.company.status}
      value={fields.company.value}
      onChange={handleChange}
      className={s.input}
      label="Сompany"
      placeholder="e.g. BuyaCar"
    />
    <InputSelect
      id={names.maritalStatus}
      name={names.maritalStatus}
      status={fields.maritalStatus.status}
      value={fields.maritalStatus.value}
      onChange={handleChange}
      options={MARITAL_STATUSES}
      className={cn(s.input, s.select)}
      placeholder="Select from dropdown"
      label="Marital status"
    />
    <InputNumber
      id={names.dependants}
      name={names.dependants}
      status={fields.dependants.status}
      value={fields.dependants.value}
      onChange={handleChange}
      className={s.input}
      label="Number of dependants"
      subTitle="How many people rely on your for financial support? Such as children"
    />
    <InputSelect
      id={names.drivingLicenceType}
      name={names.drivingLicenceType}
      status={fields.drivingLicenceType.status}
      value={fields.drivingLicenceType.value}
      options={DRIVING_LICENCES}
      onChange={handleChange}
      className={cn(s.input, s.select)}
      placeholder="Select from dropdown"
      label="Driving licence"
    />
    <InputSelect
      id={names.validUKPassport}
      name={names.validUKPassport}
      status={fields.validUKPassport.status}
      value={fields.validUKPassport.value ? 'Yes' : 'No'}
      options={[
        { value: 'Yes', option: 'Yes' },
        { value: 'No', option: 'No' },
      ]}
      onChange={handleChange}
      className={cn(s.input, s.select)}
      placeholder="Select from dropdown"
      label="Valid UK passport"
      subTitle="Please select if you have a valid British passport"
    />
    <div className={s.unsubscribe}>
      <Typography className={cn(s.subheading, s.unsubscribeTitle)}>
        Unsubscribe
      </Typography>
      <Typography className={cn(s.unsubscribeTxt, s.inline)}>
        As described in our Privacy Policy we will use the information you have
        shared to send you communications about such products and services. If
        you do not wish to receive these communications from us then please
        check here and you will be unsubscribed from this activity.
      </Typography>
      <InputCheckbox
        id={names.subscribed}
        name={names.subscribed}
        checked={!fields.subscribed.value}
        onChange={handleChange}
        className={s.mailCheckbox}
      />
      <Typography className={s.unsubscribeTxt}>
        If you’d like to know more about how your details are stored, please
        view our&nbsp;
        <a
          href="/buy_a_car_help/about_buyacar/article_buyacar_terms_and_conditions_2680.jhtml"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms and conditions
        </a>
        &nbsp;and&nbsp;
        <a href={URL.PRIVACY_EXT} target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>
      </Typography>
    </div>
  </>
);

Additional.propTypes = {
  fields: PropTypes.shape({
    company: fieldShape,
    maritalStatus: fieldShape,
    dependants: fieldShape,
    drivingLicenceType: fieldShape,
    validUKPassport: fieldShape,
    subscribed: fieldShape,
  }).isRequired,
  names: PropTypes.shape({
    company: PropTypes.string,
    maritalStatus: PropTypes.string,
    dependants: PropTypes.string,
    drivingLicenceType: PropTypes.string,
    validUKPassport: PropTypes.string,
    subscribed: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Additional;
