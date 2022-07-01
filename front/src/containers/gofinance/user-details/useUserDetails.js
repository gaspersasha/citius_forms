import { useState, useEffect } from 'react';
import { useUserContext } from '~contexts';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  checkNotEmpty,
  checkPhoneNumber,
  checkEmail,
  validate,
  isValid,
  prepare,
  simplify,
  scrollViewFunction,
  POST,
  formatValidUKPassportVal,
} from '~utils';
import { handleGTM } from '../helpers';

const nextButtonIDs = {
  maritalStatus: 'ssFinanceMaritalStatusSubmit',
  dependents: 'ssFinanceDependentsSubmit',
  ukPassport: 'ssFinanceUKPassportSubmit',
  license: 'ssFinanceLicenseSubmit',
};

export const useUserDetails = ({
  onSubmit,
  title,
  firstName,
  lastName,
  middleName,
  telephoneNumber,
  mobile,
  emailAddress,
  step,
  isLoggedIn,
  countryOfBirth,
  day,
  month,
  year,
  dependants,
  validUKPassport,
  maritalStatus,
  drivingLicenceType,
  isDataSending,
}) => {
  const initialState = {
    notLogged: false,
    isEmailChecked: isLoggedIn,
    title: {
      value: title || 'MR',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 0,
    },
    firstName: {
      value: firstName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
      step: 0,
    },
    middleName: {
      value: middleName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
    lastName: {
      value: lastName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
      step: 0,
    },
    email: {
      value: emailAddress || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.EMAIL,
      step: 1,
    },
    phone: {
      value: telephoneNumber || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.PHONE,
      step: 1,
    },
    mobile: {
      value: mobile || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.ALT_PHONE,
      step: 1,
    },
    dateOfBirth: {
      value: day ? [day, month, year].join('/') : '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.DATE,
      step: 2,
    },
    maritalStatus: {
      value: maritalStatus || 'SINGLE',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 3,
    },
    countryOfBirth: {
      value: countryOfBirth || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.COUNTRY_OF_BIRTH,
      step: 2,
    },
    dependants: {
      value: dependants || 0,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.DEPENDANTS,
      step: 4,
    },
    drivingLicenceType: {
      value: drivingLicenceType || 'FULL',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 5,
    },
    validUKPassport: {
      /**
       * https://creativesolutions.atlassian.net/browse/BE-181
       * TODO: Remove formatValidUKPassportVal func and use
       * Default props in correct way after Finance form GO test is complete
       */
      value: formatValidUKPassportVal(validUKPassport),
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 6,
    },
  };

  const [state, setState] = useState(initialState);
  const [updatedAt, setUpdatedAt] = useState(0);
  const [checking, setChecking] = useState(false);
  const [labelFocus, setLabelFocus] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
  });
  const { user } = useUserContext();
  const isDataSendingInProgress =
    isDataSending && step === state.drivingLicenceType.step;

  useEffect(() => {
    const data = {
      ...simplify(state),
      isEmailChecked: state.isEmailChecked,
    };

    updatedAt && onSubmit(data);
  }, [updatedAt]);

  useEffect(() => {
    if (!user.isLoggedIn) return;
    setState({
      ...state,
      title: {
        ...state.title,
        // if user came from Contact dealer form, we have no this field,
        // so it has to be filled
        // for standart flow, title will be filled - so will not shown on step = 0
        step: user.title ? -1 : 0,
      },
      firstName: {
        ...state.firstName,
        step: -1,
      },
      middleName: {
        ...state.middleName,
        step: -1,
      },
      lastName: {
        ...state.lastName,
        step: -1,
      },
      email: {
        ...state.email,
        step: -1,
      },
      mobile: {
        ...state.mobile,
        step: -1,
      },
      dateOfBirth: {
        ...state.dateOfBirth,
        step: user.dateOfBirth ? -1 : 0,
      },
      phone: {
        ...state.phone,
        step: user.phone ? -1 : 0,
      },
      countryOfBirth: {
        ...state.countryOfBirth,
        step: 0,
      },
      maritalStatus: {
        ...state.maritalStatus,
        step: 0,
      },
      dependants: {
        ...state.dependants,
        step: 1,
      },
      validUKPassport: {
        ...state.validUKPassport,
        step: 2,
      },
      drivingLicenceType: {
        ...state.drivingLicenceType,
        step: 3,
      },
      notLogged: false,
      isEmailChecked: true,
    });
  }, [user]);

  const checkIfLoggedIn = ({ target: { value } }) => {
    if (!value) return;

    if (!checkEmail(value)) {
      setState((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          value,
          status: INPUT_STATUS.INVALID,
        },
      }));

      return;
    }

    if (state.isEmailChecked) return;

    const form = new FormData();

    form.append('emailAddress', value);
    setChecking(true);
    POST('emailExists', null, form).then((notLogged) => {
      setChecking(false);
      setState((prev) => ({
        ...prev,
        notLogged,
        isEmailChecked: !notLogged,
      }));
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        status: checkNotEmpty(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handlePhoneChange = ({ target: { value } }) => {
    if (value !== '0' && value.length && !Number(value)) return;
    setState((prev) => ({
      ...prev,
      phone: {
        ...prev.phone,
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));
  };

  const handleAltPhoneChange = ({ target: { value } }) => {
    if (value !== '0' && value.length && !Number(value)) return;
    setState((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));
  };

  const handleBlurPhone = ({ target: { value } }) => {
    const status = checkPhoneNumber(value)
      ? INPUT_STATUS.VALID
      : INPUT_STATUS.INVALID;

    setState((prev) => ({
      ...prev,
      phone: {
        ...prev.phone,
        status: value.length > 0 ? status : INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleBlurAltPhone = ({ target: { value } }) => {
    const status = checkPhoneNumber(value)
      ? INPUT_STATUS.VALID
      : INPUT_STATUS.INVALID;

    setState((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        status: value.length > 0 ? status : INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleCountryOfBirthChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      countryOfBirth: {
        ...prev.countryOfBirth,
        value,
        status: INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleMaritalStatusChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      maritalStatus: {
        ...prev.maritalStatus,
        value,
        status: INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleDependantsChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      dependants: {
        ...prev.dependants,
        value: value ? parseInt(value, 10) : 0,
        status: INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleDrivingLicenceChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      drivingLicenceType: {
        ...prev.drivingLicenceType,
        value,
        status: INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleTapButtonPassportChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      validUKPassport: {
        ...prev.validUKPassport,
        value,
        status: INPUT_STATUS.DEFAULT,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDataSendingInProgress) return;

    const updated = validate(prepare(state, step));

    setState({ ...state, ...updated });

    if (!user.email && step === state.email.step && !state.isEmailChecked) {
      return checkIfLoggedIn({ target: { value: state.email.value } });
    }

    if (!isValid(updated)) return scrollViewFunction();

    handleGTM(updated, [
      'dependants',
      'validUKPassport',
      'maritalStatus',
      'drivingLicenceType',
    ]);

    setUpdatedAt(updatedAt + 1);
  };

  const handleLoginClose = () => {
    setState((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        value: '',
        status: INPUT_STATUS.DEFAULT,
      },
      notLogged: false,
    }));
  };

  const handleFocus = ({ target: { name } }) => {
    setLabelFocus({
      ...labelFocus,
      [name]: true,
    });
  };

  const handleBlur = ({ target: { name } }) => {
    setLabelFocus({
      ...labelFocus,
      [name]: false,
    });
  };

  const getNextButtonID = () => {
    switch (step) {
      case state.maritalStatus.step:
        return nextButtonIDs.maritalStatus;
      case state.dependants.step:
        return nextButtonIDs.dependents;
      case state.drivingLicenceType.step:
        return nextButtonIDs.license;
      case state.validUKPassport.step:
        return nextButtonIDs.ukPassport;
      default:
        return null;
    }
  };

  return [
    {
      state,
      user,
      checking,
      labelFocus,
      isDataSendingInProgress,
    },
    {
      checkIfLoggedIn,
      handleLoginClose,
      handleFocus,
      handleBlur,
      handleChange,
      handlePhoneChange,
      handleAltPhoneChange,
      handleBlurPhone,
      handleBlurAltPhone,
      handleCountryOfBirthChange,
      handleMaritalStatusChange,
      handleDependantsChange,
      handleDrivingLicenceChange,
      handleTapButtonPassportChange,
      handleSubmit,
      getNextButtonID,
    },
  ];
};
