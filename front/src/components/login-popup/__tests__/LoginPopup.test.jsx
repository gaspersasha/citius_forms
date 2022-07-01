import React from 'react';
import { GTM_GA } from '~utils';
import Login from '../LoginPopup';

/* eslint-disable */
const userDetails = `userDetails({"user": {
  "email":"tes3t1213test@testddd1213test1213.com",
  "postcode":"SE231AA",
  "title":"Mr",
  "firstName":"Bob",
  "lastName":"Bruno",
  "middleName":"MidName",
  "id":285410,
  "houseName":null,
  "houseNumber":null,
  "street":null,
  "district":null,
  "town":null,
  "county":null,
  "fax":null,
  "mobile":null,
  "company":null,
  "dob":null,
  "maritalStatus":"common law",
  "drivingLicenceType":null,
  "validUKPassport":false,
  "dependants":null,
  "clientId":"aff206be-878c-4e6d-a01f-405157069bd4",
  "phone":null,
  "day":null,
  "month":null,
  "year":null
}});`;

const userDetailsError = `userDetails({"error":"Invalid login"});`;
/* eslint-enable */

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointPush: jest.fn(),
  GTM_EVENT: jest.fn(),
  GTM_GA: jest.fn(),
}));

mockUseUserContext({
  actions: { setUserState: jest.fn() },
});

const defaultProps = {
  email: 'test@test.test',
  password: 'testpass',
  source: 'source',
};

describe('<Login />', () => {
  it('render', () => {
    expect(shallow(<Login {...defaultProps} />)).toMatchSnapshot();
  });

  it('close via overlay', () => {
    const mock = jest.fn();
    const wrapper = shallow(
      <Login handleLoginClose={mock} {...defaultProps} />
    );

    wrapper.find('[role="dialog"]').simulate('click');
    expect(mock).toBeCalled();
  });

  it('close via button', () => {
    const mock = jest.fn();
    const wrapper = shallow(
      <Login handleLoginClose={mock} {...defaultProps} />
    );

    wrapper.find('[data-id="login-cancel"]').simulate('click');
    expect(mock).toBeCalled();
  });

  it('forgot button click', () => {
    const wrapper = shallow(<Login {...defaultProps} />);

    wrapper.find('[data-id="forgot-pass-link"]').simulate('click');
    expect(GTM_GA).toBeCalled();
  });
});
