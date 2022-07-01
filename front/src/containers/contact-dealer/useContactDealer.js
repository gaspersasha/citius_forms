import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GTM, GA } from '~services';
import { useUserContext, useContactDealerContext } from '~contexts';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import { CAMPAIGN_URL_PARAM } from '~constants/urls';
import {
  validate,
  composeFormState,
  getFormFieldsNames,
  makeQueryString,
  scrollUpTo,
  capitalize,
  getCookie,
} from '~utils';

const { gaPageView } = GA;

// ContactDealer container logic hook
export const useContactDealer = () => {
  const {
    state: { data, isLoadingPost, posted, apiError, quote, vehicle },
    actions,
  } = useContactDealerContext();
  const { user } = useUserContext();

  const {
    isReady,
    push,
    query: { productAdvertId, financeQuoteId, cq_cmp },
  } = useRouter();
  const [fields, setFieldsData] = useState(composeFormState(data));

  const names = getFormFieldsNames(fields);

  // merging user object with fields object
  const autofillFields = () => {
    const userKeys = Object.keys(user);
    const fieldsToUpd = {};

    Object.keys(fields).forEach((key) =>
      userKeys.forEach((userKey) => {
        if (key === userKey && !!user[userKey]) {
          fieldsToUpd[key] = { ...fields[key], value: user[userKey] };
        }
      })
    );

    setFieldsData({
      ...fields,
      ...fieldsToUpd,
    });
  };

  // trigger GA event on start Contact dealer form
  useEffect(() => {
    GTM.fire({ event: 'LGContactDealerStart' });
    gaPageView('/virtual/LGContactDealerStart');
  }, []);

  // prefill message field
  useEffect(() => {
    const message =
      vehicle?.year || vehicle?.make || vehicle?.range
        ? `${new Date(vehicle?.year).getFullYear() || ''} ${
            capitalize(vehicle?.make) || ''
          } ${capitalize(vehicle?.range) || ''}`
        : 'vehicle';

    setFieldsData({
      ...fields,
      message: {
        ...fields.message,
        value: `Hi, I am interested in this ${message}`,
      },
    });
  }, [vehicle]);

  // call autofill for logged in user
  useEffect(() => {
    if (user.isLoggedIn) {
      autofillFields();
    }
  }, [user.isLoggedIn]);

  // redirect to /cars if no productAdvertId provided
  useEffect(() => {
    if (!isReady) return;

    if (!productAdvertId) {
      const { origin } = window.location;

      // replace() is undestructed to avoid Illegal invocation
      window.location.replace(`${origin}/cars`);
    } else {
      // get information about car to prefill message field
      actions.getVehicle({ productAdvertId });
    }
  }, [isReady]);

  // scroll to the top in case of server error
  useEffect(() => {
    if (apiError.status) {
      scrollUpTo('#root');
    }
  }, [apiError.status]);

  // push to complete page in case of success data post
  useEffect(() => {
    if (posted) {
      push(
        makeQueryString('/contact-dealer/complete', {
          productAdvertId: quote.productAdvertId,
          financeQuoteId: financeQuoteId || '',
        })
      );
    }
  }, [posted]);

  // fields change event handler
  const handleChange = ({ target: { name, value, checked } }) => {
    const field = { value, status: INPUT_STATUS.DEFAULT };

    if (apiError.status) {
      actions.setContactDealerState({
        apiError: { status: false, message: '' },
      });
    }

    if (
      name === names.phone &&
      value !== '0' &&
      value.length &&
      !Number(value)
    ) {
      return;
    }

    if (name === names.unsubscribe) {
      field.value = checked;
    }

    setFieldsData({
      ...fields,
      [name]: { ...fields[name], ...field },
    });
  };

  // fields blur event handler
  const handleBlur = ({ target: { name, value } }) => {
    const validated = validate({ [name]: { ...fields[name], value } });

    setFieldsData({
      ...fields,
      [name]: { ...fields[name], ...validated[name] },
    });
  };

  // trim & compose fields' values into data object
  const composeData = () =>
    Object.keys(fields).reduce((acc, key) => {
      const fieldValue = fields[key].value;

      acc[key] =
        typeof fieldValue === 'string' ? fieldValue.trim() : fieldValue;

      return acc;
    }, {});

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const validated = validate(fields);

    setFieldsData({
      ...fields,
      ...validated,
    });

    const invalidKey = Object.keys(validated)
      .filter((key) => validated[key].validationType !== VALIDATION_TYPES.NONE)
      .find((key) => validated[key].status === INPUT_STATUS.INVALID);

    if (!invalidKey) {
      actions.post({
        productAdvertId,
        data: {
          ...composeData(),
          campaign: cq_cmp || getCookie(CAMPAIGN_URL_PARAM),
        },
      });
    }
  };

  const handleBack = () => {
    // case where we came from PP, not bookmark or simple URL enter
    if (window.history.length >= 3) return window.history.back();
    window.location.href = `/deal-${productAdvertId}`;
  };

  return {
    fields,
    names,
    isLoadingPost,
    apiError,
    handleChange,
    handleBlur,
    handleSubmit,
    handleBack,
  };
};
