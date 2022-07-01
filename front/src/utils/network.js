/* eslint-disable max-len */
import axios from 'axios';
import { ENV } from '~constants';

const config = {
  getaddress: 'Q2iEgiL-hkCppww2KdarRg3675',
};
const { IS_LOCAL_ENV } = ENV;
// const base = IS_LOCAL_ENV ? 'http://buyacar-test2.ci.didev.co.uk' : '';
// to work with local mock data
const base = IS_LOCAL_ENV ? '/_api' : '';

export function makeQueryString(url, params) {
  const paramsString = params
    ? Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';

  return paramsString ? `${url}?${paramsString}` : url;
}

export const endpoints = {
  captchaSiteKey: () => `${base}/captcha/siteKey.do`,
  userDetails: () => `${base}/login.do?requireUserActivity=true`,
  vehicleStatus: ({ productAdvertId }) =>
    `${base}/myaccount/quoteDetails/${productAdvertId}.json`,
  logOut: () => `${base}/mybuyacar/Logout.jhtml`,
  registerNewUser: () => `${base}/registerNewUser.do`,
  passwordReminder: () => `${base}/sendPasswordResetLink.do`,
  reserveApiStart: (props) =>
    makeQueryString(`${base}/reserveapi/start.jhtml`, props),
  reserveApiSend: () => `${base}/reserveapi/send.jhtml`,

  contactDealer: ({ productAdvertId }) =>
    `${base}/myaccount/contactdealer/${productAdvertId}.json`,
  myCars: ({ limit, offset }) =>
    `${base}/myaccount/mycars.json?offset=${offset}&limit=${limit}`,
  deleteQuotesByAdvertId: ({ productAdvertId }) =>
    `/myaccount/quotes/delete-by-advert/${productAdvertId}.json`,
  deleteQuotesByProductDefinitionId: ({ productDefinitionId }) =>
    `/myaccount/productdefinitions/${productDefinitionId}.json`,
  carDetails: ({ productAdvertId }) =>
    `${base}/cardetails/${productAdvertId}.do`,
  getPartExSummary: () => '/mypartex/tradeInQuotes.json',

  emailExists: () => `${base}/mybuyacar/AJAXisEmailPresent.jhtml`,

  findUKAddressByPostcode: ({ postcode }) => {
    if (IS_LOCAL_ENV)
      return `/_api/getaddress?${postcode}&api-key=${config.getaddress}`;

    return `https://api.getaddress.io/v2/uk/${postcode}?api-key=${config.getaddress}`;
  },

  loqateAPIFind: ({ query, container }) => {
    if (IS_LOCAL_ENV) return `/_api/loqate/find?${query}&${container}`;

    const baseUrl = 'https://api.addressy.com/Capture/Interactive';
    const key = 'CB25-ZG33-RK63-WH31';
    let params = `Key=${key}&Countries=GB`;

    if (query) params = `${params}&Text=${query}`;
    if (container) params = `${params}&Method=Match&Container=${container}`;

    return `${baseUrl}/Find/v1.10/json3.ws?${params}`;
  },

  loqateAPISelect: ({ id }) => {
    if (IS_LOCAL_ENV) return `/_api/loqate/select?${id}`;

    const baseUrl =
      'https://api.addressy.com/Capture/Interactive/Retrieve/v1.00/json3.ws';
    const key = 'CB25-ZG33-RK63-WH31';
    const params = `Key=${key}&Id=${id}`;

    return `${baseUrl}?${params}`;
  },

  stripeCall: ({ quoteId }) =>
    `${base}/reserveapi/stripeSession.jhtml?quoteId=${quoteId}`,
  getPayPalClientId: () => `${base}/paypal/paypalClientId.json`,
  updatePayment: ({ quoteId, transactionId }) =>
    `/paypal/updatePayment.json?quoteId=${quoteId}&transactionId=${transactionId}`,
  myOrders: () => '/myaccount/orders.json',
  newFinanceQuote: () => `${base}/finance/v2/financeQuote.do`,
  getDeliveryOptions: ({ productAdvertId }) =>
    `${base}/vehicles/${productAdvertId}/deliveryMethods.json`,

  financeApiStart: (props) => {
    const url = makeQueryString(`${base}/financeapi/start.jhtml`, props);

    return url;
  },

  financeApiSend: () => `${base}/financeapi/send.jhtml`,
  productInformation: ({ productAdvertId }) =>
    `${base}/vehicles/${productAdvertId}.json`,
  confirmation: () => {
    const random = Math.floor(Math.random(1009) * 1000);

    return `${base}/myaccount/confirmation.json?${random}`;
  },
  confirmationProductInformation: ({ productAdvertId }) => {
    const random = Math.floor(Math.random(1009) * 1000);

    return `${base}/myaccount/confirmation/${productAdvertId}.json?${random}`;
  },
  softcheck: () => `${base}/financeapi/softCreditCheck.jhtml`,
  userProfileInfo: () => `${base}/user.json`,
  updateFinanceTerms: (quoteInfo) => {
    const path = makeQueryString(
      `${base}/finance/updateFinanceTerms.json`,
      quoteInfo
    );

    return path;
  },

  startPartEx: (props) => {
    const url = makeQueryString(`${base}/partex/start.jhtml`, props);

    return url;
  },
  checkPlatePartEx: (props) => {
    const url = makeQueryString(`${base}/partex/carDetails.jhtml`, props);

    return url;
  },
  submitPartEx: (props) => {
    const url = makeQueryString(`${base}/partex/submit.jhtml`, props);

    return url;
  },
};

function getData(response) {
  return response.data;
}

function errorHandler(error) {
  return Promise.reject(error);
}

// export const endpointFetch = (endpoint) => mock(endpoint);
export const endpointFetch = (endpoint, params = {}, headers = {}) =>
  axios({
    method: 'get',
    url: endpoints[endpoint](params),
    headers,
  })
    .then(getData)
    .catch(errorHandler);

export const endpointPush = (
  method,
  endpoint,
  params = {},
  data = {},
  headers = { 'Cache-Control': 'no-store' }
) =>
  axios({
    method,
    url: endpoints[endpoint](params),
    headers: {
      'Cache-Control': 'no-cache',
      ...headers,
    },
    data,
  })
    .then(getData)
    .catch(errorHandler);

export const GET = endpointFetch;
export const POST = (
  endpoint,
  params = {},
  data = {},
  headers = { 'Cache-Control': 'no-store' }
) => endpointPush('POST', endpoint, params, data, headers);

export const debounce = (fn, delay) => {
  let timer = null;

  return (...args) => {
    const context = this;

    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const getFormData = (params = {}) => {
  const formData = new FormData();

  Object.keys(params).forEach((key) => {
    const value =
      params[key] === undefined ||
      Number.isNaN(params[key]) ||
      params[key] === null
        ? ''
        : params[key];

    formData.append(key, value);
  });

  return formData;
};
