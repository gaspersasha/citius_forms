import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Spinner, Button, Typography } from '~components';
import { useDetailsContext } from '~contexts';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import { validate, scrollUpTo, getFormFieldsNames } from '~utils';
import { Done, Exclamation } from '~assets/svg';
import { About, Additional, Address, Contact, SignIn } from '.';
import { composeDetailsState } from './helpers';
import s from './styles/details.module.sass';

const Details = () => {
  const { state, actions } = useDetailsContext();
  const { isLoadingGet, isLoadingPost, updated, apiError, data } = state;
  const [fields, setFieldsData] = useState(composeDetailsState(data));
  const names = getFormFieldsNames(fields);

  useEffect(actions.getDetails, []);

  useEffect(() => {
    setFieldsData(composeDetailsState(data));
  }, [data]);

  useEffect(() => {
    if (apiError || updated) {
      scrollUpTo('#root');
    }
  }, [apiError, updated]);

  const handleChange = ({ target: { name, value, checked } }) => {
    const field = { value };

    if (updated || apiError) {
      actions.setDetailsState({ apiError: false, updated: false });
    }

    switch (name) {
      case names.validUKPassport:
        field.value = value === 'Yes';
        break;

      case names.subscribed:
        field.value = !checked;
        break;

      case names.dependants:
        if (value < 0) {
          return;
        }

        field.value = Number.isNaN(parseInt(value, 10)) ? '' : value;
        break;

      case names.phone:
      case names.alternativePhone:
        if (value !== '0' && value.length && !Number(value)) {
          return;
        }

        break;

      case names.postcode:
        if (typeof value !== 'string') {
          const fieldsToUpdate = {};

          Object.keys(value).forEach((key) => {
            fieldsToUpdate[key] = {
              ...fields[key],
              value: value[key],
            };
          });

          setFieldsData({
            ...fields,
            ...fieldsToUpdate,
          });

          return;
        }

        break;

      default:
        break;
    }

    setFieldsData({
      ...fields,
      [name]: { ...fields[name], ...field },
    });
  };

  // const handleBlur = (e) => {
  // TODO: We need to develop a runtime blur handling with valiadation
  // };

  const checkConfirmation = () => {
    const { email, emailConfirm, password, passwordConfirm } = fields;
    const isEmailConfirmed = email.value === emailConfirm.value;
    const isPassConfirmed = password.value === passwordConfirm.value;
    const fieldsToUpdate = {};

    if (isEmailConfirmed && isPassConfirmed) {
      return true;
    }

    if (!isEmailConfirmed) {
      fieldsToUpdate[names.email] = {
        ...email,
        status: INPUT_STATUS.MISSMATCH,
      };
      fieldsToUpdate[names.emailConfirm] = {
        ...emailConfirm,
        status: INPUT_STATUS.MISSMATCH,
      };
    }

    if (!isPassConfirmed) {
      fieldsToUpdate[names.password] = {
        ...password,
        status: INPUT_STATUS.MISSMATCH,
      };
      fieldsToUpdate[names.passwordConfirm] = {
        ...passwordConfirm,
        status: INPUT_STATUS.MISSMATCH,
      };
    }

    setFieldsData({
      ...fields,
      ...fieldsToUpdate,
    });

    scrollUpTo(`#${names.email}`);

    return false;
  };

  const composeDetailsData = () => {
    const result = {};

    Object.keys(fields).forEach((key) => {
      const fieldValue = fields[key].value;

      result[key] =
        typeof fieldValue === 'string' ? fieldValue.trim() : fieldValue;
    });

    if (!result.password) {
      delete result.password;
      delete result.passwordConfirm;
    }

    delete result.emailConfirm;

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkConfirmation()) {
      return;
    }

    const validated = validate(fields);

    setFieldsData({
      ...fields,
      ...validated,
    });

    const invalidKey = Object.keys(validated)
      .filter((key) => validated[key].validationType !== VALIDATION_TYPES.NONE)
      .find((key) => validated[key].status === INPUT_STATUS.INVALID);

    if (!invalidKey) {
      actions.postDetails(composeDetailsData());
    } else {
      scrollUpTo(`#${names[invalidKey]}`);
    }
  };

  const renderStatus = (
    <div className={cn(s.status, { [s.msg]: updated, [s.error]: apiError })}>
      {updated && (
        <>
          <Done data-id="updated" className={s.icon} />
          <Typography color="green">Your details have been updated</Typography>
        </>
      )}
      {apiError && (
        <>
          <Exclamation data-id="error" className={s.icon} />
          <Typography color="red">
            We’re really sorry but an error has occurred saving your changes,
            please try again
          </Typography>
        </>
      )}
    </div>
  );

  const renderForm = isLoadingGet ? (
    <Spinner data-id="init-spinner" />
  ) : (
    <div className={s.formWrapper}>
      {(updated || apiError) && renderStatus}
      <form onSubmit={handleSubmit}>
        <SignIn names={names} fields={fields} handleChange={handleChange} />
        <Typography type="h4" className={s.heading}>
          Your profile information
        </Typography>
        <About names={names} fields={fields} handleChange={handleChange} />
        <Contact names={names} fields={fields} handleChange={handleChange} />
        <Address names={names} fields={fields} handleChange={handleChange} />
        <Additional names={names} fields={fields} handleChange={handleChange} />
        {isLoadingPost ? (
          <Spinner data-id="spinner" />
        ) : (
          <Button type="submit" className={s.submit}>
            Save
          </Button>
        )}
      </form>
    </div>
  );

  return (
    <section className={s.detailsWrapper}>
      <Typography type="h1" align="center" className={s.title}>
        Edit your personal details
      </Typography>
      <Typography type="h6" className={s.subtitle}>
        These details control how you sign-in to your buycar.co.uk account. Your
        email address is the address we will use to send any email
        correspondence to, whether we are responding to your question or sending
        you an update on your order.
      </Typography>
      {renderForm}
    </section>
  );
};

export const fieldShape = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  vaidationType: PropTypes.string,
  status: PropTypes.oneOf([
    INPUT_STATUS.VALID,
    INPUT_STATUS.INVALID,
    INPUT_STATUS.MISSMATCH,
    INPUT_STATUS.DEFAULT,
  ]),
});

export default Details;
