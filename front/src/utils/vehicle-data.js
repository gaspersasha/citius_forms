/* eslint-disable max-classes-per-file */
import {
  // base as baseUrl,
  formatDate,
  formatTime,
  IntlGBP,
  // makeQueryString,
  currencyFormat,
} from '~utils';
import { IS_LOCAL_ENV } from '../constants/env';

export const vehiclePaths = {
  imageCDN: (path) => {
    if (IS_LOCAL_ENV) return path;

    return `https://d13fze08x8d2oj.cloudfront.net${path}`;
  },
  vehicleQuote: (quoteId) => `/account/vehicle-status?quoteId=${quoteId}`,
  // factoryBuild: productDefinitionId => makeQueryString(
  //   `${baseUrl}'/factoryBuilds/viewDeals.jhtml`,
  //   { productDefinitionId },
  // ),
};

export class FinanceApplication {
  constructor(data) {
    this.date = formatDate(data.dateOfLastFinanceApplication);
    this.time = formatTime(data.dateOfLastFinanceApplication);
  }
}

export class FinanceQuote {
  constructor(data) {
    this.monthly = IntlGBP.format(data.priceMonthly);
    this.total = IntlGBP.format(data.priceTotal);
    this.financeType = data.financeType;
  }
}

export class Reservation {
  constructor(data) {
    if (!data) {
      this.depositPaid = null;

      return;
    }

    this.date = data.dateOfPayment ? formatDate(data.dateOfPayment) : null;

    this.time = data.dateOfPayment ? formatTime(data.dateOfPayment) : null;

    this.depositPaid = data.depositPaid
      ? currencyFormat(data.depositPaid)
      : null;

    this.referenceNumber = data.paymentReferenceNumber;
    this.paymentMethod = data.paymentMethod;
  }
}
