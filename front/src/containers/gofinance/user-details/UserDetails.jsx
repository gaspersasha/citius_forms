import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Button,
  InputText,
  InputEmail,
  InputPhone,
  InputDate,
  Login,
  SearchSelect,
  TapButtons,
} from '~components';
import { FORM, URL } from '~constants';
import { CreditScore } from '.';
import { useUserDetails } from './useUserDetails';
import s from './styles/user-details.module.sass';
import financeStyles from '../styles/finance.module.sass';

const UserDetails = ({ firstName, step, creditScore, ...rest }) => {
  const [
    { state, user, checking, labelFocus, isDataSendingInProgress },
    handlers,
  ] = useUserDetails({ ...rest, firstName, step });

  const buttonClasses = cn(
    { 'button-forward-loading': isDataSendingInProgress },
    `${financeStyles.confirm}`
  );

  const shouldShowCreditScore = () => {
    if (user.isLoggedIn && step === state.maritalStatus.step) return true;
    if (step === state.title.step) return true;
  };

  return (
    <>
      {shouldShowCreditScore() && (
        <CreditScore creditScore={creditScore} firstName={firstName} />
      )}
      {state.notLogged && (
        <Login
          email={state.email.value}
          handleLoginClose={handlers.handleLoginClose}
          source="finance"
        />
      )}
      {!user.firstName && (
        <>
          {step === state.title.step && (
            <div className="form-input">
              <TapButtons
                label="What is your title?"
                subTitle="Select from the list below"
                name="title"
                options={FORM.TITLES}
                value={state.title.value}
                status={state.title.status}
                onChange={handlers.handleChange}
              />
            </div>
          )}
          {step === state.firstName.step && (
            <div className={cn('form-input', labelFocus.firstName && s.label)}>
              <InputText
                label="What is your first name"
                name="firstName"
                subTitle={
                  labelFocus.firstName
                    ? 'First name MUST match your driving license so we can verify your details'
                    : 'First name as it is on your driving licence'
                }
                placeholder="First name as it is on your driving licence"
                status={state.firstName.status}
                value={state.firstName.value}
                onChange={handlers.handleChange}
                required
                onFocus={handlers.handleFocus}
                onBlur={handlers.handleBlur}
              />
            </div>
          )}
          {step === state.middleName.step && (
            <div className={cn('form-input', labelFocus.middleName && s.label)}>
              <InputText
                label="What is your middle name"
                name="middleName"
                subTitle={
                  labelFocus.middleName
                    ? 'Middle name MUST match your driving license so we can verify your details'
                    : 'Middle name as it is on your driving licence'
                }
                placeholder="Middle name as it is on your driving licence"
                status={state.middleName.status}
                value={state.middleName.value}
                onChange={handlers.handleChange}
                required
                onFocus={handlers.handleFocus}
                onBlur={handlers.handleBlur}
              />
            </div>
          )}
          {step === state.lastName.step && (
            <div className={cn('form-input', labelFocus.lastName && s.label)}>
              <InputText
                label="What is your last name"
                name="lastName"
                subTitle={
                  labelFocus.lastName
                    ? 'Last name MUST match your driving license so we can verify your details'
                    : 'Last name as it is on your driving licence'
                }
                placeholder="Last name as it is on your driving licence"
                status={state.lastName.status}
                value={state.lastName.value}
                onChange={handlers.handleChange}
                required
                onFocus={handlers.handleFocus}
                onBlur={handlers.handleBlur}
              />
            </div>
          )}
          {step === state.email.step && (
            <div className="form-input">
              <InputEmail
                label="Email"
                name="email"
                subTitle="Your email will be your username to login"
                value={state.email.value}
                status={state.email.status}
                onChange={handlers.handleChange}
                onBlur={handlers.checkIfLoggedIn}
                required
              />
            </div>
          )}
          {step === state.phone.step && (
            <div className="form-input">
              <InputPhone
                label="Telephone number"
                placeholder="Telephone number"
                name="phone"
                subTitle={
                  <span>
                    We may use your telephone number to contact you with
                    important information about your purchase,&nbsp;
                    <a
                      href={URL.PRIVACY_EXT}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      find out more
                    </a>
                    &nbsp;about why else we may contact you
                  </span>
                }
                status={state.phone.status}
                value={state.phone.value}
                onChange={handlers.handlePhoneChange}
                onBlur={handlers.handleBlurPhone}
                required
              />
            </div>
          )}
          {step === state.mobile.step && (
            <div className="form-input">
              <InputPhone
                label="Alternative telephone number"
                placeholder="Alternative telephone number"
                name="mobile"
                status={state.mobile.status}
                value={state.mobile.value}
                onChange={handlers.handleAltPhoneChange}
                onBlur={handlers.handleBlurAltPhone}
              />
            </div>
          )}
          {step === state.dateOfBirth.step && (
            <>
              <div className="form-input">
                <InputDate
                  name="dateOfBirth"
                  placeholdermessage="MM/DD/YY"
                  subTitle="You must be over 18"
                  value={state.dateOfBirth.value}
                  status={state.dateOfBirth.status}
                  onChange={handlers.handleChange}
                  required
                />
              </div>
              <div className="form-input">
                <SearchSelect
                  name="country-select"
                  label="What is your country of birth?"
                  placeholderMessage="Start typing your country to search"
                  options={FORM.COUNTRIES}
                  value={state.countryOfBirth.value}
                  status={state.countryOfBirth.status}
                  required
                  onChange={handlers.handleCountryOfBirthChange}
                />
              </div>
            </>
          )}
          {step === state.maritalStatus.step && (
            <TapButtons
              label="What is your marital status?"
              name="maritalStatus"
              subTitle="Select from the list below"
              options={FORM.MARITAL_STATUSES}
              value={state.maritalStatus.value}
              status={state.maritalStatus.status}
              onChange={handlers.handleMaritalStatusChange}
              required
            />
          )}
        </>
      )}
      {user.firstName && (
        <>
          {/* if user came from Contact dealer form, he has to fill this field,
          because we don't have it on that form */}
          {step === state.title.step && (
            <div className="form-input">
              <TapButtons
                label="What is your title?"
                subTitle="Select from the list below"
                name="title"
                options={FORM.TITLES}
                value={state.title.value}
                status={state.title.status}
                onChange={handlers.handleChange}
              />
            </div>
          )}
          {step === state.maritalStatus.step && (
            <TapButtons
              label="What is your marital status?"
              name="maritalStatus"
              subTitle="Select from the list below"
              options={FORM.MARITAL_STATUSES}
              value={state.maritalStatus.value}
              status={state.maritalStatus.status}
              onChange={handlers.handleMaritalStatusChange}
              required
            />
          )}
          {step === state.phone.step && (
            <div className="form-input">
              <InputPhone
                label="Telephone number"
                placeholder="Telephone number"
                name="phone"
                subTitle={
                  <span>
                    We may use your telephone number to contact you with
                    important information about your purchase,&nbsp;
                    <a
                      href={URL.PRIVACY_EXT}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      find out more
                    </a>
                    &nbsp;about why else we may contact you
                  </span>
                }
                status={state.phone.status}
                value={state.phone.value}
                onChange={handlers.handlePhoneChange}
                onBlur={handlers.handleBlurPhone}
                required
              />
            </div>
          )}
          {step === state.mobile.step && (
            <div className="form-input">
              <InputPhone
                label="Alternative telephone number"
                placeholder="Alternative telephone number"
                name="mobile"
                status={state.mobile.status}
                value={state.mobile.value}
                onChange={handlers.handleAltPhoneChange}
                onBlur={handlers.handleBlurAltPhone}
              />
            </div>
          )}
          {step === state.dateOfBirth.step && (
            <div className="form-input">
              <InputDate
                name="dateOfBirth"
                placeholdermessage="MM/DD/YY"
                subTitle="You must be over 18"
                value={state.dateOfBirth.value}
                status={state.dateOfBirth.status}
                onChange={handlers.handleChange}
                required
              />
            </div>
          )}
          {step === state.countryOfBirth.step && (
            <div className="form-input">
              <SearchSelect
                name="country-select"
                label="What is your country of birth?"
                placeholderMessage="Start typing your country to search"
                options={FORM.COUNTRIES}
                value={state.countryOfBirth.value}
                status={state.countryOfBirth.status}
                required
                onChange={handlers.handleCountryOfBirthChange}
              />
            </div>
          )}
        </>
      )}
      {step === state.dependants.step && (
        <TapButtons
          label="How many dependants do you have?"
          name="dependants"
          subTitle="How many people rely on your for financial support? Such as children"
          options={FORM.DEPENDANT_STATUSES}
          value={state.dependants.value}
          status={state.dependants.status}
          onChange={handlers.handleDependantsChange}
          required
        />
      )}
      {step === state.drivingLicenceType.step && (
        <TapButtons
          label="What type of your driving licence do you have?"
          subTitle="Select from the list below"
          name="drivingLicence"
          options={FORM.DRIVING_LICENCES}
          value={state.drivingLicenceType.value}
          status={state.drivingLicenceType.status}
          onChange={handlers.handleDrivingLicenceChange}
          required
        />
      )}
      {step === state.validUKPassport.step && (
        <TapButtons
          label="Do you have valid UK passport?"
          subTitle="Select from the list below"
          options={[
            { option: 'Yes', value: true },
            { option: 'No', value: false },
          ]}
          name="ukPassport"
          value={state.validUKPassport.value}
          status={state.validUKPassport.status}
          onChange={handlers.handleTapButtonPassportChange}
          required
        />
      )}
      <Button
        onClick={handlers.handleSubmit}
        disabled={checking}
        type="submit"
        id={handlers.getNextButtonID()}
        className={buttonClasses}
      >
        {isDataSendingInProgress ? 'Loading...' : 'Next'}
      </Button>
    </>
  );
};

UserDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isDataSending: PropTypes.bool.isRequired,
  title: PropTypes.string,
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  emailAddress: PropTypes.string,
  creditScore: PropTypes.number,
  telephoneNumber: PropTypes.string,
  mobile: PropTypes.string,
  maritalStatus: PropTypes.string,
  dependants: PropTypes.number,
  drivingLicenceType: PropTypes.string,
  validUKPassport: PropTypes.bool,
  countryOfBirth: PropTypes.string,
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UserDetails.defaultProps = {
  title: 'MR',
  firstName: '',
  middleName: '',
  lastName: '',
  emailAddress: '',
  creditScore: null,
  telephoneNumber: '',
  mobile: '',
  maritalStatus: 'SINGLE',
  dependants: 0,
  drivingLicenceType: 'FULL',
  validUKPassport: true,
  countryOfBirth: '',
  day: '',
  month: '',
  year: '',
};

export default UserDetails;
