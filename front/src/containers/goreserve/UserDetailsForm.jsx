import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { GA } from '~services';
import { FORM, URL, INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  TapButtons,
  Login,
  InputText,
  InputEmail,
  InputPhone,
  Button,
} from '~components';
import {
  endpointPush,
  checkEmail,
  checkNotEmpty,
  checkPhoneNumber,
  prepare,
  validate,
  simplify,
  isValid,
} from '~utils';
import s from './styles/details.module.sass';

const { TITLES } = FORM;

class UserDetailsForm extends Component {
  state = {
    notLogged: false,
    isEmailChecked: this.props.isLoggedIn,
    isCheckingExistence: false,

    title: {
      value: this.props.userDetails.title || 'MR',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 0,
    },
    firstName: {
      value: this.props.userDetails.firstName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
      step: 0,
    },
    middleName: {
      value: this.props.userDetails.middleName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
    lastName: {
      value: this.props.userDetails.lastName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
      step: 0,
    },
    emailAddress: {
      value: this.props.userDetails.emailAddress || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.EMAIL,
      step: 1,
    },
    telephoneNumber: {
      value: this.props.userDetails.telephoneNumber || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.PHONE,
      step: 1,
    },
    mobile: {
      value: this.props.userDetails.mobile || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.ALT_PHONE,
      step: 1,
    },
    labelFocus: {
      firstName: false,
      middleName: false,
      lastName: false,
    },
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        status: checkNotEmpty(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.DEFAULT,
        value,
      },
    }));

  handlePhoneChange = ({ target: { value } }) => {
    if (value !== '0' && value.length && !Number(value)) {
      return; // prevent using not Number digits in field
    }

    this.setState((prevState) => ({
      telephoneNumber: {
        ...prevState.telephoneNumber,
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));
  };

  handleAltPhoneChange = ({ target: { value } }) => {
    if (value !== '0' && value.length && !Number(value)) {
      return; // prevent using not Number digits in field
    }

    this.setState((prevState) => ({
      mobile: {
        ...prevState.mobile,
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));
  };

  checkIfLoggedIn = ({ target: { value } }) => {
    const { isLoggedIn } = this.props;

    if (!value) return;

    if (!checkEmail(value)) {
      this.setState((prevState) => ({
        emailAddress: {
          ...prevState.emailAddress,
          status: INPUT_STATUS.INVALID,
        },
      }));

      return;
    }

    if (isLoggedIn) return;
    const form = new FormData();

    form.append('emailAddress', value);

    endpointPush('POST', 'emailExists', null, form).then((notLogged) =>
      this.setState({
        notLogged,
        isEmailChecked: !notLogged,
        isCheckingExistence: false,
      })
    );
  };

  handleBlurAltPhone = ({ target }) => {
    const status = checkPhoneNumber(target.value)
      ? INPUT_STATUS.VALID
      : INPUT_STATUS.INVALID;

    this.setState((prevState) => ({
      mobile: {
        ...prevState.mobile,
        status: target.value.length > 0 ? status : INPUT_STATUS.DEFAULT,
      },
    }));
  };

  handleBlurPhone = ({ target }) => {
    const state = checkPhoneNumber(target.value)
      ? INPUT_STATUS.VALID
      : INPUT_STATUS.INVALID;

    this.setState((prevState) => ({
      telephoneNumber: {
        ...prevState.telephoneNumber,
        status: target.value.length > 0 ? state : INPUT_STATUS.DEFAULT,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { step } = this.props;

    const updated = validate(prepare(this.state, step));
    const tryAgain = !isValid(updated);

    this.setState({ ...updated }, () => {
      const { isEmailChecked, emailAddress } = this.state;

      if (tryAgain) {
        GA.gaSendEvent([
          'send',
          'event',
          GA.RESERVATION_CATEGORY.category,
          'Form validation failed',
        ]);

        return;
      }

      // Prevent user from submitting the form if email
      // has not been checked for existence yet
      if (step === 1 && !isEmailChecked) {
        return this.checkIfLoggedIn({ target: { value: emailAddress.value } });
      }

      const {
        props: { onSubmit },
        state,
      } = this;
      const data = simplify(state);

      data.isEmailChecked = state.isEmailChecked;

      onSubmit(data);

      GA.gaSendEvent([
        'send',
        'event',
        GA.RESERVATION_CATEGORY.category,
        'Form validation passed',
      ]);
    });
  };

  handleLoginClose = () => {
    this.setState((prevState) => ({
      emailAddress: {
        ...prevState.emailAddress,
        value: '',
        status: INPUT_STATUS.DEFAULT,
      },
      notLogged: false,
    }));
  };

  handleFocus = ({ target: { name } }) => {
    this.setState((prevState) => ({
      labelFocus: {
        ...prevState.labelFocus,
        [name]: true,
      },
    }));
  };

  handleBlure = ({ target: { name } }) => {
    this.setState((prevState) => ({
      labelFocus: {
        ...prevState.labelFocus,
        [name]: false,
      },
    }));
  };

  render() {
    const {
      notLogged,
      emailAddress,
      title,
      firstName,
      middleName,
      lastName,
      telephoneNumber,
      mobile,
      isCheckingExistence,
      labelFocus,
    } = this.state;
    const { step: currentStep } = this.props;
    const buttonDisabled = isCheckingExistence;

    return (
      <>
        {notLogged && (
          <Login
            email={emailAddress.value}
            handleLoginClose={this.handleLoginClose}
            source="reserve"
          />
        )}
        {currentStep === title.step && (
          <div className="form-input form-user-details__title">
            <TapButtons
              label="What is your title?"
              subTitle="Select from the list below"
              name="title"
              options={TITLES}
              value={title.value}
              status={title.status}
              onChange={this.handleChange}
            />
          </div>
        )}
        {currentStep === firstName.step && (
          <div
            className={cn(
              'form-input form-user-details__first-name',
              labelFocus.firstName && s.label
            )}
          >
            <InputText
              label="What is your first name"
              name="firstName"
              subTitle={
                labelFocus.firstName
                  ? 'First name MUST match your driving license so we can verify your details'
                  : 'First name as it is on your driving licence'
              }
              placeholder="First name as it is on your driving licence"
              status={firstName.status}
              value={firstName.value}
              required
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlure}
            />
          </div>
        )}
        {currentStep === middleName.step && (
          <div
            className={cn(
              'form-input form-user-details__middle-name',
              labelFocus.middleName && s.label
            )}
          >
            <InputText
              label="What is your middle name"
              name="middleName"
              subTitle={
                labelFocus.middleName
                  ? 'Middle name MUST match your driving license so we can verify your details'
                  : 'Middle name as it is on your driving licence'
              }
              placeholder="Middle name as it is on your driving licence"
              status={middleName.status}
              value={middleName.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlure}
            />
          </div>
        )}
        {currentStep === lastName.step && (
          <div
            className={cn(
              'form-input form-user-details__last-name',
              labelFocus.lastName && s.label
            )}
          >
            <InputText
              label="What is your last name"
              name="lastName"
              subTitle={
                labelFocus.lastName
                  ? 'Last name MUST match your driving license so we can verify your details'
                  : 'Last name as it is on your driving licence'
              }
              placeholder="Last name as it is on your driving licence"
              status={lastName.status}
              value={lastName.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlure}
              required
            />
          </div>
        )}
        {currentStep === emailAddress.step && (
          <div className="form-input form-user-details__email">
            <InputEmail
              label="Email"
              name="emailAddress"
              subTitle="Your email will be your username to login"
              status={emailAddress.status}
              value={emailAddress.value}
              required
              onChange={this.handleChange}
              onBlur={this.checkIfLoggedIn}
            />
            {emailAddress.status === INPUT_STATUS.INVALID && (
              <p className={s.warning}>
                *The email address you entered is not valid, please try again.
              </p>
            )}
          </div>
        )}
        {currentStep === telephoneNumber.step && (
          <div className="form-input form-user-details__phone-number">
            <InputPhone
              label="Telephone number"
              placeholder="Telephone number"
              name="telephoneNumber"
              subTitle={
                <span>
                  We may use your telephone number to contact you with important
                  information about your purchase,&nbsp;
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
              status={telephoneNumber.status}
              value={telephoneNumber.value}
              required
              onChange={this.handlePhoneChange}
              onBlur={this.handleBlurPhone}
            />
          </div>
        )}
        {currentStep === mobile.step && (
          <div className="form-input form-user-details__alternative-phone-number">
            <InputPhone
              label="Alternative telephone number"
              placeholder="Alternative telephone number"
              name="altertnativePhone"
              status={mobile.status}
              value={mobile.value}
              onChange={this.handleAltPhoneChange}
              onBlur={this.handleBlurAltPhone}
            />
          </div>
        )}
        <div className="form-submit align-center">
          <Button
            id={
              (currentStep === title.step && 'ReserveTitleSubmit') ||
              (currentStep === emailAddress.step && 'ReserveEmailSubmit')
            }
            onClick={this.handleSubmit}
            disabled={buttonDisabled}
            type="submit"
            className={s.submitBtn}
          >
            Next
          </Button>
        </div>
      </>
    );
  }
}

UserDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool,
  userDetails: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    emailAddress: PropTypes.string,
    telephoneNumber: PropTypes.string,
    mobile: PropTypes.string,
  }),
};

UserDetailsForm.defaultProps = {
  isLoggedIn: false,
  userDetails: {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    emailAddress: '',
    telephoneNumber: '',
    mobile: '',
  },
};

export default UserDetailsForm;
