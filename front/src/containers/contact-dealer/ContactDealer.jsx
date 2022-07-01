import React from 'react';
import cn from 'classnames';
import {
  Button,
  Spinner,
  Typography,
  InputText,
  InputPhone,
  InputEmail,
  InputCheckbox,
} from '~components';
import { INPUT_STATUS, URL } from '~constants';
import { Exclamation, Close } from '~assets/svg';
import { useContactDealer } from './useContactDealer';
import s from './styles/contact-dealer.module.sass';

const ContactDealer = () => {
  const {
    fields,
    names,
    isLoadingPost,
    apiError: { status, message },
    handleChange,
    handleBlur,
    handleSubmit,
    handleBack,
  } = useContactDealer();

  const renderErrorMessage = (
    <div className={s.status}>
      <Exclamation className={s.icon} />
      <Typography data-id="cd-error-msg" color="red">
        {`Error occured: ${message}` ||
          'We’re really sorry but an error has occurred submitting your data, please try again'}
      </Typography>
    </div>
  );

  return (
    <div className={s.wrapper}>
      <Close className={s.close} onClick={handleBack} />
      <Typography type="h1" align="center" className={cn(s.formBox, s.title)}>
        Contact dealership
      </Typography>
      <Typography
        align="center"
        type="h6"
        className={cn(s.formBox, s.subTitle)}
      >
        Your enquiry will be sent direct to the dealership. During opening hours
        the usual response time is within 4 hours.
      </Typography>
      {status && renderErrorMessage}
      <form className={s.formBox} onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <InputText
            id={names.firstName}
            name={names.firstName}
            status={fields.firstName.status}
            value={fields.firstName.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={s.input}
            label="First name"
            subTitle="First name as it is on your driving licence"
            errorMessage="Please enter your first name as it is on your driving licence"
            placeholder=" "
            required
          />
          <span className={s.placeholder}>
            {(!fields.firstName.value ||
              fields.firstName.status === 'invalid') &&
              '(e.g.James)'}
          </span>
        </div>
        <div className={s.inputWrapper}>
          <InputText
            id={names.lastName}
            name={names.lastName}
            status={fields.lastName.status}
            value={fields.lastName.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={s.input}
            subTitle="Last name as it is on your driving licence"
            errorMessage="Please enter your last name as it is on your driving licence"
            label="Last name"
            placeholder=" "
            required
          />
          <span className={s.placeholder}>
            {(!fields.lastName.value || fields.lastName.status === 'invalid') &&
              '(e.g. Smith)'}
          </span>
        </div>
        <div className={s.inputWrapper}>
          <InputPhone
            id={names.phone}
            name={names.phone}
            status={fields.phone.status}
            value={fields.phone.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={s.input}
            label="Telephone number"
            subTitle="We'll pass this number to the dealership so they can contact you"
            errorMessage="Please enter a valid phone number"
            placeholder=" "
            required
          />
          <span className={s.placeholder}>
            {(!fields.phone.value || fields.phone.status === 'invalid') &&
              '(e.g. 07772123456)'}
          </span>
        </div>
        <div className={s.inputWrapper}>
          <InputEmail
            id={names.email}
            name={names.email}
            status={fields.email.status}
            value={fields.email.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={s.input}
            label="Email"
            subTitle="We'll send you a confirmation email"
            errorMessage="Please enter a valid email address"
            placeholder=" "
            required
          />
          <span className={s.placeholder}>
            {(!fields.email.value || fields.email.status === 'invalid') &&
              '(e.g. john.smith@gmail.com)'}
          </span>
        </div>
        <div className={s.inputWrapper}>
          <InputText
            id={names.postcode}
            name={names.postcode}
            status={fields.postcode.status}
            value={fields.postcode.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={s.input}
            label="Postcode"
            subTitle="So we know which dealership to connect you with"
            placeholder=" "
            errorMessage="Please enter a valid UK postal code"
            required
          />
          <span className={s.placeholder}>
            {(!fields.postcode.value || fields.postcode.status === 'invalid') &&
              '(e.g. HX63BS)'}
          </span>
        </div>

        <label htmlFor="message" className={s.textarea}>
          <div className={s.textareaInnerBox}>
            <span>Message for the dealer</span>
            <span className={cn(s.placeholder, s.optional)}>(optional)</span>
          </div>

          <textarea
            id={names.message}
            name={names.message}
            value={fields.message.value}
            onChange={handleChange}
            className={cn(
              s.input,
              fields.message.status === INPUT_STATUS.INVALID
                ? 'error-input-border'
                : null
            )}
            placeholder="e.g. Can I test drive the car?"
          />
        </label>

        {isLoadingPost ? (
          <Spinner
            style={{ height: '58px', margin: '25px 0' }}
            className={s.spinner}
          />
        ) : (
          <Button type="submit" className={s.button}>
            Send to the dealer
          </Button>
        )}
      </form>

      <div className={s.footer}>
        <div className={s.formBox}>
          <Typography className={s.info}>
            By submitting your details below you agree that BuyaCar may share
            the information you provide with the dealership selling the vehicle
            so that they may contact you to manage your enquiry and to provide
            you with information on similar products and services.
          </Typography>
          <div className={s.unsubscribe}>
            <InputCheckbox
              id={names.unsubscribe}
              name={names.unsubscribe}
              checked={fields.unsubscribe.value}
              onChange={handleChange}
              customClasses="contact-dealer"
              className={s.inputCheckbox}
            />
            <Typography className={s.small}>
              We (BuyaCar and Autovia Group) may also use your information to
              contact you about similar products and services which may be of
              interest to you. You can find out more about how we use your
              information at &nbsp;
              <a target="_blank" rel="noreferrer" href={URL.PRIVACY}>
                Autovia Privacy Policy.&nbsp;
              </a>
              If you would prefer not to receive these offers from us please
              tick here.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDealer;
